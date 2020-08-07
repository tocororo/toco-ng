import { Component, OnInit } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { SearchResponse, Organization } from "@toco/tools/entities";
import { SearchService } from "@toco/tools/backend";
import { PageEvent } from "@angular/material";
import { AggregationsSelection } from "@toco/tools/search/aggregations/aggregations.component";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  // begin Layout stuff
  layoutPosition = [
    {
      name: "Derecha",
      layout: "row-reverse",
      aling: "center baseline",
      width: "22",
    },
    {
      name: "Izquierda",
      layout: "row",
      aling: "center baseline",
      width: "22",
    },
    {
      name: "Arriba",
      layout: "column",
      aling: "center center",
      width: "90",
    },
    {
      name: "Abajo",
      layout: "column-reverse",
      aling: "center center",
      width: "90",
    },
  ];
  currentlayout = this.layoutPosition[0];
  public changeLayoutPosition(index: number) {
    this.currentlayout = this.layoutPosition[index];
  }
  // end Layout stuff

  // begin paginator stuff
  length = 100;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // end paginator stuff

  query = "";
  aggrsSelection: AggregationsSelection = {};

  params: HttpParams;
  sr: SearchResponse<Organization>;
  queryParams;

  public constructor(
    private _searchService: SearchService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe({
      next: (params) => {
        this.params = new HttpParams();
        console.log(params);
        for (let index = 0; index < params.keys.length; index++) {
            const key = params.keys[index];
            console.log(params.get(key));
            switch (key) {
                case 'size':
                    this.pageSize = Number.parseInt(params.get(key));
                    break;
                case 'page':
                    this.pageIndex = Number.parseInt(params.get(key));
                    break;
                case 'q':
                    this.query = params.get(key);
                    break;
                default:
                    if (!this.aggrsSelection.hasOwnProperty(key)){
                        this.aggrsSelection[key] = [];
                    }
                    this.aggrsSelection[key].push(params.get(key));
                    break;
            }
        }
        this.getRecords();
        
      },
      error: (e) => {},
      complete: () => {},
    });
    this.getRecords();
  }

  public pageChange(event?: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getRecords();
  }

  public aggrChange(event?: AggregationsSelection): void {
    console.log(event);
    this.aggrsSelection = event;
    this.getRecords();
  }

  queryChange(event?: string) {
    console.log(event);
    this.query = event;
    this.getRecords();
  }

  private updateParams() {
    this.queryParams = {};
    this.params = new HttpParams();

    this.params = this.params.set("size", this.pageSize.toString(10));
    this.queryParams["size"] = this.pageSize.toString(10);

    this.params = this.params.set("page", (this.pageIndex + 1).toString(10));
    this.queryParams["page"] = this.pageIndex.toString(10);

    this.params = this.params.set("q", this.query);
    this.queryParams["q"] = this.query;

    for (const aggrKey in this.aggrsSelection) {
      this.aggrsSelection[aggrKey].forEach((bucketKey) => {
        this.params = this.params.set(aggrKey, bucketKey);
        this.queryParams[aggrKey] = bucketKey;
      });
    }
  }

  public getRecords(): void {
    this.updateParams();
    console.log(this.params, this.queryParams);
    const navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: this.queryParams,
      queryParamsHandling: "",
    };
    this.router.navigate(["."], navigationExtras);
    this.searchRequest()
  }
  public searchRequest() {
    this._searchService.getOrganizations(this.params).subscribe(
      (response: SearchResponse<Organization>) => {
        console.log(response);
        console.log("RESPONSE", response);

        // this.pageEvent.length = response.hits.total;
        this.sr = response;
      },
      (error: any) => {
        console.log("ERROPR");
      },
      () => {
        console.log("END...");
      }
    );
  }
}
