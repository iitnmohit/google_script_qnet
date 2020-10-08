import { Predicate } from "./Predicate";

export class Predicates {
    private constructor () { }

    public static IS_NULL: Predicate<any> = Predicate.of((object: any) => {
        return (object == null || object == undefined);
    });

    public static IS_NOT_NULL: Predicate<any> = Predicate.of((object: any) => {
        return Predicates.IS_NULL.negate().test(object);
    });

    public static IS_POSITIVE: Predicate<number> = Predicate.of((object: number) => {
        return object > 0;
    });

    public static IS_NOT_POSITIVE: Predicate<number> = Predicate.of((object: number) => {
        return Predicates.IS_POSITIVE.negate().test(object);
    });

}

