import { Component, OnInit, Input } from '@angular/core';
import { Organization } from '@toco/tools/entities/organization.entity';

@Component({
  selector: 'lib-org-view',
  templateUrl: './org-view.component.html',
  styleUrls: ['./org-view.component.scss']
})
export class OrgViewComponent implements OnInit {

  @Input()
  public org: Organization;

  @Input()
  public fullView = false;

  constructor() { }

  ngOnInit() {

  }

}
