

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/public-api';
import { ReactiveFormsModule } from '@angular/forms';

import { TocoFormsModule } from '../forms/public-api';

import { VocabulariesComponent, VocabularyDialogComponent } from './vocabularies/vocabularies.component';
import { TermsComponent } from './terms/terms.component';
import { TaxonomyComponent } from './taxonomy/taxonomy.component';
import { TermGenericComponent } from './term-generic/term-generic.component';
import { TermsViewerComponent } from './terms-viewer/terms-viewer.component';

@NgModule({
    declarations: [
        VocabulariesComponent,
        VocabularyDialogComponent,
        TermsComponent,
        TaxonomyComponent,
        TermGenericComponent,
        TermsViewerComponent
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
        VocabulariesComponent,
        TermsViewerComponent
    ],

    providers: [
    ]
})
export class TaxonomyModule
{ }


