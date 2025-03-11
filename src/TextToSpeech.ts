// Imports the Google Cloud client library

// Import other required libraries
// Creates a client
// interface request {
//   input : {text : string}
//   voice : {languageCode : string, ssmlGender : 'FEMALE' | 'MALE' | undefined},
//   audioConfig : {audioEncoding : 'MP3'}
// }
const address = "https://ajones-jp-text-to-speech-uk.azurewebsites.net/test";

//https://stackoverflow.com/questions/59955096/how-to-decode-binary-audio-data
export async function textToSpeech(toSet : string) {

  const a = await window.fetch(address + "/" + toSet);


  const audioContext = new AudioContext();
  const arr = Uint8Array.from((await a.json()).data.data)
  const audio = await audioContext.decodeAudioData(arr.buffer);
  const source = audioContext.createBufferSource();
  source.buffer = audio;
  source.connect(audioContext.destination);
  source.start(0);

}