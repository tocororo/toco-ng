import { Component } from '@angular/core';
import { VocabulariesInmutableNames } from '@toco/tools/backend';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'search';
  institutionsId = VocabulariesInmutableNames.INTITUTION;
  selectTerm = '';


}
