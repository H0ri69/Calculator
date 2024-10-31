const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let currentCalculation = '';
let equalPressCount = 0;
const requiredPresses = 3;
let resultShown = false;

const insults = [
    "My 3-year-old brother could do better!",
    "Are you sure you passed elementary math?",
    "Did you forget how to use a calculator?",
    "Even a potato could calculate faster than you!",
    "I've seen snails solve equations quicker!",
    "Are you trying to break me with your math skills?",
    "Is this your first time using numbers?",
    "Maybe stick to counting on your fingers?",
    "I'm a calculator, not a miracle worker!",
    "Did you learn math in clown school?",
    "Your math is so bad, it makes me want to divide by zero!",
    "I've seen better calculations in a random number generator!",
    "Are you trying to discover new math? Because this ain't it!",
    "Your arithmetic is a tragedy in numbers!",
    "I'm starting to think you and math are mortal enemies!",
    "Did you mistake this for a game of numerical charades?",
    "Your calculations are like abstract art - confusing and pointless!",
    "I'd tell you to use your head, but I'm afraid you'd get the wrong answer!",
    "Are you allergic to correct answers?",
    "If math were a language, you'd be speaking gibberish!",
    "You're making algebra look like rocket science!",
    "I bet you think PI is something you eat!",
    "Your math skills are like a square root of -1: imaginary!",
    "Did you learn counting from a broken clock?",
    "You're the reason math teachers drink!",
    "I've seen more logical operations in a bag of hammers!",
    "Are you trying to prove the infinite monkey theorem with these calculations?",
    "Your math is so off, it's in another dimension!",
    "I'm not saying you're bad at math, but... Oh wait, yes I am!",
    "Did you consult a Magic 8 Ball for these calculations?",
    "Your understanding of math is like a flat-earther's grasp of geography!",
    "I've seen more accurate predictions from a fortune cookie!",
    "Are you trying to calculate in binary? Because this is a mess of 1s and 0s!",
    "Your calculations are like a black hole - they make no sense and defy logic!",
    "Did you learn math from a 'How to Not Do Math' book?",
    "I'm starting to think you believe 2+2=5!",
    "Your math skills are about as sharp as a sphere!",
    "Are you trying to invent new mathematical laws? Because you're breaking all the existing ones!",
    "I've seen better number crunching from a teething toddler!",
    "Your calculations make as much sense as a screen door on a submarine!",
    "Did you mistake 'math' for 'myth'? Because this is purely fictional!",
    "Your math is so bad, it's giving me a syntax error!",
    "Are you trying to calculate in base confusion?",
    "I've seen more precise estimations from a blindfolded darts player!",
    "Your mathematical logic is as sound as a chocolate teapot!",
    "Did you learn arithmetic from a randomized playlist?",
    "Your calculations are like a UFO sighting - unbelievable and probably made up!",
    "I'm not saying your math is bad, but it just made my circuits cry!",
    "Are you trying to solve for 'X'? Because you're missing the whole alphabet!",
    "Your math skills make me want to go back to being an abacus!"
];

buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.id));
});

function handleButtonClick(buttonId) {
    if (buttonId === 'equal') {
        handleEquals();
    } else if (buttonId === 'clear') {
        clearCalculator();
    } else if (buttonId === 'backspace') {
        backspace();
    } else {
        appendToCalculation(buttonId);
    }
}

const errorMessages = [
    "Nice try, but math doesn't work that way!",
    "Even a calculator has its limits, you know?",
    "That's not math, that's alphabet soup!",
    "I'm a calculator, not a magician!",
    "Does not compute... literally!",
    "Error 404: Math not found",
    "You broke math. Congratulations?",
    "That's beyond my pay grade",
    "I can't even... and neither can you, apparently",
    "Math.exe has stopped working"
];

function handleEquals() {
    if (resultShown) {
        return; // Do nothing if result is already shown
    }

    try {
        const result = eval(currentCalculation);
        if (isNaN(result) || !isFinite(result)) {
            throw new Error("Invalid calculation");
        }
        
        equalPressCount++;
        
        if (equalPressCount < requiredPresses) {
            setDisplayText(insults[Math.floor(Math.random() * insults.length)]);
        } else {
            setDisplayText(result.toString());
            currentCalculation = result.toString();
            resultShown = true;
            equalPressCount = 0;
        }
    } catch (error) {
        const errorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        setDisplayText(errorMessage);
        currentCalculation = '';
        resultShown = true;
        equalPressCount = 0;
    }
}

function clearCalculator() {
    currentCalculation = '';
    setDisplayText('');
    equalPressCount = 0;
    resultShown = false;
}

function backspace() {
    currentCalculation = currentCalculation.slice(0, -1);
    setDisplayText(currentCalculation);
    resultShown = false;
}

function appendToCalculation(value) {
    if (resultShown) {
        currentCalculation = '';
        resultShown = false;
        equalPressCount = 0;
    }
    currentCalculation += value;
    setDisplayText(currentCalculation);
}

function setDisplayText(text) {
    display.value = text;
    display.style.height = 'auto';
    display.style.height = display.scrollHeight + 'px';
}

// Allow keyboard input
display.addEventListener('input', function(e) {
    currentCalculation = this.value;
    resultShown = false;
    equalPressCount = 0;
});

// Prevent default form submission on Enter key
display.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleEquals();
    }
});