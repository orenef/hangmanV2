import React from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

import HangmanCommonService from '../../controller/HangmanCommonService';

export default class Layout extends  React.Component {
    constructor(props){
        super(props);
        this.hangmanCommonService = new HangmanCommonService();
        this.state ={lives : this.hangmanCommonService.lives};
    }

    userGuessByLetter(letter) {
        if (this.hangmanCommonService.isRepeatingGuess(letter)) {
            return null; //
        }
        let letterIndexes = this.isLetterExistsInWord(letter);
        if (letterIndexes.length == 0) { // letter is not exists in word
            this.hangmanCommonService.decrementLives();
            this.setState({lives: this.hangmanCommonService.lives});
            console.log(this.hangmanCommonService.lives);
            if(this.hangmanCommonService.isGameOver()){
                this._footer.updateMessage("You lose!");
            }
        } else {
            let remainGuess = this.hangmanCommonService.updateNumberOfReaminLetterToGuess(letterIndexes.length);
            if(remainGuess == 0){ // won the game
               this._footer.updateMessage("Good JOB");
            }
            this._body.updateListOfLetterAfterGuess(letterIndexes, letter);
        }

        return this.hangmanCommonService.lives;
    }

    isLetterExistsInWord(letter) {
        if (typeof letter === 'undefined') {
            return [];
        }
        let letterIndexes = [];
        for (let index in this.hangmanCommonService.wordToPlayWith) {
            if (this.hangmanCommonService.wordToPlayWith.hasOwnProperty(index)) {
                if (this.hangmanCommonService.wordToPlayWith[index] == letter.toLowerCase()) {
                    letterIndexes.push(Number(index));
                }
            }
        }
        return letterIndexes;
    }

    render(){
        return(
          <div className="mainScreen">
              <Header/>
              <Body ref={(child) => { this._body = child; }} reaminLives={this.state.lives} userGuessByLetter={this.userGuessByLetter.bind(this)} wordToPlayWith={this.hangmanCommonService.wordToPlayWith} />
              <Footer ref={(child) => { this._footer = child; }} message={this.props.message}/>
          </div>
    );
    }
}