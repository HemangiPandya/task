import { isNull } from "@angular/compiler/src/output/output_ast";
import { NullVisitor } from "@angular/compiler/src/render3/r3_ast";
import { AbstractControl, ValidatorFn } from "@angular/forms"



export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
   return (control: AbstractControl): {[key: string]: any} | null => {
        const forbidden = forbiddenName.test(control.value);
        return forbidden ? { 'forbiddenName': {value: control.value}}: null;  
    };
}