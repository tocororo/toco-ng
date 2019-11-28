import { Component, OnInit, Inject } from '@angular/core';
import { TaxonomyService } from '../taxonomy.service';
import { Vocabulary } from '@toco/entities/taxonomy.entity';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormContainerComponent, Panel, FormFieldType } from '@toco/forms/form-container/form-container.component';

@Component({
  selector: 'toco-vocabularies',
  templateUrl: './vocabularies.component.html',
  styleUrls: ['./vocabularies.component.scss']
})
export class VocabulariesComponent implements OnInit {

  vocabularies: Vocabulary[] = [{name: 'list1', description: 'aaa'}, {name: 'list2', description: 'aaa'}, {name: 'list3', description: 'aaa'}];
  public panels: Panel[] = [{
    title: 'Vocabulario',
    description: '',
    iconName: '',
    formField : [
        {name: 'name', placeholder: 'Nombre', type: FormFieldType.input, required: false },
        {name: 'description', placeholder: 'Descripción', type: FormFieldType.textarea, required: false },
        
    ]
  }];

  constructor(private service: TaxonomyService, public dialog: MatDialog) { }

  ngOnInit() {
    this.service.getVocabularies().pipe(
      catchError((err: HttpErrorResponse) =>
      {
        const message = (err.error instanceof ErrorEvent)
          ? err.error.message
          : `server returned code '${ err.status }' with body '${ err.error }'`;

        /* Transforms error for user consumption. */
        console.warn(`${ TaxonomyService.name }: 'sendData' operation failed: ${ message }.`);  /* Logs to console instead. */

        //TODO: Maybe you must set a better return.
        return of(null);
      })
    )
    .subscribe(response => {
      console.log(response);
      if(response)
        this.vocabularies = response.data.vocabularies;
    });
  }

  showTerms( vname:String ){
    console.log(vname);
  }

  addVocabularyDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      
      data: { panel: this.panels, endpoint: '/vocabulary/new', token: 'token_not_valid'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.ngOnInit();
  }
}





@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './vocabulary-dialog.html'
})
export class DialogComponent{

  constructor(
    public dialogRef: MatDialogRef<FormContainerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
