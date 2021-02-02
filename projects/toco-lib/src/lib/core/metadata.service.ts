
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { Environment } from './env'

/**
 * A service that is used to set the title and metadata of a route. 
 * This service is important for things like configuring a Content Security Policy, 
 * defining browser compatibility and security settings, setting HTTP Headers, 
 * defining rich content for social sharing, and Search Engine Optimization (SEO). 
 */
@Injectable({
    providedIn: 'root'
})
export class MetadataService
{
    public constructor(private bodyTitle: Title, private meta: Meta, private router: Router, private env: Environment)
    { }

    /**
     * Sets metadata for general purpose. 
     * @param title The title to set. 
     * @param description The description to set. 
     */
    public setMeta_General(title: string, description: string): void
    {
        this.bodyTitle.setTitle(title + ' | ' + this.env.appName);  /* Sets the title of the current HTML document. */
        this.meta.updateTag({ name: 'description', content: description });
    }

    /**
     * Sets metadata for social networks. 
     * @param title The title to set. 
     * @param description The description to set. 
     */
    public setMeta_Social(title: string, description: string): void
    {
        // let url: string = this.env.appHost + this.router.url;

        /* Schema.org markup for Google+. */
        // this.meta.updateTag({ itemprop: "name", title });
        // this.meta.updateTag({ itemprop: "description", content: description });

        /* Twitter */
        this.meta.updateTag({ name: "twitter:site", content: this.env.appName });
        this.meta.updateTag({ name: "twitter:title", content: title });
        this.meta.updateTag({ name: "twitter:description", content: description });
        this.meta.updateTag({ name: "twitter:card", content:"some image..." });
        this.meta.updateTag({ name: "twitter:image:src", content:"some image..." });

        /* Facebook */
        // ...

        /* Linkedin */
        // ...

        /* Telegram */
        // ...
    }

    /**
     * Sets metadata for repositories. 
     * @param title The title to set. 
     * @param description The description to set. 
     */
    public setMeta_Repo(title: string, description: string): void
    {
        let url: string = this.env.appHost + this.router.url;

        /* Open Graph data */
        this.meta.updateTag({ property: "og:title", content: title });
        this.meta.updateTag({ property: "og:type", content: "article" });
        this.meta.updateTag({ property: "og:url", content: url });
        this.meta.updateTag({ property: "og:description", content: description });
        this.meta.updateTag({ property: "og:site_name", content: this.env.appName });

        /* GitHub */
        // ...
    }

    /**
     * Sets all metadata. It contains for general purpose, social networks, and repositories. 
     * @param title The title to set. 
     * @param description The description to set. 
     */
    public setMeta_All(title: string, description: string): void
    {
        this.setMeta_General(title, description);
        this.setMeta_Social(title, description);
        this.setMeta_Repo(title, description);
    }

    // public setTitleMetadataDrupal(node: any): void
    // {
    //     if (node)
    //     {
    //         // let url: string = this.env.appHost + this.router.url;
    //         // let title: string = node.title[0].value + ' - ' + this.env.appName;

    //         this.setMeta_General(node.title[0].value, node.body[0].summary);
    //         this.setMeta_Social(node.title[0].value, node.body[0].summary);

    //         /*
    //         this.bodyTitle.setTitle(title);
    //         this.meta.updateTag({ name: 'description', content: node.body[0].summary });

    //         if(node.field_main_image[0])
    //             //this.meta.updateTag({ name: "twitter:card", content: this.imageLinks(node.field_main_image[0], "medium") });
    //         this.meta.updateTag({ name: "twitter:site", content: env.appName });
    //         this.meta.updateTag({ name: "twitter:title", content: node.title[0].value });
    //         this.meta.updateTag({ name: "twitter:description", content: node.metatag.value.description });
    //         // this.meta.updateTag({ name: "twitter:creator", content: "@author_handle" });
    //         /* //Twitter summary card with large image must be at least 280x150px. 
    //         if(node.field_main_image[0])
    //             //this.meta.updateTag({ name: "twitter:image:src", content: this.imageLinks(node.field_main_image[0], "extra_large") });

    //         //<!-- Open Graph data --});
    //         this.meta.updateTag({ property:"og:title", content:node.title[0].value });
    //         this.meta.updateTag({ property:"og:type", content:"article" });
    //         this.meta.updateTag({ property:"og:url", content:url });
    //         if(node.field_main_image[0])
    //             //this.meta.updateTag({ property: "og:image", content: this.imageLinks(node.field_main_image[0], "extra_large") });
    //         this.meta.updateTag({ property: "og:description", content: node.metatag.value.description });
    //         this.meta.updateTag({ property: "og:site_name", content: env.appName });
    //         /* this.meta.updateTag({ property: "article:published_time", content: "2013-09-17T05:59:00+01:00" });
    //         this.meta.updateTag({ property: "article:modified_time", content: "2013-09-16T19:08:47+01:00" });
    //         this.meta.updateTag({ property: "article:section", content: "Article Section" });
    //         this.meta.updateTag({ property: "article:tag", content: "Article Tag" });
    //         this.meta.updateTag({ property: "fb:admins", content: "Facebook numberic ID" }); */
    //     }
    // }
}
