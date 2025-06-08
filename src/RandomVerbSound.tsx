
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
        <>
            {"This app does not teach you english to Japanese. It will only give you the opportunity to listen to speech."}
        </>
        <div className="card">

            <button onClick={() => {
                setRandomVerb(getRandomVerb())
                setShowWord(false);
            }}>TRY NEW WORD</button>
            <button onClick={() => {
                textToSpeech(randomVerb.outputKana)
            }}>PLAY WORD</button>
            <button onClick={
                () => setShowWord(!showWord)
            }>{showWord ? "Hide Word" : "Show Word"}</button>
            <div className="card">
                {showWord ? randomVerb.outputKanji : ""} 
            </div>
        </div>
    </div>)
    

}