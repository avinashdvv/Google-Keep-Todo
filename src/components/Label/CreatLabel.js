import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { creatLabelAction } from '../../actions';
import $ from 'jquery';
import TextField from 'material-ui/TextField';

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
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.state = {
      isOpen : false,
      value : ''
    }
  }
  openModal(){
    this.setState({
      isOpen : true
    });
  }
  closeModal(){
    this.setState({
      isOpen : false
    });
  }
  makeLabel(){
    let label = this.refs.label.value;
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
         this.closeModal();
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
          <button className= 'btn btn-sm btn-info' onClick={this.openModal}>CREATE</button>
            <TextField
              className='todo-body'
              value={this.state.value}
              onChange={this.handleChange}
              id={'body_'+value.id}
            />
          {this.props.label.name}
      </div>
    );
  }
}


export default connect(mapStatetoProps, mapDispatchToPros)(CreatLabel);
