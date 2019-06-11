import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../catalog/catalog.service';
import { MetadataService } from '../metadata.service';

@Component({
  selector: 'toco-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private metadata: MetadataService ) { }
  
  ngOnInit() {
    this.metadata.setTitleDescription("Inicio", "");
  }

}
