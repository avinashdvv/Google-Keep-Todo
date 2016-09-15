import React , { Component } from 'react';
import { deleteCardCall , editCardCall } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import {Menu, MenuItem} from 'material-ui/Menu';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem, MakeSelectable} from 'material-ui/List'
import DialogBox from './DialogBox';
import Badge from 'material-ui/Badge';

class TodoCard extends Component {
  constructor(props) {
    super(props);
    this.token = this.props.token;
    this.state = {
      open : false,
    }
  }

  handleOpen = ( value ) =>{
    this.setState({
      open : true,
      value : value
    });
  };


  haddleLabelList = (label) => {
   let value;
   if(label.length >= 1){
     value= label.map((op)=>{
                      return <span className='badge'>{op.name}</span>
                  })
   }else{
     value = null
   }
   return value
  }



  render() {
    console.log('TodoCard',this.props);

    return(
      <div className='todo-container'>
        {(()=>{
          if(this.props.cardsData.length >= 1 ){
            return this.props.cardsData.map((value) => {
                    let tiggerExpandCard = this.handleOpen.bind(this,value);
                    let tiggerHaddleLabelList = this.haddleLabelList(value.labels);
                    return(
                            <Card className='todo-card' key={'TodoCard_'+value.id} onClick={tiggerExpandCard}>
                              <CardHeader
                                className='todo-title'
                                title={value.name}>
                              </CardHeader>
                              <CardText className='card-text'>
                                {value.body}
                                <br/> <br/>
                                {tiggerHaddleLabelList}
                                {
                                 (()=>{
                                  if(this.state.open === true && this.state.value.id === value.id){
                                  return  <DialogBox
                                       token ={this.props.token}
                                       dialogState={this.state.open}
                                       dialogClose = {() => this.setState({
                                                       open : false
                                                     })}
                                       value={value}
                                       labelsData={this.props.labelsData}/>
                                  }
                                })()
                               }
                               <br/>
                               <span className='badge edit-text'>Click to Edit</span>
                              </CardText>
                            </Card>
                           );
                  })
          }else{
            return <h2>No Cards are Avalable</h2>
          }
        })()
        }
      </div>
    );
  }
}
export default TodoCard;
