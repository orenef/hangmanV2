/**
 * Created by Oren.Efraim on 10/25/2016.
 */
import "babel-polyfill";
import "./view/stickman.css";
import StickmanGameLogic from './controller/stickmanGameLogic'

var hangman = new StickmanGameLogic();

// var a = new SticmanWordLogic();
//     a.chooseRandomWordToGuess();
    // console.log(a.isLetterExistsInWord("b"));
    // console.log(a.createElementForWordWithEmptyLetters());