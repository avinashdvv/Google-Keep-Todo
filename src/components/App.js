import React,{ Component } from 'react';
import NavBar from './NavBar';
import NoticeBoard from './NoticeBoard/NoticeBoard';
import Label from './Label/Label';
import { getTokenCall } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

function mapStatetoProps({todoReducers}){
  return {
    token : todoReducers.token,
  }
}
function mapDispatchToPros (dispatch) {
  return bindActionCreators({ getTokenCall : getTokenCall},dispatch);
}
class App extends Component {
  constructor(props) {
    super(props);
    this.getLogin = this.getLogin.bind(this);
    this.state = {
        open: false
      }
  }
  getChildContext() {
    return {muiTheme: getMuiTheme()};
  }
  getLogin(){
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    // let username = 'avinash';
    // let password = 'password';
    this.props.getTokenCall({
      username : username,
      password : password
    });
        this.setState({
            open: false
          });
  }

  handleClose = () => {
    this.setState({open: false});
  };
  componentDidMount(){
    if(!localStorage.getItem("token")){
      this.setState({
        open: true
      })
    }
  }
  render(){
    let authToken = localStorage.getItem("token");
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}/>,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.getLogin}/>
    ];
    return(
      <div>
          <NavBar />
          <div className='row'>
            <div className='col-md-3 side-panel'>
              <Label token={authToken}/>
            </div>
            <div className='col-md-9 notice-board-container'>
              <Dialog
                title="User Login"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                >
                <input className='form-control' placeholder='username' ref='username'/>
                <br/>
                <input className='form-control' placeholder='password' ref='password'/>
              </Dialog>
              <NoticeBoard token={authToken}/>
            </div>
        </div>
      </div>
    );
  }
}
App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
}

export default connect(mapStatetoProps, mapDispatchToPros) (App);
