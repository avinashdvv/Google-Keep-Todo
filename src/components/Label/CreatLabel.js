import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { creatLabelAction } from '../../actions';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
function mapStatetoProps({networkReducers}){
  return {
    label : networkReducers.label,
  }
}
function mapDispatchToPros (dispatch) {
  return bindActionCreators({ creatLabelAction : creatLabelAction},dispatch);
}

class CreatLabel extends Component {
  constructor(props) {
    super(props);
    this.makeLabel = this.makeLabel.bind(this);
    this.state = {
      value : ''
    }
  }

  makeLabel(){
    let label = document.getElementById('newLabel').value;
    console.error('label', label);
    $.ajax({
       type: "POST",
       url: "http://54.199.244.49/todo/label/",
       dataType: 'json',
       data: JSON.stringify({
         name: label
       }),
       headers: {
         "Authorization": "Token "+this.props.token
       },
       dataType: 'json',
       success: function(response) {
         console.log("response-->",response);
         this.props.creatLabelAction(response);
        }.bind(this),
       error: function(err) {
         console.error('OOPS SOMTHING IS WRONG',this.props);
       }.bind(this)
     });
  }
  handleChange(event){
    this.setState({
      value: event.target.value,
    });
  }
  render(){
    console.log('CREAT_LABEL ---------', this.props);
    return(
      <div >
          <TextField
            className='new-label'
            id="newLabel"
            hintText="Creat new label"
          ></TextField>
          <IconButton
            iconClassName="material-icons"
            tooltip="Ligature"
            onClick={this.makeLabel}
          >done</IconButton>
          {this.props.label.name}
      </div>
    );
  }
}


export default connect(mapStatetoProps, mapDispatchToPros)(CreatLabel);
