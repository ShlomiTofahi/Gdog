import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import ForumPet from './ForumPet';
import Post from './Post';
import AllPosts from './AllPosts';
import ForumHeader from './ForumHeader';

class Forum extends Component {

  render() {
    return (
      <Router>
        <div class="forum-cover" style={{ backgroundImage: `url(images/forum.png)` }} />
        <ForumHeader />
        <Container className='mb-5'>
          <Route exact path="/forum" component={AllPosts} />
          <Route exact path="/forum/:pet" component={ForumPet} />
          <Route exact path="/forum/post/:id" component={Post} />
        </Container>
      </Router>
    );
  }
}

export default Forum;
