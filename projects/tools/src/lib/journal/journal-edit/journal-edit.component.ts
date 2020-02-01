
import { Component, Input } from '@angular/core';
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
import { ConstantPool } from '@angular/compiler';



@Component({
    selector: 'toco-journal-edit',
    templateUrl: './journal-edit.component.html',
    styleUrls: ['./journal-edit.component.scss']
})
export class JournalEditComponent {
    // TODO: Idea del componente:
    // trabajan internamente con un journal, si recibe null entonces es uno nuevo, si recibe un journal entonces es editar.
    // en ambos casos devuelve el journal editado, o sea el contenido, listo para hacer post en el backend.

    @Input()
    public journal: Journal = null;

    //journal information 
    informationPanel: PanelContent[] = null;
    informationFormGroup: FormGroup;

    //organization
    private organization: Term = null;
    organizationPanel: PanelContent[] = null;
    organizationFormGroup: FormGroup;

    // institution
    private institution: Term = null;
    institutionPanel: PanelContent[] = null;
    institutionFormGroup: FormGroup;

    // entity
    private entity: Term = null;
    entityPanel: PanelContent[] = null;
    // entityFormGroup: FormGroup;


    indexPanel: PanelContent[] = null;
    indexFormGroup: FormGroup;
    indexAction: FormContainerAction;


    stepperStep = 0;

    // actions, if needed
    stepAction1: FormContainerAction;
    stepAction2: FormContainerAction;
    stepAction3: FormContainerAction;
    stepAction4: FormContainerAction;


    public constructor(
        private sourceService: SourceService,
        private catalogService: CatalogService,
        private taxonomyService: TaxonomyService,
        public _snackBar: MatSnackBar,
        private _formBuilder: FormBuilder) { }

    ngOnInit() {

        console.log('journal edit INIT')
        this.resetStepper();

        this.stepperStep = 1;
        this.initStep1();

        // get data for and create institutional panel (second step)
        let termSource: TermSource = null;
        if(this.journal) {
            termSource = this.journal.term_sources.find((termSource: TermSource) => {
                if (termSource.term.vocabulary_id == VocabulariesInmutableNames.INTITUTION) {
                    return termSource;
                }
            });
        }
        if (termSource){
            this.taxonomyService.getTermByUUID(termSource.term.uuid, -3)
            .subscribe(response => {
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
                        this.organization = new Term();
                        this.organization.load_from_data(hierarchy.parent.term);
                        this.institution = new Term();
                        this.institution.load_from_data(hierarchy.term);
                    }
                } else {
                    this.organization = new Term();
                    this.organization.load_from_data(hierarchy.term);
                }
                this.initStep2();
            });
        }

        this.initStep3();

        this.stepAction1 = {
            doit: (data: any) => {
                console.log(data);
                console.log(this.informationFormGroup)
                console.log(this.journal)
                this.stepperStep += 1;
                // this.initInstitutionalPanel();
            }
        }

        this.stepAction2 = {
            doit: (data: any) => {
                console.log(data);
                // console.log(this.institutionalFormGroup)
                this.stepperStep += 1;
            }
        }

        this.stepAction3 = {
            doit: (data: any) => {
                console.log(data);
                this.stepperStep += 1;
            }
        }
    }

    resetStepper() {
        this.stepperStep = 0;
        
        this.informationPanel = null;
        this.informationFormGroup = null;

        this.organization = null;
        this.organizationPanel = null;
        this.institution = null;
        this.institutionPanel = null;
        this.entity = null;
        this.entityPanel = null;
        this.organizationFormGroup = null;

        this.indexPanel = null;
        this.indexFormGroup = null;
    }

    previusStep() {
        this.stepperStep -= 1;
    }


    initStep1(): void {

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

    initStep2(){
        this.organizationFormGroup = this._formBuilder.group({});

        this.organizationPanel = [{
            title: 'Organismo',
            description: 'Organismo al que pertenece la revista (OAC)',
            iconName: '',
            formGroup: this.organizationFormGroup,
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
                        this.taxonomyService.getTermByUUID(uuid, 1)
                        .subscribe(response => {
                            if( !response.data &&
                                !response.data.term_node &&
                                !response.data.term_node.term)
                                return;

                            this.organization = new Term();
                            this.organization.load_from_data(response.data.term_node.term);

                            if (this.institution && 
                                this.organization.id != this.institution.parent_id){

                                this.institution = null;
                                this.institutionPanel = null;
                                this.entity = null;
                                this.entityPanel = null;
                            }
                            this.initInstitutionPanel(response.data.term_node.children, this.organizationFormGroup);
                        });
                    }
                }
            }]
        }];
    }

    initInstitutionPanel(children: TermNode[] = null, formGroup: FormGroup){
        console.log(this.organizationFormGroup)
        // this.institutionFormGroup = this._formBuilder.group({});
        this.institutionPanel = [
        {
            title: 'Institución',
            description: 'Institución a la que pertenece la revista',
            iconName: '',
            formGroup: this.organizationFormGroup,
            content: [
            {
                name: 'institution',
                label: 'Institución',
                type: FormFieldType.select,
                required: true,
                width: '100%',
                value: this.institution ? this.institution.uuid : null,
                extraContent: {
                    getOptions: () => {
                        const opts: SelectOption[] = [];
                        if(children){
                            children.forEach((node: TermNode) => {
                                opts.push({
                                    value: node.term.uuid,
                                    label: node.term.name,
                                });
                            });
                        }
                        else if (this.organization){
                            this.taxonomyService.getTermByUUID(this.organization.uuid, 1)
                            .subscribe(response => {
                                if( !response.data &&
                                    !response.data.term_node &&
                                    !response.data.term_node.children)
                                     return;
                                response.data.term_node.children.forEach((node: TermNode) => {
                                    opts.push({
                                        value: node.term.uuid,
                                        label: node.term.name,
                                    });
                                });
                            });
                        }
                        console.log( opts)
                        return opts;
                    },
                    selectionChange: (uuid) => {
                        if(!uuid) return;
                        this.taxonomyService.getTermByUUID(uuid, 1)
                        .subscribe(response => {
                            if( !response.data &&
                                !response.data.term_node &&
                                !response.data.term_node.term)
                                return;
                            this.institution = new Term();
                            this.institution.load_from_data(response.data.term_node.term);
                            if (this.entity && 
                                this.institution.id != this.entity.parent_id){
                                this.entity = null;
                                this.entityPanel = null;
                            }
                            this.initEntityPanel(response.data.term_node.children);
                        });
                    }
                }
            }]
        }];
    }

    initEntityPanel(children: TermNode[] = null) {
        this.entityPanel = [
        {
            title: 'Entidad',
            description: 'Información sobre la entidad que gestiona la revista.',
            iconName: '',
            formGroup: this.organizationFormGroup,
            content: [
            {
                name: 'entity',
                label: 'Entidad',
                type: FormFieldType.select,
                required: true,
                width: '100%',
                value: this.entity ? this.entity.uuid : 'new',
                extraContent: {
                    getOptions: () => {
                        const opts: SelectOption[] = [
                            {
                                label: 'Nueva Entidad',
                                value: 'new'
                            }
                        ];
                        if(children){
                            children.forEach((node: TermNode) => {
                                opts.push({
                                    value: node.term.uuid,
                                    label: node.term.name,
                                });
                            });
                        }
                        else if (this.institution){
                            this.taxonomyService.getTermByUUID(this.institution.uuid, 1)
                            .subscribe(response => {
                                if( !response.data &&
                                    !response.data.term_node &&
                                    !response.data.term_node.children)
                                        return;
                                response.data.term_node.children.forEach((node: TermNode) => {
                                    opts.push({
                                        value: node.term.uuid,
                                        label: node.term.name,
                                    });
                                });
                            });
                        }
                        return opts;
                    },
                    selectionChange: (uuid) => {
                        if(uuid == 'new'){
                            this.entity = new Term();
                            this.resetEntityDataPanel();
                        }else{
                            this.taxonomyService.getTermByUUID(uuid, 0)
                            .subscribe(response => {
                                if( !response.data &&
                                    !response.data.term_node &&
                                    !response.data.term_node.term)
                                    return;
                                this.entity = new Term();
                                this.entity.load_from_data(response.data.term_node.term);
                                this.resetEntityDataPanel();
                            });
                        }
                    }
                }
            },
            {
                name: 'name',
                label: 'Nombre',
                type: FormFieldType.text,
                required: true,
                value: (this.entity) ? this.entity.name : null,
                width: '100%'
            },
            {
                name: 'description',
                label: 'Descripción',
                type: FormFieldType.textarea,
                required: false,
                value: (this.entity) ? this.entity.description : null,
                width: '100%'
            },
            {
                name: 'email',
                label: 'Email',
                type: FormFieldType.email,
                required: false,
                value: (this.entity) ? this.entity.data['email'] : null,
                width: '45%'
            },
            {
                name: 'website',
                label: 'Sitio Web Oficial',
                type: FormFieldType.url,
                required: false,
                value: (this.entity) ? this.entity.data['website'] : null,
                width: '45%'
            },
            {
                name: 'address',
                label: 'Dirección',
                type: FormFieldType.textarea,
                required: false,
                value: (this.entity) ? this.entity.data['address'] : null,
                width: '100%'
            }]
        }];
    }
    
    resetEntityDataPanel(){
        console.log(this.entityPanel)
        this.resetControl(this.entityPanel[0].formGroup.controls, 'name', this.entity.name);
        this.resetControl(this.entityPanel[0].formGroup.controls, 'description', this.entity.description);
        this.resetControl(this.entityPanel[0].formGroup.controls, 'email', this.entity.data['email']);
        this.resetControl(this.entityPanel[0].formGroup.controls, 'website', this.entity.data['website']);
        this.resetControl(this.entityPanel[0].formGroup.controls, 'address', this.entity.data['address']);

        // if(this.entityPanel[0].formGroup.controls['name'])this.entityPanel[0].formGroup.controls['name'].setValue(this.entity.name);
        // this.entityPanel[0].formGroup.controls['description'].setValue(this.entity.description);
        // this.entityPanel[0].formGroup.controls['email'].setValue(this.entity.data['email'] );
        // this.entityPanel[0].formGroup.controls['website'].setValue(this.entity.data['website'] );
        // this.entityPanel[0].formGroup.controls['address'].setValue(this.entity.data['address'] );
    }
    resetControl(controls, name, value){
        if (controls[name]){
            controls[name].setValue(value);
        }
    } 

    initStep3(){

        this.indexFormGroup = this._formBuilder.group({});
        const indexPanels = [];
        for (let index = 0; index < this.journal.term_sources.length; index++) {
            const element = this.journal.term_sources[index];
            if(element.term.vocabulary_id === VocabulariesInmutableNames.DATABASES){ 
                indexPanels.push({
                    title: element.term.name,
                    description: '',
                    iconName: '',
                    formGroup: this.indexFormGroup,
                    actionLabel: 'Eliminar',
                    action: {doit:(indexPanel) => {this.indexPanel.splice(indexPanel, 1);console.log(this.indexFormGroup)}},
                    content: [
                    {
                        name: 'url_' + element.term_id,
                        label: 'URL de la revista en el índice',
                        type: FormFieldType.url,
                        required: false,
                        startHint: new HintValue(HintPosition.start, 'Escriba una URL válida.'),
                        width: '100%',
                        value: element.data ? element.data['url'] : ''
                    },
                    {
                        name: 'initial_cover_' + element.term_id,
                        label: 'Cobertura inicio',
                        type: FormFieldType.text,
                        required: false,
                        startHint: new HintValue(HintPosition.start, 'Escriba una URL válida.'),
                        width: '45%',
                        value: element.data ? element.data['initial_cover'] : ''
                    },
                    {
                        name: 'end_cover_' + element.term_id,
                        label: 'Cobertura hasta',
                        type: FormFieldType.text,
                        required: false,
                        startHint: new HintValue(HintPosition.start, 'Escriba una URL válida.'),
                        width: '45%',
                        value: element.data ? element.data['end_cover'] : ''
                    }]
                });
            }
        }
        this.indexPanel = indexPanels;
    }

}
