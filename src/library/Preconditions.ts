import { IllegalArgumentException, NullPointerException } from "./Exceptions";

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
        if (reference == null || errorMessage == undefined) {
            if (errorMessage == null) {
                errorMessage = "";
            } else {
                errorMessage = Preconditions.format(errorMessage, errorMessageArg1, errorMessageArg2);
            }
            throw new NullPointerException(errorMessage);
        }
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
