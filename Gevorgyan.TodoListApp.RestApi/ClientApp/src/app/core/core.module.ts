import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuAsideDirective } from './directives/menu-aside.directive';
import { MenuAsideOffcanvasDirective } from './directives/menu-aside-offcanvas.directive';
import { ScrollTopDirective } from './directives/scroll-top.directive';
import { HeaderDirective } from './directives/header.directive';
import { MenuAsideToggleDirective } from './directives/menu-aside-toggle.directive';
import { JoinPipe } from './pipes/join.pipe';
import { GetObjectPipe } from './pipes/get-object.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { PortletDirective } from './directives/portlet.directive';
import { UserSessionProvider } from './user-session-provider';
import { HrefPreventDefaultDirective } from './directives/href-prevent-default.directive';

@NgModule({
	imports: [CommonModule],
	declarations: [
		// directives
		MenuAsideDirective,
		MenuAsideOffcanvasDirective,
		ScrollTopDirective,
		HeaderDirective,
		MenuAsideToggleDirective,
        PortletDirective,
        HrefPreventDefaultDirective,

		// pipes
		JoinPipe,
		GetObjectPipe,
		SafePipe
	],
	exports: [
		// directives
		MenuAsideDirective,
		MenuAsideOffcanvasDirective,
		ScrollTopDirective,
		HeaderDirective,
		MenuAsideToggleDirective,
        PortletDirective,
        HrefPreventDefaultDirective,

		// pipes
		JoinPipe,
		GetObjectPipe,
        SafePipe
    ],
    providers: [UserSessionProvider]
})
export class CoreModule {}
