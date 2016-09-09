import React,{ Component } from 'react';
import NoticeBoard from './NoticeBoard/NoticeBoard';
import Label from './Label/Label';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCardsCall,
         getLabelCall } from '../actions';
import { hashHistory } from "react-router";

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
// import injectTapEventPlugin from "react-tap-event-plugin";

function mapStatetoProps({ todoReducers, labelReducers}){
  return {
    token : todoReducers.token,
    cardsData : todoReducers.notesData,
    labelsData : labelReducers.arrayData,
    isCardsFetching : todoReducers.isfetching,
    isCardsFetchingFailed : todoReducers.isFetchingFailed,
    isLabelFetching : labelReducers.isFetchStart,
    isLabelFetchingFailed : labelReducers.isFetchFailed
  }
}
function mapDispatchToPros (dispatch) {
  return bindActionCreators({
       getCardsCall : getCardsCall,
       getLabelCall : getLabelCall
                          },dispatch);
}
class App extends Component {
  constructor(props) {
    super(props);
    // injectTapEventPlugin();
  }
  getChildContext() {
    return {muiTheme: getMuiTheme()};
  }
  handleLogOut = () => {
      localStorage.removeItem("token");
      hashHistory.push('/');
  }
  componentWillMount() {

    let token = localStorage.getItem("token");
    if(token.length > 1){
      this.props.getCardsCall(token);
      this.props.getLabelCall(token);  
    }else{
      hashHistory.push('/');   
    }
  }
  render(){
    console.log("----APP----",this.props);
    let token = localStorage.getItem("token")
    let button  = <RaisedButton label="LOGOUT" onClick={this.handleLogOut} secondary={true} />
    return(
      <div>
          <AppBar
          title="Google Keep"
          iconElementRight = {button}
          className='nav-bar'/>
          <div className='row'>
            <div className='col-md-3 side-panel'>
              <Label token={token}
                isLabelFetching = {this.props.isLabelFetching}
                isLabelFetchingFailed = {this.props.isLabelFetchingFailed}
                labels = {this.props.labelsData}/>
            </div>
            <div className='col-md-9 notice-board-container'>
              <NoticeBoard 
              token={token} 
              isCardsFetching={this.props.isCardsFetching}
              isCardsFetchingFailed = {this.props.isCardsFetchingFailed}
              labelsData = {this.props.labelsData}
              cardsData={this.props.cardsData}/>
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
