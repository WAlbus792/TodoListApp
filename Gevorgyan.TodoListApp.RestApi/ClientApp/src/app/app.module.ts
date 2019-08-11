// Modules
import { NgModule, Injector } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestureConfig } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ServiceProxyModule } from './core/service-proxies/service-proxy.module';
import { BlockUIModule } from 'ng-block-ui';
import { MatTabsModule } from '@angular/material/tabs';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { CoreModule } from './core/core.module';
import { PartialsModule } from './content/partials/partials.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from './content/layout/layout.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './content/login.component';

// Services
import { LayoutConfigService } from './core/services/layout-config.service';
import { MenuConfigService } from './core/services/menu-config.service';
import { UtilsService } from './core/services/utils.service';
import { ClassInitService } from './core/services/class-init.service';
import { LayoutConfigStorageService } from './core/services/layout-config-storage.service';
import { HeaderService } from './core/services/layout/header.service';
import { MenuHorizontalService } from './core/services/layout/menu-horizontal.service';
import { MenuAsideService } from './core/services/layout/menu-aside.service';
import { LayoutRefService } from './core/services/layout/layout-ref.service';
import { SplashScreenService } from './core/services/splash-screen.service';

// Others

import { ServiceLocator } from './core/service-locator';
import 'hammerjs';

import { AppRouteGuard, LoginGuard, AdminRouteGuard, UserRouteGuard } from "./app-route-guard";

import { API_BASE_URL } from './core/service-proxies/service-proxy-base';
import { currentEnvironment, Environment } from './core/environment';
// initializes the current environment
Environment.load();

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        OverlayModule,
        CoreModule,
        PartialsModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        ServiceProxyModule,
        BlockUIModule.forRoot(),
        TreeViewModule,
        GridModule,
        LayoutModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRadioModule,
        MatSelectModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
    ],
    providers: [
        LayoutConfigService,
        LayoutConfigStorageService,
        LayoutRefService,
        MenuConfigService,
        UtilsService,
        ClassInitService,
        AppRouteGuard,
        LoginGuard,
        AdminRouteGuard,
        UserRouteGuard,
        SplashScreenService,

        // template services
        HeaderService,
        MenuHorizontalService,
        MenuAsideService,
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: GestureConfig
        },
        { provide: API_BASE_URL, useValue: currentEnvironment.remoteServiceBaseUrl },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(injector: Injector) {
        ServiceLocator.injector = injector;
    }
}
