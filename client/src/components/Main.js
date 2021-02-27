import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import AdminManage from './admin/AdminManage';
import Products from './product/Products';
import ScrollToTop from './ScrollToTop';
import FileUpload from './fileupload/FileUpload';
import ShowProfile from './profile/ShowProfile';
import EditProfile from './profile/EditProfile';
import Home from './home/Home';
import About from './About';
import Contact from './Contact';
import Haircut from './Haircut';
import Payment from './product/Payment';
import Forum from './forum/Forum';
import ForumPet from './forum/ForumPet';
import Post from './forum/Post';

class Main extends Component {

    static protoType = {
        auth: PropTypes.object,
        isAuthenticated: PropTypes.bool
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const is_admin = (isAuthenticated && user.admin);

        return (
            <main>
                <ScrollToTop />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/admin' component={is_admin ? AdminManage : Home} />

                    <Route exact path='/profile' component={isAuthenticated ? ShowProfile : Home} />
                    <Route exact path='/profile/edit' component={isAuthenticated ? EditProfile : Home} />

                    <Route exact path='/products' component={Products} />
                    <Route exact path='/products/payment' component={Payment} />

                    <Route exact path='/forum' component={Forum} />
                    <Route exact path="/forum/:pet" component={Forum} />
                    {/* <Route exact path="/forum/post/:id" component={Post} /> */}

                    <Route exact path='/about' component={About} />
                    <Route exact path='/contact' component={Contact} />
                    <Route exact path='/haircut' component={Haircut} />
                    <Route exact path='/FileUpload' component={FileUpload} />

                </Switch>
            </main>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(
    mapStateToProps,
    {}
)(Main);


