import { Component, Input } from '@angular/core';

// @Component({
//     selector: 'toco-progress',
//     template: `
//     <mat-progress-bar *ngIf="loading"
//         mode="indeterminate" color="warn" style="z-index: 1001">
//     </mat-progress-bar>
//     <div *ngIf="loading && position == 'fixed'" class="overlay-fixed">

//     </div >
//     <div *ngIf="loading && position == 'absolute'" class="overlay-absolute">

//     </div> `,

//     styles: [
// `.overlay-fixed {
//     opacity:    0.4;
//     background: #000;
//     width:      100%;
//     height:     100%;
//     z-index:    1000;
//     top:        0;
//     left:       0;
//     position:   fixed;
//   }
//   .overlay-absolute {
//     opacity:    0.4;
//     background: #000;
//     width:      100%;
//     height:     100%;
//     z-index:    1000;
//     top:        0;
//     left:       0;
//     position:   absolute;
//   }`
//     ]

//   })

  @Component({
    selector: 'toco-progress',
    template: `
    <div class="spinner" *ngIf="loading">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
 `,

    styles: [
`
.overlay-fixed {
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
    }

.spinner {
margin: 5px auto 0;
width: 70px;
text-align: center;
}

.spinner > div {
width: 14px;
height: 14px;


border-radius: 100%;
display: inline-block;
-webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
background-color:#007e3e;
-webkit-animation-delay: -0.60s;
animation-delay: -0.60s;
}

.spinner .bounce2 {
background-color: #018d79;
-webkit-animation-delay: -0.30s;
animation-delay: -0.30s;
}

.spinner .bounce3 {
background-color: #0f6684;
}

@-webkit-keyframes sk-bouncedelay {
0%, 80%, 100% { -webkit-transform: scale(0) }
40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
0%, 80%, 100% {
  -webkit-transform: scale(0);
  transform: scale(0);
} 40% {
  -webkit-transform: scale(1.0);
  transform: scale(1.0);
}
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

