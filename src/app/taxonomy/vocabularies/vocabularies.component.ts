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




class VocabAction implements FormContainerAction {
  doit(data: any): void {
    this.vocab.name = data.name;
    this.vocab.human_name = data.human_name;
    this.vocab.description = data.description;

    if (this.is_new) {
      this.service.newVocabulary(this.vocab);
    } else {
      this.service.editVocabulary(this.vocab);
    }
  }
  constructor(private service: TaxonomyService, private vocab: Vocabulary, private is_new: boolean) {

  }
}


@Component({
  selector: 'toco-vocabulary-dialog',
  templateUrl: './vocabulary-dialog.html'
})
export class VocabularyDialogComponent implements OnInit {

  public panels: Panel[];
  public action: FormContainerAction;
  public actionLabel = 'Adicionar';

  constructor(
    public dialogRef: MatDialogRef<FormContainerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit(): void {
      if (this.data.service) {
        if (this.data.vocab) {
          this.actionLabel = 'Actualizar';
          this.action = new VocabAction(this.data.service, this.data.vocab, false);
        } else {
          this.data.vocab = new Vocabulary();
          this.actionLabel = 'Adicionar';
          this.action = new VocabAction(this.data.service, this.data.vocab, true);
        }
        this.panels = [{
          title: 'Vocabulario',
          description: '',
          iconName: '',
          formField : [
            {
              name: 'name',
              placeholder: 'Identificador',
              type: FormFieldType.input,
              required: true,
              width: '100%',
              value: this.data.vocab.name,
            },
            {
              name: 'human_name',
              placeholder: 'Nombre',
              type: FormFieldType.input,
              required: true,
              width: '100%',
              value: this.data.vocab.human_name,
            },
            {
              name: 'description',
              placeholder: 'Descripción',
              type: FormFieldType.textarea,
              required: false,
              width: '100%',
              value: this.data.vocab.description,
            },
          ]
        }];
      }
    }

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
      m.showMessage(StatusCode.OK, result.message);
    },

    error: (err: any) => {
        console.log('The observable got an error notification: ' + err + '.');
    },

    complete: () => {
      console.log('The observable got a complete notification.');
    }
  };

  public vocabCtrl = new FormControl();
  public filteredVocabularies: Observable<Vocabulary[]>;
  public currentVocab: Vocabulary = null;
  public vocabularies: Vocabulary[] = [];

  loading = false;

  @Output() emiterShowTerms: EventEmitter<Vocabulary> = new EventEmitter();

  constructor(private service: TaxonomyService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {

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

  selectVocab(item: Vocabulary) {
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
        this.filteredVocabularies = this.vocabCtrl.valueChanges
        .pipe<string, Vocabulary[]>(
          startWith(''),
          map(value => {
            return this.vocabularies.filter(vocab => vocab.name.toLowerCase().includes(value.toLowerCase()));
            })
        );
      } else {
        this.vocabularies = [];
      }
    });
  }

  newVocab(): void {
    const dialogRef = this.dialog.open(VocabularyDialogComponent, {
      data: { vocab: null, service: this.service}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editVocab( vocab: any ) {
    const dialogRef = this.dialog.open(VocabularyDialogComponent, {
      data: { vocab: vocab, service: this.service }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadVocabularies();
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

}


