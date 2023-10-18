/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../core/core.module';
import { IconService } from '../core/services/icon.service';
import { ActionButtonComponent } from './action/button/button-action.component';
import { ComponentFactory_Depr } from './component-factory-depr/component-factory-depr.component';
import { ContainerLabelDiffLangComponent } from './container-specific/label-diff-lang/label-diff-lang-container.component';
import { FormContainerComponent } from './container/form-container/form-container.component';
import { ContainerPanelActionComponent } from './container/panel-action/panel-action-container.component';
import { ContainerPanelComponent } from './container/panel/panel-container.component';
import { ContainerSimpleComponent } from './container/simple/simple-container.component';
import { TableComponent } from './container/table/table.component';
import { CheckboxComponent } from './experimental/checkbox/checkbox.component';
import { DatepickerYearComponent } from './experimental/datepicker-year/datepicker-year.component';
import { DatepickerComponent } from './experimental/datepicker/datepicker.component';
import { SelectFilterComponent } from './experimental/select-filter/select-filter.component';
import { SelectOrgsComponent } from './experimental/select-orgs/select-orgs.component';
import { SelectTreeComponent } from './experimental/select-tree/select-tree.component';
import { SelectComponent } from './experimental/select/select.component';
import { TermParentComponent } from './experimental/term-parent/term-parent.component';
import { TextareaComponent } from './experimental/textarea/textarea.component';
import { VocabularyTreeComponent } from './experimental/vocabulary-tree/vocabulary-tree.component';
import { VocabularyComponent } from './experimental/vocabulary/vocabulary.component';
import { InputBoolComponent } from './input/bool/bool-input.component';
import { InputEmailComponent } from './input/email/email-input.component';
import { InputIdentifierComponent } from './input/identifier/identifier-input.component';
import { InputIssnComponent } from './input/issn/issn-input.component';
import { InputNumberComponent } from './input/number/number-input.component';
import { InputRnpsComponent } from './input/rnps/rnps-input.component';
import { InputSelectComponent } from './input/select/select-input.component';
import { InputTextComponent } from './input/text/text-input.component';
import { InputUrlComponent } from './input/url/url-input.component';










@NgModule({
    declarations: [
        ActionButtonComponent,
        ComponentFactory_Depr,
        FormContainerComponent,
        ContainerPanelComponent,
        ContainerPanelActionComponent,
        ContainerSimpleComponent,
        TableComponent,
        ContainerLabelDiffLangComponent,
        InputBoolComponent,
        InputEmailComponent,
        InputIdentifierComponent,
        InputIssnComponent,
        InputNumberComponent,
        InputRnpsComponent,
        InputSelectComponent,
        InputTextComponent,
        InputUrlComponent,
        VocabularyComponent,
        VocabularyTreeComponent,
        TermParentComponent,
        SelectComponent,
        SelectFilterComponent,
        TextareaComponent,
        SelectTreeComponent,
        DatepickerComponent,
        CheckboxComponent,
        DatepickerYearComponent,
        SelectOrgsComponent
    ],
    imports: [
        ReactiveFormsModule,
        TranslateModule,
        CoreModule
    ],
    exports: [
        ActionButtonComponent,
        ComponentFactory_Depr,
        FormContainerComponent,
        ContainerPanelComponent,
        ContainerPanelActionComponent,
        ContainerSimpleComponent,
        TableComponent,
        ContainerLabelDiffLangComponent,
        InputBoolComponent,
        InputEmailComponent,
        InputIdentifierComponent,
        InputIssnComponent,
        InputNumberComponent,
        InputRnpsComponent,
        InputSelectComponent,
        InputTextComponent,
        InputUrlComponent,
        VocabularyComponent,
        VocabularyTreeComponent,
        TermParentComponent,
        SelectComponent,
        SelectFilterComponent,
        TextareaComponent,
        DatepickerComponent,
        DatepickerYearComponent,
        CheckboxComponent,
        SelectOrgsComponent
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
