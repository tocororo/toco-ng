/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit, ViewChild, Inject } from "@angular/core";
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

import { MetadataService, MessageHandler, StatusCode, ExtraValidators } from "@toco/tools/core";
import {
  Journal,
  JournalData,
  ISSN,
  JournalVersion
} from "@toco/tools/entities";
import { FilterHttpMap, FiltersService } from "@toco/tools/filters";

import { EnvService } from "@tocoenv/tools/env.service";

import { CatalogService } from "@toco/tools/backend";
import {
  MatSnackBar,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";
import { JournalViewInfoComponent } from "@toco/tools/journal/journal-view/journal-view-info.component";
import { ScrollStrategyOptions } from "@angular/cdk/overlay";
import { FiltersComponent } from "../filters/filters.component";
import { ActivatedRoute, ParamMap, Route, Router, NavigationExtras } from "@angular/router";

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
export class CatalogComponent implements OnInit {
  // journalList: Journal[] = [];
  loading = true;
  private hasErrors = false;
  dataSource = new MatTableDataSource<Journal>();
  columnsToDisplay = ["title", "rnps", "p-issn", "url"];
  expandedElement: Journal;
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  pageEvent: PageEvent;
  params: Array<FilterHttpMap>;
  routeParams: ParamMap;

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
  currentlayout = this.layoutPosition[2];

  constructor(
    private service: CatalogService,
    private metadata: MetadataService,
    private filterService: FiltersService,
    private env: EnvService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    env.organizationUUID;
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  // @ViewChild(FiltersComponent, { static: true }) filters: FiltersComponent;

  ngOnInit() {
    this.metadata.setTitleDescription("Catálogo de Revistas Científicas", "");
    this.paginator.firstPage();
    this.paginator.pageSize = 5;
    
    this.activatedRoute.queryParamMap.subscribe({
      next: params => {
        this.routeParams = params;
        console.log(params);
      },
      error: e => {},
      complete: () => {}
    });

    // this.filters.formGroup.valueChanges.subscribe(
    //   values => {
    //     console.log(values);
    //   },
    //   (err: any) => {
    //     console.log("error: " + err + ".");
    //   },
    //   () => {
    //     console.log("complete");
    //   }
    // );

    try {
      this.fetchJournalData();

      this.filterService.paramsChanged
        .pipe(
          catchError(error => {
            const m = new MessageHandler(this._snackBar);
            m.showMessage(StatusCode.serverError, error.message);
            return observableOf([]);
          })
        )
        .subscribe(params => {
          this.params = params;
          this.fetchJournalData();
        });
    } catch (err) {
      const m = new MessageHandler(this._snackBar);
      m.showMessage(StatusCode.serverError, err.message);
    }
  }

  filtersChange(values){
    console.log(values);

    let navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: values,
      queryParamsHandling: 'merge'
    };
    
    this.router.navigate(['.'], navigationExtras);
    
  }
  // onPaginatorChanged(){
  //   this.filterService.changeFilter('count',this.paginator.pageSize, false);
  //   this.filterService.changeFilter('page',this.paginator.pageIndex);
  // }

  public fetchJournalData() {
    const arr = new Array<Journal>();

    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          //this.loading = true;
          return this.service!.getJournalsPage(
            this.paginator.pageSize,
            this.paginator.pageIndex,
            this.params
          );
        }),
        map(response => {
          // Flip flag to show that loading has finished.
          this.loading = false;

          this.length = response.data.sources.count;

          response.data.sources.data.forEach(item => {
            const j = new Journal();
            j.id = item.id;
            j.uuid = item.uuid;
            const info = new JournalData();
            info.url = item.data != null ? item.data.url : "";
            info.title = item.name;
            info.subtitle = item.subtitle;
            info.shortname = item.shortname;
            const issn = new ISSN();
            issn.e = item.data != null ? item.data.issn.e : "";
            issn.l = item.data != null ? item.data.issn.l : "";
            issn.p = item.data != null ? item.data.issn.p : "";
            info.issn = issn;
            info.rnps = item.data != null ? item.data.rnps : "";
            info.logo = item.data != null ? item.data.logo : "";
            info.purpose = item.purpose;
            info.description = item.data != null ? item.data.description : "";
            j.data = info;
            arr.push(j);
          });
          return arr;
        }),
        catchError(error => {
          this.loading = false;
          this.hasErrors = true;
          const m = new MessageHandler(this._snackBar);
          m.showMessage(StatusCode.serverError, error.message);
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          // this.isRateLimitReached = true;
          return observableOf([]);
        })
      )
      .subscribe(data => (this.dataSource.data = data));
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
    this.service.getSourceByUUID(uuid).subscribe(
      response => {
        console.log(response);
        if (response.status == "success") {
          let journalVersion = new JournalVersion();
          journalVersion.load_from_data(response.data.sources);
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
