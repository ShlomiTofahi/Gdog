import React, { Component, Fragment } from 'react';
import { Button, Table } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';

import { getUsers, deleteUser } from '../../actions/authActions';

class ShowUsers extends Component {
  state = {
    path: '/uploads/users/'
  };

  static protoType = {
    auth: PropTypes.object,
    getUsers: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getUsers();
  }

  onDeleteClick = (id, petImage) => {
    this.props.deleteUser(id);

    const noImageFullpath = this.state.path + 'no-image.png';
    const filepath = petImage;
    if (filepath !== '' && filepath != noImageFullpath) {
        const formData = new FormData();
        formData.append('filepath', filepath);
        formData.append('abspath', this.state.path);

        axios.post('/remove', formData);
    }
  }

  onEditClick = (id) => {
    //TODO
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
            {users.map(({ _id, name, email, pet, breed, register_date, petImage }) => (
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
                        onClick={this.onDeleteClick.bind(this, _id, petImage)}
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
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUsers, deleteUser }
)(ShowUsers);