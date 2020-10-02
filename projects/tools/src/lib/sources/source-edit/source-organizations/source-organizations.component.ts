import { Component, OnInit, Input, Inject } from "@angular/core";
import {
  Source,
  SourceOrganizationRole,
  Organization,
  SourceOrganization,
  SourcePersonRole,
  SourceData,
  OrganizationRelationships,
} from "@toco/tools/entities";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { OrganizationServiceNoAuth } from "@toco/tools/backend";
import { FormArray } from '@angular/forms';

@Component({
  selector: "toco-source-organizations",
  templateUrl: "./source-organizations.component.html",
  styleUrls: ["./source-organizations.component.scss"],
})
export class SourceOrganizationsComponent implements OnInit {
  @Input()
  public sourceData: SourceData;

  @Input()
  public editable: boolean = true;

  public roles = SourceOrganizationRole;
  constructor(
    public dialog: MatDialog,
    private orgService: OrganizationServiceNoAuth
  ) {}

  ngOnInit() {
    console.log(this.sourceData.organizations);
    this.sourceData.organizations = this.sourceData.organizations.filter(
      (element) => element && element.role
    );
    console.log(this.sourceData.organizations);

  }

  addOrg(cuban = true) {
    this.dialog.open(SourceOrganizationSelectDialog, {
      width: "500px",
      data: {
        filter: cuban ? { type: "country", value: "Cuba" } : null,
        selectOrg: (org: Organization, role, parents: Array<Organization>) => {
          this.addOrgToSource(org, role);
          parents.forEach((element) => {
            this.addOrgToSource(
              element,
              SourceOrganizationRole.COLABORATOR.value
            );
          });
        },
      },
    });
  }
  private addOrgToSource(org: Organization, role) {
    if (!this.sourceData.organizations.find((o) => o.id == org.id)) {
      let selected = new SourceOrganization();
      selected.deepcopy(org);
      selected.role = role;
      this.sourceData.organizations.push(selected);
      if (SourceOrganizationRole.MAIN.value == role) {
        this.setAsMain(org);
      }
    }
  }
  setAsMain(organization: Organization) {
    this.sourceData.organizations.forEach((element) => {
      if (organization.id == element.id) {
        element.role = SourceOrganizationRole.MAIN.value;
      } else {
        element.role = SourceOrganizationRole.COLABORATOR.value;
      }
    });
  }

  removeInst(index){
    const organization = this.sourceData.organizations[index];
    this.sourceData.organizations = this.sourceData.organizations.filter((o) => o.id != organization.id);
  }

  // removeInst(index) {
  //   let toDelete = []
  //   toDelete.push(index);
  //   toDelete.concat(this.getOrgToDelete(this.sourceData.organizations[index]));
  //   let orgs = [];
  //   for (let i = 0; i < this.sourceData.organizations.length; i++) {
  //     if(!toDelete.find((o) => o == i)){
  //       orgs.push(this.sourceData.organizations[i]);
  //     }
  //   }
  //   this.sourceData.organizations = orgs;
  // }

  private getOrgToDelete(org:Organization){
    let toDelete = []
    if(org.relationships){
      org.relationships.forEach(element => {
        if(element.type == OrganizationRelationships.PARENT.value){
          const parentIndex = this.getIndexByPid(element.identifiers[0].value);
          if(parentIndex){
            toDelete.push(parentIndex)
            toDelete.concat(this.getOrgToDelete(this.sourceData.organizations[parentIndex]))
          }
        }
      });
    }

    return toDelete;
  }

  private getIndexByPid(pid){
    this.sourceData.organizations.forEach((element, index) => {
      element.identifiers.forEach(id => {
        if(id.value == pid){
          return index;
        }
      });
    });
    return null;
  }

}

@Component({
  selector: "toco-source-organizations-select-dialog",
  template: `<mat-dialog-content class="height-auto">
    <toco-org-search
      [orgFilter]="data.filter"
      (selectedOrg)="selectedOrg($event)"
    >
    </toco-org-search>
    <br />
    <mat-label *ngIf="org">{{ org.name }}</mat-label>
    <br />
    <mat-form-field>
      <mat-label>Rol</mat-label>
      <mat-select [(value)]="role" required>
        <mat-option *ngFor="let item of roles" value="{{ item.value }}">{{
          item.label
        }}</mat-option>
      </mat-select>
    </mat-form-field>

    <br />

    <ng-container *ngIf="parents.length > 0">
      <mat-label>Se añadirá también: </mat-label>
      <ng-container *ngFor="let item of parents">
        <br />
        <mat-label>{{ item.name }}</mat-label>
        <br />
      </ng-container>
      <br />
    </ng-container>

    <button mat-raised-button (click)="ok()">OK</button>
  </mat-dialog-content>`,
})
export class SourceOrganizationSelectDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SourceOrganizationSelectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orgService: OrganizationServiceNoAuth
  ) {}

  public roles = [
    { label: "Principal", value: "MAIN" },
    { label: "Colaborador", value: "COLABORATOR" },
  ];
  public role = null;
  public org: Organization;
  public parents: Array<Organization> = new Array<Organization>();

  ngOnInit(): void {
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public selectedOrg(org?: Organization): void {
    console.log(org);
    this.org = org;
    this.addParent(this.org);
  }
  private addParent(child: Organization) {
    child.relationships.forEach((p) => {
      if (p.type == OrganizationRelationships.PARENT.value) {
        if (p.identifiers.length > 0 && p.identifiers[0].value) {
          this.orgService
            .getOrganizationByPID(p.identifiers[0].value)
            .subscribe({
              next: (response) => {
                console.log(response);
                this.parents.push(response.metadata);
                this.addParent(response.metadata);
              },
            });
        }
      }
    });
  }
  public ok() {
    // let selected = new SourceOrganization()
    // selected.organization = org;
    // selected.role = SourceOrganizationRole.MAIN.value;
    if (this.role) {
      console.log(this.org, this.role);
      this.data.selectOrg(this.org, this.role, this.parents);
      this.dialogRef.close();
    }
  }
}
