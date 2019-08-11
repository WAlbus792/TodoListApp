import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollTopComponent } from './layout/scroll-top/scroll-top.component';
import { CoreModule } from '../../core/core.module';
import { PortletComponent } from './portlet.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { DropdownListFilterComponent } from './filters/dropdownlist-filter.component';

import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    // suppressScrollX: true
};

@NgModule({
    declarations: [
        ScrollTopComponent,
        PortletComponent,
        DropdownListFilterComponent
    ],
    exports: [
        ScrollTopComponent,
        PortletComponent,
        DropdownListFilterComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        PerfectScrollbarModule,
        GridModule,
        DropDownListModule,
        CoreModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        MatProgressBarModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatTooltipModule
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
    ],
})
export class PartialsModule { }
