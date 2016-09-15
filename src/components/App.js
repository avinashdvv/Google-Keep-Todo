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
import Snackbar from 'material-ui/Snackbar';

// import injectTapEventPlugin from "react-tap-event-plugin";

function mapStatetoProps({ todoReducers, labelReducers}){
  return {
    token : todoReducers.token,
    cardsData : todoReducers.notesData,
    labelsData : labelReducers.arrayData,
    cardsFetchingStatus : todoReducers.fetchingStatus,
    labelFetchingStatus : labelReducers.fetchingStatus
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
    this.state = {
      open : false,
      method : '',
      labelopen: false,
      lebelmethod : ''
    }

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

    if(localStorage.getItem("token") && token.length > 1){
      this.props.getCardsCall(token);
      this.props.getLabelCall(token);
    }else{
      hashHistory.push('/');
    }

  }

  componentWillReceiveProps(nextProps) {
    let cardsData = nextProps.cardsFetchingStatus;
    let labelData = nextProps.labelFetchingStatus;
    if(cardsData.method.length > 1) {
       if(cardsData.fail.status === true){
         this.setState({
           method : cardsData.fail.data,
           open : true,
           labelopen : false,
           lebelmethod : '',
         })
       }
      if(cardsData.success === true)  {
         this.setState({
           open : true,
           method : cardsData.method+" is success",
           labelopen : false,
           lebelmethod : '',
         })
       }
     }
    if ( labelData.method.length > 1 ) {
        if(labelData.fail.status === true){
          this.setState({
            method : '',
            open : false,
            labelopen : true,
            lebelmethod : labelData.fail.data,
          })
        }
       if(labelData.success === true)  {
          this.setState({
            open : false,
            method : '',
            labelopen : true,
            lebelmethod : labelData.method+" is success"
          })
        }
      }
  }

  render(){
    console.log("----APP----",this.props);
    let token = localStorage.getItem("token")
    let button  = <FlatButton label="LOGOUT" onClick={this.handleLogOut} secondary={true} />
    return(
      <div>
          <AppBar
          title="Google Keep"
          iconElementRight = {button}
          className='nav-bar'/>
          <div className='total-contanier'>
            <div className='side-panel'>
              <Label
                token = {token}
                labelFetchingStatus = {this.props.labelFetchingStatus}
                openPopUp = {(method) => this.setState({open:true,method: method})}
                labels = {this.props.labelsData}/>
            </div>
            <div className='notice-board-container'>
              <NoticeBoard
                token={token}
                cardsFetchingStatus={this.props.cardsFetchingStatus}
                labelsData = {this.props.labelsData}
                openPopUp = {(method) => this.setState({open:true,method: method})}
                cardsData={this.props.cardsData}/>
            </div>
          </div>
          <Snackbar
            open={this.state.labelopen}
            message={this.state.lebelmethod}
            autoHideDuration={4000}
            onRequestClose={() => this.setState({
              labelopen: false,
              lebelmethod : ''
            })}
          />
            <Snackbar
              open={this.state.open}
              message={this.state.method}
              autoHideDuration={1000}
              onRequestClose={() => this.setState({
                open: false,
                method : ''
              })}
            />
        </div>
    );
  }
}
App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
}

export default connect(mapStatetoProps, mapDispatchToPros) (App);
