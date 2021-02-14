import React, {Component} from 'react';
import { connect } from  'react-redux';
import { Switch, Route } from 'react-router-dom';
// import Admin from './admin/AdminSettings';
import AdminManage from './admin/AdminManage';
import ShowItems from './ShoppingList';
// import ShowUsers from './admin/ShowUsers';
// import ShowCategories from './admin/ShowCategories';
import PropTypes from 'prop-types';
import ScrollToTop from './ScrollToTop';
import FileUpload from './FileUpload';
import ShowProfile from './profile/ShowProfile';
import EditProfile from './profile/EditProfile';
import Home from './home/Home';
import About from './About';
import Contact from './Contact';
import Payment from './Payment';
import Forum from './forum/Forum';

class Main extends Component {

    static protoType = {
        auth: PropTypes.object,
        isAuthenticated: PropTypes.bool
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const is_admin =  (isAuthenticated && user.admin);

        return (
            <main>
                <ScrollToTop />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/admin' component={ is_admin ? AdminManage: ShowItems} />
                    {/* <Route exact path='/admin/users' component={ is_admin ? ShowUsers: ShowItems}/>
                    <Route exact path='/admin/categories' component={is_admin ? ShowCategories: ShowItems }/>
                    <Route exact path='/admin/items' component={ShowItems}/> */}

                    <Route exact path='/profile' component={isAuthenticated ? ShowProfile: ShowItems}/>
                    <Route exact path='/profile/edit' component={isAuthenticated ? EditProfile: ShowItems}/>

                    <Route exact path='/products' component={ShowItems}/>
                    <Route exact path='/about' component={About}/>
                    <Route exact path='/contact' component={Contact}/>
                    <Route exact path='/products/payment' component={Payment}/>
                    <Route exact path='/forum' component={Forum}/>
                    <Route exact path='/FileUpload' component={FileUpload}/>

                </Switch>
            </main>
        )
    }    
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
});
export default  connect(
    mapStateToProps,
      {}
     ) (Main); 


