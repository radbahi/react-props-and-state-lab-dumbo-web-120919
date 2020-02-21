import React from 'react'
// import allPets from './data/pets.js'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  petFetch = () => {
    let url = '/api/pets'
    if (this.state.filters.type !== 'all') {
    url += `?type=${this.state.filters.type}`
    fetch(url)
    .then(res => res.json())
    .then(petData => this.setState({pets: petData}))
  }else{
    fetch('/api/pets')
    .then(res => res.json())
    .then(petData => this.setState({pets: petData}))
  }
  }

  onChangeType = ({ target: {value} }) => {
    this.setState({ filters: { ...this.state.filters, type: value } });
  }

  onAdoptPet = petId => {
    const petsArray = this.state.pets.map(p => {
      return p.id === petId ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets: petsArray });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.petFetch}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
