
import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MetadataService } from '@toco/tools/core';
import { Journal } from '@toco/tools/entities';

@Component({
    selector: 'toco-journal-view',
    templateUrl: './journal-view.component.html',
    styleUrls: ['./journal-view.component.scss']
})
export class JournalViewComponent implements OnInit, OnChanges {

    constructor(private route: ActivatedRoute, private metadata: MetadataService)
    { }

    journal: Journal;

    loading = true;

    ngOnInit() {
        this.route.data
        .subscribe((response) => {
            this.loading = false;
            console.log(response)

            this.journal = new Journal();
            this.journal.load_from_data(response.journal.data.source);
            this.metadata.setTitleDescription('Revista Científica ' + this.journal.data.title, this.journal.data.description);

          });
    }

    ngOnChanges() {
        // this.metadata.setTitleDescription(this.journal.title, this.journal.description);
    }
}
