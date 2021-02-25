

import React, { Component, Fragment } from 'react';
import {
  CardText, Card, CardTitle, CardHeader, Row, CardBody, CardImg, Button
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

import { Icon, InlineIcon } from '@iconify/react';
import parrotIcon from '@iconify-icons/twemoji/parrot';
import dogIcon from '@iconify-icons/twemoji/dog';
import catIcon from '@iconify-icons/twemoji/cat';

import { getPostComments, deleteComment } from '../../actions/commentActions';
import { deletePost } from '../../actions/postActions';

import AddComment from './AddComment';

class Post extends Component {
  state = {
    path: '/uploads/items/',
    modal: true,
    name: '',
    price: 0,
    discount: null,
    weight: null,
    description: '',
    pet: '',
    breed: '',
    category: '',
    age: '',
    itemImage: '',
    fadeIn: false,
    dropDownCategoryValue: 'בחר קטגוריה',
    dropDownAgeValue: 'בחר שלב חיים',
    dropDownPetValue: 'בחר חיית מחמד',
    dropDownBreedValue: 'בחר גזע',
    dropDownCategoryOpen: false,
    dropDownAgeOpen: false,
    dropDownPetOpen: false,
    dropDownBreedOpen: false,
    dropDownPaymentOpen: false,
    checkedDiscount: false,
    checkedWeight: false,

    editorState: EditorState.createEmpty()
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.getPostComments(this.props.match.params.id)
  }

  componentDidUpdate(prevProps) {
  }

  onDeleteCommentClick = (command_id) => {
    const { posts } = this.props.post;
    var post = posts.filter(post => post._id == this.props.match.params.id)[0];
    const post_id = post._id;
    this.props.deleteComment(post_id, command_id);
  }

  onDeletePostClick = (id) => {
    this.props.deletePost(id);
  }

  render() {
    const { isAuthenticated, user, users } = this.props.auth;
    const { posts } = this.props.post;
    const { comments } = this.props.comment;

    var post = posts.filter(post => post._id == this.props.match.params.id)[0];

    let petIcon;
  if(post.pet.name=='כלב')
    petIcon = <Icon icon={dogIcon} />;
  if(post.pet.name=='חתול')
    petIcon = <Icon icon={catIcon} />
  if(post.pet.name=='תוכי')
    petIcon = <Icon icon={parrotIcon} />

    return (  
      <Fragment>
        <Card align='right' className="forum-post-details-body mt-4">
          {/* <CardImg bottom className='forum-pet-image ml-1 mt-1' src={post.user.petImage} />
          {post.user.name} */}
          {/* <nav style={postHeader}> */}
          <CardHeader className='pt-2'>
            <div style={postProperties}>
              <span class="ml-2">
                {petIcon}
              <small class="text-muted" style={{ fontSize: '0.7em' }} >{post.breed.name}</small>
              </span>
              <span class="ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmarks-fill" viewBox="0 0 16 16">
                  <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4z"/>
                  <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1H4.268z"/>
                </svg>
                <small class="text-muted" style={{ fontSize: '0.7em' }} >{post.category.name}</small>
              </span>
              <span class="ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar2-event-fill" viewBox="0 0 16 16">
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zM11.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
                </svg>
                <small class="text-muted" style={{ fontSize: '0.7em' }} >{moment(post.published_date).format(' DD/MM/YYYY')}</small>
              </span>
              <span class="ml-2"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>
                <small class="text-muted mr-1" style={{ fontSize: '0.7em' }}>{post.views}</small>
              </span>
              <span class="ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-text-fill" viewBox="0 0 16 16">
                  <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
                </svg>
                <small class="text-muted mr-1" style={{ fontSize: '0.7em' }} >{comments.length}</small>
              </span> 
              <span >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
                <small class="text-muted" style={{ fontSize: '0.7em' }}>{post.user.name}</small>
              </span>
            </div>

            {/* <Row>

                </Row>   */}
            <Row>

              <div style={postUserDetails} class="input-group col-12 col-sm-8 col-md-6 col-lg-5 pr-0">
                <CardImg bottom className='forum-pet-image ml-1 mt-3' src={post.user.petImage} />
                <p>
                  <small className="text-muted">
                    פורסם ב:
                  {moment(post.published_date).format(' DD/MM/YYYY')}&nbsp;
                  בשעה:
                  {moment(post.published_date).format(' hh:mm')}
                  </small>
                  <br />
                  {post.user.name}
                </p>
              </div>
            </Row>
          </CardHeader>
          {/* </nav> */}
          {this.props.isAuthenticated && (this.props.auth.user.admin || this.props.auth.user._id === post.user._id) ?
            <div>
              <Button
                style={btnRemoveStyle}
                className='remove-btn-admin'
                color='danger'
                size='sm'
                onClick={this.onDeletePostClick.bind(this, post._id)}
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
                      <CardTitle tag="h3" className='pr-3'>{post.title}</CardTitle>

          {post.postImage !== '' &&
            <div class="item-image pr-3">
              <CardImg bottom className='ProductImg' src={post.postImage} alt="Card image cap" />
            </div>
          }

          <CardBody>

            <div class="item-description mb-4">
              <CardText className={["mb-2 text-muted", "pb-3"]}> {post.body}</CardText>
            </div>

            {/* 
            <div class="item-price">
              <CardFooter>
                <CardText>מחיר:</CardText>
                <CardText >מחיר מבצע:</CardText >
              </CardFooter>
            </div>



            <div class="item-views">
              <CardText>
                <small className="text-muted">צפיות: {post.views}</small>
              </CardText>
            </div> */}

          </CardBody>
        </Card>

        <AddComment postID={this.props.match.params.id} />

        <Card color='light' align='right' className="item-details-body mt-4">
          <CardTitle tag="h5" className='pr-5 pb-3'>תגובות הגולשים</CardTitle>

          {comments && comments.map(({ _id, body, user, published_date }) => (

            <Card key={_id} className="forum-comment mb-5 mr-5">
              <CardBody>
                <Row>

                  <div style={postUserDetails} class="input-group ">
                    <CardImg bottom className='forum-pet-image ml-1 mb-2' src={user.petImage} />
                    <p>
                    {user.name}&nbsp;

                      <small className="text-muted">
                        פורסם ב:
                        {moment(published_date).format(' DD/MM/YYYY')}&nbsp;
                        בשעה:
                        {moment(published_date).format(' hh:mm')}
                      </small>
                    </p>
                  </div>
                </Row>
                {/* <CardFooter> */}
                  <CardText className={["mb-2 text-muted", "pb-3", "pr-4"]}> {body}</CardText>
                {/* </CardFooter> */}
                {this.props.isAuthenticated && (this.props.auth.user.admin || this.props.auth.user._id === user._id) ?
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

const postProperties = {
  position: 'absolute',
  left: '0',
  top: '0',
  paddingLeft:'18px'
}
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
const postHeader = {
  background: "gray",
  color: "#fff",
  position: 'relative',
  width: '100%',
  height: "100px",
  // width: "900px",
  // border: '1px solid rgb(230, 230, 230)',

  margin: "auto 0",
  padding: "0px 2.5px",
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
  post: state.post,
  comment: state.comment,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  error: state.error,
  pet: state.pet,
  category: state.category,
  age: state.age
});

export default connect(
  mapStateToProps,
  { getPostComments, deleteComment, deletePost }
)(Post);
