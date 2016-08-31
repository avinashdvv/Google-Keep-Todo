import React , { Component } from 'react';
import { addCardCall } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';

function mapStatetoProps({todoReducers}){
  return {
    label : todoReducers,
  }
}

function mapDispatchToPros (dispatch) {
  return bindActionCreators({ addCardCall : addCardCall },dispatch);
}

class CreatTodo extends Component {
  constructor(props) {
    super(props);
    this.token = this.props.token;
    this.creatNote = this.creatNote.bind(this);
    this.state = {
      expanded: false
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
  creatNote(){
    let todoName = document.getElementById('todoName').value;
    let todoBody = document.getElementById('todoBody').value;
    let data = {
                "name" : ""+todoName,
                "body" : ""+todoBody
                }
    this.props.addCardCall({
      token : this.props.token,
      data : data
      });
    this.handleReduce();
  }
  render(){
    console.log('CreatTOdo ',this.props);
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
              hintText="Take a note"
            ></TextField>
          </CardText>
          <RaisedButton
            label="done"
            primary={true}
            id='doneBtn'
            className='done-btn'
            onClick={this.creatNote} />
        </Card>
        <br/>
      </div>
    );
  }
}
export default connect(mapStatetoProps, mapDispatchToPros ) (CreatTodo);
