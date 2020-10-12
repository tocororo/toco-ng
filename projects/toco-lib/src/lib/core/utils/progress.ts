import { Component, Input } from '@angular/core';

@Component({
    selector: 'toco-progress',
    template: `
    <mat-progress-bar *ngIf="loading"
        mode="indeterminate" color="warn" style="z-index: 1001">
    </mat-progress-bar>
    <div *ngIf="loading && position == 'fixed'" class="overlay-fixed"> 

    </div >
    <div *ngIf="loading && position == 'absolute'" class="overlay-absolute"> 

    </div> `,
    
    styles: [
`.overlay-fixed {
    opacity:    0.4; 
    background: #000; 
    width:      100%;
    height:     100%; 
    z-index:    1000;
    top:        0; 
    left:       0; 
    position:   fixed; 
  }
  .overlay-absolute {
    opacity:    0.4; 
    background: #000; 
    width:      100%;
    height:     100%; 
    z-index:    1000;
    top:        0; 
    left:       0; 
    position:   absolute; 
  }`
    ]
    
  })
  export class ProgressComponent {
        @Input()
        public loading = false;
        @Input()
        public position = 'fixed';
        constructor() { }
  }
  
