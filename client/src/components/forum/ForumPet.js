
import React, { Component, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPets } from '../../actions/petActions';
import { getPosts, getFilterPosts } from '../../actions/postActions';
import { getBreeds } from '../../actions/breedActions';
import { deleteBreed } from '../../actions/breedActions';

import ShowPosts from './ShowPosts';
import AddPostModal from './AddPostModal';

class ShowBreeds extends Component {
  state = {
    title: '',
    pet: [''],
    breed: [],
    category: [],
  };

  static protoType = {
    auth: PropTypes.object,
    pet: PropTypes.object,
    getPosts: PropTypes.func.isRequired,
    getFilterPosts: PropTypes.func.isRequired,
    getPets: PropTypes.func.isRequired,
    getBreeds: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }

  componentDidMount() {
    let petSelected = [];

    if(this.props.match.params){
      const pet = this.props.match.params.pet
      if(pet ==='dog') petSelected = ['כלב'];
      else if(pet ==='cat') petSelected = ['חתול'];
      else if(pet ==='parrot') petSelected = ['תוכי'];
      else if(pet ==='other') petSelected = ['אחר'];

      this.setState({pet:petSelected});

    }
    this.openPosts('כללי', null); 

    this.props.getBreeds();
    // this.props.getPosts();

    let { title, pet, breed, category } = this.state;
    pet = petSelected;
    // Create Filted Item object
    const FiltedPosts = {
        title,
        pet,
        breed,
        category
    };

    // Attempt to filter
    this.props.getFilterPosts(FiltedPosts);
  }
  componentDidUpdate(prevProps) {
    // const pet = this.props.match.params.pet

    if(this.props.match.params){

      if(this.props.match.params.pet !== prevProps.match.params.pet) {

        let petSelected = [];
        if(this.props.match.params.pet ==='dog') petSelected = ['כלב'];
        else if(this.props.match.params.pet ==='cat') petSelected = ['חתול'];
        else if(this.props.match.params.pet ==='parrot') petSelected = ['תוכי'];
        else if(this.props.match.params.pet ==='other') petSelected = ['אחר'];
  
        this.setState({pet:petSelected});


        this.openPosts('כללי', null); 

        this.props.getBreeds();
        // this.props.getPosts();
    
        let { title, pet, breed, category } = this.state;
        pet = petSelected;
        // Create Filted Item object
        const FiltedPosts = {
            title,
            pet,
            breed,
            category
        };
    
        // Attempt to filter
        this.props.getFilterPosts(FiltedPosts);

      }
    }
  }
  
  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
    };
  };

  openPosts = (category1, event) => {
    this.setState({ category: category1  })

    let { title, pet, breed, category } = this.state;
    if(category1!='כללי')
      category = category1
    // Create Filted Item object
    const FiltedItems = {
        title,
        pet,
        breed,
        category
    };

    // Attempt to filter
    this.props.getFilterPosts(FiltedItems);

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
      document.getElementById(category1).style.display = "block";
    if(event)
      event.currentTarget.className += " active";
    else
      document.getElementById("defaultOpen").className += " active";
  }

  render() {
    const { isAuthenticated, user, users } = this.props.auth;
    const is_admin = (isAuthenticated && user.admin);
    const { categories } = this.props.category;
    const { posts } = this.props.post;



    return (
      
      <Fragment>
        <div class="tab">
          <div class="nav text-nowrap flex-nowrap flex-scroll-x pb-1" style={{overflowX: 'auto'}}>
          <button class="tablinks" id="defaultOpen" onClick={this.openPosts.bind(this, "כללי")}>כללי</button>

            {categories.map(({ _id, name }) => (
              <button class="tablinks" onClick={this.openPosts.bind(this, name)}>{name}</button>

            ))}
          </div>
        </div>

        {categories.map(({ _id, name }) => (
          <div id={name} class="tabcontent">
            <AddPostModal />
            <ShowPosts elements={posts} />
          </div>
        ))}

        <div id="כללי" class="tabcontent">
          <AddPostModal />
          <ShowPosts elements={posts} />
        </div>
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
  post: state.post,
  category: state.category,
  pet: state.pet,
  breed: state.breed
});

export default connect(
  mapStateToProps,
  { getBreeds, getPets, deleteBreed, getPosts, getFilterPosts }
)(ShowBreeds);