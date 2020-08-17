

import { Component, OnInit, ViewChild, Inject, OnChanges } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { merge, of as observableOf } from "rxjs";
import { startWith, switchMap, map, catchError } from "rxjs/operators";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import {
  MetadataService,
  MessageHandler,
  StatusCode,
  ExtraValidators
} from "@toco/tools/core";
import {
  Journal,
  JournalData,
  ISSN,
  JournalVersion,
  Hit,
  Source,
  SourceData
} from "@toco/tools/entities";
import { FilterHttpMap, FiltersService } from "@toco/tools/filters";

import { EnvService } from "@tocoenv/tools/env.service";

import { CatalogService, SearchService, SourceService } from "@toco/tools/backend";
import {
  MatSnackBar,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";
import { JournalViewInfoComponent } from "@toco/tools/sources/journal-view/journal-view-info.component";
import { ScrollStrategyOptions } from "@angular/cdk/overlay";
import {
  FiltersComponent,
  CatalogFilterKeys
} from "../filters/filters.component";
import {
  ActivatedRoute,
  ParamMap,
  Route,
  Router,
  NavigationExtras,
  convertToParamMap,
  Params
} from "@angular/router";
import { ThrowStmt } from "@angular/compiler";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "toco-catalog",
  templateUrl: "./catalog.component.html",
  styleUrls: ["./catalog.component.scss"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class CatalogComponent implements OnInit, OnChanges{
  // journalList: Journal[] = [];
  loading = true;
  private hasErrors = false;
  dataSource = new MatTableDataSource<Journal>();
  columnsToDisplay = ["title", "rnps", "p-issn", "url"];
  expandedElement: Journal;
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  pageEvent: PageEvent;
  params: Array<FilterHttpMap>;
  filtersParams: ParamMap;

  layoutPosition = [
    {
      name: "Derecha",
      layout: "row-reverse",
      aling: "center baseline",
      width: "22"
    },
    {
      name: "Izquierda",
      layout: "row",
      aling: "center baseline",
      width: "22"
    },
    {
      name: "Arriba",
      layout: "column",
      aling: "center center",
      width: "90"
    },
    {
      name: "Abajo",
      layout: "column-reverse",
      aling: "center center",
      width: "90"
    }
  ];
  currentlayout = this.layoutPosition[1];

  searchParams: HttpParams;
  organizationUUID = '';

  constructor(
    private searchService: SearchService,
    private service: CatalogService,
    private sourceService: SourceService,
    private metadata: MetadataService,
    private filterService: FiltersService,
    private env: EnvService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    if (env.extraArgs && env.extraArgs["organizationUUID"]) {
      this.organizationUUID = env.extraArgs["organizationUUID"];
    }
  }

  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  // @ViewChild(FiltersComponent, { static: true }) filters: FiltersComponent;

  ngOnInit() {
    this.metadata.setTitleDescription("Catálogo de Revistas Científicas", "");
    // this.paginator.firstPage();
    // this.paginator.pageSize = 5;
    this.searchParams = new HttpParams();
    this.activatedRoute.queryParamMap.subscribe({
      next: params => {
        this.filtersParams = params;
        // this.searchParams = this.searchParams.set('size', this.pageSize.toString(10));
        // this.searchParams = this.searchParams.set('page', this.pageIndex.toString(10));

        if (params.has("size")) {
          // this.pageSize = Number.parseInt(params.get("size"), 10);
          this.searchParams = this.searchParams.set("size", params.get("size"));
        } else {
          this.searchParams = this.searchParams.set(
            "size",
            this.pageSize.toString(10)
          );
        }
        if (params.has("page")) {
          // this.pageIndex = Number.parseInt(params.get("page"), 10);
          this.searchParams = this.searchParams.set("page", params.get("page"));
        } else {
          this.searchParams = this.searchParams.set(
            "page",
            (this.pageIndex + 1).toString(10)
          );
        }

        if (params.has(CatalogFilterKeys.source_status)) {
          this.searchParams = this.searchParams.set(
            CatalogFilterKeys.source_status,
            params.get(CatalogFilterKeys.source_status)
          );
        }
        if (params.has(CatalogFilterKeys.source_type)) {
          this.searchParams = this.searchParams.set(
            CatalogFilterKeys.source_type,
            params.get(CatalogFilterKeys.source_type)
          );
        }
        // TODO: this is not nice, but..
        let query = '';
        if(this.organizationUUID != ''){
          query = '(relations.uuid:' + this.organizationUUID + ')';
        }

        if (params.has(CatalogFilterKeys.institutions)) {
          query = this.queryAddAndOp(query);
          query = query.concat("(relations.uuid:");
          params
            .get(CatalogFilterKeys.institutions)
            .split(",")
            .forEach((uuid, index, array) => {
              query = query.concat(uuid);
              if (index < array.length - 1){
                query = query.concat(' OR ');
              }
            });
          query = query.concat(")");
        }
        if (params.has(CatalogFilterKeys.subjects)) {
          query = this.queryAddAndOp(query);
          query = query.concat("(relations.uuid:");
          params
            .get(CatalogFilterKeys.subjects)
            .split(",")
            .forEach((uuid, index, array) => {
              query = query.concat(uuid);
              if (index < array.length - 1){
                query = query.concat(' OR ');
              }
            });
          query = query.concat(")");
        }
        if (params.has(CatalogFilterKeys.grupo_mes)) {
          query = this.queryAddAndOp(query);
          query = query.concat("(relations.uuid:");
          params
            .get(CatalogFilterKeys.grupo_mes)
            .split(",")
            .forEach((uuid, index, array) => {
              query = query.concat(uuid);
              if (index < array.length - 1){
                query = query.concat(' OR ');
              }
            });
          query = query.concat(")");
        }
        if (params.has(CatalogFilterKeys.miar_types)) {
          query = this.queryAddAndOp(query);
          query = query.concat("(relations.uuid:");
          params
            .get(CatalogFilterKeys.miar_types)
            .split(",")
            .forEach((uuid, index, array) => {
              query = query.concat(uuid);
              if (index < array.length - 1){
                query = query.concat(' OR ');
              }
            });
          query = query.concat(")");
        }

        this.searchParams = this.searchParams.set("q", query);
        console.log(this.searchParams);

        this.fetchJournalData();

        console.log(params);
      },
      error: e => {},
      complete: () => {}
    });

  }

  private queryAddAndOp(query){
    if (query != ''){
      return query + ' AND ';
    }
    return query;
  }
  ngOnChanges(){
    console.log('change');

  }

  filtersChange(values: Params) {

    this.filtersParams = convertToParamMap(values);

    // console.log(this.filtersParams);
    console.log(values);
    console.log(this.router.url);
    values['page'] = this.pageIndex + 1;
    values['size'] = this.pageSize;

    let navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: values,
      queryParamsHandling: "",
      replaceUrl: true
    };
    this.router.navigate(['.'], navigationExtras);
    // this.paginator.firstPage();
  }

  pageChange(event?: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    const navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: { page: event.pageIndex + 1, size: event.pageSize },
      queryParamsHandling: "merge"
    };

    this.router.navigate(['.'], navigationExtras);
  }



  public fetchJournalData() {
    this.loading = true;
    this.searchService.getSources(this.searchParams).subscribe(
      values => {
        this.length = values.hits.total;

        const arr = new Array<Journal>();
        values.hits.hits.forEach(item => {
          console.log(item)
          const j = new Journal();
          j.deepcopy(item.metadata)
          j.uuid = item.metadata['source_uuid'];
          j.data.deepcopy(item.metadata);
          console.log(j);

          arr.push(j);
        });
        this.dataSource.data = arr;
        console.log(values);
      },
      (err: any) => {
        console.log("error: " + err + ".");
      },
      () => {
        console.log("complete");
        this.loading = false;
      }
    );

  }

  public onScrollUp() {
    // console.log("scrolled up!!");
  }
  public isEmpty() {
    if (this.dataSource.data.length === 0 && this.hasErrors) {
      //this.loading = false;
      return true;
    }
    return false;
  }
  public isLoading() {
    return this.loading;
  }
  public openme(): boolean {
    const a = navigator.userAgent.match(/Android/i);
    const b = navigator.userAgent.match(/BlackBerry/i);
    const apple = navigator.userAgent.match(/iPhone|iPad|iPod/i);
    const o = navigator.userAgent.match(/Opera Mini/i);
    const i = navigator.userAgent.match(/IEMobile/i);
    if (a != null || b != null || apple != null || o != null || i != null) {
      return false;
    }
    return true;
  }

  public changeLayoutPosition(index: number) {
    this.currentlayout = this.layoutPosition[index];
  }

  viewJournal(uuid: string): void {
    this.sourceService.getSourceByUUID(uuid).subscribe(
      (response: Hit<JournalData>) => {
        if (response) {
          let journalVersion = new JournalData();

          journalVersion.deepcopy(response.metadata);
          const dialogRef = this.dialog.open(DialogCatalogJournalInfoDialog, {
            data: {
              journalVersion: journalVersion,
              journalUUID: uuid
            }
          });

          dialogRef.afterClosed();
        } else {
          const m = new MessageHandler(this._snackBar);
          m.showMessage(
            StatusCode.serverError,
            "No fue posible encontrar la Revista"
          );
        }
      },
      error => {
        console.log("error");
      },
      () => {}
    );
  }
}

@Component({
  selector: "dialog-catalog-journal-info",
  template: `
    <mat-dialog-content class="height-auto">
      <toco-journal-view-info
        [journalVersion]="data.journalVersion"
        [journalUUID]="data.journalUUID"
      >
      </toco-journal-view-info>
    </mat-dialog-content>
  `
})
export class DialogCatalogJournalInfoDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogCatalogJournalInfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
