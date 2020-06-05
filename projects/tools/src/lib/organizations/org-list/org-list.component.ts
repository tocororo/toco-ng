import { Component, OnInit, Input } from '@angular/core';
import { HitList } from '@toco/tools/entities';
import { Organization } from '@toco/tools/entities/organization.entity';

@Component({
  selector: 'lib-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.scss']
})
export class OrgListComponent implements OnInit {

  @Input()
  hitList: HitList<Organization>;

  constructor() { }

  ngOnInit() {
    console.log(this.hitList);
  }


}
