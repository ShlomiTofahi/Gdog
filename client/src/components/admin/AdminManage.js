import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import AdminHeader from './AdminHeader';
import ShowCategories from './ShowCategories';
import ShowUsers from './ShowUsers';
import ShowBreeds from './ShowBreeds';
import Products from '../product/Products';


class AdminManage extends Component {

  render() {
    return (
      <Router>
          <Container className='mb-5'>
            <AdminHeader />
            <Route path="/admin/categories" component={ShowCategories} />
            <Route path="/admin/users" component={ShowUsers} />
            <Route path="/admin/products" component={Products} />
            <Route path="/admin/breeds" component={ShowBreeds} />
          </Container>
      </Router>
    );
  }
}

export default AdminManage;
