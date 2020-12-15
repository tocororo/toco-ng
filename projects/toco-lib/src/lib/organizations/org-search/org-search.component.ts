import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Organization, SearchResponse, HitList, Aggr } from '../../entities/public-api';
import { FormControl } from '@angular/forms';
import { SearchService, OrganizationServiceNoAuth } from '../../backend/public-api';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'toco-org-search',
  templateUrl: './org-search.component.html',
  styleUrls: ['./org-search.component.scss']
})
export class OrgSearchComponent implements OnInit {

  /**
   * Input `orgCtrl` is a FormControl
   */
  @Input()
  orgCtrl = new FormControl();

  filteredOrg = new  HitList<Organization>();

  params= new HttpParams();

  /**
   * Input `orgFilter` is a dict with `type` and `value` to filter the organizations,
   * @Example { type: 'country' , value: 'Cuba" }
   */
  @Input()
  orgFilter: { type: string, value: string};

  @Input()
  placeholder: string = "Escriba al menos 3 letras";

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

  toSearch=0;
  constructor( private _orgService: OrganizationServiceNoAuth) {  }

  ngOnInit() {
    this.params = this.params.set('size', '10');
    this.params = this.params.set('page', '1');
    if (this.orgFilter != undefined) {
      this.params = this.params.set(this.orgFilter.type, this.orgFilter.value);
    }
    this.orgCtrl.valueChanges
    .subscribe({
      next: (orgValueChanges) => {
        this.toSearch++;
        // this condition check if the param is a `string` an if at least write 3 letters
        if (this.toSearch > 3 && typeof orgValueChanges === 'string') {
          this.toSearch = 0;
          this.params = this.params.set('q', orgValueChanges)
          this._orgService.getOrganizations(this.params).subscribe({
              next: (response) => {
                this.filteredOrg = response.hits
              }
          });
        } else if (typeof orgValueChanges === 'object') {
          this.toSearch = 0;
          this.selectedOrg.emit(orgValueChanges);
          if (this.cleaning){
            this.orgCtrl.setValue('');
          }
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
