import React, { Component } from 'react';
import GuestList from './GuestList';
import Counter from './Counter';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingGuestName: '',
      isFiltered: false,
      guests: [{
        name:'Jan',
        isConfirmed: true,
        isEditing: false
      },
      {
        name: 'Monika',
        isConfirmed: false,
        isEditing: false
      },
      {
        name:'Karol',
        isConfirmed: true,
        isEditing: true
      }]
    }
  }

  toggleGuestPropertyAt = (property, indexToChange) => 
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if(index === indexToChange) {
          return {
            ...guest,
            [property]: !guest[property]
          };
        }
        return guest;
      })
    });

  toggleConfirmationAt = index =>
    this.toggleGuestPropertyAt('isConfirmed', index);

  toggleEditingAt = index =>
    this.toggleGuestPropertyAt('isEditing', index);

  setNameAt = (name, indexToChange) => 
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if(index === indexToChange) {
          return {
            ...guest,
            name
          };
        }
        return guest;
      })
    });

  toggleFilter = () =>
    this.setState({
      isFiltered: !this.state.isFiltered
    });

  pendingInputName = e =>
    this.setState({pendingGuestName: e.target.value})


  handleNewGuest = e => {
    e.preventDefault();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuestName,
          isConfirmed: false,
          isEditing: false
        },
        ...this.state.guests
      ],
      pendingGuestName: ''
    });
  }

  removeGuestAt = index => 
    this.setState({
      guests:[
        ...this.state.guests.slice(0, index),
        ...this.state.guests.slice(index+1)
      ]
    });

  getTotalInvited = () => this.state.guests.length;

  getConfirmedInvited = () => 
    this.state.guests.reduce((total, guest) => guest.isConfirmed ? total + 1 : total, 0);

  render() {  
    const totalInvited = this.getTotalInvited();
    const confirmedInvited  = this.getConfirmedInvited();
    const unConfirmedInvited  = totalInvited - confirmedInvited;

    return (
      <div className="App">
        <header>
          <h1>App Invites</h1>
          <form onSubmit={this.handleNewGuest}>
              <input 
                type="text" 
                onChange={this.pendingInputName}
                value={this.state.pendingGuestName} 
                placeholder="Name" />
              <button type="submit" name="submit" value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input 
                type="checkbox" 
                onChange={this.toggleFilter} 
                checked={this.state.isFiltered} /> Hide unconfirmed invites
            </label>
          </div>
          <Counter 
            totalInvited={totalInvited}
            confirmedInvited={confirmedInvited}
            unConfirmedInvited={unConfirmedInvited} />
          <GuestList 
            guests={this.state.guests} 
            toggleConfirmationAt={this.toggleConfirmationAt}
            toggleEditingAt={this.toggleEditingAt}
            setNameAt={this.setNameAt}
            isFiltered={this.state.isFiltered}
            removeGuestAt={this.removeGuestAt}
            pendingGuestName={this.state.pendingGuestName}
          />
        </div>
      </div>
    );
  }
}

export default App;
