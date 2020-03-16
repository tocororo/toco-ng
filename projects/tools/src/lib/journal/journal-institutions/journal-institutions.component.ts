import { Component, OnInit, Input } from '@angular/core';
import { Source, JournalVersion, Term, TermSource, VocabulariesInmutableNames, TermNode } from '@toco/tools/entities';
import { PanelContent } from '@toco/tools/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TaxonomyService } from '@toco/tools/backend';

@Component({
  selector: 'toco-journal-institutions',
  templateUrl: './journal-institutions.component.html',
  styleUrls: ['./journal-institutions.component.scss']
})
export class JournalInstitutionsComponent implements OnInit {

  @Input()
  public source: Source;

  @Input()
  public journalVersion: JournalVersion = null;

  @Input()
  public defaultOrganizationUUID: string = null;

  @Input()
  organizationFormGroup: FormGroup;

  @Input()
  institutions: TermSource[];

  // organization, institution and entity, variables for step 2
  public organization: Term = null;
  organizationPanel: PanelContent[] = null;


  // institution
  public institution: Term = null;
  institutionPanel: PanelContent[] = null;
  institutionFormGroup: FormGroup;
  // entity
  public entity: Term = null;
  entityPanel: PanelContent[] = null;

  public isManageByEntity = true;


  public initOrganizationPanel = false;

  tabs = [];

  constructor(
    private formBuilder: FormBuilder,
    private taxonomyService: TaxonomyService,
  ) { }

  ngOnInit() {
    // get data for and create institutional panel (second step)
    let termSource: TermSource = null;
    if (this.journalVersion) {
      termSource = this.journalVersion.data.term_sources.find(
        (termSource: TermSource) => {
          if (
            termSource.term.vocabulary_id ==
            VocabulariesInmutableNames.INTITUTION
          ) {
            return termSource;
          }
        }
      );
      if (this.journalVersion.organization) {
        this.organization = this.journalVersion.organization;
        this.institution = this.journalVersion.institution;
        this.entity = this.journalVersion.entity;
        this.initTabs();
      }
    }
  }

  //   selected = new FormControl(0);

  initTabs() {
    this.initOrganizationPanel = true;
    this.tabs.push(
      {
        oficial: true,
        organization: this.organization,
        institution: this.institution,
        entity: this.entity
      }
    );
  }

  addTab(selectAfterAdding: boolean) {
    this.tabs.push('New');

    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

}


// const ts = new TermSource();
// // if (this.isManageByEntity) {
// //   // this.fillEntityData();
// //   ts.term = this.entity;
// //   this.journalVersion.entity = this.entity;
// // } else {
// //   ts.term = this.institution;
// //   this.journalVersion.entity = null;
// // }
// ts.term_id = ts.term.id;
// ts.source_id = this.journalVersion.source_id;





// import {Component} from '@angular/core';
// import {FormControl} from '@angular/forms';

// /**
//  * @title Tab group with dynamically changing tabs
//  */
// @Component({
//   selector: 'tab-group-dynamic-example',
//   templateUrl: 'tab-group-dynamic-example.html',
//   styleUrls: ['tab-group-dynamic-example.css'],
// })
// export class TabGroupDynamicExample {


// }




// Ayer no te mande el correo, pero no me dio tiempo de llamarte, así q te escribo.

// Los campos se pueden revisar sobre la maqueta de contenidos, q es el pdf q hemos visto y te mande hace días.
// Hemos hablado ya de ellos y sabes del otro rnps, de más instituciones...

// La Información como título del steper, ponle Datos de la Revista.

// En esencia la idea de las instituciones involucradas, revisa los campos pero creo q sólo faltaba lo del rol de la institución en la revista,
// Que sería algo así:
// Principal o Auspiciador,
// Co-Auspiciador

// No se si crees falte aun otro rol q pueda jugar la institución o llamarlos diferente.


// En Indizacion;
// Debe haber un campo, no recuerdo si está, para el tipo de Indizacion o Clasificación, que son las mismas de Miar, pero veo q tiene además dos más q ahora mismo sólo recuerdo Índices.
// (Desp se puede agregar la q falte)

// Cualquier cosa me timbras, en el receso te llamo.
// Saludos,
// Eduardo
