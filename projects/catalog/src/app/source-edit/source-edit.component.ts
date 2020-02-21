import { Component, OnInit } from '@angular/core';
import { SourceTypes, Journal, Source } from '@toco/tools/entities';
import { ActivatedRoute } from '@angular/router';
import { MessageHandler, StatusCode } from '@toco/tools/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'toco-source-edit',
  templateUrl: './source-edit.component.html',
  styleUrls: ['./source-edit.component.scss']
})
export class SourceEditComponent implements OnInit {

  public sourceType = SourceTypes;
  public source: Source;
  constructor(
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((response) => {

        // this.loading = false;
        console.log(response);
        

        if (response && response.resolver.status == 'success' && response.resolver.data.source ) {
          let src = response.resolver.data.source;
          switch (src.source_type) {
            case this.sourceType.JOURNAL.value:
              this.source = new Journal();
              this.source.load_from_data(src);
              break;
          
            default:
              this.source = new Source();
              this.source.load_from_data(src);
          }
          // initialize Journal
        }
       else {
          const m = new MessageHandler(this._snackBar);
          m.showMessage(StatusCode.serverError, response.message);
      }

      }
      );
  }

}
