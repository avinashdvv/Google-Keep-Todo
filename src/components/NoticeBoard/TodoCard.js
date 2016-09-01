import React , { Component } from 'react';
import {Card, CardHeader, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { deleteCardCall , editCardCall } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


function mapStatetoProps({todoReducers}){
  return {
    label : todoReducers,
  }
}
function mapDispatchToPros (dispatch) {
  return bindActionCreators({
    deleteCardCall : deleteCardCall,
    editCardCall : editCardCall,
   },dispatch);
}
class TodoCard extends Component {
  constructor(props) {
    super(props);
    this.token = this.props.token;
    this.handleCards = this.handleCards.bind(this);
    this.state = {
      open : false,
      value: 'Property Value',
      labelValue : null,
    }
  }

  handleOpen(value, e){
    console.log('modal open',value);
    this.setState({
      open: true,
      value: value
    });
  };
  
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
    let labels = "";
    let deletelabels = this.state.labelValue.map(function(value){
        labels += value.value+","
       return labels
    })
    this.props.editCardCall({
      token : this.token,
      id : value.id,
      name: value.name,
      body : body,
      labelsData : labels.slice(0,-1)
    })
  }
  deleteCard(cardId,e){
     this.props.deleteCardCall({
      token: this.props.token,
      id: cardId
    })
     this.handleClose();
  }
  handleLabelChange = (value) => {
    this.setState({
      labelValue : value
    });    
  }

  handleNoteLabel(labelsData) {
    let labels;
    if(labelsData.length >1){
      labels = labelsData.map(function(value){
             return  { value: value.id , label: value.name }
            })
    }else if (labelsData.length == 1){
      labels = {value: labelsData[0].id,label: labelsData[0].name}
    }else{
      labels = null
    }
    return labels
  }
  dialogCard = (value) =>{
    let tiggerDeleteCard = this.deleteCard.bind(this, value.id);
    let tiggerHandleClose = this.handleClose.bind(this);
    let tiggerEditCard = this.editCard.bind(this,value);
    let tiggerHandleChange = this.handleChange.bind(this);
    const customContentStyle = {
      width: '40%',
      maxWidth: 'none',
      margin:'0 auto'
    };
    const actions = [
        <Select
              name="form-field-name"
              value={this.state.labelValue}
              multi={true}
              options={this.handleNoteLabel(this.props.labelsData)}
              onChange= {this.handleLabelChange}/>,
        <RaisedButton label="EDIT" primary={true}
          onClick={tiggerEditCard}/>,
        <RaisedButton label="DELETE" secondary={true}
            onClick={tiggerDeleteCard}/>,
        <RaisedButton label="CLOSE" secondary={true}
                onClick={tiggerHandleClose}/>,
      ];
    return(<Dialog
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
                  id={'body_'+value.id}/>
                            
      </Dialog>)
  }

  handleCards() {
    let cards = this.props.cardsData.map((value) => {
      let tiggerExpandCard = this.handleOpen.bind(this, value.body);
      return(
            <div className='col-md-4' key={'TodoCard_'+value.id}>
              <Card>
                <CardHeader
                  title={value.name}
                  onClick={tiggerExpandCard}>
                </CardHeader>
                <CardText>
                  {value.body}
                  <br/>
                  labeles :{
                    this.props.labelsData.map((labels)=>{
                      return labels.name+" "
                    })
                  }
                </CardText>
              </Card>
              {this.dialogCard(value)}
              <br/>
            </div>
      );
    });
    return cards;
  }
  render(){
    console.log('TODO CARD-------------',this.props);
    return(
      <div>
        {this.handleCards()}
      </div>
    );
  }
}
export default connect(mapStatetoProps, mapDispatchToPros) (TodoCard);
