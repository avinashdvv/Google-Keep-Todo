import React , { Component } from 'react';
import {Card, CardHeader, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import { deleteCard } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';

function mapDispatchToPros (dispatch) {
  return bindActionCreators({
    deleteCardAction : deleteCard,
   },dispatch);
}

class TodoCard extends Component {
  constructor(props) {
    super(props);
    this.token = this.props.token;
    this.state = {
      open : false,
      value: 'Property Value'
    }
  }

  handleOpen(value, e){
    console.log('modal open',value);
    this.setState({
      open: true,
      value: value
    });
  };
  handleChange(event){
    this.setState({
      value: event.target.value,
    });
  }
  handleClose(){
    this.setState({open: false});
  };
  handleChange(event){
    this.setState({
      value: event.target.value,
    });
  }
  editCard(value, e){
    console.log('editCard ', value);
    let body = document.getElementById('body_'+value.id).value;
    $.ajax({
       type: "POST",
       url: "http://54.199.244.49/todo/note/"+value.id+"/",
       dataType: 'json',
       headers: {
         "Authorization": "Token "+this.token
       },
       data : JSON.stringify({
         name: value.name,
         body: body
       }),
       success: function(response) {
         console.log("response-->",response);
         this.handleClose();
        }.bind(this),
       error: function(err) {
         console.error('LABEL DELETE IS NOT WORKING',this.props);
       }.bind(this)
     });
  }
  deleteCard(cardId,e){
    $.ajax({
       type: "DELETE",
       url: "http://54.199.244.49/todo/note/"+cardId+"/",
       dataType: 'json',
       headers: {
         "Authorization": "Token "+this.token
       },
       success: function(response) {
         console.log("response-->",response);
         this.handleClose();
        }.bind(this),
       error: function(err) {
         console.error('LABEL DELETE IS NOT WORKING',this.props);
       }.bind(this)
     });
  }
  render(){
    console.log('TODO CARD-------------',this.props);
    const customContentStyle = {
      width: '40%',
      maxWidth: 'none',
      margin:'0 auto'
    };
    let cards = this.props.cardsData.map((value) => {
      let tiggerExpandCard = this.handleOpen.bind(this, value.body);
      let tiggerDeleteCard = this.deleteCard.bind(this, value.id);
      let tiggerHandleClose = this.handleClose.bind(this);
      let tiggerEditCard = this.editCard.bind(this,value);
      let tiggerHandleChange = this.handleChange.bind(this);
      const actions = [
        <RaisedButton label="EDIT" primary={true}
          onTouchTap={tiggerEditCard}/>,
        <RaisedButton label="DELETE" secondary={true}
            onTouchTap={tiggerDeleteCard}/>,
        <RaisedButton label="CLOSE" secondary={true}
                onTouchTap={tiggerHandleClose}/>,
      ];
      return(
      <div className='col-md-4'>
        <Card>
          <CardHeader
            title={value.name}
            subtitle={value.body}
            onTouchTap={tiggerExpandCard}
          >
        </CardHeader>
        </Card>
        <Dialog
          title={value.name}
          actions={actions}
          modal={true}
          contentStyle={customContentStyle}
          open={this.state.open} >
          <TextField
            multiLine={true}
            className='todo-body'
            value={this.state.value}
            onChange={tiggerHandleChange}
            id={'body_'+value.id}
          />
        </Dialog>
      </div>
      );
    });
    return(
      <div>
        {cards}
        <br/>
      </div>
    );
  }
}
export default connect(mapDispatchToPros) (TodoCard);
