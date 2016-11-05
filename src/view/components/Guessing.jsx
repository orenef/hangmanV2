import React from 'react';

export default class Guessing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSubmit = props.onclick;
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit() {
        this.onSubmit(this.state.value);
        this.setState({value : ''});
    }

    render() {
        return (
            <div className="guess-zone">
                <div className="guess-zone-container">
                    <label className="guesszone-label">New letter:</label>
                    <input type="text"
                           id="guess"
                           size="1"
                           maxLength={1}
                           placeholder="_"
                           className="guessbox"
                           value={this.state.value}
                           onChange={this.handleChange}/>
                    <button onClick={this.handleSubmit} className="submitbutton">
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}