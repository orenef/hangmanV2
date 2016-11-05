import React from 'react';

export default class Letter extends React.Component {
    render () {
        return <span className="guess-word">{this.props.value}</span>;
    }
}