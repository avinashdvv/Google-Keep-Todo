import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { creatLabelAction } from '../../actions';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import $ from 'jquery';

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
      isOpen : false
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
  render(){
    console.log('CREAT_LABEL ---------', this.props);
    return(
      <div >
          <button className= 'btn btn-sm btn-info' onClick={this.openModal}>CREATE</button>
            <Modal isOpen={this.state.isOpen}>
              <ModalHeader>
                <ModalTitle>Creat Label</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <input className='form-control' placeholder='label' ref='label'/>
                <br/>
              </ModalBody>
              <ModalFooter>
                <button className='btn sm-btn btn-success' onClick={this.makeLabel}>
                  Creat
                </button>
                <button className='btn sm-btn btn-danger' onClick={this.closeModal}>
                  Cancel
                </button>
              </ModalFooter>
            </Modal>
            {this.props.label.name}
      </div>
    );
  }
}


export default connect(mapStatetoProps, mapDispatchToPros)(CreatLabel);
