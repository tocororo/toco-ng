
import { NgModule } from '@angular/core';
import { SharedModule } from '@toco/tools/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { IconService } from '@toco/tools/core';

import { FormFieldsComponent } from './form-fields/form-fields.component';
import { FormContainerComponent } from './form-container/form-container.component';
import { FormsService } from './forms.service';

import { TextInputComponent } from './text-input/text-input.component';
import { EmailInputComponent } from './email-input/email-input.component';
import { IssnInputInternalComponent } from './issn-input/issn-input-internal/issn-input-internal.component';
import { IssnInputComponent } from './issn-input/issn-input.component';
import { RnpsInputComponent } from './rnps-input/rnps-input.component';
import { UrlInputComponent } from './url-input/url-input.component';

import { FormFieldVocabularyComponent } from './form-field-vocabulary/form-field-vocabulary.component';
import { FormFieldTermParentComponent } from './form-field-term-parent/form-field-term-parent.component';

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
        FormFieldVocabularyComponent,
        FormFieldTermParentComponent
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
        FormFieldVocabularyComponent,
        FormFieldTermParentComponent
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
