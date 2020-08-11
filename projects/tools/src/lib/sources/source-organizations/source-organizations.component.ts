import { Component, OnInit, Input } from '@angular/core';
import { Source, SourceOrganizationRole } from '@toco/tools/entities';



@Component({
  selector: 'toco-source-organizations',
  templateUrl: './source-organizations.component.html',
  styleUrls: ['./source-organizations.component.scss']
})
export class SourceOrganizationsComponent implements OnInit {

  @Input()
  public source: Source;
  
  public roles = SourceOrganizationRole;
  constructor() { }

  ngOnInit() {
  }

  addOrg(cuban = true) {

  }

}
