// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;

import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Item from "./item";

class App extends Component {
  state = { item: "" };

  componentWillMount() {
    this.props.fetchItems();
  }

  handleInputChange(event) {
    this.setState({ item: event.target.value });
  }

  handleFormSubmit(event) {
    event.preventDefault();

    this.props.createItem(this.state.item);
  }

  renderItems() {
    console.log(this.props.items);
    return _.map(this.props.items, (item, key) => {
      return <Item key={key} item={item} id={key} />;
    });
  }

  render() {
    return (
      <div>
        <h4>Add Item</h4>
        <form
          onSubmit={this.handleFormSubmit.bind(this)}
          className="form-inline"
        >
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Add Item"
              value={this.state.item}
              onChange={this.handleInputChange.bind(this)}
            />
            <button action="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
        <ul className="list-group">{this.renderItems()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { items: state.items };
}

export default connect(mapStateToProps, actions)(App);
