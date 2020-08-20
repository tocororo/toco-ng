import { Component, OnInit, Input, OnChanges } from "@angular/core";

import { ContainerContent, ContainerControl } from "../container.control";

export interface FormContainerAction {
  doit(data: any): void;
}

/**
 * An interface that represents the content of an expansion control.
 */
export interface PanelContent_Depr extends ContainerContent {
  /**
   * Returns the panel's title.
   */
  title: string;

  /**
   * Returns the panel's description.
   */
  description: string;

  /**
   * Returns the panel's icon name.
   */
  iconName: string;

  /**
   * Returns the action and action labels for each panel.
   */
  action?: FormContainerAction;
  actionLabel?: string;

  /**
   * Returns true is the panel is open; otherwise, false.
   */
  open?: boolean;
}

/**
 * Represents a control that contains a list of panels and sends that information to the server.
 */
@Component({
  selector: "toco-form-container",
  templateUrl: "./form-container.component.html",
  styleUrls: ["./form-container.component.scss"],
})
export class FormContainerComponent extends ContainerControl
  implements OnInit, OnChanges {
  /**
   * Input field that contains the content of this class. The array of panels to show.
   */
  @Input()
  public panelsContent: PanelContent_Depr[];

  @Input()
  public useAccordion: boolean = true;

  @Input()
  public useContainer: boolean = true;

  @Input()
  public actionButtonIsStepperNext: boolean = false;

  @Input()
  public action: FormContainerAction;

  /**
   * An string that represents the action label of the last panel.
   */
  @Input()
  public actionLabel: string;

  @Input()
  public deleteValuesAfterAction: boolean = true;

  /**
   * The current expanded panel position.
   */
  public step: number;

  public constructor() {
    super();

    /* By default, the first panel is expanded. */
    this.step = 0;
  }

  private setFormGroupToPanels(): void {
    this.panelsContent.forEach((panel) => {
      panel.formSection = panel.formSection;
    });
  }

  public ngOnInit(): void {
    console.log("on INIT call", this.panelsContent);

    /* Sets the default values. */
    if (this.panelsContent.length > 0) {
      this.content = {
        formSection: this.panelsContent[0].formSection,
        name: "FormContainerComponent",
        label: "FormContainerComponent_Label",
        type: undefined,
        value: "FormContainerComponent",
        //            'width': '100%',
        ariaLabel: "FormContainerComponent",
        formSectionContent: this.panelsContent[0].formSectionContent,
      };
    }

    this.init(undefined, false, false);

    // if actionLabel is undefined, means that there is no actionLabel, the user must decide!!!
    // if (this.actionLabel == undefined) this.actionLabel = 'Adicionar';
    this.setFormGroupToPanels();
  }

  public ngOnChanges(): void {
    console.log("on CHANGES call", this.panelsContent);
    this.ngOnInit();

    // this.init(this.content.label, false, false);
    // this.setFormGroupToPanels();
  }

  /**
   * Sets the new expanded panel position.
   * @param newStep The new position.
   */
  public setStep(newStep: number): void {
    this.step = newStep;
  }

  /**
   * Sets the expanded panel position to the next position.
   */
  public nextStep(): void {
    this.step++;
  }

  /**
   * Sets the expanded panel position to the previous position.
   */
  public prevStep(): void {
    this.step--;
  }

  /**
   * Sends data to the server. Collects all added information from the component.
   * Creates a JSON object based on `form.name` and `form.value` fields.
   */
  public doAction(): void {
    //TODO: poner este method in `ContainerControl`.

    /* Prepares all data. */

    const data = {};

    this.panelsContent.forEach((panel) => {
      panel.formSectionContent.forEach((controlContent) => {
        data[controlContent.name] = controlContent.value;
      });
    });

    if (this.action) {
      this.action.doit(data);
    }

    if (this.deleteValuesAfterAction) {
      this.panelsContent.forEach((panel) => {
        panel.formSectionContent.forEach((controlContent) => {
          controlContent.value = undefined;
        });
      });
    }
  }
}
