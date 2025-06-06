import { verb } from "./verbs";


export interface I_VerbConjuction{
    english : string;
    expression : string;
}

export interface conjunctionResult{
    wordEnglish : string;
    conjugationType : string;
    output : string;
    
}


export class verbConjugation{
    public english : string = "";
    private expression : string = "";

    constructor(i : I_VerbConjuction){
        this.english = i.english;
        this.expression = i.expression;
    }

    runExpression(verb : verb) : conjunctionResult{
        var output = this.expression;
        output = output.replace("DICT_FORM",verb.dictForm());
        output = output.replace("MASU_STEM",verb.masuStem());
        output = output.replace("NAI_STEM",verb.naiStem());
        output = output.replace("TE",verb.te());
        output = output.replace("TA",verb.ta());
        output = output.replace("CHA",verb.cha());
        return {
            wordEnglish: verb.english,
            conjugationType: this.english,
            output: output
        };
    }


}