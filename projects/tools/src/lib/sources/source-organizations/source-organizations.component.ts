import { Component, OnInit, Input, Inject } from "@angular/core";
import {
  Source,
  SourceOrganizationRole,
  Organization,
  SourceOrganization,
  SourcePersonRole,
} from "@toco/tools/entities";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";

@Component({
  selector: "toco-source-organizations",
  templateUrl: "./source-organizations.component.html",
  styleUrls: ["./source-organizations.component.scss"],
})
export class SourceOrganizationsComponent implements OnInit {
  @Input()
  public source: Source;

  public roles = SourceOrganizationRole;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  addOrg(cuban = true) {
    this.dialog.open(SourceOrganizationSelectDialog, {
      data: {
        filter: cuban ? { type: "country", value: "Cuba" } : null,
        selectOrg: (org: Organization) => {
          if (
            !this.source.organizations.find((o) => o.organization.id == org.id)
          ) {
            let selected = new SourceOrganization();
            selected.organization = org;
            selected.role = cuban
              ? SourceOrganizationRole.MAIN.value
              : SourceOrganizationRole.COLABORATOR.value;
            this.source.organizations.push(selected);
          }
        },
      },
    });
  }

  setAsMain(organization: Organization){
    this.source.organizations.forEach(element => {
      if(organization.id == element.organization.id){
        element.role = SourceOrganizationRole.MAIN.value
      } else {
        element.role = SourceOrganizationRole.COLABORATOR.value;
      }
    });
  }

  removeInst(organization: Organization){
    this.source.organizations.indexOf()
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
  </mat-dialog-content>`,
})
export class SourceOrganizationSelectDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SourceOrganizationSelectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public selectedOrg(org?: Organization): void {
    console.log(org);

    // let selected = new SourceOrganization()
    // selected.organization = org;
    // selected.role = SourceOrganizationRole.MAIN.value;
    this.data.selectOrg(org);
    this.dialogRef.close();
  }
}
