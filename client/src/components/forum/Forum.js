import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPets } from '../../actions/petActions';
import { getPosts, getFilterPosts } from '../../actions/postActions';         
import { getBreeds } from '../../actions/breedActions';
import { deleteBreed } from '../../actions/breedActions';

import ForumPet from './ForumPet';
import Post from './Post';
import AllPosts from './AllPosts';
import ForumHeader from './ForumHeader';




class Forum extends Component {

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
    this.props.getPosts();
  }

  render() {
    const { posts } = this.props.post;


    return (
      <Router>
        {/* <div className="App"> */}
        <div class="forum-cover" style={{ backgroundImage: `url(images/forum.png)` }} />
        <ForumHeader />

        <Container className='mb-5'>
          <Route exact path="/forum" component={AllPosts} />
          <Route exact path="/forum/:pet" component={ForumPet} />
          <Route exact path="/forum/post/:id" component={Post} />
        </Container>
        {/* </div> */}
      </Router>
    );
  }
}

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
)(Forum);