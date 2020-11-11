import { Component, OnInit, Input, Inject } from "@angular/core";

import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { OrganizationServiceNoAuth } from '../../../backend/public-api';
import { MessageHandler, StatusCode, HandlerComponent } from '../../../core/public-api';
import { SourceData, Organization, SourceOrganizationRole, SourceOrganization, OrganizationRelationships, Relationship } from '../../../entities/public-api';


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

  @Input()
  public topMainOrganization: Organization = null;

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

  addOrg(cuban = true, topMain = false) {
    if (topMain && this.topMainOrganization) {
      this.dialog.open(SourceOrganizationSelectTopDialog, {
        width: "500px",
        data: {
          topMainOrganization: this.topMainOrganization,
          selectOrg: (org: Organization, parents: Array<Organization>) => {
            this.addOrgToSource(org, SourceOrganizationRole.MAIN.value);
            parents.forEach((element) => {
              this.addOrgToSource(
                element,
                SourceOrganizationRole.COLABORATOR.value
              );
            });
          },
        },
      });
    } else {
      this.dialog.open(SourceOrganizationSelectDialog, {
        width: "500px",
        data: {
          filter: cuban ? { type: "country", value: "Cuba" } : null,
          canSelectRole: this.topMainOrganization == null,
          selectOrg: (
            org: Organization,
            role,
            parents: Array<Organization>
          ) => {
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

  removeInst(index) {
    const organization = this.sourceData.organizations[index];
    const m = new MessageHandler(null, this.dialog);
    const child = this.childToRemove(organization);
    if (child == null) {
      let parents = this.getOrgToDelete(organization);
      let toDelete = [];
      let msg = "";
      for (let i = 0; i < parents.length; i++) {
        const element = parents[i];
        toDelete.push(this.sourceData.organizations[element]);
        msg += this.sourceData.organizations[element].name + ", ";
      }
      toDelete.push(organization);
      console.log(toDelete);
      if(toDelete.length>0){
        m.showMessage(
          StatusCode.OK,
          msg,
          HandlerComponent.dialog,
          "Se eliminó también: "
        );
      }

      let orgs = [];
      for (let i = 0; i < this.sourceData.organizations.length; i++) {
        if (
          !toDelete.find((o) => o.id == this.sourceData.organizations[i].id)
        ) {
          orgs.push(this.sourceData.organizations[i]);
        }
      }
      console.log(orgs);
      this.sourceData.organizations = orgs;
      // this.sourceData.organizations = this.sourceData.organizations.filter(
      //   (o) => o.id != organization.id
      // );
    } else {
      m.showMessage(
        StatusCode.OK,
        child.name,
        HandlerComponent.dialog,
        "Para eliminar este elemento debe eliminar:"
      );
    }
  }

  private childToRemove(org: Organization) {
    // se puede eliminar si no tiene hijos en el sourceData.organizations
    let result = true;

    if (org.relationships) {
      for (let index = 0; index < org.relationships.length; index++) {
        const element = org.relationships[index];
        if (element.type == OrganizationRelationships.CHILD.value) {
          const childIndex = this.getIndexByPid(element.identifiers[0].value);
          if (childIndex != null) {
            return this.sourceData.organizations[childIndex];
          }
        }
      }
      return null;
    }
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

  private getOrgToDelete(org: Organization) {
    let toDelete = [];
    if (org.relationships) {
      org.relationships.forEach((element) => {
        if (element.type == OrganizationRelationships.PARENT.value) {
          const parentIndex = this.getIndexByPid(element.identifiers[0].value);
          if (parentIndex) {
            toDelete.push(parentIndex);
            toDelete.concat(
              this.getOrgToDelete(this.sourceData.organizations[parentIndex])
            );
          }
        }
      });
    }

    return toDelete;
  }

  private getIndexByPid(pid) {
    for (let index = 0; index < this.sourceData.organizations.length; index++) {
      const element = this.sourceData.organizations[index];
      for (
        let pidindex = 0;
        pidindex < element.identifiers.length;
        pidindex++
      ) {
        const identifier = element.identifiers[pidindex];
        console.log(identifier.value + "==" + pid);
        if (identifier.value == pid) {
          console.log(identifier.value + "==" + pid + "  iguales!!!");
          return index;
        }
      }
    }
    return null;
  }
}

@Component({
  selector: "toco-source-organizations-select-top-main",
  template: `<mat-dialog-content class="height-auto">
    <ng-container *ngIf="toSelect"
      >{{ topMainOrganization.name }}
      <br />
      <mat-form-field>
        <mat-label>Seleccione la Organización Principal: </mat-label>
        <mat-select [(value)]="selected" required>
          <mat-option
            *ngFor="let item of toSelect; let index = index"
            value="{{ index }}"
            >{{ item.label }}</mat-option
          >
        </mat-select>
      </mat-form-field>

      <br />
      <mat-label *ngIf="selected >= 0">{{
        toSelect[selected].label
      }}</mat-label>
      <br />
    </ng-container>
    <br />
    <button mat-raised-button (click)="ok()">OK</button>
  </mat-dialog-content>`,
})
export class SourceOrganizationSelectTopDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SourceOrganizationSelectTopDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orgService: OrganizationServiceNoAuth
  ) {}

  public topMainOrganization: Organization = null;
  public toSelect: Array<Relationship> = null;
  public selected = -1;

  ngOnInit(): void {
    this.topMainOrganization = this.data.topMainOrganization;
    this.toSelect = new Array<Relationship>();
    this.topMainOrganization.relationships.forEach((element) => {
      if (element.type == OrganizationRelationships.CHILD.value) {
        this.toSelect.push(element);
      }
    });
    console.log(this.toSelect);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public ok() {
    // let selected = new SourceOrganization()
    // selected.organization = org;
    // selected.role = SourceOrganizationRole.MAIN.value;
    if (this.selected >= 0) {
      console.log(this.toSelect[this.selected]);
      this.orgService
        .getOrganizationByPID(this.toSelect[this.selected].identifiers[0].value)
        .subscribe({
          next: (response) => {
            this.data.selectOrg(response.metadata, [this.topMainOrganization]);
            this.dialogRef.close();
          },
        });
    }
  }
}

@Component({
  selector: "toco-source-organizations-select-dialog",
  template: `<mat-dialog-content class="height-auto">
    <toco-org-search
      [orgFilter]="data.filter"
      (selectedOrg)="selectedOrg($event)"
      [placeholder]="placeholder"
    >
    </toco-org-search>
    <br />
    <mat-label *ngIf="org">{{ org.name }}</mat-label>
    <br />
    <mat-form-field *ngIf="canSelectRole">
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
  placeholder = "Buscar una organización";
  public canSelectRole = true;

  ngOnInit(): void {
    console.log(this.data);
    this.canSelectRole = this.data.canSelectRole;
    if (this.data.filter) {
      this.placeholder = "Buscar una organización cubana";
    }
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
    if (this.canSelectRole) {
      if (this.role) {
        this.data.selectOrg(this.org, this.role, this.parents);
        this.dialogRef.close();
      }
    } else {
      this.data.selectOrg(
        this.org,
        SourceOrganizationRole.COLABORATOR.value,
        this.parents
      );
      this.dialogRef.close();
    }
  }
}
