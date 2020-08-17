import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import {
  JournalData,
  Journal,
  SourceClasification,
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
  @Input() public currentJournal: JournalData;

  @Input() public type: number;

  @Input()
  public editingJournal: JournalData;

  public journalDataType = JournalDataType;

  public currentInstitutionTerms: Array<SourceClasification>;
  public currentDataBaseTerms: Array<SourceClasification>;
  public currentGroupTerms: Array<SourceClasification>;
  public currentProvinceTerms: Array<SourceClasification>;
  public currentSubjectTerms: Array<SourceClasification>;
  public currentLicenceTerms: Array<SourceClasification>;

  vocabularies;
  public panelOpenState = false;

  currentJournalChecked: boolean = false;

  @Output()
  editingJournalChange = new EventEmitter<JournalData>();

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (this.currentJournal == undefined)
      this.currentJournal = new JournalData();
    this.loadJournalData();

    if (this.type == undefined) this.type = JournalDataType.default;
  }

  ngOnChanges(): void {
    console.log("***////****////***///");
    this.ngOnInit();
  }

  loadJournalData() {
    this.currentDataBaseTerms = new Array<SourceClasification>();
    this.currentGroupTerms = new Array<SourceClasification>();
    this.currentInstitutionTerms = new Array<SourceClasification>();
    this.currentLicenceTerms = new Array<SourceClasification>();
    this.currentProvinceTerms = new Array<SourceClasification>();
    this.currentSubjectTerms = new Array<SourceClasification>();

    this.vocabularies = VocabulariesInmutableNames;

    if (this.currentJournal.classifications) {
      this.currentJournal.classifications.forEach(
        (termSource: SourceClasification) => {
          switch (termSource.vocabulary.toString()) {
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
    this.editingJournal = this.currentJournal;
    // this.editingJournal.classifications = [];
    // this.editingJournal.classifications = this.currentJournal.classifications;
    this.editingJournalChange.emit(this.editingJournal);
    // // this.currentJournal.classifications.forEach((termSource: SourceClasification) => {

    // //     this.editingJournal.classifications.push(termSource);

    // // });
    console.log("editingJournal remplazado", this.editingJournal);
  }

  /**
   * Concats a `Journal` property by a equal property in `JournalData`.
   * @param type is a `JournalDataType` enum, that means, `type` has all properties of a `Journal` enumerated as identifyer.
   * @param termId is a `Term` identifyer, only needs if `type` is `JournalDataType.term`.
   * @NOTE this function call `replace(..., true)`
   */
  public concat(type: JournalDataType, termSource: SourceClasification) {
    if (type == JournalDataType.term) {
      let notFound = true;
      for (
        let index = 0;
        index < this.editingJournal.classifications.length;
        index++
      ) {
        const element = this.editingJournal.classifications[index];
        if (element.id == termSource.id) {
          this.editingJournal.classifications[index].data = termSource.data;
          notFound = false;
        }
      }
      if (notFound) {
        this.editingJournal.classifications.push(termSource);
      }
      this.editingJournalChange.emit(this.editingJournal);
    }
  }
  public replaceInstitutions() {
    let found = false;
    let newts: SourceClasification[] = [];

    this.editingJournal.classifications.forEach(ts => {
      if (
        !(
          ts.vocabulary ==
            VocabulariesInmutableNames.EXTRA_INSTITUTIONS ||
          ts.vocabulary == VocabulariesInmutableNames.CUBAN_INTITUTIONS
        )
      ) {
        newts.push(ts);
      }
    });

    this.currentJournal.classifications.forEach(ts => {
      if (
        ts.vocabulary ==
          VocabulariesInmutableNames.EXTRA_INSTITUTIONS ||
        ts.vocabulary == VocabulariesInmutableNames.CUBAN_INTITUTIONS
      ) {
        newts.push(ts);
      }
    });
    this.editingJournal.classifications = newts;

    this.editingJournalChange.emit(this.editingJournal);
  }
}
