const quoteArea = document.querySelector('.content .quote'),
authorArea = document.querySelector('.content .author'),
btnAudio = document.querySelector('.button-wrapper .audio'),
btnNext = document.querySelector('.button-wrapper .generate'),
btnCopy = document.querySelector('.button-wrapper .copy');
const synth = speechSynthesis;

const url = () => `https://api.quotable.io/random?maxLength=75`;

//fetch quote when the website is loaded
putQuote();

// event listeners
btnNext.addEventListener('click', putQuote);
btnAudio.addEventListener('click', playAudio);
btnCopy.addEventListener('click', () => navigator.clipboard.writeText(quoteArea.innerHTML));

function getQuote(){
  return fetch(url()).then(res => res.json()).then(data => data).catch(err => err);
}

async function putQuote(){
  const quote = await getQuote();
  quoteArea.innerHTML = quote.content;
  authorArea.innerHTML = quote.author;
}

function playAudio(){
  const utterance = new SpeechSynthesisUtterance(`${quoteArea.innerHTML} by ${authorArea.innerHTML}`);
  synth.speak(utterance);
}