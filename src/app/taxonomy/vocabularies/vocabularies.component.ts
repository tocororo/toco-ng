import { Component, OnInit, Inject, Output, OnDestroy } from '@angular/core';
import { TaxonomyService } from '../taxonomy.service';
import { Vocabulary, Term } from '@toco/entities/taxonomy.entity';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, startWith, map } from 'rxjs/operators';
import { of, Subscription, PartialObserver, Observable } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormContainerComponent, Panel, FormFieldType, FormContainerAction} from '@toco/forms/form-container/form-container.component';
import { EventEmitter } from '@angular/core';
import { Response } from '@toco/entities/response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageHandler, StatusCode } from '@toco/core/utils/message-handler';
import { FormControl } from '@angular/forms';


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

@Component({
  selector: 'toco-vocabularies',
  templateUrl: './vocabularies.component.html',
  styleUrls: ['./vocabularies.component.scss']
})
export class VocabulariesComponent implements OnInit, OnDestroy {

  private vocabulariesChangeSuscription: Subscription = null;
  private vocabulariesChangeObserver: PartialObserver<Response<any>> = {
    next: (result: Response<any>) => {
      this.dialog.closeAll();
      this.loadVocabularies();
      const m  = new MessageHandler(this._snackBar);
      m.showMessage(StatusCode.OK, result.message)
    },

    error: (err: any) => {
        console.log('The observable got an error notification: ' + err + '.');
    },

    complete: () => {
      console.log('The observable got a complete notification.');
    }
  };

  vocabCtrl = new FormControl();
  filteredVocabularies: Observable<Vocabulary[]>;
  currentVocab: Vocabulary = null
  // tslint:disable-next-line: max-line-length
  vocabularies: Vocabulary[];
  public panels: Panel[] = [{
    title: 'Vocabulario',
    description: '',
    iconName: '',
    formField : [
        {name: 'name', placeholder: 'Nombre', type: FormFieldType.input, required: true, width: '100%' },
        {name: 'description', placeholder: 'Descripción', type: FormFieldType.textarea, required: false, width: '100%' },
    ]
  }];
  loading = false;

  @Output() emiterShowTerms: EventEmitter<Vocabulary> = new EventEmitter();

  constructor(private service: TaxonomyService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {
    this.filteredVocabularies = this.vocabCtrl.valueChanges
      .pipe<string, Vocabulary[]>(
        startWith(''),
        map(value => {
          return this.vocabularies.filter(vocab => vocab.name.toLowerCase().includes(value.toLowerCase()));
          })
      );
  }

  ngOnInit() {
    this.loadVocabularies();
    this.vocabulariesChangeSuscription = this.service.vocabulariesChangeObservable.subscribe(this.vocabulariesChangeObserver);
  }

  ngOnDestroy(): void {
    if (this.vocabulariesChangeSuscription) {
      this.vocabulariesChangeSuscription.unsubscribe();
    }
  }

  selectVocab(item: Vocabulary){
    this.currentVocab = item;
    this.showTerms(item);
  }

  loadVocabularies() {
    this.loading = true;
    this.service.getVocabularies().pipe(
      catchError((err: HttpErrorResponse) => {
        const m  = new MessageHandler(this._snackBar);
        m.showMessage(StatusCode.serverError);
        // TODO: Maybe you must set a better return.
        return of(null);
      }),
      finalize(() => this.loading = false)
    )
    .subscribe(response => {
      if (response) {
        this.vocabularies = response.data.vocabularies;
      } else {
        this.vocabularies = [];
      }
    });
  }

  editVocab( vocab: any ) {
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


