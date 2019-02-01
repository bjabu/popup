import React from 'react';
import Keyboard from 'react-simple-keyboard';
import './App.css';

class PopupKeyboard extends React.Component {

    display = {
        '{bksp}': 'RADERA',
    };

    numLayout = {
        'numeric': [
            '1 2 3',
            '4 5 6',
            '7 8 9',
            '0 {bksp}'
        ],
    };

    onKeyPress = button => {
        console.log("Button pressed", button);

        /**
         * If you want to handle the shift and caps lock buttons
         */
        if (button === "{shift}" || button === "{lock}") this.handleShift();
    };

    onChange = input => {
        console.log("Input", input);
        this.props.inputField(input);
    };

    constructor(props) {
        super(props);
        this.state = {
            layoutName: "numeric",
        };
    };

    render() {
        return (
            <div className='popup' draggable={false}>
            <button className='close' onClick={this.props.closePopup}>X</button>
            <div className='popup_inner'>
            <Keyboard
                ref={r => (this.keyboard = r)}
                layoutName={this.state.layoutName}
                layout={this.numLayout}
                onChange={input => this.onChange(input)}
                onKeyPress={button => this.onKeyPress(button)}
                display={this.display}
                useTouchEvents={false}
            />
            </div>
        </div>
        );
    }
}

export default PopupKeyboard;
