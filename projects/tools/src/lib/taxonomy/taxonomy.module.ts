

import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@toco/tools/forms';

import { VocabulariesComponent, VocabularyDialogComponent } from './vocabularies/vocabularies.component';
import { TermsComponent } from './terms/terms.component';
import { TaxonomyComponent } from './taxonomy/taxonomy.component';
import { TermGenericComponent } from './term-generic/term-generic.component';
import { TermInstitutionsComponent } from './term-institutions/term-institutions.component';
import { TermIndexerComponent } from './term-indexer/term-indexer.component';

@NgModule({
    declarations: [
        VocabulariesComponent,
        VocabularyDialogComponent,
        TermsComponent,
        TaxonomyComponent,
        TermGenericComponent,
        TermInstitutionsComponent,
        TermIndexerComponent
    ],

    entryComponents: [
        VocabularyDialogComponent,
        TermGenericComponent,
        TermInstitutionsComponent,
        TermIndexerComponent
    ],

    imports: [
        SharedModule,
        ReactiveFormsModule,
        FormsModule
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
