import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const apiURL = 'https://jsonplaceholder.typicode.com/users';

class App extends Component {
  constructor(){
    super();
    this.state ={
      id: '',
      persons : [],
      name : '',
      createdPersons : [],
    }
  }

  componentDidMount(){
    axios.get(apiURL)
    .then(res => {
      const persons = res.data;
      this.setState({persons});
    })
    .catch(err =>{
      console.log(`Error = ${err}`)
    });
  }

  onChange = event => {
    this.setState({name: event.target.value})
  }

  onSubmit = event => {
    event.preventDefault();
    const user = {name: this.state.name};

    axios.post(apiURL,{user})
    .then(res => {
      console.log(res);
      console.log(res.data);
      let createdPerson = res.data;
      this.setState({createdPersons:[...this.state.createdPersons, createdPerson]})
    })
    .catch(err =>{
      console.log(`Error is = ${err}`);
    });
  }

  onSubmitDelete = event =>{
    event.preventDefault();

    axios.delete(apiURL + "/" +this.state.id)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(err => {
      console.log(`Error is = ${err}`);
    });
  }
  
  onChangeDelete = event =>{
    this.setState({id:event.target.value});
  }

  render() {
    return (
      <div className="App">
      <div className="crud-get"></div>
       <ul>
         {this.state.persons.map((person,index) => <li key={index}>{person.name}</li>)}
       </ul>
       <div className="crud-post">
       <form onSubmit={this.onSubmit}>
       <ul>
         {this.state.createdPersons.map((person,index) => <li key={index}>{person.user.name}</li>)}
       </ul>
        <label>
          Person name:
          <input type="text" onChange={this.onChange} name ="name"/>
        </label>
        <button type="submit">Add new person</button>
       </form>
       </div>


       <div className="crud-delete">
       <form onSubmit={this.onSubmitDelete}>
        <label>
          Person ID:
          <input type="text" onChange={this.onChangeDelete} name ="name"/>
        </label>
        <button type="submit">Delete person</button>
       </form>
       </div>
      </div>
    );
  }
}

export default App;
