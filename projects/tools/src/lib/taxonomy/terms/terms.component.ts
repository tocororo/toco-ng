
import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { of as observableOf, PartialObserver, Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MessageHandler, StatusCode, Response } from '@toco/tools/core';
import { Vocabulary, Term, TermNode } from '@toco/tools/entities';

import { TaxonomyService } from '@toco/tools/backend';
import { TermGenericComponent } from '../term-generic/term-generic.component';

import { OAuthStorage } from 'angular-oauth2-oidc';

/**
 * Flattened tree node that has been created from a TermNode through the flattener. Flattened
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
export class TermsComponent implements OnInit, OnChanges, OnDestroy {


    loading: Boolean = false;

    /** The TreeControl controls the expand/collapse state of tree nodes.  */
    treeControl: FlatTreeControl<FlatTreeNode>;

    /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
    treeFlattener: MatTreeFlattener<TermNode, FlatTreeNode>;

    /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
    dataSource: MatTreeFlatDataSource<TermNode, FlatTreeNode>;

    private termsTreeObserver: PartialObserver<Response<any>> = {
        next: (response: Response<any>) => {
            this.dataSource.data = response.data.tree.term_node;
            this.loading = !this.loading;
        },

        error: (err: any) => {
            console.log('error: ' + err + '.');
        },

        complete: () => {
            console.log('complete');
        }
    };

    private termChangeObserver: PartialObserver<Response<any>> = {
        next: (response: Response<any>) => {
            this.loading = !this.loading;
            this.service.getTermsTreeByVocab(this.currentVocab.id).subscribe(this.termsTreeObserver);
            this.dialog.closeAll();
            const m = new MessageHandler(this._snackBar);
            m.showMessage(StatusCode.OK, response.message);
        },

        error: (err: any) => {
            console.log('error: ' + err + '.');
        },

        complete: () => {
            console.log('complete');
        }
    };

    @Input()
    currentVocab: Vocabulary = null;

    constructor(private service: TaxonomyService,
        private oautheStorage: OAuthStorage,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar) {
        this.treeFlattener = new MatTreeFlattener(
            this.transformer,
            this.getLevel,
            this.isExpandable,
            this.getChildren);

        this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    }

    ngOnInit(): void {

        if (!this.oautheStorage.getItem('user_permission')) {
            this.getAuthenticatedUserPermissions();
        }
    }
    ngOnChanges() {
        if (this.currentVocab != null) {
            this.loading = true;
            this.service.getTermsTreeByVocab(this.currentVocab.id)
                .subscribe(
                    (response: Response<any>) => {
                        this.dataSource.data = response.data.tree.term_node;
                    },
                    (err: any) => {
                        console.log('error: ' + err + '.');
                    },
                    () => {
                        this.loading = false;
                    }
                );
        }
    }
    ngOnDestroy(): void {

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

    addTerm() {
        this.openTermDialog(null);
    }
    editTerm(node: any) {
        this.openTermDialog(node.term);
    }


    private openTermDialog(term: Term) {

        const dialogRef = this.dialog.open(TermGenericComponent, {
            data: {
                term: term,
                terms: this.dataSource.data,
                currentVocab: this.currentVocab,
                accept: (term: Term) => {
                    this.dialog.closeAll();
                    if (term.isNew){
                        this.service.newTerm(term).pipe().subscribe(this.termChangeObserver);
                    } else {
                        this.service.editTerm(term).pipe().subscribe(this.termChangeObserver);
                    }
                }
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('dialog closed');
        });
    }

    deleteTerm(node: TermNode) {
        console.log(node);
    }

    getAuthenticatedUserPermissions() {
        this.service.getCurrentUserPermissions().pipe(
            catchError(err => {
                const m = new MessageHandler(this._snackBar);
                m.showMessage(StatusCode.serverError, err.message);
                // TODO: Maybe you must set a better return.
                return of(null);
            })
        )
            .subscribe(request => {
                if (request.status == 'success') {
                    var permJson = JSON.stringify(request.data.permissions.actions);
                    this.oautheStorage.setItem('user_permissions', permJson);
                }
            });
    }

    hasPermission(permission: string, id?: number): boolean {

        const userPermission = JSON.parse(this.oautheStorage.getItem('user_permissions'));
        if (!userPermission) {
            return false;
        }
        switch (permission) {
            case 'add':
                if (userPermission.taxonomy_full_editor_actions === null)
                    return true;

                return false;

            case 'edit':
                if (userPermission.taxonomy_full_editor_actions === null)
                    return true;

                if (userPermission.vocabulary_editor_actions) {
                    const arr: Array<string> = userPermission.vocabulary_editor_actions;

                    if (arr.includes(id.toString(10))) {
                        return true
                    }

                }
                else if (userPermission.taxonomy_full_editor_actions) {
                    return true;
                }

                return false;

            default:
                return false;
        }
    }
}
