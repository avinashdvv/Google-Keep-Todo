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
    this.state = {
      open : false,
      value: 'Property Value',
      labelValue : null,
      dilogValue : null
    }
  }

  handleOpen(value, e){
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
    let body = document.getElementById('body_'+value.id).value;
    let labels = "";
    if(this.state.labelValue>1){
      this.state.labelValue.map(function(value){
        labels += value.value+","
      })  
    }else if (this.state.labelValue == 1){
      labesl += value.value
    }
    
    this.props.editCardCall({
      token : this.token,
      id : value.id,
      name: value.name,
      body : body,
      addLabelsData : labels.slice(0,-1)
    })
    this.handleClose();
  }

  deleteCard(cardId,e){
     this.props.deleteCardCall({
      token: this.props.token,
      id: cardId
    })
     this.handleClose();

  }
  handleLabelChange = (value) => {
    alert(value)
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
      labels = []
    }
    return labels
  }
  render(){
    const customContentStyle = {
        width: '40%',
        maxWidth: 'none',
        margin:'0 auto'
      };
    
    console.log('TODO CARD-------------',this.props);
    return(
      <div>
        {
          this.props.cardsData.map((value) => {
                  let tiggerExpandCard = this.handleOpen.bind(this, value.body);
                  let tiggerHandleChange = this.handleChange.bind(this);
                  let tiggerHandleClose = this.handleClose.bind(this);
                  let tiggerEditCard = this.editCard.bind(this,value);
                  let tiggerDeleteCard = this.deleteCard.bind(this, value.id);
                  let labelsArray = []
                  const actions = [
                                      <Select
                                        name="form-field-.pname"
                                        value ={this.state.labelValue}
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
                         
                  return(
                        <div className='col-md-4' key={'TodoCard_'+value.id}>
                          <Card onClick={tiggerExpandCard}>
                            <CardHeader
                              title={value.name}>
                            </CardHeader>
                            <CardText>
                              {value.body}
                              <br/>
                              labeles :{
                                value.labels.map((op)=>{
                                  console.log('################',op)
                                  return op.name+" "
                                })
                              }
                            </CardText>
                            <Dialog
                              title={value.name}                                    
                              actions={actions}
                              modal={true}
                              contentStyle={customContentStyle}
                              open={this.state.open} >
                             <TextField
                                multiLine={true}
                                className='todo-body'
                                defaultValue = {value.body}
                                onChange={tiggerHandleChange}
                               id={'body_'+value.id}/>
                            </Dialog>
                          </Card>
                          <br/>
                        </div>
                         );
                })
        }
      </div>
    );
  }
}
export default connect(null, mapDispatchToPros) (TodoCard);
