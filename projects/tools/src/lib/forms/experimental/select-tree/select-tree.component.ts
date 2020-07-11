/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlattener, MatTreeFlatDataSource } from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { of } from "rxjs";

import { FormFieldControl_Experimental } from "../form-field.control.experimental";
import { SelectOption } from '../../input/select/select-input.component';

export interface SelectOptionNode {
  element: SelectOption;
  parent?: SelectOptionNode;
  children?: SelectOptionNode[];
}

export interface FlatTreeNode {
  name: string;
  level: number;
  expandable: boolean;
  element: SelectOption;
}
interface TreeFilterData {
  selectOptions: SelectOptionNode[];
  type: string;
  placeholder: string;
  text: string;
  field: string;
  index: number;
  value: any;
  idVocab: number;
}

@Component({
  selector: "toco-select-tree",
  templateUrl: "./select-tree.component.html",
  styleUrls: ["./select-tree.component.scss"]
})
export class SelectTreeComponent extends FormFieldControl_Experimental
  implements OnInit {
  data: SelectOptionNode[];

  internalControl = new FormControl();

  treeControl: FlatTreeControl<FlatTreeNode>;
  treeFlattener: MatTreeFlattener<SelectOptionNode, FlatTreeNode>;
  dataSource: MatTreeFlatDataSource<SelectOptionNode, FlatTreeNode>;
  checklistSelection = new SelectionModel<FlatTreeNode>(true /* multiple */);

  constructor() {
    super();
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
  }

  ngOnInit() {

//    this.content.parentFormSection.addControl(this.content.name, this.internalControl);

    if (this.content.extraContent){
      if (this.content.extraContent.observable) {
        this.content.extraContent.observable.subscribe(
          // next
          (response: any) => {
            console.log(response);
  
            this.data = this.content.extraContent.getOptions(response);
            console.log(this.data);
            this.dataSource.data = this.data;
            console.log(this.dataSource);
            this.content.extraContent.selectedTermsUUIDs.forEach((uuid:string) => {
              console.log(uuid);
              
              this.treeControl.dataNodes.forEach(node => {
                
                
                if (node.element.value == uuid){
                  console.log(node);
                  
                  if(node.expandable){
                    this.itemSelectionToggle(node);
                  } else {
                    this.leafItemSelectionToggle(node);
                  }
                }
              })
            });
          },
  
          // error
          (error: any) => {
            console.log(error);
          },
          // complete
          () => {}
        );
      } else {
        this.data = this.content.extraContent.getOptions();
        this.dataSource.data = this.data;
      }
      if (!this.content.extraContent.selectedTermsUUIDs) {
        this.content.extraContent.selectedTermsUUIDs = [];
      }
    }
    

    this.content.value = "";
  }

  remove_component() {}

  onChange() {
    console.log("ttree change");
  }

  emitSelection() {
    this.internalControl.setValue(this.checklistSelection.selected);

    // this.content.extraContent.selectionChange(this.checklistSelection.selected)
    // var valueEmiter = "OR";
    // this.checklistSelection.selected.forEach(node => {
    //   valueEmiter = valueEmiter + "," + node.element.value;
    // });

    // if (this.content.extraContent.selectionChange) {
    //   this.content.extraContent.selectionChange(this.content.value);
    // }
  }

  /** Transform the data to something the tree can read. */
  transformer(node: SelectOptionNode, level: number) {
    const result = {
      name: node.element.label,
      level: level,
      expandable: node.children.length > 0,
      element: node.element
    };
    return result;
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
  getChildren(node: SelectOptionNode) {
    return of(node.children);
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: FlatTreeNode): boolean {
    if (this.treeControl.dataNodes != undefined) {
      const descendants = this.treeControl.getDescendants(node);
      const descAllSelected = descendants.every(child =>
        this.checklistSelection.isSelected(child)
      );
      return descAllSelected;
    }
    return false;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: FlatTreeNode): boolean {
    if (this.treeControl.dataNodes != undefined) {
      const descendants = this.treeControl.getDescendants(node);
      const result = descendants.some(child =>
        this.checklistSelection.isSelected(child)
      );
      return result && !this.descendantsAllSelected(node);
    }
    return false;
  }

  /** Select/deselect all the descendants node */
  itemSelectionToggle(node: FlatTreeNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
    this.emitSelection();
  }

  /** Check all the parents to see if they changed */
  leafItemSelectionToggle(node: FlatTreeNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
    this.emitSelection();
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: FlatTreeNode): void {
    let parent: FlatTreeNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: FlatTreeNode): void {
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
  getParentNode(node: FlatTreeNode): FlatTreeNode | null {
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
}
