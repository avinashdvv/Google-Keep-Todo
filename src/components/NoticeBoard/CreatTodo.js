import React , { Component } from 'react';
import { addCardCall,noteLabelManagement } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Popover from 'material-ui/Popover';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
      open : false,
      expanded: false,
      name : '',
      body : '',
      labelsData : []
    }
  }
  handleTouchTap = (event) => {
   // This prevents ghost click.
   event.preventDefault();

   this.setState({
     open: true,
     anchorEl: event.currentTarget,
   });
 };

 handleRequestClose = () => {
   this.setState({
     open: false,
   });
 };

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleExpand = () => {
    document.getElementById('doneBtn').value ='DONE'
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  handleName = (event) => {
    this.setState({
      name : event.target.value,
    })
  }
  handleBody = (event) => {
    this.setState({
      body : event.target.value,
    })
  }
  creatNote(event) {
    event.preventDefault()
    console.error(this.state.labelsData);
    let todoName,todoBody;
    if(this.state.name !== undefined){
        todoName = this.state.name;
    }
    if(this.state.body !== undefined){
       todoBody = this.state.body;
    }
    let labels = [];
    if(this.state.labelsData.length >= 1){
      this.state.labelsData.map((val) =>{
        labels.push(val.id)
      })
    }
    let data = {
                body : {
                          "name" : ""+todoName,
                          "body" : ""+todoBody,
                        },
                labelsData : labels.toString()
               }

    this.props.addCardCall({
      token : this.props.token,
      data : data
      });
    this.handleReduce();
  }

  handleNoteLabel = () => {
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

  componentWillReceiveProps(nextProps) {
    if(nextProps.cardsFetchingStatus.method === "ADD_TODO" &&
       nextProps.cardsFetchingStatus.success === true
     ){
       console.error('--------------------',nextProps);
       document.getElementById('todoName').value = '';
       document.getElementById('todoBody').value = '-';
       document.getElementById('labelsData').innerHTML = '';
       this.setState({
         expanded : false,
         name : '',
         body: '',
         labelsData : []
       })
     }
  }
  handleLabels = () => {
    let op
    if(this.state.labelsData.lenght > 1){
      op = this.state.labelsData.map((val) => {
             return <span className='badge'>{val.name}</span>
      })
    }
    return op;
  }
  handleLabelPopUP = (val,event) =>{
    this.handleLabels()
      if(event.target.checked === true){
        console.error(event.target.checked, val)
        let op = this.state.labelsData;
        op.push(val)
        this.setState({
              labelsData : op
        })
      }
      // let div =
      var z = document.createElement('span');
      z.className='badge';
      z.innerHTML = ""+val.name;
      document.getElementById('labelsData').appendChild(z)
  }

  render(){
    // onMouseLeave = {this.handleReduce}
    console.log('create todo', this.props)
    return(
      <div className='create-todo'>
        <br/>
        <Card expanded={this.state.expanded}
              onClick = {this.handleExpandChange}
              onMouseEnter = {this.handleExpandChange}
              showExpandableButton={true}>
            <TextField
              expandable={true}
              id='todoName'
              className='title'
              hintText="Title"
              underlineShow={false}
              onChange={this.handleName}/>
          <CardText onClick={this.handleExpand} className='todo-body'>
            <TextField
              hintText="Take a note"
              multiLine={true}
              id='todoBody'
              fullWidth={true}
              underlineShow={false}
              onChange={this.handleBody}>
            </TextField>
            <div id='labelsData'>
            </div>
            {this.handleLabels()}
            <MuiThemeProvider>
              <Popover
                 open={this.state.open}
                 anchorEl={this.state.anchorEl}
                 anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                 targetOrigin={{horizontal: 'left', vertical: 'top'}}
                 onRequestClose={this.handleRequestClose}
               >
                 {
                   (()=>
                     this.props.labelsData.map((val)=>{
                       return <ListItem primaryText={""+val.name}
                                    id={"listitem_"+val.id}
                                    onClick={this.handleLabelPopUP.bind(this,val)}
                                    key={'Checkbox__'+val.id} leftCheckbox={<Checkbox id={'listitem_checkbox_'+val.id} />} />
                     })
                   )()
                 }
               </Popover>
             </MuiThemeProvider>
          </CardText>
          <CardActions className='note-option-container' expandable={true}>
            <FlatButton
              onClick={this.handleTouchTap}
              label="Labels"
              className='label-btn'
              secondary={true}
            />
            <FlatButton
              label="DONE"
              id='doneBtn'
              className='done-btn'
              onClick={this.creatNote} />
          </CardActions>
        </Card>
        <br/>
      </div>
    );
  }
}
export default connect(null, mapDispatchToPros ) (CreatTodo);
