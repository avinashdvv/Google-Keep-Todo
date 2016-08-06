import React , { Component } from 'react';
import $ from 'jquery';
import { addCard } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

function mapDispatchToPros (dispatch) {
  return bindActionCreators({
    addCard : addCard,
   },dispatch);
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
    console.log(data);
    $.ajax({
       type: "POST",
       url: "http://54.199.244.49/todo/note/",
       dataType: 'json',
       headers:{
         'Authorization': "Token "+this.props.token,
       },
       data:JSON.stringify(data),
       success: function(response) {
         console.log("response-->",response);
         this.handleReduce();
        }.bind(this),
       error: function(err) {
         console.error('LABEL EDIT IS NOT WORKING',err);
       }.bind(this)
     });
  }
  render(){
    return(
      <div>
        <br/>
        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
          <CardTitle  expandable={true}>
            <TextField
              id='todoName'
              hintText="Title"
            />
          </CardTitle>
          <CardText onTouchTap={this.handleExpand}>
            <TextField
              multiLine={true}
              className='todo-body'
              id='todoBody'
              hintText="Take a note"
            ></TextField>
          </CardText>
          <FlatButton label="done" primary={true} id='doneBtn'onTouchTap={this.creatNote} />
        </Card>
        <br/>
      </div>
    );
  }
}
export default connect(mapDispatchToPros) (CreatTodo);
