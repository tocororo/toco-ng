
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * Represents a component used to search a query. 
 * 
 * In order to use this component with the correct i18n, you must include 
 * (in your i18n translate files that are in the folder `assets\i18n`) 
 * a translation key of name "TOCO_SEARCH_QUERY_INPUT" that contains 
 * an object as value with the translation needed by this component. 
 * 
 * In the case of `es.json` file, you must include the following translation key: 
    "TOCO_SEARCH_QUERY_INPUT": {
        "INPUT_SEARCH_LABEL": "Buscar",
        "INPUT_SEARCH_PLACEHOLDER": "Escriba un criterio y presione Enter",
        "BUTTON_SEARCH": "Buscar"
    }
 * 
 * In the case of `en.json` file, you must include the following translation key: 
    "TOCO_SEARCH_QUERY_INPUT": {
        "INPUT_SEARCH_LABEL": "Search",
        "INPUT_SEARCH_PLACEHOLDER": "Write a phrase and press Enter",
        "BUTTON_SEARCH": "Search"
    }
 * 
 * If you have another language, then you have another `*.json` file, 
 * and you must include the "TOCO_SEARCH_QUERY_INPUT" translation key with the correct translation values. 
 */
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
