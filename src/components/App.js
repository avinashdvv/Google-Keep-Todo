import React,{ Component } from 'react';
import NavBar from './NavBar';
import NoticeBoard from './NoticeBoard/NoticeBoard';
import Label from './Label/Label';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTokenCall,
         getCardsCall,
         getLabelCall } from '../actions';

import RaisedButton from 'material-ui/RaisedButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import injectTapEventPlugin from "react-tap-event-plugin";
function mapStatetoProps({ todoReducers, labelReducers}){
  return {
    token : todoReducers.token,
    cardsData : todoReducers.notesData,
    labelsData : labelReducers.arrayData
  }
}
function mapDispatchToPros (dispatch) {
  return bindActionCreators({
       getTokenCall : getTokenCall,
       getCardsCall : getCardsCall,
       getLabelCall : getLabelCall
                          },dispatch);
}
class App extends Component {
  constructor(props) {
    super(props);
    injectTapEventPlugin();
    this.getLogin = this.getLogin.bind(this);
    this.state = {
        open: false
      }
  }
  getChildContext() {
    return {muiTheme: getMuiTheme()};
  }
  getLogin(e){
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    this.props.getTokenCall({
      username : username,
      password : password
    });
  }

  handleClose = () => {
    this.setState({open: false});
  };

  componentWillMount(){
    let token = localStorage.getItem("token");
    if(!localStorage.getItem("token")){
      this.setState({
        open: true
      })
    }else{
      this.props.getLabelCall(token);
      this.props.getCardsCall(token);
    }
  }
  
  render(){
    console.log("------------avinash",this.props);
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
          <NavBar token={this.props.token}/>
          <div className='row'>
            <div className='col-md-3 side-panel'>
              <Label token={authToken} labels = {this.props.labelsData}/>
            </div>
            <div className='col-md-9 notice-board-container'>
              <Dialog
                title="User Login"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
                <input value='avinash' className='form-control' placeholder='username' ref='username'/>
                <br/>
                <input value='password' className='form-control' placeholder='password' ref='password'/>
              </Dialog>
                                                                                                        <NoticeBoard token={authToken} labelsData = {this.props.labelsData} cardsData={this.props.cardsData}/>
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
