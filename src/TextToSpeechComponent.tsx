import { useState } from "react";
import { loadTTS  } from "./TextToSpeech";
import { RateSlider } from "./RateSlider";


export function TextToSpeechComponent()
{
    const [result, setResult] = useState("");
    const [rate, setRate] = useState<number>(1.0);
    const [buttonActive, setButtonActive] = useState<boolean>(true);

    return <div>
        <h2>Text to Speech - Japanese</h2>
        <p>Input any text for realistic text to speech.</p>
        <div className="flex justify-center">
            <input name="Text Input" value={result} onChange={e => setResult(e.target.value)} className="max-h-fit w-1/2 my-auto"/>
            <button onClick={
                buttonActive ? (() => loadTTS(setButtonActive,result, rate)) : undefined
            } className="max-w-1/4"
            disabled={!buttonActive}
            >
                {buttonActive ? "Play" : "..."}
            </button>
        </div>

        <RateSlider rate={rate} setRate={setRate}/>
    </div>
}