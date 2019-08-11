import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AsideLeftComponent } from './aside/aside-left.component';
import { FooterComponent } from './footer/footer.component';
import { BrandComponent } from './header/brand/brand.component';
import { MenuSectionComponent } from './aside/menu-section/menu-section.component';
import { TopbarComponent } from './header/topbar/topbar.component';
import { CoreModule } from '../../core/core.module';
import { UserProfileComponent } from './header/topbar/user-profile.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LoadingBarModule } from '@ngx-loading-bar/core';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './footer/about.component';

import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    // suppressScrollX: true
};

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        BrandComponent,

        // topbar components
        TopbarComponent,
        UserProfileComponent,
        //ChangePasswordComponent,

        // aside left menu components
        AsideLeftComponent,
        MenuSectionComponent,

        AboutComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        BrandComponent,        

        // topbar components
        TopbarComponent,
        UserProfileComponent,

        // aside left menu components
        AsideLeftComponent
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
    imports: [
        CommonModule,
        RouterModule,
        CoreModule,
        PerfectScrollbarModule,
        FormsModule,
        MatProgressBarModule,
        MatTabsModule,
        MatButtonModule,
        MatTooltipModule,
        MatDialogModule,
        MatInputModule,
        LoadingBarModule,
    ],
    entryComponents: [
        AboutComponent,
    ]
})
export class LayoutModule { }
