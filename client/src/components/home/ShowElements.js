
import React, { Component, Fragment } from 'react';
import { ListGroup, ListGroupItem, Button, Alert, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getItems } from '../../actions/itemActions';
import { clearErrors, returnErrors } from '../../actions/errorActions';
import { clearMsgs, returnMsgs } from '../../actions/msgActions';

class ShowElements extends Component {
  state = {
    modal: false
  };
  static protoType = {
    auth: PropTypes.object,
    category: PropTypes.object,
    getUsers: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }

  componentDidMount() {
    this.props.getItems();
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

  onDeleteClick = (id) => {
    // const { items } = this.props.item;
    // const { error, msg } = this.props;
    this.props.onDeleteClick(id);

    // var res = items.filter(item => item.category._id === id)
    // if (error.id === 'DELETE_CATEGORY_FAIL') {
    //    this.setState({ msg: error.msg });
      //  this.setState({ modal: true })
    // }
    // if (res.length) {
    //   this.setState({ modal: true })
    // }

    // var res = items.filter(item => item.category._id === id)
    // if (res.length){
    // this.props.returnMsgs('קיים מוצרים תחת קטגוריה זו', null, '')
    // this.setState({ msg: msg.msg });

    // this.setState({modal:!this.state.modal})

    //this.toggle();
    // }
    // else {
    // }
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
    const { isAuthenticated, user, users } = this.props.auth;
    const is_admin = (isAuthenticated && user.admin);

    const elements = this.props.elements

    return (
      <Fragment >
        <ListGroup style={{ maxWidth: '600px', textAlign: 'right' }}>
          <TransitionGroup className='pt-3 pb-3'>
            {elements && elements.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem className='mt-1' style={this.getStyle()}>

                  {this.props.isAuthenticated ?
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

                  <span class="ml-4">{name}</span>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>

        <Modal
          align="right"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader cssModule={{ 'modal-title': 'w-100 text-center' }} toggle={this.toggle} ><span class="lead">הודעת שגיאה</span></ModalHeader>

          <ModalBody>
            {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
          </ModalBody>
        </Modal>
        
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
  category: state.category,
  msg: state.msg,
  error: state.error,
  item: state.item
});

export default connect(
  mapStateToProps,
  { getItems, clearErrors, clearMsgs, returnErrors, returnMsgs }
)(ShowElements);