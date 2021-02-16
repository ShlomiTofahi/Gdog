import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import ShowCategories from './ShowCategories';
import ShowUsers from './ShowUsers';
import ShowBreeds from './ShowBreeds';
import ShoppingList from '../ShoppingList';

import axios from 'axios';
import { Container } from 'reactstrap';


class AdminManage extends Component {

  render() {
    return (
      <Router>
        <Fragment>
          <Container className='mb-5'>
            <AdminHeader />
            <Route path="/admin/categories" component={ShowCategories} />
            <Route path="/admin/users" component={ShowUsers} />
            <Route path="/admin/products" component={ShoppingList} />
            <Route path="/admin/breeds" component={ShowBreeds} />
          </Container>
        </Fragment>
      </Router>
    );
  }
}

export default AdminManage;
