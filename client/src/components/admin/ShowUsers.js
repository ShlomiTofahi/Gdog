import React, { Component, Fragment } from 'react';
import { Button, Table } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getUsers, deleteUser } from '../../actions/authActions';

class ShowUsers extends Component {

  static protoType = {
    auth: PropTypes.object,
    getUsers: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }

  componentDidMount() {
    this.props.getUsers();
  }

  onDeleteClick = (id) => {
    this.props.deleteUser(id);
  }
  onEditClick = (id) => {
    // this.props.deleteUser(id);
  }

  render() {
    const { isAuthenticated, user, users } = this.props.auth;
    const is_admin = (isAuthenticated && user.admin);

    return (
      <Fragment>


        <Table size="sm" striped>
          <thead>
            <tr>
              {/* <th>#</th> */}
              <th>שם מלא</th>
              <th>אימייל</th>
              <th>חיית מחמד</th>
              <th>גזע</th>
              <th>תאריך הרשמה</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ _id, name, email, pet, breed, register_date }) => (
              <tr>
                {/* <th scope="row">{index}</th> */}
                <td>{name}</td>
                <td>{email}</td>
                <td>{pet.name}</td>
                <td>{breed.name}</td>
                <td>{moment(register_date).format('DD/MM/YYYY')}</td>
                <td>
                  {is_admin &&
                    <span>
                      <Button
                        // className='remove-btn'
                        title='מחק'
                        color='danger'
                        size='sm'
                        onClick={this.onDeleteClick.bind(this, _id)}
                      >&#10007;
                </Button>

                      <Button
                        className="mr-3"
                        title='ערוך'
                        // className='edit-btn'
                        color='warning'
                        size='sm'
                        onClick={this.onEditClick.bind(this, _id)}
                      >&#x2711;</Button>
                    </span>
                  }
                </td>
              </tr>
            ))}

          </tbody>
        </Table>
      </Fragment>
    );
  }
}



const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getUsers, deleteUser }
)(ShowUsers);