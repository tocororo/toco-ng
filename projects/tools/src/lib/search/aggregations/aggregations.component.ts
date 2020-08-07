import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Aggr, AggrBucket } from "@toco/tools/entities";


@Component({
  selector: "toco-search-aggregations",
  templateUrl: "./aggregations.component.html",
  styleUrls: ["./aggregations.component.scss"],
})
export class AggregationsComponent implements OnInit {
  @Input()
  aggregations: { [id: string]: Aggr } = {};

  /***
   * {
   *  'country': ['Cuba','Peru'],
   *  'state': ['New York']
   *  ...
   * }
   *
   * in the aggregation country, buckets 'Cuba' and 'Peru' are selected
   * in the aggregation state, bucket 'New York' is selected
   *
   */
  @Input()
  selectedAggr: { [id: string]: string[] } = {};

  @Output()
  keySelect = new EventEmitter<{ [id: string]: string[] }>();

  keys: string[] = [];

  constructor() {}

  ngOnInit() {
    for (const key in this.aggregations) {
      if (this.aggregations.hasOwnProperty(key)) {
        const element = this.aggregations[key];
        this.keys.push(key);
      }
    }
  }

  isSelected(aggrKey, bucket: AggrBucket) {
    if (this.selectedAggr.hasOwnProperty(aggrKey)) {
      this.selectedAggr[aggrKey].forEach((key) => {
        if (key == bucket.key) {
          return true;
        }
      });
    }
    return false;
  }

  selectionChange(aggrKey, bucket: AggrBucket) {
    if (!this.selectedAggr.hasOwnProperty(aggrKey)){
      this.selectedAggr[aggrKey] = [];
    }
    
      if (this.selectedAggr[aggrKey].find(k => k == bucket.key)){
        this.selectedAggr[aggrKey] = this.selectedAggr[aggrKey].filter(k => k != bucket.key);
      } else{
        this.selectedAggr[aggrKey].push(bucket.key)
      }
     

    this.keySelect.emit(this.selectedAggr);
  }
}
