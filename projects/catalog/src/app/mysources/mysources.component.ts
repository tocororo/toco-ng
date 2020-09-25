import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SourceService } from '@toco/tools/backend';
import { map } from 'rxjs/operators';

@Component({
  selector: 'toco-mysources',
  templateUrl: './mysources.component.html',
  styleUrls: ['./mysources.component.scss']
})
export class MysourcesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'source_status', 'actions'];
  editorDataSource = null;
  managerDataSource = null;

  editorLength = 0;
  managerLength = 0;

  @ViewChild('editorPaginator', { read: MatPaginator, static: true }) editorPaginator: MatPaginator;
  @ViewChild('managerPaginator', { read: MatPaginator, static: true }) managerPaginator: MatPaginator;
  constructor(private souceService: SourceService) { }
  loading = true;
  ngOnInit() {

    // this.editorPaginator = new MatPaginator()
    this.souceService.getMySourcesAllRoles().subscribe(
      (response) => {
        console.log(response);
        this.loading = false;
        this.editorDataSource = new MatTableDataSource(response.data.sources.editor);
        this.managerDataSource = new MatTableDataSource(response.data.sources.manager);

        this.editorLength = response.data.sources.editor.length;
        this.managerLength = response.data.sources.manager.length;
        this.editorDataSource.paginator = this.editorPaginator;
        this.managerDataSource.paginator = this.managerPaginator;
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

}
