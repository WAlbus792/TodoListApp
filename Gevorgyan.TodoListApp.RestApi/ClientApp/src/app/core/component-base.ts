import Swal from "sweetalert2";
import { ServiceLocator } from "./service-locator";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { UserSessionProvider } from './user-session-provider';
import { Router } from '@angular/router';
import { UserRole } from './dictionaries/UserRole';

/**
 * Base class for all components
 */
export abstract class ComponentBase {

    @BlockUI() blockUI: NgBlockUI;

    /**
     * Blocks UI showing busy-indicator
     */
    public blockPage() {
        this.blockUI.start();
    }

    /**
     * Unblocks UI hiding busy-indicator
     */
    public unblockPage() {
        this.blockUI.stop();
    }

    /**
     * Shows an error message popup
     * @param message Message text
     */
    public showError(message: string) {
        toastr.options.positionClass = "toast-bottom-right";
        toastr.options.showMethod = "slideDown";
        toastr.error(message);
    }

    /**
     * Shows error message in modal window
     * @param message Message text
     */
    public showErrorModal(message: string) {
        Swal.fire({
            text: message,
            type: "error"
        });
    }

    /**
     * Shows a warning message popup
     * @param message Message text
     */
    public showWarning(message: string) {
        toastr.warning(message);
    }

    /**
     * Shows a warning message in modal window
     * @param message Message text
     */
    public showWarningModal(message: string) {
        Swal.fire({
            text: message,
            type: "warning"
        });
    }

    /**
     * Shows an info message popup
     * @param message Message text
     */
    public showInfo(message: string) {
        toastr.options.positionClass = "toast-bottom-right";
        toastr.options.showMethod = "slideDown";
        toastr.info(message);
    }

    /**
     * Shows an info message in modal window
     * @param message Message text
     */
    public showInfoModal(message: string) {
        Swal.fire({
            text: message,
            type: "info"
        });
    }

    /**
     * Shows a success message popup
     * @param message Message text
     */
    public showSuccess(message: string) {
        toastr.options.positionClass = "toast-bottom-right";
        toastr.options.showMethod = "slideDown";
        toastr.success(message);
    }

    /**
     * Shows a success message in modal window
     * @param message Message text
     */
    public showSuccessModal(message: string) {
        Swal.fire({
            text: message,
            type: "success"
        });
    }

    /**
     * Shows the confirmation window
     */
    public showConfirm(message: string): Promise<boolean> {

        let swalPromise = Swal.fire({
            text: message,
            type: "question",
            showCancelButton: true,
            confirmButtonColor: "#22b794",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            buttonsStyling: true
        });

        return new Promise<boolean>((resolve) => swalPromise.then(result => resolve(result.value != undefined)));
    }

    /**
     * Parses an error message text
     */
    public parseError(error: any): Promise<string> {
        const defaultErrorMessage: string = error.status == "403" ? "Occured an authorization error" : "Occured an error";
        return new Promise<string>((resolve) => {
            if (!error.response) {
                console.error(error);
                resolve(defaultErrorMessage);
            } else {
                let message = JSON.parse(error.response).message;
                resolve(message);
            }
        });
    }

    /**
     * Parses an error message and shows
     */
    public async parseAndShowError(error: any) {
        if (error.status == "403") {
            ServiceLocator.injector.get(UserSessionProvider).finishSession();
            ServiceLocator.injector.get(Router).navigate(["/login"]);
        }

        let errorMessage: string = await this.parseError(error);
        this.showError(errorMessage);
    }

    public getBoolName(value: boolean): string {
        return value ? "Yes" : "No";
    }  

    public isUserAdmin(): boolean {
        return ServiceLocator.injector.get(UserSessionProvider).role == UserRole.Admin;
    }
}
