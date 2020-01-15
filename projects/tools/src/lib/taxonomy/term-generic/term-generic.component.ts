
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PanelContent, FormFieldType, FormContainerAction } from '@toco/tools/forms';
import { Term } from '@toco/tools/entities';

import { TaxonomyService } from '../taxonomy.service';

export class TermAction implements FormContainerAction
{
    constructor(private service: TaxonomyService, private term: Term, private is_new_term: boolean)
    { }

    doit(data: any): void
    {
        this.term.name = data.name;
        this.term.parent_id = data.parent_id;
        this.term.description = data.description;

        if (this.is_new_term) {
            this.service.newTerm(this.term);
        } else {
            this.service.editTerm(this.term);
        }
    }
}

@Component({
    selector: 'toco-term-generic',
    templateUrl: './term-generic.component.html',
    styleUrls: ['./term-generic.component.scss']
})
export class TermGenericComponent implements OnInit{
    public panels: PanelContent[] = [{
        title: 'Término',
        description: '',
        iconName: '',
        content : []
    }];
    public action: FormContainerAction;
    public actionLabel = 'Adicionar';

    constructor(@Inject(MAT_DIALOG_DATA) private data: any)
    { }

    ngOnInit() {
        if (this.data.service && this.data.terms && this.data.vocab) {

            // if a term is comming, then we are updating it
            if (this.data.term) {
                this.actionLabel = 'Actualizar';
                this.panels[0].title = 'Editar ' + this.data.term.name;
                this.action = new TermAction(this.data.service, this.data.term, false);
            } else {
                this.data.term = new Term();
                this.data.term.vocabulary_id = this.data.vocab.id;
                this.action = new TermAction(this.data.service, this.data.term, true);
                this.actionLabel = 'Adicionar';
                this.panels[0].title = 'Nuevo Término de ' + this.data.vocab.human_name;
            }

            this.panels[0].content = [
                {
                    name: 'name',
                    label: 'Nombre',
                    type: FormFieldType.text,
                    required: true,
                    width: '100%',
                    value: (this.data.term.name) ? this.data.term.name : null,
                },
                {
                    name: 'description',
                    label: 'Descripción',
                    type: FormFieldType.textarea,
                    required: false,
                    width: '100%',
                    value: (this.data.term.description) ? this.data.term.description : null,
                },
                {
                    name: 'parent_id',
                    label: 'Término Padre',
                    type: FormFieldType.term_parent,
                    required: false,
                    extraContent: {
                        terms: this.data.terms,
                        currentTerm: (this.data.term) ? this.data.term : null,
                    },
                    width: '50%'
                },
            ];
        }
    }
}
