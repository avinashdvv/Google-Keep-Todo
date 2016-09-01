import '../style/navbar.scss';
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTokenCall } from '../actions';
import { hashHistory } from "react-router";

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

function mapStatetoProps({ todoReducers, labelReducers}){
  return {
    token : todoReducers.token,
  }
}
function mapDispatchToPros (dispatch) {
  return bindActionCreators({
       getTokenCall : getTokenCall,
                          },dispatch);
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.getLogin = this.getLogin.bind(this);
  }
  getChildContext() {
    return {muiTheme: getMuiTheme()};
  }
  getLogin(){
    console.log('avinash')
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    this.props.getTokenCall({
      username : "avinash",
      password : "password"
    });
  }
  componentWillMount(){
    let token = localStorage.getItem("token");
    if(localStorage.getItem("token")){
      hashHistory.push('/dashboard');
      this.props.history.pushState(null, '/dashboard');
    }
  }
  render(){
    console.log('---LOGIN---',this.props);
   return(
      <div className='col-md-offset-3 col-md-3 login-page' >
        <input defaultValue='avinash' id='username' className='form-control' placeholder='username' ref='username'/>
        <br/>        
        <input defaultValue='password' id='password' className='form-control' placeholder='password' ref='password'/>

      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}/>
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.getLogin}/>
      </div>
    );
  }
}

Login.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

Login.propsType = {
  token  : React.PropTypes.isRequired,
  getTokenCall : React.PropTypes.isRequired
}
Login.defaultProps = {
  token : null,
  getTokenCall : null
}
export default connect(mapStatetoProps,mapDispatchToPros)(Login);
