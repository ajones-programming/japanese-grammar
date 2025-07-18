
import { useState } from "react";
import { loadTTS} from "./TextToSpeech";
import { RateSlider } from "./RateSlider";
import { getRandomSentence, sentenceData } from "./getRandomSentence";

interface props {
    loaded : boolean
}

export function RandomSentence({loaded} : props){
    if (!loaded){
        return (<div>
            "not loaded! error!!"
        </div>)
    }

    const [randomSentence, setRandomSentence] = useState<sentenceData>(() => getRandomSentence());
    const [showWord, setShowWord] = useState(false);
    const [rate, setRate] = useState<number>(1.0);
    const [buttonActive, setButtonActive] = useState<boolean>(true);

    return (
    <div>
        <h2>
            Japanese N5 Sentences - Randomised
        </h2>
        <p>
            Hear randomised grammatically correct words and sentences, and learn to hear natural pronunciation from Google Cloud's Text-to-Speech AI. 
        </p>
        <div className="flex justify-center">
            <button className="w-1/3" onClick={
                buttonActive ? () => {
                setRandomSentence(getRandomSentence())
                setShowWord(false);} : undefined
                }
                disabled={!buttonActive}
            >
                {buttonActive ? "New Phrase" : "..."}
            </button>

            <button  onClick={
                buttonActive ? (() => loadTTS(setButtonActive, randomSentence.tts, rate)) : undefined
            } className="w-1/3"
            disabled={!buttonActive}
            >
                {buttonActive ? "Play" : "..."}
            </button>
            
            <button className="w-1/3" onClick={
                () => setShowWord(!showWord)
            }>
                {showWord ? "Hide Word" : "Show Word"}
            </button>
        </div>
        <RateSlider rate={rate} setRate={setRate}/>
        <p className="container-small min-h-8 align-middle">
            {showWord ?  (randomSentence.kanji + " (" + randomSentence.kana + ")") : ""} 
        </p>
    </div>)

}