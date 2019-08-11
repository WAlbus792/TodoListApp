import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialogConfig } from "@angular/material/dialog";
import { currentEnvironment } from '../../../core/environment';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AboutComponent {

    // #region Dialog Config

    /**
       * Sets the dialog config
     */
    static dialogConfig: MatDialogConfig =
        {
            width: "600px",
            panelClass: "about-dialog"
        };

    // #endregion Dialog Config

    get version(): string {
        return currentEnvironment.version;
    }
}
