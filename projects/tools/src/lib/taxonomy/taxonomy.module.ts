

import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { TocoFormsModule } from '@toco/tools/forms';

import { VocabulariesComponent, VocabularyDialogComponent } from './vocabularies/vocabularies.component';
import { TermsComponent } from './terms/terms.component';
import { TaxonomyComponent } from './taxonomy/taxonomy.component';
import { TermGenericComponent } from './term-generic/term-generic.component';

@NgModule({
    declarations: [
        VocabulariesComponent,
        VocabularyDialogComponent,
        TermsComponent,
        TaxonomyComponent,
        TermGenericComponent
    ],

    entryComponents: [
        VocabularyDialogComponent,
        TermGenericComponent
    ],

    imports: [
        SharedModule,
        ReactiveFormsModule,
        TocoFormsModule
    ],

    exports: [
        TaxonomyComponent,
        VocabulariesComponent
    ],

    providers: [
    ]
})
export class TaxonomyModule
{ }


