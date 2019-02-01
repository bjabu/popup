import React, { Component } from 'react';
import 'react-simple-keyboard/build/css/index.css';
import PopupKeyboard from './PopupKeyboard';
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

	// handleShift = () => {
	// 	let layoutName = this.state.layoutName;
	//
	// 	this.setState({
	// 		layoutName: layoutName === "default" ? "shift" : "default"
	// 	});
	// };

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

	doPopup = (e) => {
		this.setState({
			showPopup: true
		});
		e.target.blur();
	}

	render() {
    return (
      <div className="App">
				<img src={logo} className="App-logo" alt="logo" />
				<button onClick={()=>this.togglePopup()}>Toggle Popup</button>
				<input
					onFocus={this.doPopup}
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

export default App;
