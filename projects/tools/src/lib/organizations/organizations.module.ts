import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgListComponent } from './org-list/org-list.component';
import { OrgViewComponent } from './org-view/org-view.component';
import { SharedModule } from '../shared';



@NgModule({
  declarations: [OrgListComponent, OrgViewComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [OrgListComponent, OrgViewComponent]
})
export class OrganizationsModule { }
