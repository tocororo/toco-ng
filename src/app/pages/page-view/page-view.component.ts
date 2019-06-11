import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MetadataService } from '../../core/metadata.service';

@Component({
  selector: 'toco-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent implements OnInit, OnChanges {
  
  page:  Observable<any>;
  loading = true;
  
  constructor(
    private route: ActivatedRoute,
    private metadata: MetadataService
  ) { }

  ngOnInit() {
    this.route.data
    .subscribe((data: { page: any }) => {
      this.loading = false;
      this.page = data.page;
      this.ngOnChanges();
    });
  }
  ngOnChanges(){
    this.metadata.setTitleMetadataDrupal(this.page);
  }

}
