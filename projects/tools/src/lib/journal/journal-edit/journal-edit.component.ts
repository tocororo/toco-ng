
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';

import { CatalogService, TaxonomyService, VocabulariesInmutableNames, SourceService } from '@toco/tools/backend';
import { MessageHandler, StatusCode, HandlerComponent } from '@toco/tools/core';
import { Vocabulary, Journal, SourceTypes, Term, TermSource, TermNode } from '@toco/tools/entities';
import { FilterHttpMap } from '@toco/tools/filters';
import { PanelContent, FormFieldType, HintValue, HintPosition, FormContainerAction, IssnValue, SelectOption } from '@toco/tools/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';



@Component({
    selector: 'toco-journal-edit',
    templateUrl: './journal-edit.component.html',
    styleUrls: ['./journal-edit.component.scss']
})
export class JournalEditComponent {
    // TODO: Idea del componente:
    // trabajan internamente con un journal, si recibe null entonces es uno nuevo, si recibe un journal entonces es editar.
    // en ambos casos devuelve el journal editado, o sea el contenido, listo para hacer post en el backend.

    public journal: Journal = null;

    private organization: Term = null;
    private institution: Term = null;
    private entity: Term = null;

    loading = true;


    findPanel: PanelContent[] = [];
    findFormGroup: FormGroup;

    stepperStep = 0;

    informationPanel: PanelContent[] = [];
    informationFormGroup: FormGroup;
    informationAction: FormContainerAction;

    institutionalPanel: PanelContent[] = [];
    institutionalFormGroup: FormGroup;
    institutionalAction: FormContainerAction;

    organizationPanel: PanelContent[] = [];
    organizationFormGroup: FormGroup;

    indexPanel: PanelContent[] = [];
    indexFormGroup: FormGroup;
    indexAction: FormContainerAction;

    public searchJournalAction: FormContainerAction;



    licences: Vocabulary;
    subjects: Vocabulary;

    public constructor(
        private sourceService: SourceService,
        private catalogService: CatalogService,
        private taxonomyService: TaxonomyService,
        public _snackBar: MatSnackBar,
        public dialog: MatDialog,
        private _formBuilder: FormBuilder) { }

    ngOnInit() {

        this.findFormGroup = this._formBuilder.group({});
        this.findPanel = [
            {
                title: 'Inclusión de Revista',
                description: 'Introduzca un identificador de la revista ',
                iconName: '',
                formGroup: this.findFormGroup,
                content: [
                    {
                        name: 'idenfifier',
                        label: 'Identificador',
                        type: FormFieldType.text,
                        required: true,
                        startHint: new HintValue(HintPosition.start, '(ISSN, RNPS, URL, Título)'),
                        width: '100%'
                    }
                ]
            }
        ];

        this.searchJournalAction = {

            doit: (data: any) => {

                const httpParams = [
                    new FilterHttpMap('issn', data.idenfifier),
                    new FilterHttpMap('rnps', data.idenfifier),
                    new FilterHttpMap('url', data.idenfifier),
                    new FilterHttpMap('title', data.idenfifier)
                ];

                this.catalogService.getJournalsPage(10, 0, httpParams)
                    .subscribe(response => {

                        let title = 'No hemos encontrado información';
                        let content = 'Debe completar todos los datos solicitados para incluir la revista.';
                        if (response.data && response.data.sources.count === 1) {
                            console.log(response.data);
                            this.journal = new Journal();
                            this.journal.load_from_data(response.data.sources.data[0]);
                            title = 'Tenemos información sobre la revista';
                            content = 'Compruebe y complete todos los datos solicitados para incluir la revista.';
                        }
                        const m = new MessageHandler(null, this.dialog);
                        m.showMessage(StatusCode.OK, content, HandlerComponent.dialog, title);
                        this.stepperStep += 1;
                        this.initJournalPanels();

                        // get data for and create institution panel
                        const termSource: TermSource = this.journal.term_sources.find((termSource: TermSource) => {
                            if (termSource.term.vocabulary_id == VocabulariesInmutableNames.INTITUTION) {
                                return termSource;
                            }
                        });
                        if (termSource){
                            this.taxonomyService.getTermByUUID(termSource.term.uuid, -3)
                            .subscribe(response => {
                                console.log(response)
                                if(!response.data)
                                    return;
                                const hierarchy: TermNode = response.data.term_node;
                                if (hierarchy.parent) {
                                    if (hierarchy.parent.parent) {
                                        this.organization = new Term();
                                        this.organization.load_from_data(hierarchy.parent.parent.term);
                                        this.institution = new Term();
                                        this.institution.load_from_data(hierarchy.parent.term);
                                        this.entity = new Term();
                                        this.entity.load_from_data(hierarchy.term);
                                        //Se asume que la revista solo se puede relacionar con elementos de hasta el tercer nivel de la jerarquia institucional
                                        if (hierarchy.parent.parent.parent) {
                                            this.organization = null;
                                            this.institution = null;
                                            this.entity = null;
                                        }
                                    } else {
                                        this.organization = hierarchy.parent.term;
                                        this.institution = hierarchy.term;
                                    }
                                } else {
                                    this.organization = hierarchy.term;
                                }
                            });
                        }
                    });
            }
        };

        this.informationAction = {
            doit: (data: any) => {
                console.log(data);
                console.log(this.informationFormGroup)
                console.log(this.journal)
                this.stepperStep += 1;
                this.initInstitutionalPanel();
            }
        }

        this.institutionalAction = {
            doit: (data: any) => {
                console.log(data);
                console.log(this.institutionalFormGroup)
                this.stepperStep += 1;
            }
        }

        this.indexAction = {
            doit: (data: any) => {
                console.log(data);
                console.log(this.indexFormGroup)
                this.stepperStep += 1;
            }
        }
    }

    resetStepper() {
        this.informationPanel = [];
        this.informationFormGroup = undefined;

        this.institutionalPanel = [];
        this.institutionalFormGroup = undefined;

        this.indexPanel = [];
        this.indexFormGroup = undefined;
        this.journal = null;

        this.stepperStep = 0;

    }

    previusStep() {
        this.stepperStep -= 1;
    }


    initJournalPanels(): void {

        // const descriptionControl = new FormControl('', Validators.required)
        // descriptionControl.setValue(this.journal ? this.journal.data.description : '');

        this.informationFormGroup = this._formBuilder.group({
            // 'description': descriptionControl,
            'start_year': new FormControl(''),
            'end_year': new FormControl(''),
        });

        this.informationPanel = [
            {
                title: 'Identificadores',
                description: '',
                iconName: '',
                formGroup: this.informationFormGroup,
                content: [
                    {
                        name: 'title',
                        label: 'Título',
                        type: FormFieldType.text,
                        required: true,
                        width: '100%',
                        value: this.journal ? this.journal.data.title : ''
                    },
                    {
                        name: 'issn_p',
                        label: 'ISSN Impreso',
                        type: FormFieldType.issn,
                        required: false,
                        startHint: new HintValue(HintPosition.start, 'XXXX-XXXX'),
                        width: '30%',
                        value: this.journal ? IssnValue.createIssnValueFromString(this.journal.data.issn.p) : null
                    },
                    {
                        name: 'issn_e',
                        label: 'ISSN Electrónico',
                        type: FormFieldType.issn,
                        required: false,
                        startHint: new HintValue(HintPosition.start, 'XXXX-XXXX'),
                        width: '30%',
                        value: this.journal ? IssnValue.createIssnValueFromString(this.journal.data.issn.e) : null
                    },
                    {
                        name: 'issn_l',
                        label: 'ISSN de Enlace',
                        type: FormFieldType.issn,
                        required: false,
                        startHint: new HintValue(HintPosition.start, 'XXXX-XXXX'),
                        width: '30%',
                        value: this.journal ? IssnValue.createIssnValueFromString(this.journal.data.issn.l) : null
                    },
                    {
                        name: 'rnps',
                        label: 'RNPS',
                        type: FormFieldType.rnps,
                        required: true,
                        startHint: new HintValue(HintPosition.start, 'Escriba un RNPS válido.'),
                        width: '45%',
                        value: this.journal ? this.journal.data.rnps : ''
                    },
                    {
                        name: 'url',
                        label: 'URL',
                        type: FormFieldType.url,
                        required: true,
                        startHint: new HintValue(HintPosition.start, 'Escriba una URL válida.'),
                        width: '45%',
                        value: this.journal ? this.journal.data.url : ''
                    },
                ]
            },
            {
                title: 'Informacion de la Revista',
                description: '',
                iconName: '',
                formGroup: this.informationFormGroup,
                content: [

                    {
                        name: 'subtitle',
                        label: 'Subtítulo',
                        type: FormFieldType.text,
                        required: false,
                        width: '45%',
                        startHint: new HintValue(HintPosition.start, ''),
                        value: this.journal ? this.journal.data.subtitle : ''
                    },
                    {
                        name: 'abbreviation',
                        label: 'Título abreviado',
                        type: FormFieldType.text,
                        required: false,
                        width: '45%',
                        startHint: new HintValue(HintPosition.start, ''),
                        value: this.journal ? this.journal.data.shortname : ''
                    },
                    {
                        name: 'description',
                        label: 'Descripción',
                        type: FormFieldType.textarea,
                        required: true,
                        width: '100%',
                        value: this.journal ? this.journal.data.description : ''
                    },
                    {
                        name: 'email',
                        label: 'Correo Electrónico',
                        type: FormFieldType.email,
                        required: true,
                        startHint: new HintValue(HintPosition.start, 'Escriba un email válido.'),
                        width: '45%',
                        value: this.journal ? this.journal.data.email : ''
                    },
                    {
                        name: 'source_type',
                        label: 'Tipo de Revista',
                        type: FormFieldType.select,
                        required: true,
                        width: '45%',
                        value: this.journal ? this.journal.source_type : '',
                        extraContent: {
                            getOptions: () => {
                                console.log(this.journal.source_type)
                                console.log(SourceTypes[this.journal.source_type])
                                const opts: SelectOption[] = [
                                    {
                                        value: SourceTypes.JOURNAL.value,
                                        label: SourceTypes.JOURNAL.label,
                                    },
                                    {
                                        value: SourceTypes.STUDENT.value,
                                        label: SourceTypes.STUDENT.label,
                                    },
                                    {
                                        value: SourceTypes.POPULARIZATION.value,
                                        label: SourceTypes.POPULARIZATION.label,
                                    },
                                ];
                                return opts;
                            }
                        }
                    },
                    {
                        name: 'start_year',
                        label: 'Año de inicio',
                        type: FormFieldType.datepicker,
                        required: false,
                        width: '30%',
                        value: this.journal ? this.journal.data.start_year : ''
                    },
                    {
                        name: 'end_year',
                        label: 'Año de inicio',
                        type: FormFieldType.datepicker,
                        required: false,
                        width: '30%',
                        value: this.journal ? this.journal.data.end_year : ''
                    },
                    {
                        name: 'frequency',
                        label: 'Frecuencia',
                        type: FormFieldType.text,
                        required: false,
                        width: '30%',
                        value: this.journal ? this.journal.data.frequency : ''
                    },
                    {
                        name: 'subjects',
                        label: 'Materias',
                        type: FormFieldType.vocabulary,
                        required: true,
                        width: '45%',
                        extraContent: {
                            multiple: true,
                            selectedTermsIds: this.journal ? this.journal.term_sources.map(termSource => { return termSource.term_id }) : null,
                            vocab: VocabulariesInmutableNames.SUBJECTS
                        },
                    },
                    {
                        name: 'licence',
                        label: 'Licencia',
                        type: FormFieldType.vocabulary,
                        required: false,
                        width: '45%',
                        extraContent: {
                            multiple: true,
                            selectedTermsIds: this.journal ? this.journal.term_sources.map(termSource => { return termSource.term_id }) : null,
                            vocab: VocabulariesInmutableNames.LICENCES
                        },
                    },
                ]
            },
            {
                title: 'Redes Sociales',
                description: '',
                iconName: '',
                formGroup: this.informationFormGroup,
                content: [
                    {
                        name: 'facebook',
                        label: 'Facebook',
                        type: FormFieldType.url,
                        required: false,
                        value: this.journal ? this.journal.data.socialNetworks.facebook : ''
                    },
                    {
                        name: 'twiter',
                        label: 'Twiter',
                        type: FormFieldType.url,
                        required: false,
                        value: this.journal ? this.journal.data.socialNetworks.twitter : ''
                    },
                    {
                        name: 'linkedin',
                        label: 'LinkedIN',
                        type: FormFieldType.url,
                        required: false,
                        value: this.journal ? this.journal.data.socialNetworks.linkedin : ''
                    },
                ]
            }
        ];

    }

    initOrganizationPanel() {
        this.organizationFormGroup = this._formBuilder.group({});

        this.organizationPanel = [{
            title: 'Organismo',
            description: 'Organismo al que pertenece la revista (OAC)',
            iconName: '',
            formGroup: this.institutionalFormGroup,
            content: [
                {
                    name: 'organization',
                    label: 'Organismo',
                    type: FormFieldType.select,
                    required: true,
                    width: '100%',
                    value: this.organization ? this.organization.uuid : '',
                    extraContent: {
                        getOptions: () => {
                            const opts: SelectOption[] = []
                            this.taxonomyService.getTermsTreeByVocab(VocabulariesInmutableNames.INTITUTION, 0)
                                .subscribe(response => {
                                    response.data.tree.term_node.forEach((node: TermNode) => {
                                        opts.push({
                                            value: node.term.uuid,
                                            label: node.term.name,
                                        });
                                    });
                                });
                            return opts;
                        },
                        selectionChange: (uuid) => {
                            console.log(this.institutionalFormGroup)
                            this.institution = null;
                            this.entity = null;
                            this.institutionalPanel = [
                                this.getCurrentInstitutionPanel(uuid),
                                // this.getCurrentEntityPanel()
                            ];
                            console.log(this.institutionalFormGroup)
                        }
                    }
                }
            ]
        }];


        console.log(this.institutionalFormGroup)
    }

    initInstitutionalPanel(){
        this.institutionalFormGroup = this._formBuilder.group({});
        this.institutionalPanel = [
            {
                title: 'Institución',
                description: 'Institución a la que pertenece la revista',
                iconName: '',
                formGroup: this.institutionalFormGroup,
                content: [
                    {
                        name: 'institution',
                        label: 'Institución',
                        type: FormFieldType.select,
                        required: true,
                        width: '100%',
                        value: this.institution ? this.institution.uuid : '',
                        extraContent: {
                            getOptions: () => {
                                const opts: SelectOption[] = []
                                this.taxonomyService.getTermByUUID(uuid, 1)
                                    .subscribe(response => {
                                        response.data.term_node.children.forEach((node: TermNode) => {
                                            opts.push({
                                                value: node.term.uuid,
                                                label: node.term.name,
                                            });
                                        });
                                    });
                                return opts;
                            }
                        }
                    }
                ]
            },
        ];
    }

    getCurrentInstitutionPanel(uuid) {

    }

    getCurrentEntityPanel() {
        this.institutionalFormGroup.removeControl('name');
        this.institutionalFormGroup.removeControl('description');
        this.institutionalFormGroup.removeControl('email');
        this.institutionalFormGroup.removeControl('website');
        return {
            title: 'Entidad',
            description: 'Información sobre la entidad que gestiona la revista.',
            iconName: '',
            formGroup: this.institutionalFormGroup,
            content: [
                {
                    name: 'name',
                    label: 'Nombre',
                    type: FormFieldType.text,
                    required: true,
                    value: (this.entity) ? this.entity.name : null,
                    width: '45%'
                },
                {
                    name: 'description',
                    label: 'Descripción',
                    type: FormFieldType.textarea,
                    required: false,
                    value: (this.entity) ? this.entity.description : null,
                    width: '45%'
                },
                {
                    name: 'email',
                    label: 'Email',
                    type: FormFieldType.email,
                    required: false,
                    value: (this.entity) ? this.entity.data['email'] : null,
                    width: '30%'
                },
                {
                    name: 'website',
                    label: 'Sitio Web Oficial',
                    type: FormFieldType.url,
                    required: false,
                    value: (this.entity) ? this.entity.data['website'] : null,
                    width: '30%'
                },
                {
                    name: 'address',
                    label: 'Dirección',
                    type: FormFieldType.textarea,
                    required: false,
                    value: (this.entity) ? this.entity.data['address'] : null,
                    width: '100%'
                }
            ]
        }
    }

    initIndexPanel() {

        this.indexFormGroup = this._formBuilder.group({});

        this.indexPanel = [
            {
                title: 'Indizaciones',
                description: 'Seleccione la indizaciones y bases de datos en las que se encuentra la revista.',
                iconName: '',
                formGroup: this.indexFormGroup,
                content: [
                    {
                        name: 'indexes',
                        label: 'Índices',
                        type: FormFieldType.vocabulary,
                        required: false,
                        width: '70%',
                        extraContent: {
                            multiple: false,
                            selectedTermsIds: this.journal ? this.journal.term_sources.map(termSource => { return termSource.term_id }) : null,
                            vocab: VocabulariesInmutableNames.DATABASES
                        },
                    }
                ]
            }
        ];

    }

}
