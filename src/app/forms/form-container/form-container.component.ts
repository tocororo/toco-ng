
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PartialObserver, Subscription, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { FormContainerService } from './form-container.service';
import { Response } from '@toco/entities/response';
import { catchError } from 'rxjs/operators';
import { FormSuscriberInterface } from '../forms.service';

/**
 * Represents a form field type.
 */
export enum FormFieldType {
  /** An input control. */
  input = 'input',

  /** A texarea control. */
  textarea = 'textarea',

  /** A datapicker control. */
  datepicker = 'datepicker',

  /** A checkbox control. */
  checkbox = 'checkbox',

  /** A url control. */
  url= 'url',

  /** An email control. */
  email= 'email',
}

/**
 * Represents a form field interface.
 */
export interface FormField {
  /** A form field name. */
  name: string;

  /** A form field placeholder. */
  placeholder: string;

  /** A form field type. */
  type: FormFieldType;

  /** If it is true the form field is required; otherwise, false. */
  required: boolean;

  /** A form field value. */
  value?: string;
}

/**
 * Represents a panel interface.
 * @description Represents the information shown in the expansion control.
 */
export interface Panel {
  title: string;

  description: string;

  // tslint:disable-next-line: indent
  iconName: string;

  formField: FormField[];
}

/**
 * Represents a form container.
 * @description Creates a form to show the panels Array and sends that information to server.
 */
@Component({
  selector: 'toco-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit, OnDestroy {

  public constructor(private formContainerService: FormContainerService) { }
  // TODO: in the future validate the token with a module or something
  /** The autorization token. */
  @Input() public token: string;

  @Input() public panels: Panel[] = [];

  @Input() public endpoint: string;

  @Input() public suscriber: FormSuscriberInterface;

  public step = 0;

  // tslint:disable-next-line: member-ordering
  private sendDataObserver: PartialObserver<Response<any>> = {
    next: (response: Response<any>) => {
      /**
       * TODO: make somthing with response
       */
    },

    error: (err: any) => {
        console.log('The observable got an error notification: ' + err + '.');
    },

    complete: () => {
      console.log('The observable got a complete notification.');
    }
  };

  private sendDataSubscription: Subscription = null;

  public ngOnInit(): void { }

  // tslint:disable-next-line: indent
  public ngOnDestroy(): void {
    this.sendDataUnsubscribe();
  }

  /**
   * Sets a new current panel to expand.
   * @param index The new position
   */
  public setStep(index: number): void {
    this.step = index;
  }

  /**
   * Sets the next panel to expand.
   */
  public nextStep(): void {
    this.step++;
  }

  /**
   * Sets the previous panel to expand.
   */
  public prevStep(): void {
    this.step--;
  }

  /**
   * Sends data to the server. Collects all added information from the component.
   */
  public addData(): void {
    if (this.token) {
      /* Preparing all data. */
      const data = {};

      this.panels.forEach(panel => {
        panel.formField.forEach( form => {
          data[form.name] = form.value;
          form.value = null;
        });
      });
      console.log(data);  /* Test only. */

      this.suscriber.addData(data);

      // this.sendDataUnsubscribe();
      // this.sendDataSubscription = this.formContainerService
      //   .sendPostData(this.endpoint, this.token, data).pipe(
      //     catchError((err: HttpErrorResponse) => {
      //       const message = (err.error instanceof ErrorEvent)
      //         ? err.error.message
      //         : `server returned code '${ err.status }' with body '${ err.error }'`;

      //       /* Transforms error for user consumption. */
      //       console.warn(`${ FormContainerService.name }: 'sendData' operation failed: ${ message }.`);  /* Logs to console instead. */

      //       // TODO: Maybe you must set a better return.
      //       return of(null);
      //     })
      //   )
      //   .subscribe(this.sendDataObserver);
    }
  }

  private sendDataUnsubscribe(): void {
    if (this.sendDataSubscription) {
      this.sendDataSubscription.unsubscribe();
    }
  }
}
