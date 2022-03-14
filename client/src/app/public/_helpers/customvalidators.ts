import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";

export class CustomValidator {
    static passwordsMatching(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value;
        const passwordConfirm = control.get('passwordConfirm')?.value;
        
        if (password === passwordConfirm) {
            return null;
        } else {
            return{passwordsNotMatching: true};
        }
    } 
}