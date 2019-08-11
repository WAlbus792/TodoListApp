import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import * as objectPath from 'object-path';

@Component({
	selector: 'm-portlet',
	templateUrl: './portlet.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortletComponent implements OnInit, AfterViewInit {
	@Input() options: any;

    @ViewChild('mPortlet', { static: false }) elPortlet: ElementRef;
    @ViewChild('mPortletHead', { static: false }) elHead: ElementRef;
    @ViewChild('mPortletBody', { static: false }) elBody: ElementRef;
    @ViewChild('mPortletFooter', { static: false }) elFooter: ElementRef;
    @ViewChild('mPortletHeadTools', { static: false }) elHeadTools: ElementRef;

	constructor() {
	}

	ngAfterViewInit(): void {
		// hide portlet footer if no content
		if (this.elFooter && this.elFooter.nativeElement.children.length == 0) {
			this.elFooter.nativeElement.style.display = 'none';
			this.elPortlet.nativeElement.classList.add('m-portlet--full-height');
		}
		// add portlet responsive mobile for sticky portlet
		if (objectPath.get(this.options, 'enableSticky')) {
			this.elPortlet.nativeElement.classList.add('m-portlet--responsive-mobile');
        }
        if (objectPath.get(this.options, 'isInnerPortlet')) {
            this.elPortlet.nativeElement.classList.add('m-portlet__inner');
        }
        if (objectPath.get(this.options, 'isPortletWithoutHead')) {
            this.elPortlet.nativeElement.classList.add('m-portlet__without_head');
        }
		// hide portlet header tools if no content
		if (this.elHeadTools && this.elHeadTools.nativeElement.children.length == 0) {
			this.elHeadTools.nativeElement.style.display = 'none';
		}
	}

	ngOnInit() {}
}
