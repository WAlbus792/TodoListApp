import { LayoutModule } from '../layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartialsModule } from '../partials/partials.module';
import { CoreModule } from '../../core/core.module';
import { FormsModule } from '@angular/forms';
import { AdminAreaComponent } from './admin-area.component';
import { AdminAreaRoutingModule } from './admin-area-routing.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { ReactiveFormsModule } from '@angular/forms';
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
import { SharedComponentsModule } from '../shared-components/shared-components.module';

import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    // suppressScrollX: true
};

import { UserListComponent } from './user-list.component';
import { UserCreateUpdateComponent } from './user-create-update.component';

@NgModule({
    declarations: [
        AdminAreaComponent,
        UserListComponent,
        UserCreateUpdateComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AdminAreaRoutingModule,
        CoreModule,
        LayoutModule,
        PartialsModule,
        GridModule,
        InputsModule,
        DropDownsModule,
        MatButtonModule,
        MatMenuModule,
        MatSelectModule,
        MatInputModule,
        MatTableModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatIconModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatCardModule,
        MatDialogModule,
        MatSortModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatTooltipModule,
        TreeViewModule,
        PerfectScrollbarModule,
        ReactiveFormsModule,
        SharedComponentsModule
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
    ],
    entryComponents: [
        UserCreateUpdateComponent
    ]
})
export class AdminAreaModule {
}
