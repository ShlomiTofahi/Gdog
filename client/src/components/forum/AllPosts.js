import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPets } from '../../actions/petActions';
import { getPosts, getFilterPosts } from '../../actions/postActions';
import { getBreeds } from '../../actions/breedActions';
import { deleteBreed } from '../../actions/breedActions';

import ShowPosts from './ShowPosts';
import AddPostModal from './AddPostModal';


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
      <Fragment>
          <div class="tabcontent3">
            <AddPostModal />
            <ShowPosts elements={posts} />
          </div>
      </Fragment>
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