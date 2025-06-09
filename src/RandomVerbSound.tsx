
import { useState } from "react";
import { textToSpeech } from "./TextToSpeech";
import { allVerbs, allVerbConjuctions } from "./types/util";
import { conjunctionResult } from "./types/conjugationList";



function getRandomVerb() : conjunctionResult
{
    if (!allVerbs || !allVerbConjuctions ){
        throw("EITHER VERBS OR CONJUGATIONS NOT DEFINED?? WEIRD")
    }
    const randomV = allVerbs[Math.floor(Math.random() * allVerbs.length)];
    const randomC = allVerbConjuctions[Math.floor(Math.random() * allVerbConjuctions.length)];
    return randomC.runExpression(randomV);
}

interface props {
    loaded : boolean
}

export function RandomVerbSound({loaded} : props){
    if (!loaded){
        return (<div>
            "not loaded! error!!"
        </div>)
    }

    const [randomVerb, setRandomVerb] = useState<conjunctionResult>(getRandomVerb());
    const [showWord, setShowWord] = useState(false);

    return (
    <div>
        <h2>
            Japanese Verb Conjugation - Randomised
        </h2>
        <p>
            Hear randomised verb conjugation, and learn to hear natural pronunciation from Google Cloud's Text-to-Speech AI. 
        </p>
        <div>
            <button onClick={() => {
                setRandomVerb(getRandomVerb())
                setShowWord(false);
            }}>
                Try New Word
            </button>

            <button onClick={() => {
                textToSpeech(randomVerb.outputKana)
            }}>
                Play Word
            </button>
            
            <button onClick={
                () => setShowWord(!showWord)
            }>
                {showWord ? "Hide Word" : "Show Word"}
            </button>
        </div>
        <p>
            {showWord ? (randomVerb.outputKanji + " (" + randomVerb.outputKana + ")") : ""} 
        </p>
    </div>)
    

}