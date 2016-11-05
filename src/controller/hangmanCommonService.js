export default class HangmanCommonService {

    constructor() {
        this._listOfWordsToGuess = ['book'];
        this._wordToPlayWith = null;
        this.chooseRandomWordToGuess();
        this._listOfGuessedLetters = [];
        this._lives = 9;
        this._numberOfLetterRemainGuess = this._wordToPlayWith.length;

    }
    get wordToPlayWith() {
        return this._wordToPlayWith;
    }

    get lives(){
        return this._lives;
    }
    chooseRandomWordToGuess() {
        this._wordToPlayWith = this._listOfWordsToGuess[Math.floor(Math.random() * this._listOfWordsToGuess.length)];
        return this._wordToPlayWith;
    }



    userGuessByLetter(letter) {
        if (this.isRepeatingGuess(letter)) {
            return this._lives;
        }
        let letterIndexes = this.isLetterExistsInWord(letter);
        if (letterIndexes.length == 0) { // letter is not exists in word
            this._lives--;
        } else {
            this._numberOfLetterRemainGuess = this._numberOfLetterRemainGuess - letterIndexes.length;
            this.updateListOfLetterAfterGuess(letterIndexes, letter);
        }

        this._guessingLetterElmenet.value = '';
        return this._lives;
    }

    isRepeatingGuess(letter) {
        if (this._listOfGuessedLetters.indexOf(letter) != -1) {
            return true;
        } else {
            this._listOfGuessedLetters.push(letter);
            return false;
        }
    }

    isLetterExistsInWord(letter) {
        if (typeof letter === 'undefined') {
            return [];
        }
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

    decrementLives(){
        this._lives--;
    }

    isGameOver() {
        return this._lives <= 0;
    }

    hasWonTheRound() {
        return this._numberOfLetterRemainGuess == 0;
    }
    updateNumberOfReaminLetterToGuess(numberOfLetterGuessed){
        this._numberOfLetterRemainGuess = this._numberOfLetterRemainGuess - numberOfLetterGuessed;
        return this._numberOfLetterRemainGuess;
    }
    //this._numberOfLetterRemainGuess = this._numberOfLetterRemainGuess - letterIndexes.length;

}