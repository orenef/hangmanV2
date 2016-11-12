/**
 * Created by Oren.Efraim on 10/30/2016.
 */
import StickmanGAmeLogic from '../src/controller/stickmanGameLogic'
import stickmanConfig from '../src/controller/stickmanConfig';

describe("Stickman GameLogic", function () {

    var HTMLElements = {}; // use to mock document.getElementById method using by the constructor
    document.getElementById = jasmine.createSpy('HTML Element').and.callFake((ID) => {
        if (!HTMLElements[ID]) {
            var newElement = document.createElement('div');
            HTMLElements[ID] = newElement;
        }
        return HTMLElements[ID];
    });

    describe("constructor method", function () {

        it("should create a stickmanGamelogic element", () => {
            let stickmanGameLogic = new StickmanGAmeLogic();
            expect(stickmanGameLogic.lives == stickmanConfig.lives).toBe(true);
            expect(stickmanGameLogic.wordLogic.guessingWord).toMatch(/^[a-zA-Z]+$/);
            expect(stickmanGameLogic.submitButton).toBeDefined();
            expect(stickmanGameLogic.numberOfLetterRemainGuess).toBe(stickmanGameLogic.wordLogic.guessingWord.length);
        });
    });

    describe("userGuess method", function () {
        let stickmanGameLogic = null;

        beforeEach(() => {
            stickmanGameLogic = new StickmanGAmeLogic();
            stickmanGameLogic.wordLogic.guessingWord = "bamba"; // overwrite random chosen word to play with.
            stickmanGameLogic.numberOfLetterRemainGuess = 5; //overwrite length of "bamba"
            stickmanGameLogic.wordLogic.listOfguessedLetters = [];
        });
        afterEach(() => {
            stickmanGameLogic = null;
        });

        it("For correct guess lives should remain the same", () => {
            let livesBeforeGuessing = stickmanGameLogic.lives;
            stickmanGameLogic.guessingLetterElmenet.value = "b"; //set the guess manually and not by enter letter to input field
            stickmanGameLogic.wordLogic.createElementForWordWithEmptyLetters(); // overwrite
            stickmanGameLogic.userGuess();
            expect(livesBeforeGuessing).toBe(stickmanGameLogic.lives);
        });
        it("For correct guess remain letter to guess should decrement by the number of the letter appearing in the guessing word", () => {
            let lettertoGuessBefore = stickmanGameLogic.numberOfLetterRemainGuess;
            stickmanGameLogic.guessingLetterElmenet.value = "b"; //set the guess manually and not by enter letter to input field
            stickmanGameLogic.wordLogic.createElementForWordWithEmptyLetters(); // overwrite
            stickmanGameLogic.userGuess();
            expect(lettertoGuessBefore).toBe(stickmanGameLogic.numberOfLetterRemainGuess + 2);
        });

        it("For wrong guess lives should decrement by one", () => {
            let livesBeforeGuessing = stickmanGameLogic.lives;
            stickmanGameLogic.guessingLetterElmenet.value = "z"; //set the guess manually and not by enter letter to input field
            stickmanGameLogic.wordLogic.createElementForWordWithEmptyLetters(); // overwrite
            stickmanGameLogic.userGuess();
            expect(livesBeforeGuessing).toBe(stickmanGameLogic.lives + 1);
        });

        it("For wrong guess remain letter to guess stay the same as before guess made", () => {
            let lettertoGuessBefore = stickmanGameLogic.numberOfLetterRemainGuess;
            stickmanGameLogic.guessingLetterElmenet.value = "z"; //set the guess manually and not by enter letter to input field
            stickmanGameLogic.wordLogic.createElementForWordWithEmptyLetters(); // overwrite
            stickmanGameLogic.userGuess();
            expect(lettertoGuessBefore).toBe(stickmanGameLogic.numberOfLetterRemainGuess);
        });

        it("Try to guess the same letter more then once should not effect number of remaining letter to guess", () => {
            let lettertoGuessBefore = stickmanGameLogic.numberOfLetterRemainGuess;
            stickmanGameLogic.guessingLetterElmenet.value = "b"; //set the guess manually and not by enter letter to input field
            stickmanGameLogic.wordLogic.createElementForWordWithEmptyLetters(); // overwrite
            stickmanGameLogic.userGuess();
            stickmanGameLogic.guessingLetterElmenet.value = "b"; //sec guess
            stickmanGameLogic.userGuess();
            expect(lettertoGuessBefore).toBe(stickmanGameLogic.numberOfLetterRemainGuess + 2); //and not +4
        });
    });

    describe("isGameOver method", function () {
        let stickmanGameLogic = null;
        beforeEach(() => {
            stickmanGameLogic = new StickmanGAmeLogic();
            stickmanGameLogic.wordLogic.guessingWord = "bamba"; // overwrite random chosen word to play with.
            stickmanGameLogic.numberOfLetterRemainGuess = 5; //overwrite length of "bamba"
            stickmanGameLogic.wordLogic.listOfguessedLetters = [];
            stickmanGameLogic.wordLogic.createElementForWordWithEmptyLetters(); // overwrite
        });

        let userGuessHelper = function (stickmanGameLogic, letter) {
            stickmanGameLogic.guessingLetterElmenet.value = letter; //set the guess manually and not by enter letter to input field
            stickmanGameLogic.userGuess();
        };

        it("should return true if make 9 wrongs guesses", () => {
            userGuessHelper(stickmanGameLogic, "c");
            userGuessHelper(stickmanGameLogic, "d");
            userGuessHelper(stickmanGameLogic, "f");
            userGuessHelper(stickmanGameLogic, "g");
            userGuessHelper(stickmanGameLogic, "h");
            userGuessHelper(stickmanGameLogic, "l");
            userGuessHelper(stickmanGameLogic, "p");
            userGuessHelper(stickmanGameLogic, "n");
            userGuessHelper(stickmanGameLogic, "o");
            expect(stickmanGameLogic.isGameOver()).toBe(true);
        });

        it("should return false if make less then 9 wrongs guesses", () => {
            userGuessHelper(stickmanGameLogic, "z");
            expect(stickmanGameLogic.isGameOver()).toBe(false);
        });
    });

    describe("hasWonTheRound method", function () {

        let stickmanGameLogic = null;

        beforeEach(() => {
            stickmanGameLogic = new StickmanGAmeLogic();
            stickmanGameLogic.wordLogic.guessingWord = "bamba"; // overwrite random chosen word to play with.
            stickmanGameLogic.numberOfLetterRemainGuess = 5; //overwrite length of "bamba"
            stickmanGameLogic.wordLogic.listOfguessedLetters = [];
            stickmanGameLogic.wordLogic.createElementForWordWithEmptyLetters(); // overwrite
        });

        let userGuessHelper = function (stickmanGameLogic, letter) {
            stickmanGameLogic.guessingLetterElmenet.value = letter; //set the guess manually and not by enter letter to input field
            stickmanGameLogic.userGuess();
        };

        it("should return true if all letter of the word has been guessed", () => {
            userGuessHelper(stickmanGameLogic,"b");
            userGuessHelper(stickmanGameLogic,"a");
            userGuessHelper(stickmanGameLogic,"m");
            expect(stickmanGameLogic.hasWonTheRound()).toBe(true);
        });

        it("should return false if there more letter to discover", () => {
            let stickmanGameLogic = new StickmanGAmeLogic();
            stickmanGameLogic.wordLogic.guessingWord = "bamba"; // overwrite random chosen word to play with.
            stickmanGameLogic.numberOfLetterRemainGuess = 5; //overwrite length of "bamba"
            userGuessHelper(stickmanGameLogic,"b");
            expect(stickmanGameLogic.hasWonTheRound()).toBe(false);
        });
    });

});