

import { AdjectiveConjugation, I_AdjectiveConjuction, I_NounConjuction, I_VerbConjuction, NounConjugation, verbConjugation } from "./conjugationList";
import { aruVerb, exceptionVerb, godanVerb, I_aru, I_exceptionVerb as I_exception, I_Godan, I_Ichidan, I_iku, I_kuru, I_suru, ichidanVerb, ikuVerb, kuruVerb, suruVerb as suruVerb, verb } from "./verbs";
import { n5} from "../assets/vocabulary.json"
import { i_verbConjunctions, i_nounConjunctions, i_adjectiveConjuctions } from "../assets/conjunctions.json"
import { I_noun, noun } from "./nouns";
import { adjective, I_i_adjective, I_na_adjective, iAdjective, naAdjective } from "./adjectives";
import { counter, I_counter } from "./counter";

export var allVerbs:  { [id: string] : verb[]; }  | undefined;
export var allNouns : { [id: string] : noun[]; }  | undefined;
export var allAdjectives : {[id: string] : adjective[]; } | undefined;
export var allCounters : {[id: string] : counter[]; } | undefined;
export var allVerbConjuctions: verbConjugation[] | undefined;
export var allNounConjunctions : NounConjugation[] | undefined;
export var allAdjectiveConjunctions : AdjectiveConjugation[] | undefined;


export function loadAll(){
    allVerbs = {};
    allVerbs.n5 = [];

    n5.verbs.i_godan.forEach( i =>
        {
            allVerbs?.n5.push(new godanVerb(i as I_Godan));
        }
    )
    n5.verbs.i_ichidan.forEach( i =>
        {
            allVerbs?.n5.push(new ichidanVerb(i as I_Ichidan));
        }
    )
    n5.verbs.i_suru.forEach( i =>
        {
            allVerbs?.n5.push(new suruVerb(i as I_suru));
        }
    )
    n5.verbs.i_iku.forEach( i =>
        {
            allVerbs?.n5.push(new ikuVerb(i as I_iku));
        }
    )
    n5.verbs.i_kuru.forEach( i =>
        {
            allVerbs?.n5.push(new kuruVerb(i as I_kuru));
        }
    )
    n5.verbs.i_aru.forEach( i =>
        {
            allVerbs?.n5.push(new aruVerb(i as I_aru));
        }
    )
    n5.verbs.i_exception.forEach( i =>
        {
            allVerbs?.n5.push(new exceptionVerb(i as I_exception));
        }
    )

    allNouns = {};
    allNouns.n5 = [];

    n5.nouns.forEach( i =>
        {
            allNouns?.n5.push(new noun(i as I_noun));
        }
    )

    allAdjectives = {};
    allAdjectives.n5 = [];

    n5.adjectives.i_na_adjective.forEach(i => {
        allAdjectives?.n5.push(new naAdjective(i as I_na_adjective));
    })

    n5.adjectives.i_i_adjective.forEach(i => {
        allAdjectives?.n5.push(new iAdjective(i as I_i_adjective));
    })

    allCounters = {};
    allCounters.n5 = [];

    n5.counters.forEach(i => {
        allCounters?.n5.push(new counter(i as I_counter));
    })
    

    allVerbConjuctions = [];
    i_verbConjunctions.forEach(i => 
        {
            allVerbConjuctions?.push(new verbConjugation(i as I_VerbConjuction));
        }
    )

    allNounConjunctions = [];
    i_nounConjunctions.forEach(i => 
        {
            allNounConjunctions?.push(new NounConjugation(i as I_NounConjuction));
        }
    )

    allAdjectiveConjunctions = [];
    i_adjectiveConjuctions.forEach(i => 
        {
            allAdjectiveConjunctions?.push(new AdjectiveConjugation(i as I_AdjectiveConjuction));
        }
    )
    
}