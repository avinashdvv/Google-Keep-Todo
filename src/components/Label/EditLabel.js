import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editLabelAction } from '../../actions';
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
    label : networkReducers.label
  }
}
function mapDispatchToPros (dispatch) {
  return bindActionCreators({
     editLabelAction : editLabelAction,
   },dispatch);
}

class EditLabel extends Component {
  constructor(props) {
    super(props);
    this.editLabel = this.editLabel.bind(this);
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
  editLabel(data, e){
    let newLabel = document.getElementById(data.id).value;
    $.ajax({
       type: "POST",
       url: "http://54.199.244.49/todo/label/"+data.id+"/",
       dataType: 'json',
       headers:{
         'Authorization': "Token "+this.props.token,
       },
       data:{
         name: newLabel,
       },
       success: function(response) {
         console.log("response-->",response);
        //  this.props.editLabelAction(response);
        }.bind(this),
       error: function(err) {
         console.error('LABEL EDIT IS NOT WORKING',err);
       }.bind(this)
     });
  }
  deleteLabel(data, e){
    console.log('delete ************',data);
    $.ajax({
       type: "DELETE",
       url: "http://54.199.244.49/todo/label/"+data+"/",
       dataType: 'json',
       headers: {
         "Authorization": "Token "+this.props.token
       },
       success: function(response) {
         console.log("response-->",response);
        //  this.props.editLabelAction(response);
        }.bind(this),
       error: function(err) {
         console.error('LABEL DELETE IS NOT WORKING',this.props);
       }.bind(this)
     });
  }
  render(){
    console.log('EDIT_LABEL ---------', this.props);
    let labels = this.props.labelDetails.map((data) => {
      let itemClickEdit = this.editLabel.bind(this, data);
      let itemClickDelete = this.deleteLabel.bind(this, data.id);
      return(
        <div>
          <button onClick={itemClickEdit}>Edit</button>
          <input  id={data.id} placeholder={data.name}/>
          <button onClick={itemClickDelete}>Delete</button>
        </div>
      )
    });

    return(
      <div >
          <button className= 'btn btn-sm btn-info' onClick={this.openModal}>EDIT</button>
            <Modal isOpen={this.state.isOpen}>
              <ModalHeader>
                <ModalTitle>EDIT OR DELETE Label</ModalTitle>
              </ModalHeader>
              <ModalBody>
                  {labels}
              </ModalBody>
              <ModalFooter>
                <button className='btn sm-btn btn-danger' onClick={this.closeModal}>
                  Done
                </button>
              </ModalFooter>
            </Modal>
            {this.props.label.name}
      </div>
    );
  }
}


export default connect(mapStatetoProps, mapDispatchToPros)(EditLabel);
