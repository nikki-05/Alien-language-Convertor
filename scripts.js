const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const translateButton = document.getElementById('translateButton');
const switchButton = document.getElementById('switchButton');
const speakButton = document.getElementById('speakButton');

let isToAlien = true; // true = English to Alien, false = Alien to English

// Simple Alien Translation Map
const alienMap = {
    a: '∆', b: 'β', c: '¢', d: 'Ð', e: '∑',
    f: 'ƒ', g: '∂', h: '#', i: '!', j: '¿',
    k: 'κ', l: '£', m: 'µ', n: '∏', o: 'ø',
    p: 'þ', q: 'Ω', r: '®', s: '$', t: '†',
    u: '∪', v: '√', w: 'ω', x: '≈', y: '¥', z: 'ζ'
};

// Reverse map for decoding
const englishMap = Object.fromEntries(
    Object.entries(alienMap).map(([key, value]) => [value, key])
);

// Translation Function
function translate(text, toAlien) {
    if (toAlien) {
        return text.toLowerCase().split('').map(char => {
            return alienMap[char] || char;
        }).join('');
    } else {
        return text.split('').map(char => {
            return englishMap[char] || char;
        }).join('');
    }
}

// Button Handlers
translateButton.addEventListener('click', () => {
    const input = inputText.value;
    const translated = translate(input, isToAlien);
    outputText.textContent = translated;
});

switchButton.addEventListener('click', () => {
    isToAlien = !isToAlien;
    switchButton.textContent = isToAlien
        ? "Switch to Alien Language"
        : "Switch to English Language";
    outputText.textContent = ''; // Clear output on switch
});

// Speak Output
speakButton.addEventListener('click', () => {
    const text = outputText.textContent;
    if (text.trim() === '') return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isToAlien ? 'en-US' : 'en-US'; // Can adjust for real alien 🤖
    window.speechSynthesis.speak(utterance);
});
