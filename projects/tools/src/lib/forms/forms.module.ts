/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IconService } from '@toco/tools/core';

import { ComponentFactory } from './container/component-factory/component-factory.component';
import { FormContainerComponent } from './container/form-container/form-container.component';
import { ContainerPanelComponent } from './container/panel/panel-container.component';
import { ContainerSimpleComponent } from './container/simple/simple-container.component';
import { ContainerSimpleFaComponent } from './container/simple-fa/simple-container-fa.component';
import { TableComponent } from './container/table/table.component';

import { InputTextComponent } from './input/text/text-input.component';
import { InputEmailComponent } from './input/email/email-input.component';
import { InputIssnInternalComponent } from './input/issn/issn-internal/issn-input-internal.component';
import { InputIssnComponent } from './input/issn/issn-input.component';
import { InputLabelDiffLangComponent } from './input/label-diff-lang/label-diff-lang-input.component';
import { InputRnpsComponent } from './input/rnps/rnps-input.component';
import { InputSelectComponent } from './input/select/select-input.component';
import { InputUrlComponent } from './input/url/url-input.component';
import { InputChipsComponent } from './input/chips/chips-input.component';

import { VocabularyComponent } from './experimental/vocabulary/vocabulary.component';
import { TermParentComponent } from './experimental/term-parent/term-parent.component';
import { SelectComponent } from './experimental/select/select.component';
import { TextareaComponent } from './experimental/textarea/textarea.component';
import { InputIdentifierComponent } from './input/identifier/identifier-input.component';
import { SelectFilterComponent } from './experimental/select-filter/select-filter.component';
import { SelectTreeComponent } from './experimental/select-tree/select-tree.component';

@NgModule({
  declarations: [
    ComponentFactory,
    FormContainerComponent,
    ContainerPanelComponent,
    ContainerSimpleComponent,
    ContainerSimpleFaComponent,
    TableComponent,
    InputTextComponent,
    InputEmailComponent,
    InputIdentifierComponent,
    InputIssnInternalComponent,
    InputIssnComponent,
    InputLabelDiffLangComponent,
    InputRnpsComponent,
    InputSelectComponent,
    InputUrlComponent,
    InputChipsComponent,
    VocabularyComponent,
    TermParentComponent,
    SelectComponent,
    SelectFilterComponent,
    TextareaComponent,
    SelectTreeComponent
  ],

  imports: [
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],

  exports: [
    ComponentFactory,
    FormContainerComponent,
    ContainerPanelComponent,
    ContainerSimpleComponent,
    ContainerSimpleFaComponent,
    TableComponent,
    InputTextComponent,
    InputEmailComponent,
    InputIdentifierComponent,
    InputIssnComponent,
    InputLabelDiffLangComponent,
    InputRnpsComponent,
    InputSelectComponent,
    InputUrlComponent,
    InputChipsComponent,
    VocabularyComponent,
    TermParentComponent,
    SelectComponent,
    SelectFilterComponent, 
    TextareaComponent
  ],

  providers: []
})
export class TocoFormsModule {
  public constructor(private _iconService: IconService) {
    //console.log('Icon Service: registers icons.');

    this._iconService.registerIcons(
      [
        IconService.defaultIconName,  /* It is used by controls that want to have occupied the icon space, but nothing is showed. */
        'outlined-bar_code-24px',
        'outlined-mail-24px'
      ],
      '../assets/svg/icons'
    );
  }
}
