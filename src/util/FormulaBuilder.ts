import { SetUpService } from "../service/SetUpService";

export class FormulaBuilder {
    private formulaString: string = "";

    private constructor () {
    }

    public static newBuilder(): FormulaBuilder {
        return new FormulaBuilder();
    }

    public COUNTIF(range1: string, range2: string): FormulaBuilder {
        this.formulaString = `COUNTIF(${range1},${range2})`;
        return this;
    }

    public showIfNonZero(): FormulaBuilder {
        this.formulaString = `IF(${this.formulaString} = 0,,${this.formulaString})`;
        return this;
    }

    public build(): string {
        return "=" + this.formulaString;
    }
}