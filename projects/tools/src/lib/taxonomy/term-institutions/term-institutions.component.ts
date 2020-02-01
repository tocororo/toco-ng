
import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MessageHandler, StatusCode } from '@toco/tools/core';
import { Term, TermInstitutionData } from '@toco/tools/entities';
import { PanelContent, FormFieldType, FormContainerAction, FormFieldContent } from '@toco/tools/forms';

import { TaxonomyService, VocabulariesInmutableNames } from '@toco/tools/backend';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

class InstitutionAction implements FormContainerAction {

    constructor(private service: TaxonomyService, private term: Term, private is_new_term: boolean)
    { }

    doit(data: any): void
    {
        this.term.name = data.name;
        this.term.parent_id = data.parent_id;
        this.term.description = data.description;
        this.term.data = new TermInstitutionData();
        (this.term.data as TermInstitutionData).load_from_data({
            'grid': data.grid,
            'email': data.email,
            'address': data.address,
            'website': data.website
        });

        if (this.is_new_term) {
            this.service.newTerm(this.term);
        } else {
            this.service.editTerm(this.term);
        }
    }
}

@Component({
    selector: 'toco-term-institutions',
    templateUrl: './term-institutions.component.html',
    styleUrls: ['./term-institutions.component.scss']
})
export class TermInstitutionsComponent implements OnInit {

    loading = true;

    public panels: PanelContent[];
    public formGroup: FormGroup;
    formFieldsContent: FormFieldContent[];
    actionLabel: string;

    public action: FormContainerAction;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public _snackBar: MatSnackBar,
        private _formBuilder: FormBuilder) {}

    ngOnInit() {

        // TODO: esto esta aqui porque tenemos que acabar de manejar los textarea y datepicker
        this.formGroup = this._formBuilder.group({
          'description': new FormControl(''),
          'address': new FormControl(''),
        });

        this.panels = [{
            title: 'Término',
            description: '',
            iconName: '',
            formGroup: this.formGroup,
            content: []
        }];

        if (this.data.service) {
            console.log('if (this.data.service) {');
            (this.data.service as TaxonomyService).getVocabulary(VocabulariesInmutableNames.PROVINCES)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    const m  = new MessageHandler(this._snackBar);
                    m.showMessage(StatusCode.serverError);
                    // TODO: Maybe you must set a better return.
                    return of(null);
                }),
                finalize(() => this.loading = false)
            )
            .subscribe(response => {
                console.log(this.data.term);
                if (response) {
                    if (this.data.term) {
                        this.action = new InstitutionAction(this.data.service, this.data.term, false);
                        this.actionLabel = 'Actualizar';
                        this.panels[0].title = 'Editar ' + this.data.term.name;
                    } else {
                        let term: Term = new Term();
                        term.vocabulary_id = this.data.vocab.id;
                        this.data['term'] = term;

                        this.action = new InstitutionAction(this.data.service, this.data.term, true);
                        this.actionLabel = 'Adicionar';
                        this.panels[0].title = 'Nuevo Término de ' + this.data.vocab.human_name;
                    }
                    // TODO: usar TermInstitutionData
                    // const instData = new TermInstitutionData();
                    // instData.load_from_data(this.data.term.data);
                    // this.data.term.data = instData;
                    console.log(this.data.term.data);
                    this.data.term.data = (this.data.term.data) ? this.data.term.data : {};

                    this.formFieldsContent = [
                        {
                            name: 'name', label: 'Nombre',
                            type: FormFieldType.text,
                            required: true,
                            value: (this.data.term.name) ? this.data.term.name : null,
                            width: '45%'
                        },
                        {
                            name: 'description',
                            label: 'Descripción',
                            type: FormFieldType.textarea,
                            required: false,
                            value: (this.data.term.description) ? this.data.term.description : null,
                            width: '45%'
                        },
                        {
                            name: 'grid',
                            label: 'Identificador GRID',
                            type: FormFieldType.text,
                            required: false,
                            value: (this.data.term.data.grid) ? this.data.term.data.grid : null,
                            width: '30%'
                        },
                        {
                            name: 'email',
                            label: 'Email',
                            type: FormFieldType.email,
                            required: true,
                            value: (this.data.term.data.email) ? this.data.term.data.email : null,
                            width: '30%'
                        },
                        {
                            name: 'website',
                            label: 'Sitio Web Oficial',
                            type: FormFieldType.url,
                            required: false,
                            value: (this.data.term.data.website) ? this.data.term.data.website : null,
                            width: '30%'
                        },
                        {
                            name: 'address',
                            label: 'Dirección',
                            type: FormFieldType.textarea,
                            required: false,
                            value: (this.data.term.data.address) ? this.data.term.data.address : null,
                            width: '100%'
                        },
                        {
                            name: 'parent_id',
                            label: 'Jerarquía Institucional (Institución Superior)',
                            type: FormFieldType.term_parent,
                            required: false,
                            extraContent: {
                                currentTerm: (this.data.term) ? this.data.term : null,
                                terms: (this.data.terms) ? this.data.terms : null
                            },
                            width: '30%'
                        },
                    ];
                    this.panels[0].content = this.formFieldsContent;
                }
            });
        }
    }
}
