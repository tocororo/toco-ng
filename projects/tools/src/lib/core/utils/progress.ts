import { Component, Input } from '@angular/core';

@Component({
    selector: 'toco-progress',
    template: `
    <mat-progress-bar *ngIf="loading"
        mode="indeterminate" color="warn">
    </mat-progress-bar>
    <div *ngIf="loading" class="overlay"> 

    </div >`,
    
    styles: [
`.overlay {
    opacity:    0.4; 
    background: #000; 
    width:      100%;
    height:     100%; 
    z-index:    1000;
    top:        0; 
    left:       0; 
    position:   fixed; 
  }`
    ]
    
  })
  export class ProgressComponent {
        @Input()
        public loading = false;
        constructor() { }
  }
  
