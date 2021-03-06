import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { connect } from "react-redux";

import { Login } from './Login'
import { Submit } from './Submit'
import { Modal } from './Modal'
import { logout } from "../store/actions/userActions";


class _NavBar extends React.Component {
  _isMounted = false
  state = {
    isLogged: false,
    isSignIn: false,
    isModalShow: false,
    isIn: false
  }

  componentDidMount() {
    if (this.props.loggedInUser) this.setState({ isIn: true });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  onIsLogged = () => {
    this.setState({ isLogged: true, isModalShow: true, isSignIn: false })

  }
  onIsSubmit = () => {
    this.setState({ isSignIn: true, isModalShow: true, isLogged: false })
  }

  onCloseModal = () => {
    this.setState({ isSignIn: false, isModalShow: false, isLogged: false, isIn: true })
  }
  onClose = () => {
    this.setState({ isSignIn: false, isModalShow: false, isLogged: false })
  }
  onLoginHere = () => {
    this.setState({ isSignIn: false, isLogged: true })
  }
  onLogOut = () => {
    this.setState({ isIn: false })
    this.props.logout()
  }
  getAvatar(member) {
    if (member && member.imgUrl) {
        return <Avatar key={member._id} src={member.imgUrl} className="avatar" />
    }
    if (member) {
        return <Avatar key={member._id} className="avatar">{member.userName.substring(0, 1).toUpperCase()}{member.userName.substring(1, 2).toUpperCase()}</Avatar>
    }
    return <Avatar className="avatar" />
}

  render() {
    const { loggedInUser } = this.props

    return (
      <nav className="nav-bar grid align-center">
        <div className="navdiv-s"><NavLink to="/board">Boards</NavLink></div>
        <div className="logo"><NavLink to="/">Task<span className="logo-i">i</span>t</NavLink></div>

        <div className={`navdiv-s signup ${(!this.state.isIn) ? '' : 'hide'}`} onClick={this.onIsSubmit}>Sign Up</div>
        <div className={`navdiv-s login  ${(!this.state.isIn) ? '' : 'hide'}`} onClick={this.onIsLogged}>Login</div>
        <div className={`navdiv-s signup logout ${(!this.state.isIn) ? 'hide' : ''}`} onClick={this.onLogOut}>LogOut</div>
        {loggedInUser && <div className="navdiv-s login user-avatar-navbar">{this.getAvatar(loggedInUser)}</div>}

        {this.state.isLogged && <Modal
          isForLog={true}
          onClose={this.onClose}
          children={<Login onCloseModal={this.onCloseModal} />}
        />}
        {this.state.isSignIn && <Modal
          onLoginHere={this.onLoginHere}
          isForLog={true}
          onClose={this.onClose}
          children={<Submit onCloseModal={this.onCloseModal} />}
        />}
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userReducer.loggedInUser,
  };
};
const mapDispatchToProps = {
  logout,
};

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(withRouter(_NavBar));



