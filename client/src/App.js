import React, { Component } from 'react';
import Form from './Form.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* Render the newly fetched data inside of this.state.data */}

        <Form />
      </div>
    );
  }
}

export default App;
