import StickmanWordLogic from './stickmanWordLogic';
import StickmanPaint from './StickmanPaint';
import stickmanConfig from './stickmanConfig';

export default class StickmanGameLogic {
    constructor() {
        this._wordLogic = new StickmanWordLogic();
        this._wordLogic.chooseRandomWordToGuess();
        this._wordLogic.createElementForWordWithEmptyLetters();
        this._lives = stickmanConfig.lives;
        this.getElementFromDom();
        this._submitButton.onclick = this.userGuess.bind(this);
        this._guessingWordContiner.appendChild(this._wordLogic.wordGameElmenet);
        StickmanPaint.showNumberOfGuessingLeft(this._stickmanShow, this._lives);
        this._numberOfLetterRemainGuess = this._wordLogic.guessingWord.length;
        this.displayAlert();
    }

    get wordLogic(){
        return this._wordLogic;
    }
    get lives(){
        return this._lives;
    }
    get submitButton(){
        return this._submitButton;
    }

    get guessingWordContiner(){
        return this._guessingWordContiner;
    }

    get numberOfLetterRemainGuess(){
        return this._numberOfLetterRemainGuess;
    }

    set numberOfLetterRemainGuess(value){
        this._numberOfLetterRemainGuess = value;
    }

    get guessingLetterElmenet(){
        return this._guessingLetterElmenet;
    }

    getElementFromDom() {
        this._stickmanShow = document.getElementById(stickmanConfig.stickmanShowID);
        this._guessingLetterElmenet = document.getElementById(stickmanConfig.guessingLetterElmenetID);
        this._alertElement = document.getElementById(stickmanConfig.alertElementID);
        this._guessingWordContiner = document.getElementById(stickmanConfig.guessingWordContinerID);
        this._submitButton = document.getElementById(stickmanConfig.submitButtonID);
    }

    userGuess() {
        let letter = this._guessingLetterElmenet.value;
        if(this.wordLogic.isRepeatingGuess(letter)){
            return this._lives;
        }
        let letterIndexes = this._wordLogic.isLetterExistsInWord(letter);
        if (letterIndexes.length == 0) { // letter is not exists in word
            this._lives--;
            if (this.isGameOver()) {
                this._alertElement.innerHTML = stickmanConfig.alertMessageLose;
                console.log("finish");
            }
            StickmanPaint.showNumberOfGuessingLeft(this._stickmanShow, this._lives)

        } else {
            this._numberOfLetterRemainGuess = this._numberOfLetterRemainGuess - letterIndexes.length;
            this._wordLogic.replaceEmptyLetterWithRealOne(letter);
            if (this.hasWonTheRound()) {
                this._alertElement.innerHTML = stickmanConfig.alertMessageWin;
                console.log("won");
            }
        }

        this._guessingLetterElmenet.value = '';
        return this._lives;
    }

    isGameOver() {
        return this._lives <= 0;
    }

    hasWonTheRound() {
        return this._numberOfLetterRemainGuess == 0;
    }

    displayAlert() {
        this._alertElement.innerHTML = "You are alive!";
        let onOffBit = 1;
        setInterval(() => {
            if (onOffBit == 1) {
                onOffBit = onOffBit * -1;
                this._alertElement.style.visibility = "hidden";
            } else {
                onOffBit = onOffBit * -1;
                this._alertElement.style.visibility = "visible";
            }
        }, 1000);
    }

}