import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrganizationServiceNoAuth } from '../../backend/public-api';
import { Hit } from '../../entities/common';
import { Organization, OrganizationRelationships } from '../../entities/public-api';



/** Flat node with expandable and level information */
export class OrganizationFlatNode {
  constructor(public item: Hit<Organization>,
              public parent: OrganizationFlatNode,
              public level = 1,
              public expandable = false,
              public isLoading = false) { }
}

@Injectable()
export class OrganizationDataSource {


  dataChange = new BehaviorSubject<OrganizationFlatNode[]>([]);
  orgRelationshipType: string = null;

  constructor(private _treeControl: FlatTreeControl<OrganizationFlatNode>,
              private orgService: OrganizationServiceNoAuth) { }


  get data(): OrganizationFlatNode[] { return this.dataChange.value; }
  set data(value: OrganizationFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }


  connect(collectionViewer: CollectionViewer): Observable<OrganizationFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe(change => {
      if ((change as SelectionChange<OrganizationFlatNode>).added ||
        (change as SelectionChange<OrganizationFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<OrganizationFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<OrganizationFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: OrganizationFlatNode, expand: boolean) {
    node.isLoading = true;
    const index = this.data.indexOf(node);
    if (node.item.metadata.relationships.length <= 0 || index < 0) { // If no children, or cannot find the node, no op
      return;
    }
    if (expand) {
      this.orgService.getOrganizationRelationships(node.item.metadata.id, this.orgRelationshipType).subscribe(
        (response) => {
          const nodes = response.map(
            org =>
              new OrganizationFlatNode(org, node, node.level + 1, org.metadata.relationships.length > 0)
          );

          this.data.splice(index + 1, 0, ...nodes);

          this.dataChange.next(this.data);
          node.isLoading = false;

        },
        (error) => { },
        () => { }
      );
    } else {
      let count = 0;
      for (let i = index + 1; i < this.data.length
        && this.data[i].level > node.level; i++) {
        count++
      }
      this.data.splice(index + 1, count);
      this.dataChange.next(this.data);
      node.isLoading = false;
    }
  }
}

@Component({
  selector: 'toco-org-tree-viewer',
  templateUrl: './org-tree-viewer.component.html',
  styleUrls: ['./org-tree-viewer.component.scss']
})
export class OrgTreeViewerComponent implements OnInit {

  @Input() organizations: Array<Hit<Organization>> = new Array();

  @Input() orgRelationshipType: string = null;

  @Input() iconAction = 'visibility';

  @Input() labelAction = '';

  @Input() ngStyle = null;

  @Output()
  action = new EventEmitter<OrganizationFlatNode>();

  public error = false;

  treeControl: FlatTreeControl<OrganizationFlatNode>;

  dataSource: OrganizationDataSource;

  getLevel = (node: OrganizationFlatNode) => node.level;

  isExpandable = (node: OrganizationFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: OrganizationFlatNode) => _nodeData.expandable;

  constructor(
    private orgService: OrganizationServiceNoAuth) {
    this.treeControl = new FlatTreeControl<OrganizationFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new OrganizationDataSource(this.treeControl, orgService);
  }

  ngOnInit() {
    this.dataSource.orgRelationshipType = this.orgRelationshipType;

    this.dataSource.data = this.organizations.map(
      org =>
        new OrganizationFlatNode(org, null,  1, org.metadata.relationships.length > 0)
    );
  }

  emitAction(org) {
    this.action.emit(org);
  }
}
