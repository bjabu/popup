import React, { Component } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import logo from './logo.svg';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			input: "",
			showPopup: false,
		};
	};

	togglePopup() {
		this.setState({
			showPopup: !this.state.showPopup
		});
	};

	handleShift = () => {
		let layoutName = this.state.layoutName;

		this.setState({
			layoutName: layoutName === "default" ? "shift" : "default"
		});
	};

	onChangeInput = event => {
		let input = event.target.value;
		if (this.state.showPopup) {
			this.setState(
				{
					input: input,
				},
				() => {
					this.popupKeyboard.keyboard.setInput(input);
				}
			);
		} else {
			this.setState(
				{
					input: input,
				}
			);
		}
	};

	inputField = event => {
		this.setState(
			{
				input: event,
			}
		);
		console.log('InputUpdate:', event, this.state.input);
	};

	doBlur = (e) => {
			e.target.blur();
	}

	render() {
    return (
      <div className="App">
				<img src={logo} className="App-logo" alt="logo" />
				<button onClick={()=>this.togglePopup()}>show popup</button>
				<input
					onFocus={this.doBlur}
					value={this.state.input}
					placeholder={"Tap on the virtual keyboard to start"}
					onChange={e => this.onChangeInput(e)}
				/>
				{this.state.showPopup ?
					<PopupKeyboard
						ref={r => (this.popupKeyboard = r)}
						closePopup={(e)=>this.togglePopup(e)}
						inputField={(e)=>this.inputField(e)}
					/>
					: null
				}
      </div>
    );
  }
}

class PopupKeyboard extends React.Component {

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
					<button onClick={this.props.closePopup}>X</button>
				</div>
			</div>
		);
	}
}

export default App;
