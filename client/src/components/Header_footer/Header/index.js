import React, { Component } from 'react';
import { Link, withRouter  } from 'react-router-dom';
import { Nav, Navbar, NavbarBrand, NavbarToggler, NavLink, Collapse, NavItem } from 'reactstrap';

import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/user';

class Header extends Component {

  state = {
    page: [
      {
        name: 'Home',
        linkTo: '/',
        public: true
      },
      {
        name: 'Products',
        linkTo: '/shop',
        public: true
      }
    ],
    user: [
      {
        name: 'My Cart',
        linkTo: '/user/cart',
        public: false
      },
      {
        name: 'My Account',
        linkTo: '/user/dashboard',
        public: false
      },
      {
        name: 'Register',
        linkTo: '/register',
        public: true
      },
      {
        name: 'Log in',
        linkTo: '/login',
        public: true
      },
      {
        name: 'Log out',
        linkTo: '/user/logout',
        public: false
      },
    ],
    isNavOpen: false
  }

  toggleNavbar = () => {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }


  logoutHandler = () => {
    this.props.dispatch(logoutUser()).then(response => {
      if (response.payload.success) {
        this.props.history.push('/')
      }
    }).catch(err => console.log(err));
  }


  cartLink = (item, i) => {
    const user = this.props.user.userData;

    return (
      <div className="cart_link" key={i}>
        {user.cart && user.cart.length ? <span>{user.cart.length}</span> : null}
        <Link to={item.linkTo}>
          {item.name}
        </Link>
      </div>
    )
  }

  // defaultLink = (item, i) => (
  //   item.name === 'Log out' ?
  //     <div className="log_out_link"
  //       key={i}
  //       onClick={() => this.logoutHandler()}
  //     >
  //       {item.name}
  //     </div>
  //     :
  //     <Link to={item.linkTo} key={i}>
  //       {item.name}
  //     </Link>
  // )

  cartLink = (item, i) => {
    const user = this.props.user.userData;

    return (
      <NavItem key={i}>
        
        <NavLink tag={Link} to={item.linkTo}>
          {item.name}
          {user.cart && user.cart.length ? <span className='badge badge-primary badge-pill mb-3'>{user.cart.length}</span> : null}
        </NavLink>
      </NavItem>
    )
  }

  defaultLink = (item, i) => (
    item.name === 'Log out' ?
      <NavItem key={i} >
        <NavLink href="#" onClick={() => this.logoutHandler()}>
          {item.name}
        </NavLink>

      </NavItem>
      :
      <NavItem key={i}>
        <NavLink tag={Link} to={item.linkTo}>
          {item.name}
        </NavLink> 
      </NavItem>
  )


  showLinks = (type) => {
    const list = [];
    if (this.props.user.userData) {
      type.forEach(item => {
        if (!this.props.user.userData.isAuth) {
          if (item.public) {
            list.push(item)
          }
        } else {
          if (item.name !== 'Log in' && item.name !== 'Register') {
            list.push(item)
          }
        }
      });
    }

    return list.map((item, i) => {
      if (item.name !== 'My Cart') {
        return this.defaultLink(item, i)
      } else {
        return this.cartLink(item, i)
      }

    })
  }

  render() {
    return (
      // <header className="bck_b_light">
      //   <div className="container">
      //     <div className="left">
      //       <div className="logo">
      //         Waves
      //       </div>
      //     </div>
      //     <div className="right">
      //       <div className="top">
      //         {this.showLinks(this.state.user)}
      //       </div>
      //       <div className="bottom">
      //         {this.showLinks(this.state.page)}
      //       </div>
      //     </div>
      //   </div>
      // </header>
      <Navbar dark expand="md" className="bck_b_light">
        <div className="container">
          <NavbarBrand href="/">Waves</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav className="ml-auto" navbar>
            {this.showLinks(this.state.page)}
            {this.showLinks(this.state.user)}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(withRouter(Header));