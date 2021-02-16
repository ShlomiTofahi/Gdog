import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class ForumHeader extends Component {


    render() {

        return (


            <header style={headerStyle}>
                {/* <Link to='/admin/users'>Users</Link>
                            <Link to='/admin/items'>Items</Link>
                            <Link to='/admin/categories'>Categories</Link> */}
                <h1>פורום</h1>

                <Link style={linkStyle} to="/forum/dog">כלב</Link><span style={VlStyle} /><Link style={linkStyle} to="/forum/cat">חתול</Link>
                <span style={VlStyle} /><Link style={linkStyle} to="/forum/parrot">תוכי</Link><span style={VlStyle} /><Link style={linkStyle} to="/forum/other">אחר</Link>
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
    textDecoration: 'none',
    padding: '10px',
  }

  const VlStyle = {
    borderLeft: '1px solid gray',
    height: '15px',
    // position: 'absolute',
    // left: '50%',
    // marginLeft: '-3px',
    // top: '0'
  }
  
export default ForumHeader;