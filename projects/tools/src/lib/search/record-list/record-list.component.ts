import { Component, OnInit, Input } from '@angular/core';
import { HitList } from '@toco/tools/entities';

@Component({
  selector: 'toco-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.scss']
})
export class RecordListComponent implements OnInit {

  @Input()
  hitList: HitList;

  constructor() { }

  ngOnInit() {
  }

}
