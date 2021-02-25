import React, { Component } from 'react';
import {
  Button, Form, FormGroup, Label, Input,CardImg,CardFooter
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addComment } from '../../actions/commentActions';
import { clearErrors } from '../../actions/errorActions';
import { clearMsgs } from '../../actions/msgActions';

class ItemModal extends Component {
  state = {
    modal: false,
    fadeIn: false,
    body: '',
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  }

  componentDidMount() {
    // this.props.getPets();
  }

  componentDidUpdate(prevProps) {
    const { error, msg, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'ADD_POST_FAIL') {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    //If authenticated, close modal

    if (this.state.modal) {
      if (msg.id === 'ADD_COMMENT_SUCCESS') {

        this.toggle();
        this.setState({
          body: '',
        })
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    // Clear msgs
    this.props.clearMsgs();

    this.setState({
      modal: !this.state.modal,
      fadeIn: false,
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();

    const { body } = this.state;

    const newComment = {
      body
    }

    this.props.addComment(this.props.postID, newComment);

    this.setState({
      body:''
    });
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;


    return (
      <div>

        {/* { this.props.isAuthenticated ? */}
          {/* <Button outline
            color='info'
            size='sm'
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}
          >הגב</Button> */}
          {/* : null} */}


        {/* <Modal
          align="right"
          isOpen={this.state.modal}
          toggle={this.toggle}
          onClosed={this.close}
        >
          <ModalHeader cssModule={{ 'modal-title': 'w-100 text-center' }} toggle={this.toggle} ><span class="lead">הוספת מוצר למוצרים שלי</span></ModalHeader>
          <ModalBody> */}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>


                                       { isAuthenticated ?
 
          <nav align="right" class="mt-3">
            <div style={addPostBorder} class="input-group col-12 col-sm-8 col-md-6 col-lg-5 pr-1 pb-3">
              <CardImg bottom className='forum-pet-image ml-1' src={user.petImage} />
                <Label for='body'></Label>
                <Input
                                style={addPostInput}
                  value={this.state.body}                      
                  type='text'
                  name='body'
                  id='body'
                  placeholder={'היי ' + user.name + ', כתוב תגובה...'} 
                // className="form-control input-lg"

                  className='mb-2'
                  onChange={this.onChange}
                />
                <div style={commentButton}>
                  <Button
                  style={{height:'38px'}}
                  size='sm'
                  className='badge-pill badge-secondary'
                  color='dark'
                  block
                >	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;תגובה</Button>
                </div>
            </div>
          </nav>
                     : <CardFooter className='lead mt-3' style={{ fontSize: '15px' }} align='right'><smalll> היי אורח, התחבר כדי להגיב לפוסט זה </smalll></CardFooter>} 


              </FormGroup>
            </Form>
          {/* </ModalBody>
        </Modal> */}
      </div>
    );
  }
}

const addPostBorder = {
  background: "white",
  color: "#fff",
  height: "100px",
  width: "900px",
  border: '1px solid rgb(230, 230, 230)',

  // margin: "auto 0",
  // padding: "0px 2.5px",
  paddingTop: "20px",
  // borderRadius: "50%",
  // cursor: "pointer",
  // float: "right",
  webkitBoxShadow: '0 0 1px 0.1px #C7C7C7',
  boxSshadow: '0 0 1px 0.1px #C7C7C7',
  webkitBorderRadius: '15px',
  mozBorderRadius: '15px',
  borderRadius: '15px', 
};

const addPostInput = {
  background: '#f7f7f7',
  webkitBorderRadius: '20px',
  mozBorderRadius: '20px',
  borderRadius: '20px', 
  zIndex:'1'
};
const commentButton = {
position:'relative',
left:'34px',
width:'80px',
};


const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  comment: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  msg: state.msg,
});

export default connect(
  mapStateToProps,
  { addComment, clearErrors, clearMsgs }
)(ItemModal);
