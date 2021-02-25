import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Icon, InlineIcon } from '@iconify/react';
import parrotIcon from '@iconify-icons/file-icons/parrot';
import dogIcon from '@iconify-icons/whh/dog';
import catIcon from '@iconify-icons/whh/cat';

class ForumHeader extends Component {

  openTab = (event) => {

    var i, tablinks;

    tablinks = document.getElementsByClassName("header-tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    event.currentTarget.className += " active";
  }

  render() {

    return (
      <Fragment>
        {/* <div class="main-box" style={{ backgroundImage: `url(images/forum.png)` }} /> */}

        <header class='forum-nav-header'>
          <h1 class='pb-2 lead' style={{fontSize:'24px'}}>הקהילה שלנו הבית שלך</h1>
          <div class="header-tab">
            <Link class="header-tablinks" onClick={this.openTab.bind(this)} style={linkStyle} to="/forum/dog"><Icon icon={dogIcon} /> כלב</Link>
            <Link class="header-tablinks" onClick={this.openTab.bind(this)} style={linkStyle} to="/forum/cat"><Icon icon={catIcon} /> חתול</Link>
            <Link class="header-tablinks" onClick={this.openTab.bind(this)} style={linkStyle} to="/forum/parrot"><Icon icon={parrotIcon} /> תוכי</Link>
            <Link class="header-tablinks" onClick={this.openTab.bind(this)} style={linkStyle} to="/forum/other">אחר</Link>
          </div>
        </header>
      </Fragment>

    );
  }
}

const headerStyle = {
  background: 'rgb(54,53,54)',
  background: 'linear-gradient(180deg, rgba(54,53,54,1) 0%, rgba(45,45,45,0.77) 100%)',
  // background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '8.9px'
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