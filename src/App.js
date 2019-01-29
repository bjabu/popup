import React, { Component } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import logo from './logo.svg';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showPopup: false,
			layoutName: "numeric",
			input: ""
		};
	};

	display = {
		'{bksp}': 'RADERA',
	};

	numLayout = {
		'numeric': [
			'`1 2 3',
			'4 5 6',
			'7 8 9',
			'0 {bksp}'
			],
		};
	// 'default': [
	// 	'` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
	// 	'{tab} q w e r t y u i o p [ ] \\',
	// 	'{lock} a s d f g h j k l ; \' {enter}',
	// 	'{shift} z x c v b n m , . / {shift}',
	// 	'.com @ {space}'
	// 	],
	// 'shift': [
	// 	'~ ! @ # $ % ^ & * ( ) _ + {bksp}',
	// 	'{tab} Q W E R T Y U I O P { } |',
	// 	'{lock} A S D F G H J K L : " {enter}',
	// 	'{shift} Z X C V B N M < > ? {shift}',
	// 	'.com @ {space}'
	// 	]

	togglePopup() {
		this.setState({
			showPopup: !this.state.showPopup
		});
	};

	onChange = input => {
		this.setState({
			input: input
		});
		console.log("Input changed", input);
	};

	onKeyPress = button => {
		console.log("Button pressed", button);

		/**
		 * If you want to handle the shift and caps lock buttons
		 */
		if (button === "{shift}" || button === "{lock}") this.handleShift();
	};

	handleShift = () => {
		let layoutName = this.state.layoutName;

		this.setState({
			layoutName: layoutName === "default" ? "shift" : "default"
		});
	};

	onChangeInput = event => {
		let input = event.target.value;
		this.setState(
			{
				input: input
			},
			() => {
				this.keyboard.setInput(input);
			}
		);
	};

	render() {
    return (
      <div className="App">
				<img src={logo} className="App-logo" alt="logo" />
				<button onClick={this.togglePopup.bind(this)}>show popup</button>
				<button onClick={() => {alert('woooooooot?');}}>try me when popup is open</button>
				<input
					value={this.state.input}
					placeholder={"Tap on the virtual keyboard to start"}
					onChange={e => this.onChangeInput(e)}
				/>
				{this.state.showPopup ?
					<Popup
						text='Close Me'
						closePopup={this.togglePopup.bind(this)}
					/>
					: null
				}
				<Keyboard
					ref={r => (this.keyboard = r)}
					layoutName={this.state.layoutName}
					layout={this.numLayout}
					onChange={input => this.onChange(input)}
					onKeyPress={button => this.onKeyPress(button)}
					display={this.display}
				/>
      </div>
    );
  }
}

class Popup extends React.Component {
	render() {
		return (
			<div className='popup'>
				<div className='popup_inner'>
					<h1>{this.props.text}</h1>
					<button onClick={this.props.closePopup}>close me</button>
				</div>
			</div>
		);
	}
}

export default App;
