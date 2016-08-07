import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editLabelAction} from '../../actions';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import $ from 'jquery';
import  CreatLabel  from './CreatLabel';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

function mapStatetoProps({networkReducers}){
  return {
    label : networkReducers.label,
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
      isOpen : true,
    });
  }

  closeModal(){
    this.setState({
      isOpen : false
    });
  }

  editLabel(data, e){
    let tempLabel = document.getElementById("label_"+data.id).value;
    let newLabel = {"name": ""+tempLabel}
    $.ajax({
       type: "POST",
       url: "http://54.199.244.49/todo/label/"+data.id+"/",
       dataType: 'json',
       headers:{
         Authorization: "Token "+this.props.token,
       },
       data:JSON.stringify(newLabel),
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
        <div >
            <IconButton
              iconClassName="material-icons"
              tooltip="Ligature"
              onClick={itemClickDelete}
            >delete</IconButton>
            <TextField
              id={"label_"+data.id}
              className='edit-label'
              defaultValue={data.name}
            ></TextField>
            <IconButton
              iconClassName="material-icons"
              tooltip="Ligature"
              onClick={itemClickEdit}
            >done</IconButton>
        </div>
      )
    });
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.closeModal}
      />
    ];
    const customContentStyle = {
      width: '30%',
      maxWidth: 'none',
      maring: '0 auto'
    };

    return(
      <div className='col-md-6'>
          <FlatButton label="EDIT" onTouchTap={this.openModal}/>
          <Dialog
            title="Creat and Edit Labels"
            actions={actions}
            modal={false}
            open={this.state.isOpen}
            onRequestClose={this.closeModal}
            autoScrollBodyContent={true}
            contentStyle={customContentStyle}
            >
            <CreatLabel token={this.props.token}/>
            {labels}
          </Dialog>
            {this.props.label.name}
      </div>
    );
  }
}


export default connect(mapStatetoProps, mapDispatchToPros)(EditLabel);
