import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ForumHeader from './ForumHeader';
import { Container } from 'reactstrap';

// import ShowCategories from './ShowCategories';
// import ShowUsers from './ShowUsers';
import ForumDog from './ForumDog';
// import ShoppingList from '../ShoppingList';




class Forum extends Component {

  render() {
    return (
      <Router>
        {/* <div className="App"> */}
          <Container className='mb-5'>
            <ForumHeader />
            <Route path="/forum/dog" component={ForumDog} />
            <Route path="/forum/cat" component={ForumDog} />
            <Route path="/forum/parrot" component={ForumDog} />
            <Route path="/forum/other" component={ForumDog} /> 
          </Container>
        {/* </div> */}
      </Router>
    );
  }
}

export default Forum;
