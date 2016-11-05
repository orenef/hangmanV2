import React from 'react';
import Letter from './Letter'

export default class Word extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            letters: [],
        };

    }

    componentWillMount(){
        this.initialState();
    }

    initialState(){
        this.createInitListOfLettersToDisplay();
    }


    createInitListOfLettersToDisplay() {
        let wordLength = this.props.wordToPlayWith.length;
        let listOfLetters = [];
        for (let i = 0; i < wordLength; i++) {
            listOfLetters.push("\u00A0\u00A0");
        }
        this.setState({letters: listOfLetters});
    }

    updateListOfLetterAfterGuess(letterIndexes,letter) {
        let letters = [ ...this.state.letters ];
        letterIndexes.forEach((index) => {
            letters[index]=letter;
        });
        this.setState({letters: letters});
    }


    render () {
        let listOfletters = this.state.letters.map((singleLetter,i) => {
                return  <Letter key={i} value={singleLetter}/>;
            });
        return (<div className="playword">{listOfletters}</div>);
    }
}
