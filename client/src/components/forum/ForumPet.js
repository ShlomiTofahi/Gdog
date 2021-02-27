
import React, { Component, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Spinner
} from 'reactstrap';

import { getFilterPosts } from '../../actions/postActions';

import ShowPosts from './ShowPosts';
import AddPostModal from './AddPostModal';

class ForumPet extends Component {
  state = {
    title: '',
    pet: [''],
    breed: [],
    category: [],
  };

  static protoType = {
    post: PropTypes.object,
    category: PropTypes.object,
    getFilterPosts: PropTypes.func.isRequired
  }

  componentDidMount() {
    let petSelected = [];

    if (this.props.match.params) {
      const pet = this.props.match.params.pet
      if (pet === 'dog') petSelected = ['כלב'];
      else if (pet === 'cat') petSelected = ['חתול'];
      else if (pet === 'parrot') petSelected = ['תוכי'];
      else if (pet === 'other') petSelected = ['אחר'];

      this.setState({ pet: petSelected });

    }
    this.openPosts('כללי', null);

    let { title, pet, breed, category } = this.state;
    pet = petSelected;
    // Create Filted Post object
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

    if (this.props.match.params) {

      if (this.props.match.params.pet !== prevProps.match.params.pet) {

        let petSelected = [];
        if (this.props.match.params.pet === 'dog') petSelected = ['כלב'];
        else if (this.props.match.params.pet === 'cat') petSelected = ['חתול'];
        else if (this.props.match.params.pet === 'parrot') petSelected = ['תוכי'];
        else if (this.props.match.params.pet === 'other') petSelected = ['אחר'];

        this.setState({ pet: petSelected });

        this.openPosts('כללי', null);

        let { title, pet, breed, category } = this.state;
        pet = petSelected;
        // Create Filted Post object
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
    this.setState({ category: category1 })

    let { title, pet, breed, category } = this.state;
    if (category1 != 'כללי')
      category = category1
    // Create Filted Post object
    const FiltedPosts = {
      title,
      pet,
      breed,
      category
    };

    // Attempt to filter
    this.props.getFilterPosts(FiltedPosts);

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
    if (event)
      event.currentTarget.className += " active";
    else
      document.getElementById("defaultOpen").className += " active";
  }

  render() {
    const { categories } = this.props.category;
    const { posts, loading } = this.props.post;

    return (
      <Fragment>
        <div class="tab">
          <div class="nav text-nowrap flex-nowrap flex-scroll-x pb-1" style={{ overflowX: 'auto' }}>
            <button class="tablinks" id="defaultOpen" onClick={this.openPosts.bind(this, "כללי")}>כללי</button>
            {categories.map(({ _id, name }) => (
              <button class="tablinks" onClick={this.openPosts.bind(this, name)}>{name}</button>
            ))}
          </div>
        </div>

        {categories.map(({ _id, name }) => (
          <div id={name} class="tabcontent">
            <AddPostModal />
            { loading ?
              <div style={{ position: 'relative', height: '333px' }}><Spinner style={spinnerStyle} color="secondary" /></div>
              : <ShowPosts elements={posts} />
            }
          </div>
        ))}

        <div id="כללי" class="tabcontent">
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

const btnRemoveStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right",
};

const spinnerStyle = {
  position: 'absolute',
  left: '45%',
  top: '40%',
  width: '3rem',
  height: '3rem'
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
  post: state.post,
  category: state.category
});

export default connect(
  mapStateToProps,
  { getFilterPosts }
)(ForumPet);