
import { Component, OnInit, Inject, Output, OnDestroy, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of, PartialObserver, Observable } from 'rxjs';
import { catchError, finalize, startWith, map } from 'rxjs/operators';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MessageHandler, StatusCode, Response } from '@toco/tools/core';
import { Vocabulary } from '@toco/tools/entities';
import { FormContainerComponent, PanelContent_Depr, FormFieldType, FormContainerAction, HintValue, HintPosition } from '@toco/tools/forms';

import { TaxonomyService } from '@toco/tools/backend';
import { OAuthStorage } from 'angular-oauth2-oidc';



@Component({
    selector: 'toco-vocabulary-dialog',
    templateUrl: './vocabulary-dialog.html'
})
export class VocabularyDialogComponent implements OnInit {

    public panels: PanelContent_Depr[];
    public formGroup: FormGroup;
    public action: FormContainerAction;
    public actionLabel = 'Aceptar';
    public hasService = false;
    vocab: Vocabulary;
    accept;

    constructor(
        private service: TaxonomyService,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<FormContainerComponent>,
        public _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        if (data.accept) {
            this.accept = data.accept;
            this.hasService = true;
            this.vocab = new Vocabulary();
            if (data.vocab === null) {
                this.vocab.isNew = true;
            } else {
                this.vocab.deepcopy(data.vocab);
                this.actionLabel = 'Actualizar';
            }
        }

    }

    ngOnInit(): void {
        if (this.hasService) {

            this.formGroup = this._formBuilder.group({});
            this.panels = [
                {
                    title: this.vocab.isNew ? 'Nuevo Vocabulario' : 'Editar Vocabulario',
                    description: '',
                    iconName: '',
                    formSection: this.formGroup,
                    formSectionContent: [
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
            this.action = {
                doit: (data: any) => {
                    if (this.formGroup.valid) {
                        this.vocab.name = this.formGroup.value['name'];
                        this.vocab.human_name = this.formGroup.value['human_name'];
                        this.vocab.description = this.formGroup.value['description'];

                        this.accept(this.vocab);

                    } else {
                        const m = new MessageHandler(this._snackBar);
                        m.showMessage(StatusCode.OK, 'El identificador no es válido.')
                    }
                }
              }
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    acceptAction() {


    }
}

@Component({
    selector: 'toco-vocabularies',
    templateUrl: './vocabularies.component.html',
    styleUrls: ['./vocabularies.component.scss']
})
export class VocabulariesComponent implements OnInit, OnDestroy {

    private vocabulariesChangeObserver: PartialObserver<Response<any>> = {
        next: (result: Response<any>) => {
            this.dialog.closeAll();
            this.loadVocabularies();
            const voc = new Vocabulary();
            voc.deepcopy(result.data.vocabulary);
            this.selectVocab(voc);
            const m = new MessageHandler(this._snackBar);
            m.showMessage(StatusCode.OK, result.message);
        },

        error: (err: any) => {
            console.log('error: ' + err + '.');
        },

        complete: () => {
            console.log('complete.');
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
    }

    ngOnDestroy(): void {
    }

    selectVocab(item: Vocabulary) {
        this.currentVocab = item;
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
        this.openVocabDialog(null);
    }

    editVocab(vocab: any) {
        this.openVocabDialog(vocab);
    }

    private openVocabDialog(vocab: Vocabulary) {

        const dialogRef = this.dialog.open(VocabularyDialogComponent, {
            data: {
                vocab: vocab,
                accept: (voc: Vocabulary) => {
                    this.dialog.closeAll();
                    if (voc.isNew){
                        this.service.newVocabulary(voc).pipe().subscribe(this.vocabulariesChangeObserver);
                    } else {
                        this.service.editVocabulary(voc).pipe().subscribe(this.vocabulariesChangeObserver);
                    }
                }
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('dialog closed');
        });
    }

    deleteVocab(vocab: Vocabulary) {
    }

    onSelectionChange(){
        this.selectedVocab.emit(this.currentVocab);
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

    hasPermission(permission: string, id?: string): boolean {

        const userPermission = JSON.parse(this.oautheStorage.getItem('user_permissions'));
        if (!userPermission) {
            return false;
        }
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

                    if (arr.includes(id)) {
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
