
import React, { Component, Fragment } from 'react';
import {
  ListGroupItem, Button, CardImg, Col, Row
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { deletePost, viewsPost } from '../../actions/postActions';
import { clearErrors, returnErrors } from '../../actions/errorActions';
import { clearMsgs, returnMsgs } from '../../actions/msgActions';

class ShowElements extends Component {
  state = {
    modal: false,
    // itemClicked: false

  };
  static protoType = {
    auth: PropTypes.object,
    category: PropTypes.object,
    getUsers: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }

  componentDidMount() {
    // this.props.getItems();
  }

  componentDidUpdate(prevProps) {
    const { error, msg, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'DELETE_FAIL') {
        this.setState({ msg: error.msg, modal: true });
      } else {
        this.setState({ msg: null, modal: false });
      }
    }
  }

  handleClickPost = (id) => {
    var viewedPostList = localStorage.getItem('viewedPostList');
    if (viewedPostList == null)
      viewedPostList = [];

    if (!viewedPostList.includes(String(id))){
      this.props.viewsPost(id)
      viewedPostList = viewedPostList.concat(String(id))
    }


    localStorage.setItem('viewedPostList', viewedPostList);

    // this.setState({
    //     itemClicked: true
    // });

}

// handleClickItemToFalse = () => {
//     this.setState({
//         itemClicked: false
//     });
// }
  onDeleteClick = (id) => {
    this.props.deletePost(id);
  }
  onEditClick = (id) => {
    // this.props.deleteCategory(id);
  }
  onAddClick = (id) => {
    //this.props.deleteCategory(id);
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    // Clear msgs
    this.props.clearMsgs();

    this.setState({
      modal: !this.state.modal
    });
  }

  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
    };
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const is_admin = (isAuthenticated && user.admin);

    const elements = this.props.elements

    return (
      <Fragment >
        <TransitionGroup align='right' className='pt-3 pb-3'>
          {elements && elements.map(({ _id, title, published_date, views, comments, user }) => (
            <CSSTransition key={_id} timeout={500} classNames='fade'>
              <ListGroupItem className='mt-2' style={this.getStyle()}>
                <Link to={'/forum/post/'+_id} style={{ color: 'black' }} onClick={this.handleClickPost.bind(this, _id)}>
                  <Col>
                    <Row>
                      <span class="forum-user-image ml-1 ml-sm-2 ml-md-3">
                        <CardImg bottom className='forum-pet-image' src={user.petImage} />
                      </span>
                      
                      <span class="forum-post-title">{title}<br />
                      <small>פורסם ע"י: {user.name}</small>
                      </span>

                      <span className='forum-post'>
                        <Row className='pt-2'>

                          <small class='ml-1 ml-sm-1 ml-md-3 ml-lg-4'>
                            תגובות:
                  <br />
                            {comments.length}
                          </small>  

                          <small class='ml-1 ml-sm-1 ml-md-3 ml-lg-4'>
                            צפיות:
                  <br />
                            {views}
                          </small>
                          <small class='ml-1 ml-sm-1 ml-md-2 ml-lg-3'>
                            מועד העלאה:
                  <br />
                            {moment(published_date).format('DD/MM/YYYY')}
                          </small>
                        </Row>
                      </span>



                    </Row>
                  </Col>
                </Link>
                
                {this.props.isAuthenticated  && (this.props.auth.user.admin || this.props.auth.user._id===user._id) ?  
                        <div>
                          <Button
                            style={btnRemoveStyle}
                            // style={{right: '0'}}
                            className='remove-btn-admin'
                            color='danger'
                            size='sm'
                            onClick={this.onDeleteClick.bind(this, _id)}
                          >&#10007;</Button>
                          {/* <Button
                        style={btnEditStyle}
                        className='edit-btn-admin'
                        title='ערוך'
                        color='warning'
                        size='sm'
                        onClick={this.onEditClick.bind(this, _id)}
                      >&#x2711;</Button> */}

                        </div>
                        : null}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Fragment>
    );
  }
}
const btnRemoveStyle = {
  background: "#d15258",
  color: "#fff",
  border: "none",
  margin: "auto 0",
  padding: "0px 2.5px",
  // borderRadius: "50%",
  // cursor: "pointer",
  // float: "right",
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
  category: state.category,
  msg: state.msg,
  error: state.error,
  item: state.item
});

export default connect(
  mapStateToProps,
  { deletePost, viewsPost, clearErrors, clearMsgs, returnErrors, returnMsgs }
)(ShowElements);