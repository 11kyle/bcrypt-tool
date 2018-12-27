import React, { Component } from 'react';
import axios from 'axios';

/****************************/
/* Select (input) Component */
/****************************/
function Select(props) {
  const options = props.optionData.map((option, index) => {
    return (
      <option value={option.value} key={index}>{option.value}</option>
    );
  });

  return (
    <select name="saltRound" id="inputSaltRound" onChange={props.handleChange}>
      {options}
    </select>
  )
}

/****************************/
/* Form Component */
/****************************/
class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      data1: null,
      password: "",
      saltRounds: [
        { value: 4 },
        { value: 5 },
        { value: 6 },
        { value: 7 },
        { value: 8 },
        { value: 9 },
        { value: 10 }
      ],
      saltRound: 4,
      hash: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.generateHash = this.generateHash.bind(this);
    this.getHash = this.getHash.bind(this);

  }

  /* Gets called on every keystroke */
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(name + ' ' + value);
  }

  getHash() {
    console.log('getting hash');
    axios.get('/api/hash')
      .then(response => this.setState({ data: response.data }))
      .catch(error => console.log(error))
  }

  generateHash(event) {

    event.preventDefault();

    axios.post('/api/hash', {
        password: this.state.password,
        saltRound: this.state.saltRound
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))

      setTimeout(this.getHash, 2000);

  }

  componentDidMount() {

  }

  render() {
    return (
      <div id="app" className="container">
        <div className="row">
          <div className="col-sm-6">
            <form className="form-signin" onSubmit={this.generateHash}>
              <h4 className="form-signin-heading">Hash password</h4>

              <label htmlFor="inputPassword" className="form-signin-heading">Password</label>
              <input id="inputPassword" type="text" value={this.state.value} onChange={this.handleChange} name="password" className="form-control" placeholder="Passowrd" required autoFocus/>

              <label htmlFor="inputSaltRound" className="form-signin-heading">Salt</label>
              <Select
                optionData={this.state.saltRounds}
                handleChange={this.handleChange}
              />

              <button className="btn btn-lg btn-primary btn-block" type="submit" value="Submit">Generate Hash</button>

              <p className="App-intro">{this.state.data}</p>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
