

import React, { Component, Fragment } from 'react';
import {
  CardText, Card, CardTitle, CardHeader, Row, CardBody, CardImg, Button
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getPostComments, deleteComment } from '../../actions/commentActions';

import AddComment from './AddComment';

class ShowComments extends Component {

  static propTypes = {
    getPostComments: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.getPostComments(this.props.postID)
  }

  onDeleteCommentClick = (command_id) => {
    const { posts } = this.props.post;
    var post = posts.filter(post => post._id == this.props.postID)[0];
    const post_id = post._id;
    this.props.deleteComment(post_id, command_id);
  }

  onDeletePostClick = (id) => {
    this.props.deletePost(id);
  }

  render() {
    const { isAuthenticated, user, users } = this.props.auth;
    const is_admin = (isAuthenticated && user.admin);

    const { comments } = this.props.comment;
    return (
      <Fragment>
        <AddComment postID={this.props.postID} />

        <Card color='light' align='right' className="item-details-body mt-4">
          <CardTitle tag="h5" className='pr-4 pb-3'>תגובות הגולשים</CardTitle>

          {comments && comments.map(({ _id, body, user, published_date }) => (

            <Card key={_id} className="forum-comment mb-5 mr-4">
              <CardBody>
                <Row>

                  <div style={postUserDetails} class="input-group ">
                    <CardImg bottom className='forum-pet-image ml-1 mb-2' src={user.petImage} />
                    <p>
                      <span style={{display:'block'}}>{user.name}&nbsp;
                      {user.admin && <small class='text-muted'>מנהל</small>}

                      </span>

                      <small className="text-muted">
                        פורסם ב:
                        {moment(published_date).format(' DD/MM/YYYY')}&nbsp;
                        בשעה:
                        {moment(published_date).format(' hh:mm')}
                      </small>
                      <br />
                    </p>
                  </div>
                </Row>
                <CardText className={["mb-2 text-muted", "pb-3", "pr-4"]}> {body}</CardText>
                {isAuthenticated && (is_admin || this.props.auth.user._id === user._id) ?
                  <div>
                    <Button
                      style={btnRemoveStyle}
                      // style={{right: '0'}}
                      className='remove-btn-admin'
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteCommentClick.bind(this, _id)}
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
              </CardBody>
            </Card>
          ))}
        </Card>
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


const postUserDetails = {
  // background: "gray",
  // color: "#fff",
  // position: 'relative',
  // width: '100%',
  // height: "100px",
  // width: "900px",
  // border: '1px solid rgb(230, 230, 230)',

  // margin: "auto 0",
  // padding: "0px 2.5px",
  // paddingTop: "20px",
  // borderRadius: "50%",
  // cursor: "pointer",
  // float: "right",
  // webkitBoxShadow: '0 0 1px 0.1px #C7C7C7',
  // boxSshadow: '0 0 1px 0.1px #C7C7C7',
  // webkitBorderRadius: '15px',
  // mozBorderRadius: '15px',
  // borderRadius: '15px', 
};

const mapStateToProps = state => ({
  comment: state.comment,
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPostComments, deleteComment }
)(ShowComments);
