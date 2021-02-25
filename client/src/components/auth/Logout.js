import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { logout } from '../../actions/authActions';

export class Logout extends Component {

    static propTypes ={
        logout: PropTypes.func.isRequired
    };

    render() {
        return (
            <Fragment>
                <Link style={{float:'right'}} className={'navlink py-2 nav-link d-md-inline-block lead'} onClick={ this.props.logout } to='#'>התנתק</Link>
            </Fragment>
        )
    };
}

export default connect
(null,
{ logout }    
)(Logout);