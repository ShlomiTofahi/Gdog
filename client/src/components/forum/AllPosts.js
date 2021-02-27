import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Spinner
} from 'reactstrap';

import { getPosts } from '../../actions/postActions';

import ShowPosts from './ShowPosts';
import AddPostModal from './AddPostModal';


class AllPosts extends Component {

  static protoType = {
    post: PropTypes.object,
    getPosts: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getPosts();
  }


  render() {
    const { posts, loading } = this.props.post;

    return (
      <Fragment>
        <div class="tabcontent3">
          <AddPostModal />
          {loading ?
            <div style={{ position: 'relative', height: '333px' }}><Spinner style={spinnerStyle} color="secondary" /></div>
            : <ShowPosts elements={posts} />
          }
        </div>
      </Fragment>
    );
  }
}

const spinnerStyle = {
  position: 'absolute',
  left: '45%',
  top: '40%',
  width: '3rem',
  height: '3rem'
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(
  mapStateToProps,
  { getPosts }
)(AllPosts);