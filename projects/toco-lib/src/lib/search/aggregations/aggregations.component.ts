import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { Aggr, AggrBucket } from "../../entities/public-api";

export interface AggregationsSelection {
  [id: string]: string[];
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
  /**
   * that variable is used for comunicate the state and the key of the modal to the father component search
   */
  @Output()
  modal_open = new EventEmitter<boolean>();

  is_open: boolean;
  keys = [];
  value: any;

  constructor() {}

  ngOnInit() {
    for (const key in this.aggregations) {
      if (this.aggregations.hasOwnProperty(key)) {
        const element = this.aggregations[key];
        //this.keys.push(key);
        this.keys.push({ key: key, sp: this._translate(key) });
      }
    }
    // console.log("cola");
    // console.log(this.keys);
  }

  //aqui se agregan los casos que puedan haber en las agregaciones para q salgan siempre en español
  private _translate(key) {
    switch (key) {
      case "status": {
        return "Estado";
      }
      case "country": {
        return "País";
      }
      case "state": {
        return "Provincia (Estado)";
      }
      case "types": {
        return "Tipos";
      }
      default: {
        return this.aggregations[key]["label"];
      }
    }

    return key;
  }

  isSelected(aggrKey, bucket: AggrBucket) {
    if (this.selectedAggr.hasOwnProperty(aggrKey)) {
      for (let index = 0; index < this.selectedAggr[aggrKey].length; index++) {
        const element = this.selectedAggr[aggrKey][index];
        if (element == bucket.key) {
          // // console.log(this.selectedAggr, aggrKey, bucket);
          // // console.log("--------------------");

          return true;
        }
      }
      // this.selectedAggr[aggrKey].forEach((key) => {
      //   if (key == bucket.key) {
      //     // console.log(this.selectedAggr, aggrKey, bucket);
      //     // console.log("--------------------");

      //     return true;
      //   }
      // });
    }
    // // console.log("FALSE");

    return false;
  }

  selectionChange(aggrKey, bucket: AggrBucket) {
    if (!this.selectedAggr.hasOwnProperty(aggrKey)) {
      this.selectedAggr[aggrKey] = [];
    }

    if (this.selectedAggr[aggrKey].find((k) => k == bucket.key)) {
      this.selectedAggr[aggrKey] = this.selectedAggr[aggrKey].filter(
        (k) => k != bucket.key
      );
    } else {
      this.selectedAggr[aggrKey].push(bucket.key);
    }

    this.keySelect.emit(this.selectedAggr);
  }
  /**
   *
   * @param key  is used to comunicate with the father component what kind of data have to display
   * by carlomonterrey
   */
  btnOpenModal(key) {
    this.modal_open.emit(key);
  }

  moreAggPage(key){
    for (const k in this.aggregations) {
      console.log(key, k, this.aggregations[k]);

      if (key.key == k){
        let b: Array<AggrBucket> = new Array<AggrBucket> (3);
        b.push(new AggrBucket({doc_count:0,key:"eee"}))
        b.push(new AggrBucket({doc_count:4,key:"543242sd"}))
        b.push(new AggrBucket({doc_count:5,key:"sadads"}))
        let nb = this.aggregations[k].buckets.concat(b)
        this.aggregations[k].buckets = nb;
        console.log(this.aggregations[k].buckets);
        console.log(this.aggregations[k]);

      }
    }
    console.log(this.aggregations, this.selectedAggr);

  }
}
