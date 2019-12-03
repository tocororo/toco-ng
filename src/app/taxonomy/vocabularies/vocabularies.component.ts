import { Component, OnInit, Inject, Output } from '@angular/core';
import { TaxonomyService } from '../taxonomy.service';
import { Vocabulary, Term } from '@toco/entities/taxonomy.entity';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { of, Subscription, PartialObserver } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormContainerComponent, Panel, FormFieldType, FormContainerAction} from '@toco/forms/form-container/form-container.component';
import { EventEmitter } from '@angular/core';
import { Response } from '@toco/entities/response';
import { MatSnackBar } from '@angular/material/snack-bar';


class ActionNew implements FormContainerAction {
  doit(data: any): void {
    console.log(this);
    this.service.newVocabulary(data);
  }
  constructor(private service: TaxonomyService) {

  }
}

class ActionEdit implements FormContainerAction {
  doit(data: any): void {
    console.log(this);
    this.service.editVocabulary(data, this.vocab);
  }
  constructor(private service: TaxonomyService, private vocab: Vocabulary) {

  }
}

@Component({
  selector: 'toco-vocabularies',
  templateUrl: './vocabularies.component.html',
  styleUrls: ['./vocabularies.component.scss']
})
export class VocabulariesComponent implements OnInit {

  private vocabulariesChangeSuscription: Subscription = null;
  private vocabulariesChangeObserver: PartialObserver<Response<any>> = {
    next: (result: Response<any>) => {
      this.dialog.closeAll();
      this.loadVocabularies();
      this._snackBar.open(result.message, null, {
        duration: 2000,
      });
    },

    error: (err: any) => {
        console.log('The observable got an error notification: ' + err + '.');
    },

    complete: () => {
      console.log('The observable got a complete notification.');
    }
  };


  // tslint:disable-next-line: max-line-length
  vocabularies: Vocabulary[];
  public panels: Panel[] = [{
    title: 'Vocabulario',
    description: '',
    iconName: '',
    formField : [
        {name: 'name', placeholder: 'Nombre', type: FormFieldType.input, required: true },
        {name: 'description', placeholder: 'Descripción', type: FormFieldType.textarea, required: false },
    ]
  }];
  loading = false;

  @Output() emiterShowTerms: EventEmitter<Vocabulary> = new EventEmitter();

  constructor(private service: TaxonomyService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadVocabularies();
    this.vocabulariesChangeSuscription = this.service.vocabulariesChangeObservable.subscribe(this.vocabulariesChangeObserver);
  }

  ngOnDestroy(): void {
    if (this.vocabulariesChangeSuscription) {
      this.vocabulariesChangeSuscription.unsubscribe();
    }
  }

  loadVocabularies() {
    this.loading = true;
    this.service.getVocabularies().pipe(
      catchError((err: HttpErrorResponse) => {
        const message = (err.error instanceof ErrorEvent)
          ? err.error.message
          : `server returned code '${ err.status }' with body '${ err.error }'`;

        /* Transforms error for user consumption. */
        console.warn(`${ TaxonomyService.name }: 'sendData' operation failed: ${ message }.`);  /* Logs to console instead. */

        // TODO: Maybe you must set a better return.
        return of(null);
      }),
      finalize(() => this.loading = false)
    )
    .subscribe(response => {
      console.log(response);
      if (response) {
        this.vocabularies = response.data.vocabularies;
      }
    });
  }

  editVocab( vocab: Vocabulary ) {
    this.panels[0].formField[0].value = vocab.name;
    this.panels[0].formField[1].value = vocab.description;
    const dialogRef = this.dialog.open(VocabularyDialogComponent, {
      data: { panel: this.panels, action: new ActionEdit(this.service, vocab)}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteVocab( vocab: Vocabulary ) {
    console.log(vocab);
  }

  showTerms( vocab: Vocabulary ) {
    // console.log(vocab);
    this.service.vocabularyChanged(vocab);
  }

  addVocabularyDialog(): void {
    const dialogRef = this.dialog.open(VocabularyDialogComponent, {
      data: { panel: this.panels, action: new ActionNew(this.service)}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'toco-vocabulary-dialog',
  templateUrl: './vocabulary-dialog.html'
})
export class VocabularyDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<FormContainerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

