import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { of as observableOf, PartialObserver, Subscription } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Vocabulary, Term } from '@toco/entities/taxonomy.entity';
import { TaxonomyService, VocabulariesInmutableNames } from '../taxonomy.service';
import { Response } from '@toco/entities/response';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TermGenericComponent } from '../term-generic/term-generic.component';
import { FormContainerAction } from '@toco/forms/form-container/form-container.component';
import { TermInstitutionsComponent } from '../term-institutions/term-institutions.component';



/** File node data with possible child nodes. */
export interface TermNode {
  term: Term;
  children?: TermNode[];
}

/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
  name: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'toco-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit, OnDestroy{

  vocab: Vocabulary = null;

  loading: Boolean = false;

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<TermNode, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<TermNode, FlatTreeNode>;

  private termsTreeObserver: PartialObserver<Response<any>> = {
    next: (response: Response<any>) => {
      this.dataSource.data = response.data.terms.terms;
      this.loading = !this.loading;
    },

    error: (err: any) => {
        console.log('The observable got an error notification: ' + err + '.');
    },

    complete: () => {
      console.log('The observable got a complete notification.');
    }
  };

  private termChangeSuscription: Subscription = null;
  private termChangeObserver: PartialObserver<Response<any>> = {
    next: (response: Response<any>) => {
      this.loading = !this.loading;
      this.service.getTermsTreeByVocab(this.vocab).subscribe(this.termsTreeObserver);
      this.dialog.closeAll();
      this._snackBar.open(response.message, null, {
        duration: 2000,
      });
    },

    error: (err: any) => {
        console.log('The observable got an error notification: ' + err + '.');
    },

    complete: () => {
      console.log('The observable got a complete notification.');
    }
  };

  private currentVocabSuscription: Subscription = null;
  private currentVocabObserver: PartialObserver<Vocabulary> = {
    next: (vocab: Vocabulary) => {
      if ( !this.vocab || this.vocab.name !== vocab.name) {
        this.loading = !this.loading;
        this.service.getTermsTreeByVocab(vocab).subscribe(this.termsTreeObserver);
        this.vocab = vocab;
      }
    },

    error: (err: any) => {
        console.log('The observable got an error notification: ' + err + '.');
    },

    complete: () => {
      console.log('The observable got a complete notification.');
    }
  };

  constructor(private service: TaxonomyService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data;
  }

  ngOnInit(): void {
    this.currentVocabSuscription = this.service.currentVocabularyObservable.subscribe(this.currentVocabObserver);
    this.termChangeSuscription = this.service.termChangeObservable.subscribe(this.termChangeObserver);
  }

  ngOnDestroy(): void {
    if (this.currentVocabSuscription) {
      this.currentVocabSuscription.unsubscribe();
    }
    if (this.termChangeSuscription) {
      this.termChangeSuscription.unsubscribe();
    }
  }

  /** Transform the data to something the tree can read. */
  transformer(node: TermNode, level: number) {
    return {
      name: node.term.name,
      term: node.term,
      level: level,
      expandable: (node.children.length > 0)
    };
  }

  /** Get the level of the node */
  getLevel(node: FlatTreeNode) {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get the children for the node. */
  getChildren(node: TermNode) {
    return observableOf(node.children);
  }
  addTerm(node: TermNode){
    const dialogRef = this.dialog.open(TermGenericComponent, {
      data: { service: this.service }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  editTerm(node: TermNode) {
    switch (this.vocab.id) {
      case VocabulariesInmutableNames.INTITUTION:
        this.dialog.open(TermInstitutionsComponent, {
          data: { term: node.term, service: this.service, terms: this.dataSource.data }
        });
        break;

      default:
        const dialogRef = this.dialog.open(TermGenericComponent, {
          data: { term: node.term, service: this.service, terms: this.dataSource.data }
        });
    }


  }

  deleteTerm(node: TermNode) {
    console.log(node);
  }

  addChild(node: TermNode) {
    console.log(node);
  }
}
