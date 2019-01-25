import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavLink,
  Collapse,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

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
      <Navbar dark expand="md" className="bck_b_light">
        <div className="container">
          <NavbarBrand href="/">Waves</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.showLinks(this.state.page)}
              { 
                this.props.user.userData && this.props.user.userData.isAdmin ?
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Admin
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag={Link} to='/admin/site_info'>
                        Site info
                      </DropdownItem>
                      <DropdownItem tag={Link} to='/admin/add_product'>
                        Add Product
                      </DropdownItem>
                      <DropdownItem tag={Link} to='/admin/manage_categories'>
                        Manage Categories
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={() => this.logoutHandler()}>
                        Log Out
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  : null
              }
              {
                this.props.user.userData && this.props.user.userData.isAuth ?
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      My Account
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag={Link} to='/user/dashboard'>
                        Profile
                      </DropdownItem>
                      <DropdownItem tag={Link} to='/user/history'>
                        Order History
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={() => this.logoutHandler()}>
                        Log Out
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  : null
              }
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