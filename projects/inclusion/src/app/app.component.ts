
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent
{
    title = 'Registro de Publicaciones Científicas';

    // TODO: Parametrizar usando el vocabulario 'organismos', en el primer nivel tiene los organismos de nivel
    // superior, en principio esta app puede usarse para otros osde
    organization = 'Ministerio de Educación Superior';
}
