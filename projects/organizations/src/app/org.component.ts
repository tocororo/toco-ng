
import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PageEvent } from '@angular/material';

import { Organization, SearchResponse } from '@toco/tools/entities';
import { SearchService } from '@toco/tools/backend';

@Component({
	selector: 'toco-org-root',
	templateUrl: './org.component.html',
	styleUrls: ['./org.component.scss']
})
export class OrgRootComponent
{
	public footerSites: Array< { name: string, url: string, useRouterLink: boolean } >;

    public footerInformation: Array< { name: string, url: string, useRouterLink: boolean } >;

	public constructor()
	{ }

	ngOnInit(): void {

        this.footerInformation =  Array();
        this.footerSites =  Array();

        this.footerSites.push({ name: "MES", url: "https://www.mes.gob.cu", useRouterLink: false});
        this.footerSites.push({ name: "Sceiba", url: "https://sceiba-lab.upr.edu.cu", useRouterLink: false});
        this.footerSites.push({ name: "Dirección Nacional de Publicaciones Seriadas", url: "http://www.seriadascubanas.cult.cu/http://www.seriadascubanas.cult.cu/", useRouterLink:false});
        this.footerSites.push({ name: "Red Ciencia", url: "http://www.redciencia.cu/", useRouterLink: false});

        this.footerInformation.push({ name: "Términos de uso", url: "https://sceiba-lab.upr.edu.cu/page/politicas", useRouterLink: false});
        this.footerInformation.push({ name: "Privacidad", url: "https://sceiba-lab.upr.edu.cu/page/politicas", useRouterLink: false});
        this.footerInformation.push({ name: "Contacto", url: "/contact", useRouterLink: true});
        this.footerInformation.push({ name: "FAQs", url: "/faq", useRouterLink: true});
    }

}
