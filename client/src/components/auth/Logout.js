import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class Logout extends Component {

    static propTypes ={
        logout: PropTypes.func.isRequired
    };

    render() {
        return (
            <Fragment>
                {/* <Link className='navlink' style={{float:'right'}} onClick={ this.props.logout }  href="/">
                    התנתק
                </Link> */}
                <Link style={{float:'right'}} className={'navlink py-2 nav-link d-md-inline-block lead'} onClick={ this.props.logout } to='#'>התנתק</Link>

            </Fragment>
        )
    };
}

export default connect
(null,
{ logout }    
)(Logout);