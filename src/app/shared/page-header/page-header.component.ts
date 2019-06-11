import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'toco-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() drawer;
  @Input() info:String[] = [];
  is_show_icon:Boolean = false;
  
  constructor() { }

  ngOnInit() {
    //this.info = ['Listado de Personas','estas estan en el sitio','esta es otra fila'];
  }
  function(){
    this.drawer.toggle();
  }
  change_icon_show(){
    this.is_show_icon = false;
    console.log(this.is_show_icon);
  }

}
