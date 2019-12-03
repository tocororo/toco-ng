import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { of as observableOf, PartialObserver, Subscription } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Vocabulary, Term } from '@toco/entities/taxonomy.entity';
import { TaxonomyService } from '../taxonomy.service';
import { Response } from '@toco/entities/response';

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
      this.dataSource.data = response.data.terms.terms
      this.loading = !this.loading;
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
      if( !this.vocab || this.vocab.name != vocab.name){
        this.loading = !this.loading;
        this.service.getTermsTreeByVocab(vocab.name).subscribe(this.termsTreeObserver);
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

  constructor(private service: TaxonomyService) {
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
    this.currentVocabSuscription = this.service.currentVocabObservable.subscribe(this.currentVocabObserver);
  }

  ngOnDestroy(): void {
    if (this.currentVocabSuscription){
      this.currentVocabSuscription.unsubscribe();
    }
  }

  /** Transform the data to something the tree can read. */
  transformer(node: TermNode, level: number) {
    return {
      name: node.term.name,
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
}
