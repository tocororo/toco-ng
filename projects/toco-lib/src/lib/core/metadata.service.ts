
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { Environment } from './env'

@Injectable({
    providedIn: 'root'
})
export class MetadataService {

    constructor(private bodyTitle: Title, private meta: Meta, private router: Router, private env: Environment)
    { }

    /**
     * TODO: en general esto hay que investigarlo ver la mejor variante
     * para poner los metadatos
     *  que metadatos poner...para que despues funcione twiter, facebook, etc..
     */
    setTitleDescription(title: string, description: string){
        let url = this.env.appHost + this.router.url;
        let t = title +' | '+ this.env.appName;
        this.bodyTitle.setTitle(t);
        this.meta.updateTag({ name: 'description', content: description });

        // <!-- Schema.org markup for Google+ --});
        // this.meta.updateTag({ itemprop:"name", title});
        // this.meta.updateTag({ itemprop:"description", content: description});

        this.meta.updateTag({ name:"twitter:site", content: this.env.appName});
        this.meta.updateTag({ name:"twitter:title", content: title});
        this.meta.updateTag({ name:"twitter:description", content:description});

        this.meta.updateTag({ name:"twitter:card", content:"some image..."});
        this.meta.updateTag({ name:"twitter:image:src", content:"some image.."});

        //<!-- Open Graph data --});
        this.meta.updateTag({ property:"og:title", content:title });
        this.meta.updateTag({ property:"og:type", content:"article" });
        this.meta.updateTag({ property:"og:url", content:url });
        this.meta.updateTag({ property:"og:description", content:description });
        this.meta.updateTag({ property:"og:site_name", content: this.env.appName });
    }

    setTitleMetadataDrupal(node: any) {
        if (node) {
            let url = this.env.appHost + this.router.url;
            let title = node.title[0].value +' - '+ this.env.appName;
            this.setTitleDescription(title, node.body[0].summary );

            /*
            this.bodyTitle.setTitle(title);
            this.meta.updateTag({ name: 'description', content: node.body[0].summary });

            if(node.field_main_image[0])
                //this.meta.updateTag({ name:"twitter:card", content:this.imageLinks(node.field_main_image[0], "medium")});
            this.meta.updateTag({ name:"twitter:site", content: env.appName});
            this.meta.updateTag({ name:"twitter:title", content: node.title[0].value});
            this.meta.updateTag({ name:"twitter:description", content:node.metatag.value.description});
            // this.meta.updateTag({ name:"twitter:creator", content:"@author_handle"});
            //<!-- Twitter summary card with large image must be at least 280x150px --});
            if(node.field_main_image[0])
                //this.meta.updateTag({ name:"twitter:image:src", content:this.imageLinks(node.field_main_image[0], "extra_large")});

            //<!-- Open Graph data --});
            this.meta.updateTag({ property:"og:title", content:node.title[0].value });
            this.meta.updateTag({ property:"og:type", content:"article" });
            this.meta.updateTag({ property:"og:url", content:url });
            if(node.field_main_image[0])
                //this.meta.updateTag({ property:"og:image", content:this.imageLinks(node.field_main_image[0], "extra_large")});
            this.meta.updateTag({ property:"og:description", content:node.metatag.value.description });
            this.meta.updateTag({ property:"og:site_name", content: env.appName });
            /* this.meta.updateTag({ property:"article:published_time", content:"2013-09-17T05:59:00+01:00" });
            this.meta.updateTag({ property:"article:modified_time", content:"2013-09-16T19:08:47+01:00" });
            this.meta.updateTag({ property:"article:section", content:"Article Section" });
            this.meta.updateTag({ property:"article:tag", content:"Article Tag" });
            this.meta.updateTag({ property:"fb:admins", content:"Facebook numberic ID" }); */
        }
    }
}
