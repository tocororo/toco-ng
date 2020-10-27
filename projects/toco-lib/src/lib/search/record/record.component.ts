import { Component, OnInit, Input} from '@angular/core';
import { Record } from '../../entities/public-api';

@Component({
  selector: 'toco-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  @Input()
  public record: Record;
  constructor() { }

  ngOnInit() {

  }

}
