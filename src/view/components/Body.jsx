import React from 'react';
import RemainGuessing from './RemainGuessing';
import Guessing from './Guessing';
import Word from './Word';

export default class Body extends React.Component {
    constructor(props) {
        super(props);
    }

    updateListOfLetterAfterGuess(letterIndexes, letter) {
        this._child.updateListOfLetterAfterGuess(letterIndexes, letter);
    }

    render() {
        return (
            <div>
                <RemainGuessing reaminLives={this.props.reaminLives}/>
                <Word ref={(child) => {
                    this._child = child;
                }} wordToPlayWith={this.props.wordToPlayWith}/>
                <Guessing onclick={this.props.userGuessByLetter}/>
            </div>
        );
    }
}
