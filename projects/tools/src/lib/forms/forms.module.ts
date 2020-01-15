
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { IconService } from '@toco/tools/core';

import { FormFieldsComponent } from './container/form-fields/form-fields.component';
import { FormContainerComponent } from './container/form-container/form-container.component';
import { FormsService } from './forms.service';

import { TextInputComponent } from './input/text-input/text-input.component';
import { EmailInputComponent } from './input/email-input/email-input.component';
import { IssnInputInternalComponent } from './input/issn-input/issn-input-internal/issn-input-internal.component';
import { IssnInputComponent } from './input/issn-input/issn-input.component';
import { RnpsInputComponent } from './input/rnps-input/rnps-input.component';
import { UrlInputComponent } from './input/url-input/url-input.component';

import { VocabularyComponent } from './experimental/vocabulary/vocabulary.component';
import { TermParentComponent } from './experimental/term-parent/term-parent.component';

@NgModule({
    declarations: [
        FormFieldsComponent,
        FormContainerComponent,
		TextInputComponent,
		EmailInputComponent,
		IssnInputInternalComponent,
		IssnInputComponent,
		RnpsInputComponent,
		UrlInputComponent,
        VocabularyComponent,
        TermParentComponent
	],

	imports: [
		SharedModule,
		ReactiveFormsModule
	],
	
	exports: [
        FormFieldsComponent,
        FormContainerComponent,
		TextInputComponent,
		EmailInputComponent,
		IssnInputComponent,
		RnpsInputComponent,
		UrlInputComponent,
        VocabularyComponent,
        TermParentComponent
	],

    providers: [
        FormsService
    ]
})
export class FormsModule
{
	public constructor(private _iconService: IconService)
	{
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
