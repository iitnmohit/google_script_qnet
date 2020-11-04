import { Preconditions } from "../library/Preconditions";

/**
 * public builder class for building formulas.
 */
export class FormulaBuilder {
    private formulaHolder: FormulaHolder;

    private constructor ();
    private constructor () {
        this.formulaHolder = new FormulaHolder();
    }

    /**
     * create new builder
     */
    public static newBuilder(): BaseFormula;
    public static newBuilder(): BaseFormula {
        let formulaBuilder = new FormulaBuilder();
        return new BaseFormula(formulaBuilder.formulaHolder);
    }
}

/**
 * internal class for first level formula.
 */
class BaseFormula {
    private holder: FormulaHolder;

    /**
     * @param holder [required] instance of formula holder
     * @throws NullPointerException if holder is null.
     */
    constructor (holder: FormulaHolder);
    constructor (holder: FormulaHolder) {
        Preconditions.checkNotNull(holder);
        this.holder = holder;
    }

    /**
     * builds COUNTA formula
     * @param values [required] values A1 notation to be counted.
     * @throws NullPointerException if values is null.
     * @throws IllegalArgumentException if values is blank string.
     */
    public COUNTA(values: string): OuterFormula;
    public COUNTA(values: string): OuterFormula {
        Preconditions.checkNotBlank(values);
        this.holder.FORMULA_STRING = `COUNTA(${values})`;
        return new OuterFormula(this.holder);
    }

    public COUNTIF(range: string, condition: string): OuterFormula {
        this.holder.FORMULA_STRING = `COUNTIF(${range},${condition})`;
        return new OuterFormula(this.holder);
    }

    public COUNTIF2(range1: string, condition1: string, range2: string, condition2: string): OuterFormula {
        this.holder.FORMULA_STRING = `COUNTIFS(${range1},${condition1},${range2},${condition2})`;
        return new OuterFormula(this.holder);
    }
}

class OuterFormula {
    private holder: FormulaHolder;

    constructor (holder: FormulaHolder) {
        this.holder = holder;
    }

    public showIfNonZero(): OuterFormula {
        let innerFormula = this.holder.FORMULA_STRING;
        this.holder.FORMULA_STRING = `IF(${innerFormula} = 0,,${innerFormula})`;
        return this;
    }

    public subtract(howMany: number): OuterFormula {
        let innerFormula = this.holder.FORMULA_STRING;
        this.holder.FORMULA_STRING = `${innerFormula} - ${howMany}`;
        return this;
    }

    public build(): string {
        return "=" + this.holder.FORMULA_STRING;
    }
}

class FormulaHolder {
    public FORMULA_STRING: string = "";
}