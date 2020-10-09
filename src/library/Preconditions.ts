import { IllegalArgumentException, NullPointerException } from "./Exceptions";
import { Predicates } from "./Predicates";

export class Preconditions {
    private constructor () { }

    /**
     * Ensures the truth of an expression involving one or more parameters to the calling method.
     */
    public static checkArgument(expression: boolean): void;
    public static checkArgument(expression: boolean, errorMessage: string): void;
    public static checkArgument(expression: boolean, errorMessage: string, errorMessageArg1: string | number): void;
    public static checkArgument(expression: boolean, errorMessage: string, errorMessageArg1: string | number, errorMessageArg2: string | number): void;
    public static checkArgument(expression: boolean, errorMessage?: string, errorMessageArg1?: string | number, errorMessageArg2?: string | number): void {
        if (!expression) {
            if (errorMessage == null) {
                errorMessage = "";
            } else {
                errorMessage = Preconditions.format(errorMessage, errorMessageArg1, errorMessageArg2);
            }
            throw new IllegalArgumentException(errorMessage);
        }
    }

    /**
     * Ensures that an object reference passed as a parameter to the calling method is not null.
     */

    public static checkNotNull<T>(reference: T): T;
    public static checkNotNull<T>(reference: T, errorMessage: string): T;
    public static checkNotNull<T>(reference: T, errorMessage: string, errorMessageArg1: string | number): T;
    public static checkNotNull<T>(reference: T, errorMessage: string, errorMessageArg1: string | number, errorMessageArg2: string | number): T;
    public static checkNotNull<T>(reference: T, errorMessage?: string, errorMessageArg1?: string | number, errorMessageArg2?: string | number): T {
        if (reference == null || reference == undefined) {
            if (errorMessage == null) {
                errorMessage = "";
            } else {
                errorMessage = Preconditions.format(errorMessage, errorMessageArg1, errorMessageArg2);
            }
            throw new NullPointerException(errorMessage);
        }
        return reference;
    }

    /**
     * Ensures that an object reference passed as a parameter to the calling method is POSITIVE NUMBER.
     */

    public static checkPositive<T>(reference: T): T;
    public static checkPositive<T>(reference: T, errorMessage: string): T;
    public static checkPositive<T>(reference: T, errorMessage: string, errorMessageArg1: string | number): T;
    public static checkPositive<T>(reference: T, errorMessage: string, errorMessageArg1: string | number, errorMessageArg2: string | number): T;
    public static checkPositive<T>(reference: T, errorMessage?: string, errorMessageArg1?: string | number, errorMessageArg2?: string | number): T {
        Preconditions.checkNotNull(reference, errorMessage, errorMessageArg1, errorMessageArg2);
        let isValid: boolean = false;
        if (typeof reference === "number") {
            if (reference > 0) {
                isValid = true;
            }
        }
        Preconditions.checkArgument(isValid, errorMessage, errorMessageArg1, errorMessageArg2);
        return reference;
    }

    /**
     * Ensures that an object reference passed as a parameter to the calling method is true.
     */

    public static checkTrue<T>(reference: T): T;
    public static checkTrue<T>(reference: T, errorMessage: string): T;
    public static checkTrue<T>(reference: T, errorMessage: string, errorMessageArg1: string | number): T;
    public static checkTrue<T>(reference: T, errorMessage: string, errorMessageArg1: string | number, errorMessageArg2: string | number): T;
    public static checkTrue<T>(reference: T, errorMessage?: string, errorMessageArg1?: string | number, errorMessageArg2?: string | number): T {
        Preconditions.checkNotNull(reference, errorMessage, errorMessageArg1, errorMessageArg2);
        let isValid: boolean = false;
        if (typeof reference === "boolean") {
            isValid = reference;
        }
        Preconditions.checkArgument(isValid, errorMessage, errorMessageArg1, errorMessageArg2);
        return reference;
    }

    /**
     * Ensures that an object reference passed as a parameter to the calling method is false.
     */

    public static checkFalse<T>(reference: T): T;
    public static checkFalse<T>(reference: T, errorMessage: string): T;
    public static checkFalse<T>(reference: T, errorMessage: string, errorMessageArg1: string | number): T;
    public static checkFalse<T>(reference: T, errorMessage: string, errorMessageArg1: string | number, errorMessageArg2: string | number): T;
    public static checkFalse<T>(reference: T, errorMessage?: string, errorMessageArg1?: string | number, errorMessageArg2?: string | number): T {
        Preconditions.checkNotNull(reference, errorMessage, errorMessageArg1, errorMessageArg2);
        let isValid: boolean = false;
        if (typeof reference === "boolean") {
            isValid = !reference;
        }
        Preconditions.checkArgument(isValid, errorMessage, errorMessageArg1, errorMessageArg2);
        return reference;
    }

    /**
     * Ensures that an object reference passed as a parameter to the calling method is not blank string.
     */

    public static checkNotBlank<T>(reference: T): T;
    public static checkNotBlank<T>(reference: T, errorMessage: string): T;
    public static checkNotBlank<T>(reference: T, errorMessage: string, errorMessageArg1: string | number): T;
    public static checkNotBlank<T>(reference: T, errorMessage: string, errorMessageArg1: string | number, errorMessageArg2: string | number): T;
    public static checkNotBlank<T>(reference: T, errorMessage?: string, errorMessageArg1?: string | number, errorMessageArg2?: string | number): T {
        Preconditions.checkNotNull(reference, errorMessage, errorMessageArg1, errorMessageArg2);
        let isValid: boolean = false;
        if (typeof reference === "string") {
            if (Predicates.IS_NOT_BLANK.test(reference)) {
                isValid = true;
            }
        }
        Preconditions.checkArgument(isValid, errorMessage, errorMessageArg1, errorMessageArg2);
        return reference;
    }

    /**
    * Ensures that an object reference passed as a parameter to the calling method is typeof string.
    */

    public static checkTypeOfString<T>(reference: T): T;
    public static checkTypeOfString<T>(reference: T, errorMessage: string): T;
    public static checkTypeOfString<T>(reference: T, errorMessage: string, errorMessageArg1: string | number): T;
    public static checkTypeOfString<T>(reference: T, errorMessage: string, errorMessageArg1: string | number, errorMessageArg2: string | number): T;
    public static checkTypeOfString<T>(reference: T, errorMessage?: string, errorMessageArg1?: string | number, errorMessageArg2?: string | number): T {
        Preconditions.checkNotNull(reference, errorMessage, errorMessageArg1, errorMessageArg2);
        let isValid: boolean = false;
        if (typeof reference === "string") {
            isValid = true;
        }
        Preconditions.checkArgument(isValid, errorMessage, errorMessageArg1, errorMessageArg2);
        return reference;
    }

    public static format(template: string, errorMessageArg1: string | number): string;
    public static format(template: string, errorMessageArg1: string | number, errorMessageArg2: string | number): string;
    public static format(template: string, errorMessageArg1: string | number, errorMessageArg2?: string | number): string {
        let message = template;
        if (template == null || template == undefined) {
            message = "null";
        }
        if (errorMessageArg1 != null && errorMessageArg1 != undefined) {
            message = message.replace("%s", errorMessageArg1.toString());
            if (errorMessageArg2 != null && errorMessageArg2 != undefined) {
                message = message.replace("%s", errorMessageArg2.toString());
            }
        }
        return message;
    }
}
