let listSecretyNumbers = [];
let maxLengthList = 100;
let secretyNumber = randomNumber();
let attempts = 0;

function displayTextOnScreen(tag, text) {
    let fiel = document.querySelector(tag);
    fiel.innerHTML = text;
    responsiveVoice.speak(text, 'US English Male', {rate:1});
}

function displayInitialMessage() {
    displayTextOnScreen('h1', 'The game for secrety number!');
    displayTextOnScreen('p', `Choose a number for 1 at ${maxLengthList}: `);
}

displayInitialMessage();

function verifyGuess() {
    let guess = document.querySelector('input').value;
    attempts++;
    let attemptsTxt = attempts == 1 ? 'attempt' : 'attempts';

    cleanField ();
    if (guess == secretyNumber) {
        displayTextOnScreen('h1', 'You win!');
        displayTextOnScreen('p', `You discovered the secret number ${secretyNumber} in is ${attempts} ${attemptsTxt}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        let clue = guess > secretyNumber ? `${attempts} ${attemptsTxt} the secrety number is smaller!` : `${attempts} ${attemptsTxt} the secrety number is bigger`;
        displayTextOnScreen('p', clue);
    }
}

function randomNumber() {
    let numberRandom = parseInt(Math.random() * maxLengthList + 1);
    if (listSecretyNumbers.length == maxLengthList) {
        listSecretyNumbers = [];
    }
    while (listSecretyNumbers.includes(numberRandom)) {
        numberRandom = parseInt(Math.random() * maxLengthList + 1);
    }
    listSecretyNumbers.push(numberRandom);
    return numberRandom;
}

function cleanField() {
    guess = document.querySelector('input');
    guess.value = '';
}

function restartGame() {
    secretyNumber = randomNumber();
    cleanField();
    attempts = 0;
    displayInitialMessage();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}