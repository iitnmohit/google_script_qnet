import { Preconditions } from "./Preconditions";

type PredicateType<T> = (t: T) => boolean;

export class Predicate<T> {
    constructor (private condition: PredicateType<T>) { }

    public static of<T>(condition: PredicateType<T>): Predicate<T> {
        return new Predicate(condition);
    }

    public test(x: T): boolean {
        return this.condition(x);
    }

    public and(input: Predicate<T>): Predicate<T> {
        Preconditions.checkNotNull(input);
        return Predicate.of((t: T) => {
            return this.test(t) && input.test(t);
        });
    }

    public negate(): Predicate<T> {
        return Predicate.of((t: T) => {
            return !this.test(t);
        });
    }

    public or(input: Predicate<T>): Predicate<T> {
        Preconditions.checkNotNull(input);
        return Predicate.of((t: T) => {
            return this.test(t) || input.test(t);
        });
    }
}