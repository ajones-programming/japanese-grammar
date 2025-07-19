

import { AdjectiveConjugation, I_AdjectiveConjuction, I_NounConjuction, I_VerbConjuction, NounConjugation, verbConjugation } from "./conjugationList";
import { aruVerb, godanVerb, I_aru, I_Godan, I_Ichidan, I_iku, I_kuru, I_suru, ichidanVerb, ikuVerb, kuruVerb, suruVerb as suruVerb, verb } from "./verbs";
import { list} from "../assets/vocabulary.json"
import { c_list } from "../assets/conjunctions.json"
import { I_noun, noun } from "./nouns";
import { adjective, I_i_adjective, I_na_adjective, iAdjective, naAdjective } from "./adjectives";
import { counter, I_counter } from "./counter";

export var allVerbs:  { [id: string] : verb[]; }  | undefined;
export var allNouns : { [id: string] : noun[]; }  | undefined;
export var allAdjectives : {[id: string] : adjective[]; } | undefined;
export var allCounters : {[id: string] : counter[]; } | undefined;
export var allVerbConjuctions: {[id: string] : verbConjugation[]; } | undefined;
export var allNounConjunctions : {[id: string] : NounConjugation[]; }| undefined;
export var allAdjectiveConjunctions : {[id: string] : AdjectiveConjugation[]; } | undefined;
export const allTags : string[] = [];


export function loadAll(){
    allVerbs = {};
    allNouns = {};
    allAdjectives = {};
    allVerbConjuctions = {};
    allNounConjunctions = {};
    allAdjectiveConjunctions = {};
    allCounters = {};


    list.forEach(grade =>
    {
        if (grade.tag){
            allTags.push(grade.tag);
        }
        if (allVerbs && grade.tag){
            const verbList : verb[] = [];
            grade.verbs.i_godan.forEach( i =>
                {
                    verbList.push(new godanVerb(i as I_Godan));
                }
            )
            grade.verbs.i_ichidan.forEach( i =>
                {
                    verbList.push(new ichidanVerb(i as I_Ichidan));
                }
            )
            grade.verbs.i_suru.forEach( i =>
                {
                    verbList.push(new suruVerb(i as I_suru));
                }
            )
            grade.verbs.i_iku.forEach( i =>
                {
                    verbList.push(new ikuVerb(i as I_iku));
                }
            )
            grade.verbs.i_kuru.forEach( i =>
                {
                    verbList.push(new kuruVerb(i as I_kuru));
                }
            )
            grade.verbs.i_aru.forEach( i =>
                {
                    verbList.push(new aruVerb(i as I_aru));
                }
            )
            grade.include.forEach((i : string) => {
                if (allVerbs && allVerbs[i]){
                    verbList.push(...allVerbs[i]);
                }
            })

            allVerbs[grade.tag ?? "UNDEFINED"] = verbList;
        }

        if (allNouns && grade.tag){
            const nounList : noun[] = [];
            grade.nouns.forEach( i =>
                {
                    nounList.push(new noun(i as I_noun));
                }
            )
            grade.include.forEach((i : string) => {
                if (allNouns && allNouns[i]){
                    nounList.push(...allNouns[i]);
                }
            })
            allNouns[grade.tag ?? "UNDEFINED"] = nounList;
        }

        if (allAdjectives && grade.tag){
            const adjectiveList : adjective[] = [];
            grade.adjectives.i_na_adjective.forEach(i => {
                adjectiveList.push(new naAdjective(i as I_na_adjective));
            })

            grade.adjectives.i_i_adjective.forEach(i => {
                adjectiveList.push(new iAdjective(i as I_i_adjective));
            })

            grade.include.forEach((i : string) => {
                if (allAdjectives && allAdjectives[i]){
                    adjectiveList.push(...allAdjectives[i]);
                }
            })
            allAdjectives[grade.tag ?? "UNDEFINED"] = adjectiveList;
        }

        if (allCounters && grade.tag){
            const counterList : counter[] = [];
            grade.counters.forEach(i => {
                counterList.push(new counter(i as I_counter));
            })

            grade.include.forEach((i : string) => {
                if (allCounters && allCounters[i]){
                    counterList.push(...allCounters[i]);
                }
            })
            allCounters[grade.tag ?? "UNDEFINED"] = counterList;
        }


    }   
    )

    c_list.forEach(grade =>{
        if (allVerbConjuctions && grade.tag){
            const verbConjunction : verbConjugation[] = [];
            grade.i_verbConjunctions.forEach(i => 
                {
                    verbConjunction.push(new verbConjugation(i as I_VerbConjuction));
                }
            )
            grade.include.forEach((i : string) => {
                if (allVerbConjuctions && allVerbConjuctions[i]){
                    verbConjunction.push(...allVerbConjuctions[i]);
                }
            })
            allVerbConjuctions[grade.tag ?? "UNDEFINED"] = verbConjunction;
        }
        if (allNounConjunctions && grade.tag){
            const nounConjunction : NounConjugation[] = [];
            grade.i_nounConjunctions.forEach(i => 
                {
                    nounConjunction.push(new NounConjugation(i as I_NounConjuction));
                }
            )
            grade.include.forEach((i : string) => {
                if (allNounConjunctions && allNounConjunctions[i]){
                    nounConjunction.push(...allNounConjunctions[i]);
                }
            })
            allNounConjunctions[grade.tag ?? "UNDEFINED"] = nounConjunction;
        }
        if (allAdjectiveConjunctions && grade.tag){
            const adjectiveConjunction : AdjectiveConjugation[] = [];
            grade.i_adjectiveConjuctions.forEach(i => 
                {
                    adjectiveConjunction.push(new AdjectiveConjugation(i as I_AdjectiveConjuction));
                }
            )
            grade.include.forEach((i : string) => {
                if (allAdjectiveConjunctions && allAdjectiveConjunctions[i]){
                    adjectiveConjunction.push(...allAdjectiveConjunctions[i]);
                }
            })
            allAdjectiveConjunctions[grade.tag ?? "UNDEFINED"] = adjectiveConjunction;
        }
    })
    
}