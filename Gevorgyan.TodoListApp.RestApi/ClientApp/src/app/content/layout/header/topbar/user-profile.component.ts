import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { UserSessionProvider } from '../../../../core/user-session-provider';
import { MatDialog } from '@angular/material/dialog';
import { ComponentBase } from '../../../../core/component-base';
import { Subscription } from 'rxjs';

@Component({
    selector: 'm-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['user-profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent extends ComponentBase implements OnInit {

    // #region Init

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private sanitizer: DomSanitizer,
        private userSession: UserSessionProvider,
    ) {
        super();
    }

    ngOnInit(): void {
        if (!this.avatarBg)
            this.avatarBg = this.sanitizer.bypassSecurityTrustStyle('url(./assets/img/user_profile_bg.jpg)');
    }

    // #endregion Init

    // #region Fields and properties

    @HostBinding('class')
    classes = 'm-nav__item m-topbar__user-profile m-topbar__user-profile--img m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light';

    @HostBinding('attr.m-dropdown-toggle') attrDropdownToggle = 'click';
    
    @Input() avatarBg: SafeStyle = '';

    @ViewChild('mProfileDropdown', { static: false }) mProfileDropdown: ElementRef;

    /**
     * Refresh the page
     */
    refresh(): void {
        window.location.reload();
    }

    /**
     * Gets the current user name
     * */
    get shownName() {
        return this.userSession.name;
    }

    // #endregion Fields and properties

    // #region Methods

    /**
     * Sign-out of profile
     * */
    logout() {
        this.userSession.finishSession();
        this.router.navigate(["/login"]);
    }

    /**
     * Returns the source of the profile picture
     */
    getUserImage(): string {
        return './assets/img/user.png';
    }

    // #endregion Methods    
}
