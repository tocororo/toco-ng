import { Component, OnInit } from '@angular/core';
import { Organization, SearchResponse, HitList } from '@toco/tools/entities';
import { FormControl } from '@angular/forms';
import { SearchService } from '@toco/tools/backend';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'toco-org-search',
  templateUrl: './org-search.component.html',
  styleUrls: ['./org-search.component.scss']
})
export class OrgSearchComponent implements OnInit {

  orgCtrl = new FormControl();
  filteredOrg = new  HitList<Organization>();
  org : Organization[] = [];

  params= new HttpParams();

  constructor( private _orgService: SearchService) {
    this.params = this.params.set('size', '10');
    this.params = this.params.set('page', '1');
    console.log(this.orgCtrl);

  }

  ngOnInit() {
    this.orgCtrl.valueChanges
    .subscribe({
      next: (orgValueChanges) => {
        // this condition check if the param is a `string` an if at least write 3 letters
        if (typeof orgValueChanges === 'string' && orgValueChanges.length >= 3) {
          this.params = this.params.set('q', orgValueChanges)
          this._orgService.getOrganizations(this.params).subscribe({
              next: (response) => {
                console.log(response.hits);
                this.filteredOrg = response.hits
              }
          });
        }

      }

    })
  }
  /* This function return the organization name
   * @param org the Organization object
   */
  displayFn(org?: Organization): string | undefined {
    return org ? org.name : undefined;
  }

}
