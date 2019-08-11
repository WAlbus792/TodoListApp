import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit, ViewChild, } from '@angular/core';
import { LayoutConfigService } from './core/services/layout-config.service';
import { ClassInitService } from './core/services/class-init.service';
import * as objectPath from 'object-path';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SplashScreenService } from './core/services/splash-screen.service';

// LIST KNOWN ISSUES
// [Violation] Added non-passive event listener; https://github.com/angular/angular/issues/8866

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'body[m-root]',
    templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit, OnInit {
    title = 'Metronic';

    @HostBinding('style') style: any;
    @HostBinding('class') classes: any = '';

    @ViewChild('splashScreen', { read: ElementRef, static: false })
    splashScreen: ElementRef;
    splashScreenImage: string;

    constructor(
        private layoutConfigService: LayoutConfigService,
        private classInitService: ClassInitService,
        private sanitizer: DomSanitizer,
        private router: Router,
        private splashScreenService: SplashScreenService
    ) {
        // subscribe to class update event
        this.classInitService.onClassesUpdated$.subscribe(classes => {
            // get body class array, join as string classes and pass to host binding class
            setTimeout(() => this.classes = classes.body.join(' '));
        });

        this.layoutConfigService.onLayoutConfigUpdated$.subscribe(model => {
            this.classInitService.setConfig(model);

            this.style = '';
            if (objectPath.get(model.config, 'self.layout') === 'boxed') {
                const backgroundImage = objectPath.get(model.config, 'self.background');
                if (backgroundImage) {
                    this.style = this.sanitizer.bypassSecurityTrustStyle('background-image: url(' + objectPath.get(model.config, 'self.background') + ')');
                }
            }

            //	splash screen image
            if (!this.splashScreenImage)
                this.splashScreenImage = objectPath.get(model.config, 'loader.image');
        });
    }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        if (this.splashScreen) {
            this.splashScreenService.init(this.splashScreen.nativeElement);
        }
    }
}
