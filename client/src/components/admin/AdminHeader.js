import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminHeader extends Component {


  render() {

    return (
      <header style={headerStyle}>
        <h1>כלים</h1>
        <Link style={linkStyle} to="/admin/users">משתמשים</Link> | <Link style={linkStyle} to="/admin/categories">קטגוריות</Link>
        | <Link style={linkStyle} to="/admin/products">מוצרים</Link>  | <Link style={linkStyle} to="/admin/breeds">גזעים</Link>
      </header>
    );
  }
}

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px'
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none'
}

export default AdminHeader;