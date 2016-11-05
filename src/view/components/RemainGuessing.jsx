import React from 'react';

export default class RemainGuessing extends React.Component {
    render () {
        let classNameLives = `stickman-number-of-guess-left-${this.props.reaminLives}`;
        return <div className={classNameLives}/>;
    }
}