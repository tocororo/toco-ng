
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'toco-search-query-input',
  templateUrl: './query-input.component.html',
  styleUrls: ['./query-input.component.scss']
})
export class QueryInputComponent implements OnInit {

  @Input()
  query: string = "";

  @Input()
  minWordCount: number = 3;

  @Input()
  appearance: string = 'outline';

  @Input()
  inputColor: string = '';

  @Input()
  buttonColor: string = 'primary';

  @Input()
  showButton = true;

  @Input()
  width: number = 100;

  @Output()
  queryChange = new EventEmitter<string>();

  queryCtrl = new FormControl();

  constructor() { }

  ngOnInit() {
    // this.queryCtrl.valueChanges
    // .subscribe({
    //   next: (queryValueChanges) => {
    //     // this condition check if the param is a `string` an if at least write 3 letters
    //     if (typeof queryValueChanges === 'string' && (queryValueChanges.length >= this.minWordCount)) {
    //       this.queryChange.emit(queryValueChanges);
    //     }
    //   }
    // })
  }

  riseQuery(){
    this.queryChange.emit(this.queryCtrl.value ? this.queryCtrl.value : '');
  }
}
