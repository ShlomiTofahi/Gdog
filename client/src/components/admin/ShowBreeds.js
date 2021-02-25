
import React, { Component, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPets } from '../../actions/petActions';
import { getBreeds } from '../../actions/breedActions';
import { deleteBreed } from '../../actions/breedActions';

import ShowElements from './ShowElements';
import AddBreedModal from './AddBreedModal';


class ShowBreeds extends Component {
  // state = {
  //   Collapsetoggle: true,
  //   name: "",

  //   DogOpen: false,
  //   catOpen: false,
  //   ParrotOpen: false
  // };

  static protoType = {
    auth: PropTypes.object,
    pet: PropTypes.object,
    getPets: PropTypes.func.isRequired,
    getBreeds: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }

  componentDidMount() {
    // this.props.getPets();
    this.props.getBreeds();
  }

  onDeleteClick = (id) => {
    this.props.deleteBreed(id);
  }
  onEditClick = (id) => {
    // this.props.deleteCategory(id);
  }
  onAddClick = (id) => {
    //this.props.deleteCategory(id);
  }

  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
    };
  };

  openBreeds = (pet, event) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(pet).style.display = "block";
    event.currentTarget.className += " active";
  }

  render() {
    const { isAuthenticated, user, users } = this.props.auth;
    const is_admin = (isAuthenticated && user.admin);
    // const { pets } = this.props.pet;
    const { breeds } = this.props.breed;


    var dogBreeds = [];
    var catBreeds = [];
    var parrotBreeds = [];
    if (breeds)
      breeds.map(breed => {
        if (breed.pet.name == "כלב") {
          dogBreeds = [...dogBreeds, breed]
        }
        if (breed.pet.name == "חתול") {
          catBreeds = [...catBreeds, breed]
        }
        if (breed.pet.name == "תוכי") {
          parrotBreeds = [...parrotBreeds, breed]
        }
      })

    // if (pets)
    //   pets.map(pet => {
    //     if (pet.name == "כלב") {
    //       dogBreeds = pet.breeds
    //     }
    //     if (pet.name == "חתול") {
    //       catBreeds = pet.breeds
    //     }
    //     if (pet.name == "תוכי") {
    //       parrotBreeds = pet.breeds
    //     }
    //   })

    return (
      <Fragment>
        {/* <Container className='mb-5'> */}
          <div class="tab">
            <button class="tablinks" onClick={this.openBreeds.bind(this, "dog")}>כלב</button>
            <button class="tablinks" onClick={this.openBreeds.bind(this, 'cat')}>חתול</button>
            <button class="tablinks" onClick={this.openBreeds.bind(this, 'parrot')}>תוכי</button>
          </div>

          <div id="dog" class="tabcontent">
            <AddBreedModal pet='כלב' />
            <ShowElements elements={dogBreeds} onDeleteClick={this.onDeleteClick} />
          </div>

          <div id="cat" class="tabcontent">
            <AddBreedModal pet='חתול' />
            <ShowElements elements={catBreeds} onDeleteClick={this.onDeleteClick} />
          </div>

          <div id="parrot" class="tabcontent">
            <AddBreedModal pet='תוכי' />
            <ShowElements elements={parrotBreeds} onDeleteClick={this.onDeleteClick} />
          </div>
        {/* </Container> */}
      </Fragment>
    );
  }
}
const btnRemoveStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right",
};

const btnEditStyle = {
  background: "orange",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right",
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  pet: state.pet,
  breed: state.breed
});

export default connect(
  mapStateToProps,
  { getBreeds, getPets, deleteBreed }
)(ShowBreeds);