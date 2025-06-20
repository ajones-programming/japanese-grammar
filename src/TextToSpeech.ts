// Imports the Google Cloud client library

// Import other required libraries
// Creates a client
// interface request {
//   input : {text : string}
//   voice : {languageCode : string, ssmlGender : 'FEMALE' | 'MALE' | undefined},
//   audioConfig : {audioEncoding : 'MP3'}
// }
const address = "https://ajones-jp-text-to-speech-uk.azurewebsites.net/TTS";
var retrieved : Iterable<number> | undefined;
var previous = "";
var previousRate : number = 0;

//https://stackoverflow.com/questions/59955096/how-to-decode-binary-audio-data
export async function textToSpeech(toSet : string, rate : number) {

  toSet = toSet.trim();
  if (toSet == ""){
    return;
  }
  if (toSet != previous || previousRate != rate || !retrieved){

    const a = await window.fetch(address + `?text=\"${toSet}\"&rate=${rate}`);
    retrieved = (await a.json()).data.data;
    previous = toSet;
    previousRate = rate;
  }
  if (!retrieved){
    return;
  }
  const arr = Uint8Array.from(retrieved);
  
  const audioContext = new AudioContext();
  const audio = await audioContext.decodeAudioData(arr.buffer);
  const source = audioContext.createBufferSource();
  source.buffer = audio;
  source.connect(audioContext.destination);
  source.start(0);

}