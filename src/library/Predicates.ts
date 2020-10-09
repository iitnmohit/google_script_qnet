import { Predicate } from "./Predicate";

export class Predicates {
    private constructor () { }

    public static IS_NULL: Predicate<any> = Predicate.of((object: any) => {
        return (object == null || object == undefined);
    });

    public static IS_NOT_NULL: Predicate<any> = Predicate.of((object: any) => {
        return Predicates.IS_NULL.negate().test(object);
    });

    public static IS_POSITIVE: Predicate<number> = Predicate.of((num: number) => {
        return Predicates.IS_NOT_NULL.test(num) && num > 0;
    });

    public static IS_NOT_POSITIVE: Predicate<number> = Predicate.of((num: number) => {
        return Predicates.IS_POSITIVE.negate().test(num);
    });

    public static IS_ZERO: Predicate<number> = Predicate.of((num: number) => {
        return Predicates.IS_NOT_NULL.test(num) && num == 0;
    });

    public static IS_NOT_BLANK: Predicate<string> = Predicate.of((str: string) => {
        return Predicates.IS_NOT_NULL.test(str) && Predicates.IS_POSITIVE.test(str.trim().length);
    });

    public static IS_BLANK: Predicate<string> = Predicate.of((str: string) => {
        return Predicates.IS_NOT_BLANK.negate().test(str);
    });

    public static IS_LIST_EMPTY: Predicate<Array<any>> = Predicate.of((arr: Array<any>) => {
        return Predicates.IS_NULL.test(arr) || Predicates.IS_ZERO.test(arr.length);
    });

    public static IS_LIST_NOT_EMPTY: Predicate<Array<any>> = Predicate.of((arr: Array<any>) => {
        return Predicates.IS_LIST_EMPTY.negate().test(arr);
    });

}

