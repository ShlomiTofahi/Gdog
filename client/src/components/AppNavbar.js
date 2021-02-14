import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { Link } from 'react-router-dom';

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    shdowStyle = () => {
        return {
            webkitBoxShadow: '0 0 5px 0.1px #C7C7C7',
            boxSshadow: '0 0 5px 0.1px #C7C7C7'
        };
    };
    render() {
        const { isAuthenticated, user } = this.props.auth;
        const is_admin = (isAuthenticated && user.admin);

        const authLinks = (
            <Fragment>
                <NavItem>
                    <Logout />
                </NavItem>
                <NavItem>
                    <Link style={{float:'right'}} onClick={this.toggle} className={'navlink py-2 nav-link d-md-inline-block lead'} to='/profile'>פרופיל</Link>
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <LoginModal />
                </NavItem>
                <NavItem>
                    <RegisterModal />
                </NavItem>
            </Fragment>
        );

        return (
            <div>
                <Navbar style={this.shdowStyle()} fixed='top' color='white' light expand='sm' className='mb-5'>
                    <Container>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className='ml-auto' navbar>
                                {isAuthenticated ? authLinks : guestLinks}
                                {is_admin &&
                                    <NavItem>
                                        <Link style={{float:'right', color: 'red'}} className={'navlink py-2 nav-link d-md-inline-block lead'} to='/admin'>Admin</Link>
                                    </NavItem>
                                }
                                <NavItem>
                                    <Link style={{float:'right'}} className={'navlink py-2 nav-link d-md-inline-block lead'} to='/about'>אודות</Link>
                                </NavItem>
                                <NavItem>
                                    <Link style={{float:'right'}} className={'navlink py-2 nav-link d-md-inline-block lead'} to='/contact'>צור קשר</Link>
                                </NavItem>
                                <NavItem>
                                    <Link style={{float:'right'}} className={'navlink py-2 nav-link d-md-inline-block lead'} to='/products'>המוצרים שלנו</Link>
                                </NavItem>

                                {/*  <NavItem>
                                <Link href='/contact'>Contact</Link>
                            </NavItem> */}

                            </Nav>
                        </Collapse>
                        <Link style={{marginRight:'50px'}} className={['navlinkLogo d-sm-inline-block',]} to='/'>
                            <p class='mb-0'>
                                <img style={{ width: '71%' }} src='images/logo.png' alt='לוגו' />
                            </p>
                        </Link>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(AppNavbar);