
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
    public constructor(public bodyTitle: Title, public meta: Meta, private _router: Router, public env: Environment)
    { }

    /**
     * Sets the page metadata for SEO and standard social networks. 
     * @param title The title to set. Maximum length 60-70 characters. 
     * @param description The description to set. Maximum length 155 characters. 
     * @param image The image to set. If the value is empty, then the image is not set. 
     * The image must be at least 280px in width and 150px in height; and must be less than 1Mb in size. 
     */
    public setStandardMeta(title: string, description: string, image: string = ""): void
    {
        /* The canonical URL for your page. This should be the undecorated URL, 
        without session variables, user identifying parameters, or counters. */
        let url: string = this.env.appHost + this._router.url;
        //console.log('The URL for metadata is: ', url);
        image = this.env.appHost + image;

        /* Primary metadata. */

        /* Maximum length 60-70 characters. */
        this.bodyTitle.setTitle(title + " | " + this.env.appName);  /* Sets the title of the current HTML document. */
        /* Maximum length 155 characters. */
        this.meta.updateTag({ name: "description", content: description });

        /* Schema.org markup for Google+. */

        this.meta.updateTag({ itemprop: "name", title });
        this.meta.updateTag({ itemprop: "description", content: description });
        if (image) this.meta.updateTag({ itemprop: "image", content: image });

        /* Twitter Card data */

        this.meta.updateTag({ name: "twitter:card", content:"summary_large_image" });
        /* Non-Essential, but required for analytics tool. */
        this.meta.updateTag({ name: "twitter:site", content: this.env.websiteUsername_Twitter });  /* @website-username */
        this.meta.updateTag({ name: "twitter:title", content: title });
        this.meta.updateTag({ name: "twitter:description", content: description });
        /* Twitter summary card with large image must be at least 280px x 150px. */
        if (image) this.meta.updateTag({ name: "twitter:image:src", content: image });
//        this.meta.updateTag({ name: "twitter:image:alt", content: "Alt text for image..." });

        /* Open Graph data, Twitter, Facebook, and Linkedin. */

        this.meta.updateTag({ property: "og:title", content: title });
        this.meta.updateTag({ property: "og:type", content: "website" });
        this.meta.updateTag({ property: "og:url", content: url });
        if (image) this.meta.updateTag({ property: "og:image", content: image });
        this.meta.updateTag({ property: "og:description", content: description });
        this.meta.updateTag({ property: "og:site_name", content: this.env.appName });
    }

    // public setTitleMetadataDrupal(node: any): void
    // {
    //     if (node)
    //     {
    //         // let url: string = this.env.appHost + this._router.url;
    //         // let title: string = node.title[0].value + " - " + this.env.appName;

    //         this.setStandardMeta(node.title[0].value, node.body[0].summary);

    //         /*
    //         this.bodyTitle.setTitle(title);
    //         this.meta.updateTag({ name: "description", content: node.body[0].summary });

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
