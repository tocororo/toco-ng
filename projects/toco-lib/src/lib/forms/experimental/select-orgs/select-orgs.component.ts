import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { UntypedFormControl } from "@angular/forms";

import { HttpParams } from "@angular/common/http";
import { MatSelect } from "@angular/material/select";
import { OrganizationServiceNoAuth } from "../../../backend/organization.service";
import { Hit, HitList } from "../../../entities/common";
import { Organization } from "../../../entities/organization.entity";
import { InputControl } from "../../input/input.control";

interface SelectOrgsComponentExtraContent {
  multiple: boolean;
  selectedOrgsIds: [];
  /**
   * Input `orgFilter` is a dict with `type` and `value` to filter the organizations,
   * @Example { type: 'country' , value: 'Cuba" }
   */
  orgFilter: { type: string; value: string };
}

@Directive({
  selector: "[selectOrgDirective]",
})
export class SelectOrgDirective implements AfterViewInit, AfterContentInit  {
  /**
   *  MatSelect instance injected into the directive
   */
  constructor(private select: MatSelect) {

  }

  ngAfterViewInit(){
    this.select.open();
    this.select.focus();
  }
  ngAfterContentInit() {

  }
}

@Component({
  selector: "toco-select-org",
  templateUrl: "./select-orgs.component.html",
  styleUrls: ["./select-orgs.component.scss"],
  host: {
    "[style.minWidth]": "content.minWidth",
    "[style.width]": "content.width",
  },
})
export class SelectOrgsComponent extends InputControl implements OnInit {
  /**
   * Input `orgCtrl` is a FormControl
   */
  @Input()
  orgCtrl = new UntypedFormControl();

  @ViewChild("selectOrs") selectOrs: MatSelect;

  filteredOrg = new HitList<Organization>();

  params = new HttpParams();

  @Input()
  placeholder: string = "Escribe y presiona Enter";

  @Input()
  label: string = "Busque una organización";

  @Input()
  appearance: string = "outline";

  /**
   * Input `cleaning` is a boolen, if true then clean the search
   */
  @Input()
  cleaning: boolean = false;

  @Output()
  selectedOrg: EventEmitter<Organization> = new EventEmitter<Organization>();

  chipsList: Hit<Organization>[] = [];
  extraContent: SelectOrgsComponentExtraContent;
  loading = false;

  toSearch = 0;
  constructor(private _orgService: OrganizationServiceNoAuth) {
    super();
  }
  query = "";

  ngOnInit() {
    this.init("", "", false, false);
    this.extraContent = this.content.extraContent;
    this.content.value = [];

    this.extraContent.selectedOrgsIds.forEach((uuid) => {
      this._orgService.getOrganizationByUUID(uuid).subscribe({
        next: (response) => {
          this.addChips(response);
        },
      });
    });
    this.params = this.params.set("size", "20");
    this.params = this.params.set("page", "1");
    if (this.extraContent.orgFilter != undefined) {
      this.params = this.params.set(
        this.extraContent.orgFilter.type,
        this.extraContent.orgFilter.value
      );
    }
    this.orgCtrl.valueChanges.subscribe({
      next: (orgValueChanges) => {
        // this condition check if the param is a `string`
        if (typeof orgValueChanges === "string") {
          this.query = this.orgCtrl.value;
          if (this.query == "") {
            this.filteredOrg.hits = [];
          }
        } else if (typeof orgValueChanges === "object") {
          this.selectedOrg.emit(orgValueChanges);
          this.orgCtrl.setValue("");
          this.query = "";
          this.filteredOrg.hits = [];
        }
      },
    });
  }

  selectionChange(select) {
    console.log(select);
    this.addChips(select.value);
  }
  riseQuery() {
    if (this.query != "") {
      this.params = this.params.set("q", `name:(${this.query})`);

      this.loading = true;
      this._orgService.getOrganizations(this.params).subscribe({
        next: (response) => {
          this.filteredOrg = response.hits;
          this.loading = false;
        },
        error: () => {},
        complete: () => {
          if(this.selectOrs){
            this.selectOrs.open();
            this.selectOrs.focus();
          }
        },
      });
    }
  }

  /* This function return the organization name
   * @param org the Organization object
   */
  displayFn(org?: Organization): string | undefined {
    return org ? org.name : undefined;
  }

  addChips(value: Hit<Organization>) {
    if (this.extraContent.multiple) {
      if (!this.chipsList.find((x) => x.id == value.id)) {
        this.chipsList.unshift(value);
        this.content.value.unshift(value);
      }
    } else {
      this.chipsList = [value];
      this.content.value = [value];
    }
    this.content.formControl.setValue(this.content.value);
    this.orgCtrl.setValue("");
    this.filteredOrg = new HitList<Organization>();
  }

  removeChip(index: number) {
    let todelete = this.chipsList[index];
    this.content.value = (this.content.value as []).filter(
      (e: Hit<Organization>) => e.id !== todelete.id
    );
    this.content.formControl.setValue(this.content.value);
    this.chipsList.splice(index, 1);
  }
}
