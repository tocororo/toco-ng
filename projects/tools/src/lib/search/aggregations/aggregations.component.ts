import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Aggr, AggrBucket } from "@toco/tools/entities";

export interface AggregationsSelection{
  [id: string]: string[] 
}

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
  selectedAggr: AggregationsSelection = {};

  @Output()
  keySelect = new EventEmitter<AggregationsSelection>();

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
      for (let index = 0; index < this.selectedAggr[aggrKey].length; index++) {
        const element = this.selectedAggr[aggrKey][index];
        if (element == bucket.key) {
          // console.log(this.selectedAggr, aggrKey, bucket);
          // console.log("--------------------");
          
          return true;
        }
      }
      // this.selectedAggr[aggrKey].forEach((key) => {
      //   if (key == bucket.key) {
      //     console.log(this.selectedAggr, aggrKey, bucket);
      //     console.log("--------------------");
          
      //     return true;
      //   }
      // });
    }
    // console.log("FALSE");
    
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
