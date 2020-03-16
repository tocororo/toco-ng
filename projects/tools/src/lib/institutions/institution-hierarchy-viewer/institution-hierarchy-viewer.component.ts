import { Component, OnInit, Input } from "@angular/core";
import { Term, TermNode } from "@toco/tools/entities";
import { TaxonomyService } from "@toco/tools/backend";

@Component({
  selector: "toco-institution-hierarchy-viewer",
  templateUrl: "./institution-hierarchy-viewer.component.html",
  styleUrls: ["./institution-hierarchy-viewer.component.scss"]
})
export class InstitutionHierarchyViewerComponent implements OnInit {
  @Input()
  public term: Term = null;

  @Input()
  public node: TermNode = null;

  constructor(private taxonomyService: TaxonomyService) {}

  ngOnInit() {
    if (!this.node) {
      if (this.term.isNew) {
        if (this.term.parent_id && this.term.parent_id != "") {
          this.taxonomyService.getTermByID(this.term.parent_id, -3).subscribe(
            response => {
              if (!response.data) {
                return;
              }
              this.node = response.data.term_node;
            },
            (error: any) => {},
            () => {}
          );
        }
      } else {
        this.taxonomyService.getTermByUUID(this.term.uuid, -3).subscribe(
          response => {
            if (!response.data) {
              return;
            }
            this.node = response.data.term_node;
          },
          (error: any) => {},
          () => {}
        );
      }
    }
  }
}
