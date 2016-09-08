import React , { Component } from 'react';
import { addCardCall,noteLabelManagement } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


function mapDispatchToPros (dispatch) {
  return bindActionCreators({ 
                              addCardCall : addCardCall,
                              noteLabelManagement: noteLabelManagement 
                            },dispatch);
}

class CreatTodo extends Component {
  constructor(props) {
    super(props);
    this.token = this.props.token;
    this.handleNoteLabel = this.handleNoteLabel.bind(this);
    this.creatNote = this.creatNote.bind(this);
    this.state = {
      expanded: false,
      value  : null
    }
  }
  
  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleExpand = () => {
    document.getElementById('doneBtn').value ='DONE'
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  handleChange = (value) =>{
    this.setState({
      value : value
    });
    console.log(this.state.value)
  }
  
  creatNote(event) {
    event.preventDefault()
    let todoName = document.getElementById('todoName').value;
    let todoBody = document.getElementById('todoBody').value;
    let labels = "";
    let addlabels 
    if(this.state.value.length > 1){
      addlabels= this.state.value.map(function(value){
          labels += value.value+","
         return labels
      })
    }
    let data = {
                body : {
                          "name" : ""+todoName,
                          "body" : ""+todoBody,
                        },          
                labelsData : labels.slice(0,-1)
                } 
   
    this.props.addCardCall({
      token : this.props.token,
      data : data
      });
    this.handleReduce();
  }
  handleNoteLabel() {
    let labelsData = this.props.labelsData;
    let labels = [];
    if(labelsData.length >1){
      labelsData.map(function(value){
             labels.push({ value: value.id , label: value.name })
      })
    }else if(labelsData.length == 1){
      labels.push({value: labelsData[0].id, label: labelsData[0].name })
    }else{
      labels.push({value: null, label: null})
    }
    return labels
  }
  render(){
    console.log('create todo', this.props)
    return(
      <div>
        <br/>
        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
          <CardTitle  expandable={true}>
            <TextField
              id='todoName'
              hintText="Title"/>
          </CardTitle>
          <CardText onClick={this.handleExpand}>
            <TextField
              multiLine={true}
              className='todo-body'
              id='todoBody'
              hintText="Take a note">
            </TextField>
          </CardText>
          <div className='note-option-container'>
            <Select
                name="form-field-name"
                value={this.state.value}
                multi={true}
                options={this.handleNoteLabel()}
                onChange= {this.handleChange}/>
            <div ref='labelContainer'>
            </div>
            <RaisedButton
              label="done"
              primary={true}
              id='doneBtn'
              className='done-btn'
              onClick={this.creatNote} />
          </div>
        </Card>
        <br/>
      </div>
    );
  }
}
export default connect(null, mapDispatchToPros ) (CreatTodo);
