import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import {
  JournalVersion,
  Journal,
  TermSource,
  VocabulariesInmutableNames
} from "@toco/tools/entities";
import { MatSnackBar } from "@angular/material";
import { MessageHandler, StatusCode } from "@toco/tools/core";
import { JournalDataType } from "./journal-view.component";

@Component({
  selector: "toco-journal-view-version",
  templateUrl: "./journal-view-version.component.html",
  styleUrls: ["./journal-view.component.scss"]
})
export class JournalViewVersionComponent implements OnInit, OnChanges {
  @Input() public currentJournal: JournalVersion;

  @Input() public type: number;

  @Input()
  public editingJournal: JournalVersion;

  public journalDataType = JournalDataType;

  public currentInstitutionTerms: Array<TermSource>;
  public currentDataBaseTerms: Array<TermSource>;
  public currentGroupTerms: Array<TermSource>;
  public currentProvinceTerms: Array<TermSource>;
  public currentSubjectTerms: Array<TermSource>;
  public currentLicenceTerms: Array<TermSource>;

  vocabularies;
  public panelOpenState = false;

  currentJournalChecked: boolean = false;

  @Output()
  editingJournalChange = new EventEmitter<JournalVersion>();

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (this.currentJournal == undefined)
      this.currentJournal = new JournalVersion();
    this.loadJournalData();

    if (this.type == undefined) this.type = JournalDataType.default;
  }

  ngOnChanges(): void {
    console.log("***////****////***///");
    this.ngOnInit();
  }

  loadJournalData() {
    this.currentDataBaseTerms = new Array<TermSource>();
    this.currentGroupTerms = new Array<TermSource>();
    this.currentInstitutionTerms = new Array<TermSource>();
    this.currentLicenceTerms = new Array<TermSource>();
    this.currentProvinceTerms = new Array<TermSource>();
    this.currentSubjectTerms = new Array<TermSource>();

    this.vocabularies = VocabulariesInmutableNames;

    if (this.currentJournal.data.term_sources) {
      this.currentJournal.data.term_sources.forEach(
        (termSource: TermSource) => {
          switch (termSource.term.vocabulary_id.toString()) {
            case VocabulariesInmutableNames.CUBAN_INTITUTIONS:
              this.currentInstitutionTerms.push(termSource);
              break;
            case VocabulariesInmutableNames.INDEXES:
              this.currentDataBaseTerms.push(termSource);
              break;
            case VocabulariesInmutableNames.INDEXES_CLASIFICATION:
              this.currentGroupTerms.push(termSource);
              break;
            case VocabulariesInmutableNames.LICENCES:
              this.currentLicenceTerms.push(termSource);
              break;
            case VocabulariesInmutableNames.CUBAN_PROVINCES:
              this.currentProvinceTerms.push(termSource);
              break;
            case VocabulariesInmutableNames.SUBJECTS:
              this.currentSubjectTerms.push(termSource);
              break;
          }
        }
      );
    }
  }

  /**
   * Changes the field `reviewed` of a `Journal`, that means the user saw these version
   * and consider it not has more information.
   */
  markAsViewed() {
    if (this.currentJournalChecked) {
      this.currentJournal.reviewed = true;
      // TODO: hacer el request al backend de marcar la version como vista o
      const m = new MessageHandler(this._snackBar);
      m.showMessage(StatusCode.OK, "Versión marcada como vista!!!");
    }
  }

  public replace() {
    this.editingJournal.data = this.currentJournal.data;
    // this.editingJournal.data.term_sources = [];
    // this.editingJournal.data.term_sources = this.currentJournal.data.term_sources;
    this.editingJournalChange.emit(this.editingJournal);
    // // this.currentJournal.data.term_sources.forEach((termSource: TermSource) => {

    // //     this.editingJournal.data.term_sources.push(termSource);

    // // });
    console.log("editingJournal remplazado", this.editingJournal);
  }

  /**
   * Concats a `Journal` property by a equal property in `JournalVersion`.
   * @param type is a `JournalDataType` enum, that means, `type` has all properties of a `Journal` enumerated as identifyer.
   * @param termId is a `Term` identifyer, only needs if `type` is `JournalDataType.term`.
   * @NOTE this function call `replace(..., true)`
   */
  public concat(type: JournalDataType, termSource: TermSource) {
    if (type == JournalDataType.term) {
      let notFound = true;
      for (
        let index = 0;
        index < this.editingJournal.data.term_sources.length;
        index++
      ) {
        const element = this.editingJournal.data.term_sources[index];
        if (element.term_id == termSource.term_id) {
          this.editingJournal.data.term_sources[index].data = termSource.data;
          notFound = false;
        }
      }
      if (notFound) {
        this.editingJournal.data.term_sources.push(termSource);
      }
      this.editingJournalChange.emit(this.editingJournal);
    }
  }
  public replaceInstitutions() {
    let found = false;
    let newts: TermSource[] = [];

    this.editingJournal.data.term_sources.forEach(ts => {
      if (
        !(
          ts.term.vocabulary_id ==
            VocabulariesInmutableNames.EXTRA_INSTITUTIONS ||
          ts.term.vocabulary_id == VocabulariesInmutableNames.CUBAN_INTITUTIONS
        )
      ) {
        newts.push(ts);
      }
    });

    this.currentJournal.data.term_sources.forEach(ts => {
      if (
        ts.term.vocabulary_id ==
          VocabulariesInmutableNames.EXTRA_INSTITUTIONS ||
        ts.term.vocabulary_id == VocabulariesInmutableNames.CUBAN_INTITUTIONS
      ) {
        newts.push(ts);
      }
    });
    this.editingJournal.data.term_sources = newts;

    this.editingJournalChange.emit(this.editingJournal);
  }
}
