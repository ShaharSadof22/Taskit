import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import {Login} from './Login'
import {Submit} from './Submit'
import {Modal} from './Modal'
import { connect } from "react-redux";
import { logout} from "../store/actions/userActions";

class _NavBar extends React.Component {
  _isMounted = false
    state ={
        isLogged:false,
        isSignIn:false,
        isModalShow:false,
        isIn:false
    }
    
    componentDidMount(){
      this._isMounted = true;
      }
      componentWillUnmount(){
        this._isMounted = false;
      }

onIsLogged=()=>{
    this.setState({isLogged:true,isModalShow:true,isSignIn:false})

}
onIsSubmit=()=>{
    this.setState({isSignIn:true,isModalShow:true,isLogged:false})
}

onCloseModal=()=>{
    this.setState({isSignIn:false,isModalShow:false,isLogged:false,isIn:true})
}
onLogOut=()=>{
    this.setState({isIn:false})
    this.props.logout()
}

    render(){
    return (
        <nav className="nav-bar grid align-center">
           <div className="navdiv-s"> <NavLink  to="/">Home</NavLink></div>
           <div className="navdiv-s"><NavLink  to="/board">Boards</NavLink></div>
           <div className="logo">Task<span className="logo-i">i</span>t</div>
           
           <div className={`navdiv-s   ${(!this.state.isIn) ? '' : 'hide'}`}> <NavLink to="/board/b101">Test Board</NavLink></div>
            <div className={`navdiv-s signup ${(!this.state.isIn) ? '' : 'hide'}`} onClick={this.onIsSubmit}>Sign Up</div>
            <div className={`navdiv-s login  ${(!this.state.isIn) ? '' : 'hide'}`} onClick={this.onIsLogged}>Login</div>
            <div className={`navdiv-s login  ${(!this.state.isIn) ? 'hide' : ''}`} onClick={this.onLogOut}>LogOut</div>
           
    {this.state.isLogged &&  <Modal
              
              onClose={this.onCloseModal}
              children={<Login onClose={this.onCloseModal} />}
            />}
    {this.state.isSignIn &&  <Modal
              
              onClose={this.onCloseModal}
              children={<Submit onClose={this.onCloseModal} />}
            />}
        </nav>
    )
}}

const mapStateToProps = (state) => {
    return {
      loggedInUser: state.userReducer.loggedInUser,
    };
  };
  const mapDispatchToProps = {
    logout,
  };

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(withRouter(_NavBar));


  
