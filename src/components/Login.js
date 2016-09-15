import '../style/navbar.scss';
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTokenCall } from '../actions';
import { hashHistory } from "react-router";

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

function mapStatetoProps({ todoReducers, labelReducers}){
  return {
    token : todoReducers.token,
    fetchingStatus : todoReducers.fetchingStatus
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
    this.state = {
      open : false
    }
  }
  getChildContext() {
    return {muiTheme: getMuiTheme()};
  }
  getLogin(){
    console.log('avinash')
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    this.props.getTokenCall({
      username : username,
      password : password
    });
  }
  componentWillMount () {
    let token = localStorage.getItem("token");
    if(localStorage.getItem("token")){
      hashHistory.push('/dashboard');
      // this.props.history.pushState(null, '/dashboard');
    }

  }
  componentDidMount () {
    let clientHeight = document.getElementById('card').offsetHeight;
    document.getElementById('card').style.height = clientHeight+'px';
    console.error(clientHeight);
    if(document.getElementById('circular-progress')){
      document.getElementById('circular-progress').parentNode.style.margin = '0px auto';
    }
  }

  render(){
    console.log('---LOGIN---',this.props);
    let output,usernameErrorText,passwordErrorText;
    if(this.props.fetchingStatus.method === 'GET_TOKEN' &&
      this.props.fetchingStatus.fail.status === true &&
      this.props.fetchingStatus.fail.data === "worng username or password") {
      usernameErrorText = 'wrong username or';
      passwordErrorText = 'wrong password';
      console.error(usernameErrorText);
    }
    if(this.props.fetchingStatus.method === 'GET_TOKEN' &&
       this.props.fetchingStatus.start === true) {
         output =  <div className='circular-progress' id='circular-progress'>
                      <CircularProgress />
                  </div>

       }
    else {
        output =  <div>
                    <TextField  hintText="username"
                      id='username'
                      className='username'
                      defaultValue='avinash'
                      errorText = {usernameErrorText}
                      ref='username'/>
                    <TextField type='password'
                       errorText = {passwordErrorText}
                       defaultValue='password'
                       className='password' id='password'  hintText='password' ref='password'/>
                       <br/>
                       <br/>
                    <CardActions className='card-actions'>
                      <RaisedButton
                        label="Submit"
                        primary={true}
                        className='Submit-btn'
                        keyboardFocused={true}
                        onClick={this.getLogin}/>
                    </CardActions>
                  </div>
          }

   return(
        <Card className='card' id='card'>
            {output}
        </Card>
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
