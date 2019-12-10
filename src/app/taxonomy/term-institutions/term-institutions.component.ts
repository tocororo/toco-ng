import { Component, OnInit, Inject } from '@angular/core';
import { Panel, FormFieldType, FormContainerAction, FormContainerComponent, FormFieldContent } from '@toco/forms/form-container/form-container.component';
import { TaxonomyService, VocabulariesInmutableNames } from '../taxonomy.service';
import { Term } from '@toco/entities/taxonomy.entity';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


class InstitutionAction implements FormContainerAction {

  doit(data: any): void {
    this.term.name = data.name;
    this.term.parent_id = data.parent_id;
    this.term.description = data.description;
    this.term.data = {
      'identifiers': data.identifiers,
      'email': data.email,
      'address': data.address,
      'website': data.website
    };

    if (this.is_new_term) {
      this.service.newTerm(this.term);
    } else {
      this.service.editTerm(this.term);
    }
  }

  constructor(private service: TaxonomyService, private term: Term, private is_new_term: boolean) {
  }

}



@Component({
  selector: 'toco-term-institutions',
  templateUrl: './term-institutions.component.html',
  styleUrls: ['./term-institutions.component.scss']
})
export class TermInstitutionsComponent implements OnInit {

  loading = true;

  public panels: Panel[] = [{
    title: 'Término',
    description: '',
    iconName: '',
    formField : []
  }];
  formFields: FormFieldContent[];
  actionLabel: string;

  public action: FormContainerAction;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    if (this.data.service) {
      console.log('if (this.data.service) {');
      (this.data.service as TaxonomyService).getVocabulary(VocabulariesInmutableNames.PROVINCES)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          // const m  = new MessageHandler(this._snackBar);
          // m.showMessage(StatusCode.serverError);
          // TODO: Maybe you must set a better return.
          return of(null);
        }),
        finalize(() => this.loading = false)
      )
      .subscribe(response => {
        console.log('.subscribe(response => {');
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

          this.data.term.this.data = (this.data.term.this.data) ? this.data.term.this.data : {};
          this.formFields = [
            {
              name: 'name', placeholder: 'Nombre',
              type: FormFieldType.input,
              required: true,
              value: (this.data.term.name) ? this.data.term.name : null,
              width: '45%'
            },
            {
              name: 'description',
              placeholder: 'Descripción',
              type: FormFieldType.textarea,
              required: false,
              value: (this.data.term.description) ? this.data.term.description : null,
              width: '45%'
            },
            {
              name: 'identifiers',
              placeholder: 'Identificadores',
              type: FormFieldType.textarea,
              required: false,
              value: (this.data.term.this.data.identifiers) ? this.data.term.this.data.identifiers : null,
              width: '30%'
            },
            {
              name: 'email',
              placeholder: 'Email',
              type: FormFieldType.email,
              required: true,
              value: (this.data.term.this.data.email) ? this.data.term.this.data.email : null,
              width: '30%'
            },
            {
              name: 'website',
              placeholder: 'Sitio Web Oficial',
              type: FormFieldType.url,
              required: false,
              value: (this.data.term.this.data.website) ? this.data.term.this.data.website : null,
              width: '30%'
            },
            {
              name: 'address',
              placeholder: 'Dirección',
              type: FormFieldType.textarea,
              required: false,
              value: (this.data.term.this.data.address) ? this.data.term.this.data.address : null,
              width: '100%'
            },
            {
              name: 'parent_id',
              placeholder: 'Jerarquía Institucional (Institución Superior)',
              type: FormFieldType.term_parent,
              required: false,
              input: {
                currentTerm: (this.data.term) ? this.data.term : null,
                terms: (this.data.terms) ? this.data.terms : null
              },
              width: '30%'
            },
          ];
          this.panels[0].formField = this.formFields;
        }
      });
    }
  }

}
