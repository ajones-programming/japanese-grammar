

import { I_VerbConjuction, verbConjugation } from "./conjugationList";
import { exceptionVerb, godanVerb, I_exceptionVerb, I_Godan, I_Ichidan, I_iku, I_kuru, I_suru, ichidanVerb, ikuVerb, kuruVerb, suruVerb as suruVerb, verb } from "./verbs";
import { i_godan, i_ichidan, i_exception, i_suru, i_iku, i_kuru} from "../assets/verbs.json"
import { i_verbConjunctions } from "../assets/conjunctions.json"

export var allVerbs: verb[] | undefined;
export var allVerbConjuctions: verbConjugation[] | undefined;

export function loadAll(){
    allVerbs = [];
    i_godan.forEach( i =>
        {
            allVerbs?.push(new godanVerb(i as I_Godan));
        }
    )
    i_ichidan.forEach( i =>
        {
            allVerbs?.push(new ichidanVerb(i as I_Ichidan));
        }
    )
    i_suru.forEach( i =>
        {
            allVerbs?.push(new suruVerb(i as I_suru));
        }
    )
    i_iku.forEach( i =>
        {
            allVerbs?.push(new ikuVerb(i as I_iku));
        }
    )
    i_kuru.forEach( i =>
        {
            allVerbs?.push(new kuruVerb(i as I_kuru));
        }
    )
    i_exception.forEach( i =>
        {
            allVerbs?.push(new exceptionVerb(i as I_exceptionVerb));
        }
    )

    allVerbConjuctions = [];
    i_verbConjunctions.forEach(i => 
        {
            allVerbConjuctions?.push(new verbConjugation(i as I_VerbConjuction));
        }
    )
}