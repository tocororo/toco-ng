
When you use the `HomeComponent`, these values must be specified in the `assets/i18n/es.json` file:

{
    "TOCO_NG_PAGINA_NO_ENCONT_DISCULPA": "¡Lo sentimos, la página que usted solicitó no pudo ser encontrada!",
    "TOCO_NG_PAGINA_NO_ENCONT_REDIRECCION": "Vamos a llevarlo a la página Principal",
    "TOCO_NG_PAGINA_NO_ENCONT_IMG_ALT_TEXT": "Personas"
}



When you use the `HomeComponent`, these values must be specified in the `assets/i18n/en.json` file:

{
    "TOCO_NG_PAGINA_NO_ENCONT_DISCULPA": "Sorry, the page you requested could not be found!",
    "TOCO_NG_PAGINA_NO_ENCONT_REDIRECCION": "Let us take you Home",
    "TOCO_NG_PAGINA_NO_ENCONT_IMG_ALT_TEXT": "People"
}



Example using the `HomeComponent` component (by default, `logoRouterLink` value is `['/']`, and `logoImgSource` value is `undefined`): 
<toco-home [logoRouterLink]="['/some', 'router', 'link']" [logoImgSource]="'/assets/icons/logo.sceiba.letras.svg'">
</toco-home>



If you want to personalize the internal style of your page-not-found view, you can use the following classes for the specified tags. 

Tag			Class								Represent
`h1`		`toco-pnf-h1-apology-text`			The apology text
`a`			`toco-pnf-a-redirect`				The link to redirect (that contains the following two tags `h2` and `img`)
`h2`		`toco-pnf-h2-redirect-text`			The redirect text
`img`		`toco-pnf-img-redirect`				The image to show underneath the redirect text

For instance, for the tag associated with the `toco-pnf-h2-redirect-text` class, you can set its personalized style in the CSS file in this way: 
:host ::ng-deep .toco-pnf-h2-redirect-text
{
    /* Set the personalized style. */
    background-color: yellow;
    text-align: left;
}
