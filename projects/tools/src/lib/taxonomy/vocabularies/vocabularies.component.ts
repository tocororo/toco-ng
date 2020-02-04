
import { Component, OnInit, Inject, Output, OnDestroy, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Subscription, PartialObserver, Observable } from 'rxjs';
import { catchError, finalize, startWith, map } from 'rxjs/operators';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MessageHandler, StatusCode } from '@toco/tools/core';
import { Vocabulary, Response } from '@toco/tools/entities';
import { FormContainerComponent, PanelContent, FormFieldType, FormContainerAction, HintValue, HintPosition } from '@toco/tools/forms';

import { TaxonomyService } from '@toco/tools/backend';
import { OAuthStorage } from 'angular-oauth2-oidc';



@Component({
    selector: 'toco-vocabulary-dialog',
    templateUrl: './vocabulary-dialog.html'
})
export class VocabularyDialogComponent implements OnInit {

    public panels: PanelContent[];
    public formGroup: FormGroup;
    public action: FormContainerAction;
    public actionLabel = 'Aceptar';
    private hasService = false;
    vocab: Vocabulary;

    constructor(
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<FormContainerComponent>,
        public _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data.vocab === null) {
            this.vocab = new Vocabulary();
            this.vocab.isNew = true;
        } else {
            this.vocab = data.vocab;
        }
        if (data.service) {
            this.hasService = true;
        }
    }

    ngOnInit(): void {
        if (this.hasService) {
            console.log(this.hasService)
            this.formGroup = this._formBuilder.group({});
            this.panels = [
                {
                    title: this.vocab.isNew ? 'Nuevo Vocabulario' : 'Editar Vocabulario',
                    description: '',
                    iconName: '',
                    formGroup: this.formGroup,
                    content: [
                        {
                            name: 'name',
                            label: 'Identificador',
                            type: FormFieldType.identifier,
                            required: true,
                            width: '100%',
                            value: this.vocab.name,
                            startHint: new HintValue(HintPosition.start, 'Un identificador es una secuencia de letras')
                        },
                        {
                            name: 'human_name',
                            label: 'Nombre',
                            type: FormFieldType.text,
                            required: false,
                            width: '100%',
                            value: this.vocab.human_name,
                            startHint: new HintValue(HintPosition.start, '')
                        },
                        {
                            name: 'description',
                            label: 'Descripción',
                            type: FormFieldType.textarea,
                            required: false,
                            width: '100%',
                            value: this.vocab.description,
                            startHint: new HintValue(HintPosition.start, '')
                        }
                    ]
                }
            ];
            console.log(this.panels)
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    acceptAction() {
        if (this.formGroup.valid) {
            console.log('VALID');
            console.log(this.formGroup.value);

            this.vocab.name = this.formGroup.value['name'];
            this.vocab.human_name = this.formGroup.value['human_name'];
            this.vocab.description = this.formGroup.value['description'];

            if (this.vocab.isNew) {
                this.data.service.newVocabulary(this.vocab);
            } else {
                this.data.service.editVocabulary(this.vocab);
            }
        } else {
            console.log('INVALKID');
            const m = new MessageHandler(this._snackBar);
            m.showMessage(StatusCode.OK, 'No puede dejar el Identificador con caracteres vacíos.')
        }

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
            const m = new MessageHandler(this._snackBar);
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

    @Output()
    public selectedVocab: EventEmitter<Vocabulary> = new EventEmitter();

    public currentVocab: Vocabulary = null;

    public vocabularies: Vocabulary[] = [];

    loading = false;

    @Output() emiterShowTerms: EventEmitter<Vocabulary> = new EventEmitter();

    constructor(private service: TaxonomyService,
        private oautheStorage: OAuthStorage,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar) { }

    ngOnInit() {
        this.getAuthenticatedUserPermissions();
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
                const m = new MessageHandler(this._snackBar);
                m.showMessage(StatusCode.serverError, err.message);
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
            data: { vocab: null, service: this.service }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    editVocab(vocab: any) {
        const voc = new Vocabulary();
        voc.load_from_data(vocab);
        console.log(voc)
        const dialogRef = this.dialog.open(VocabularyDialogComponent, {
            data: { vocab: voc, service: this.service }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadVocabularies();
            console.log('The dialog was closed');
        });
    }

    deleteVocab(vocab: Vocabulary) {
        console.log(vocab);
    }

    onSelectionChange(){
        console.log(this.currentVocab);
        this.selectedVocab.emit(this.currentVocab);
    }
    showTerms(vocab: Vocabulary) {
        // console.log(vocab);
        this.service.vocabularyChanged(vocab);
    }

    getAuthenticatedUserPermissions() {
        this.service.getCurrentUserPermissions().pipe(
            catchError(err => {
                const m = new MessageHandler(this._snackBar);
                m.showMessage(StatusCode.serverError, err.message);
                // TODO: Maybe you must set a better return.
                return of(null);
            })
        )
            .subscribe(request => {
                if (request.status == 'success') {
                    var permJson = JSON.stringify(request.data.permissions.actions);
                    this.oautheStorage.setItem('user_permissions', permJson);
                }
            });
    }

    hasPermission(permission: string, id?: number): boolean {

        const userPermission = JSON.parse(this.oautheStorage.getItem('user_permissions'));
        switch (permission) {
            case 'add':
                if (userPermission.taxonomy_full_editor_actions === null)
                    return true;

                return false;

            case 'edit':
                if (userPermission.taxonomy_full_editor_actions === null)
                    return true;

                if (userPermission.vocabulary_editor_actions) {
                    const arr: Array<string> = userPermission.vocabulary_editor_actions;

                    if (arr.includes(id.toString())) {
                        return true
                    }

                }
                else if (userPermission.taxonomy_full_editor_actions) {
                    return true;
                }

                return false;

            default:
                return false;
        }
    }
}
