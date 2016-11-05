import React from 'react';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessage: false,
            message: props.message,
        };

    }

    updateMessage(newMessage) {
        this.setState({message: newMessage});
    }

    componentDidMount() {
        let onOffBit = 1;
        this.timerId = setInterval(() => {
            if (onOffBit == 1) {
                onOffBit = onOffBit * -1;
                this.setState({
                    showMessage: false
                });
            } else {
                onOffBit = onOffBit * -1;
                this.setState({
                    showMessage: true
                });
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        return (
            <div className="alert-zone">
                {this.state.showMessage && <span>{this.state.message}</span>}
            </div>
        );
    }
}