import { Component, Input, OnInit } from '@angular/core';
import { HitList, Record } from '../../entities/public-api';

@Component({
  selector: 'toco-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.scss']
})
export class RecordListComponent implements OnInit {

  @Input()
  hitList: HitList<Record>;

  constructor() { }

  ngOnInit() {
    // console.log(this.hitList);
  }

}
