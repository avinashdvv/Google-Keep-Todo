import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editLabelCall, deleteLabelCall } from '../../actions';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import CreatLabel  from './CreatLabel';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import $ from 'jquery';
function mapStatetoProps({labelReducers}){
  return {
    label : labelReducers
  }
}
function mapDispatchToPros (dispatch) {
  return bindActionCreators({
     editLabelCall : editLabelCall,
     deleteLabelCall : deleteLabelCall
   },dispatch);
}

class EditLabel extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.state = {
      isOpen : false
    }
  }
  openModal() {
    this.setState({
      isOpen : true
    });
  }

  closeModal() {
    this.setState({
      isOpen : false
    });
  }

  editLabel(data ,e ) {
    let tempLabel = document.getElementById("E-D-label_"+data.id).value;
    this.props.editLabelCall(
      {
       id : data.id,
       token : this.props.token,  
       newLabel : {
                    "name": tempLabel
                  }
      }
    );
  }
  deleteLabel(data, e) {
    this.props.deleteLabelCall({
          id: data,
          token: this.props.token
        });
  }
  handleLabels(props) {
    console.log('handleLabels ----',props);
    let labels = <div></div>;
    if(props.length > 1){
        labels = props.map(function(data) {
            return(
              <div id={"editLabel"+data.id} key={"editLabel_"+data.id}>
                  <IconButton
                    iconClassName="material-icons"
                    tooltip="Ligature"
                    onClick={this.deleteLabel.bind(this,data.id)}>
                  delete</IconButton>
                  <TextField
                    id={"E-D-label_"+data.id}
                    className='edit-label'
                    defaultValue={data.name}>
                  </TextField>
                  <IconButton
                    iconClassName="material-icons"
                    tooltip="Ligature"
                    onClick={this.editLabel.bind(this,data)}>
                  done</IconButton>
              </div>
            )}.bind(this));
      }else if(props.length == 1) {
        labels = <div id={"editLabel"+props[0].id} key={"editLabel_"+props[0].id}>
                  <IconButton
                    iconClassName="material-icons"
                    tooltip="Ligature"
                    onClick={this.deleteLabel.bind(this,props[0].id)}>
                  delete</IconButton>
                  <TextField
                    id={"E-D-label_"+props[0].id}
                    className='edit-label'
                    defaultValue={props[0].name}>
                  </TextField>
                  <IconButton
                    iconClassName="material-icons"
                    tooltip="Ligature"
                    onClick={this.editLabel.bind(this,props[0])}>
                  done</IconButton>
              </div>
      }else{
        labels = <div>
                  NO LABELS
                 </div>
      }
      return labels;
  }
  render() {
    console.log('EDIT_LABEL ---------', this.props);
    const actions = [
      <FlatButton
        label="DONE"
        secondary={true}
        onClick={this.closeModal}/>
    ];
    const customContentStyle = {
      width: '30%',
      maxWidth: 'none',
      maring: '0 auto'
    };
    return(
      <div className='col-md-6'>
          <FlatButton label="EDIT" onClick= {this.openModal} />
          <Dialog
            title="Creat and Edit Labels"
            actions={actions}
            modal={false}
            open={this.state.isOpen}
            onRequestClose={this.closeModal}
            autoScrollBodyContent={true}
            contentStyle={customContentStyle}>
            <CreatLabel token={this.props.token} handleLabels={this.handleLabels}/>
            <div id='labelDetails' ref="labelDetails">
              {this.handleLabels(this.props.labelDetails)}
            </div>
          </Dialog>
      </div>
    );
  }
}

export default connect( mapStatetoProps, mapDispatchToPros)(EditLabel);
