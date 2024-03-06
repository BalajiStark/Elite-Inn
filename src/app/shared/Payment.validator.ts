import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PaymentValidator {
    static shouldValidExpiry(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf('/') != 2 || (control.value as string).length != 5) {
            return { shouldValidExpiry: true };
        }
        return null;
    }
}