/**
 * Created by Oren.Efraim on 10/26/2016.
 */

export default class StickmanWordLogic {
    constructor() {
        this._listOfWordsToGuess = ['book','fish','bug'];
        this._wordToPlayWith = null;
        this._wordGameElement = null;
        this._listOfguessedLetters = [];
    }

    get listOfguessedLetters(){
        return this._listOfguessedLetters;
    }

    set listOfguessedLetters(arrayOfletters){
        this._listOfguessedLetters = arrayOfletters;
    }

    get wordGameElmenet() {
        return this._wordGameElement;
    }

    get fullListOfWords() {
        return this._listOfWordsToGuess;
    }

    get guessingWord() {
        return this._wordToPlayWith;
    }

    set guessingWord(word) {
        this._wordToPlayWith = word;
    }

    isRepeatingGuess(letter){
        if(this._listOfguessedLetters.indexOf(letter) != -1){
            return true;
        }else{
            this._listOfguessedLetters.push(letter);
            return false;
        }
    }

    chooseRandomWordToGuess() {
        this._wordToPlayWith = this._listOfWordsToGuess[Math.floor(Math.random() * this._listOfWordsToGuess.length)];
        return this._wordToPlayWith;
    }

    addWordToGuess(newWord) {
        if ((typeof newWord === 'string') && /^[a-zA-Z]+$/.test(newWord)) {
            this._listOfWordsToGuess.push(newWord);
            return true;
        } else {
            return false;
        }
    }

    isLetterExistsInWord(letter) {
        let letterIndexes = [];
        for (let index in this._wordToPlayWith) {
            if (this._wordToPlayWith.hasOwnProperty(index)) {
                if (this._wordToPlayWith[index] == letter.toLowerCase()) {
                    letterIndexes.push(Number(index));
                }
            }
        }
        return letterIndexes;
    }

    createElementForWordWithEmptyLetters() {
        let wordGameElement = document.createElement("div")
        let wordLength = this._wordToPlayWith.length;
        for (let i = 0; i < wordLength; i++) {
            var letterSpanElement = document.createElement("span");
            var innerSpanText = document.createTextNode("\u00A0\u00A0");
            letterSpanElement.className = "guess-word";
            letterSpanElement.appendChild(innerSpanText);
            wordGameElement.appendChild(letterSpanElement);
        }
        this._wordGameElement = wordGameElement;
        return wordGameElement;
    }

    replaceEmptyLetterWithRealOne(letter) {
        let arrayOfLetterElement = this._wordGameElement.querySelectorAll("span");
        let indexList = this.isLetterExistsInWord(letter);
        indexList.forEach((index) => {
            var letterSpanElement = document.createElement("span");
            letterSpanElement.className = "guess-word";
            var innerSpanText = document.createTextNode(letter);
            letterSpanElement.appendChild(innerSpanText);
            this._wordGameElement.replaceChild(letterSpanElement, arrayOfLetterElement[index]);
        });
        return this._wordGameElement;
    }
}