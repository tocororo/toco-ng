import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource, MatSort } from "@angular/material";
import { SourceService } from "@toco/tools/backend";
import { map } from "rxjs/operators";
import { OAuthStorage } from "angular-oauth2-oidc";

@Component({
  selector: "toco-mysources",
  templateUrl: "./mysources.component.html",
  styleUrls: ["./mysources.component.scss"],
})
export class MysourcesComponent implements OnInit {
  displayedColumns: string[] = ["name", "source_status", "actions"];
  editorDataSource = null;
  managerDataSource = null;

  editorLength = 0;
  managerLength = 0;

  @ViewChild("editorPaginator", { read: MatPaginator, static: true })
  editorPaginator: MatPaginator;
  @ViewChild("editorSort", {read: MatSort, static: true}) editorSort: MatSort;
  
  @ViewChild("managerPaginator", { read: MatPaginator, static: true })
  managerPaginator: MatPaginator;
  @ViewChild("managerSort", {read: MatSort, static: true}) managerSort: MatSort;

  constructor(
    private souceService: SourceService,
    private oauthStorage: OAuthStorage
  ) {}

  loading = true;

  ngOnInit() {
    // this.editorPaginator = new MatPaginator()
    this.souceService.getMySourcesAllRoles().subscribe(
      (response) => {
        console.log(response);
        this.oauthStorage.setItem('mysources', JSON.stringify(response.data));
        
        this.loading = false;
        this.editorDataSource = new MatTableDataSource(
          response.data.sources.editor
        );
        this.managerDataSource = new MatTableDataSource(
          response.data.sources.manager
        );

        this.editorLength = response.data.sources.editor.length;
        this.managerLength = response.data.sources.manager.length;
        this.editorDataSource.paginator = this.editorPaginator;
        this.editorDataSource.sort = this.editorSort;
        this.managerDataSource.paginator = this.managerPaginator;
        this.managerDataSource.sort = this.managerSort;
        console.log(this.managerPaginator, this.managerDataSource);
      },
      (err: any) => {
        console.log("error: " + err + ".");
      },
      () => {
        console.log("complete");
      }
    );
  }

  managerApplyFilter(filterValue: string) {
    this.managerDataSource.filter = filterValue.trim().toLowerCase();
  }


  editorApplyFilter(filterValue: string) {
    this.editorDataSource.filter = filterValue.trim().toLowerCase();
  }

}
