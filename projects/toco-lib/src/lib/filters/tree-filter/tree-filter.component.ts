/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Component, OnInit, Input } from '@angular/core';

import { FilterComponent } from '../filter.component';
import { FiltersService } from '../filters.service';
import { FilterContainerService } from '../filter-container.service';
import { TermNode, Term } from '../../entities/public-api';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { of, Observable } from 'rxjs';
import { SelectionModel, CollectionViewer } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

export interface FlatTreeNodeFilter {
  name: string;
  level: number;
  expandable: boolean;
  term: Term;
}
interface TreeFilterData {
  selectOptions: TermNode[];
  type: string;
  placeholder: string;
  text: string;
  field: string;
  index: number;
  value: any;
  idVocab: number;
}

@Component({
  selector: 'toco-tree-filter',
  templateUrl: './tree-filter.component.html',
  styleUrls: ['./tree-filter.component.scss']
})
export class TreeFilterComponent implements OnInit, FilterComponent {
  @Input() data: TreeFilterData;

  chipsList: [];

  treeControl: FlatTreeControl<FlatTreeNodeFilter>;
  treeFlattener: MatTreeFlattener<TermNode, FlatTreeNodeFilter>;
  dataSource: MatTreeFlatDataSource<TermNode, FlatTreeNodeFilter>;
  checklistSelection = new SelectionModel<FlatTreeNodeFilter>(true /* multiple */);

  myControl = new FormControl();

  inputId: string;

  constructor(
    private filterService: FiltersService,
    private filterContainerService: FilterContainerService) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  ngOnInit() {
    this.data.value = '';
    this.dataSource.data = this.data.selectOptions;
    this.myControl.valueChanges.subscribe(
      (value: any) => {
        this._filter(value);
      },
      (error: any) => { },
      () => {
      }
    );
    this.inputId = this.data.placeholder.trim().toLowerCase();
  }

  private _filter(value: string): void {
    const filterValue = value.toLowerCase();
    console.log(filterValue);

    const newData = this.data.selectOptions.filter(node => this._include_node(filterValue, node));

    this.dataSource.data = newData;
    this._fix_selection();
  }
  /** return true if any children is include, false otherwise */
  private _include_node(filter: string, node: TermNode): boolean {
    if (node.term.identifier.toLowerCase().includes(filter)) {
      return true;
    } else if (node.children) {
      for (const child of node.children) {
        if (this._include_node(filter, child)) {
          return true;
        }
      }
    } else {
      return false;
    }
    return false;
  }

  private _fix_selection() {
    for (const node of this.treeControl.dataNodes) {
      console.log(node);
    }

    // if (this.checklistSelection.selected) {
    //   const old = this.checklistSelection.selected.find(
    //     (value: FlatTreeNode, index: number, obj: FlatTreeNode[]) => value.term.id === node.term.id
    //   );
    //   if (old !== undefined) {
    //     this.checklistSelection.deselect(old);
    //     this.checklistSelection.select(result);
    //   }
    // }
  }
  remove_component() {
    this.filterService.deleteParameter(this.data.field);
    this.filterContainerService.filterDeleted(this.data.index);

  }
  onChange() {
    this.filterService.changeFilter(this.data.field, this.data.value);
  }

  emitSelection() {
    console.log(this.checklistSelection.selected);
    var valueEmiter = 'OR';
    this.checklistSelection.selected.forEach(node => {
      valueEmiter = valueEmiter + ',' + node.term.id;
    });
    this.filterService.changeAutocompleteFilter(this.data.idVocab.toString(10), valueEmiter);
  }


  /** Transform the data to something the tree can read. */
  transformer(node: TermNode, level: number) {
    const result = {
      name: node.term.identifier,
      level: level,
      expandable: (node.children.length > 0),
      term: node.term,
    };
    return result;
  }

  /** Get the level of the node */
  getLevel(node: FlatTreeNodeFilter) {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: FlatTreeNodeFilter) {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNodeFilter) {
    return node.expandable;
  }

  /** Get the children for the node. */
  getChildren(node: TermNode) {
    return of(node.children);
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: FlatTreeNodeFilter): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: FlatTreeNodeFilter): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Select/deselect all the descendants node */
  itemSelectionToggle(node: FlatTreeNodeFilter): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);
    this.emitSelection();

  }

  /** Check all the parents to see if they changed */
  leafItemSelectionToggle(node: FlatTreeNodeFilter): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
    this.emitSelection();
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: FlatTreeNodeFilter): void {
    let parent: FlatTreeNodeFilter | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: FlatTreeNodeFilter): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: FlatTreeNodeFilter): FlatTreeNodeFilter | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
  removeChip(i){
    console.log(i);
  }
}
