
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { IconService } from '@toco/tools/core';

import { FormContainerComponent } from './container/form-container/form-container.component';
import { FormFieldsComponent } from './container/form-fields/form-fields.component';
import { FormsService } from './forms.service';

import { InputTextComponent } from './input/text/text-input.component';
import { InputEmailComponent } from './input/email/email-input.component';
import { InputIssnInternalComponent } from './input/issn/issn-internal/issn-input-internal.component';
import { InputIssnComponent } from './input/issn/issn-input.component';
import { InputRnpsComponent } from './input/rnps/rnps-input.component';
import { InputUrlComponent } from './input/url/url-input.component';

import { VocabularyComponent } from './experimental/vocabulary/vocabulary.component';
import { TermParentComponent } from './experimental/term-parent/term-parent.component';

@NgModule({
  declarations: [
    FormContainerComponent,
    FormFieldsComponent,
    InputTextComponent,
    InputEmailComponent,
    InputIssnInternalComponent,
    InputIssnComponent,
    InputRnpsComponent,
    InputUrlComponent,
    VocabularyComponent,
    TermParentComponent
  ],

  imports: [
    SharedModule,
    ReactiveFormsModule
  ],

  exports: [
    FormContainerComponent,
    FormFieldsComponent,
    InputTextComponent,
    InputEmailComponent,
    InputIssnComponent,
    InputRnpsComponent,
    InputUrlComponent,
    VocabularyComponent,
    TermParentComponent
  ],

  providers: [
    FormsService
  ]
})
export class FormsModule {
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
