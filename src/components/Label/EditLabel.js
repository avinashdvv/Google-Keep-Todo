import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editLabelCall, deleteLabelCall } from '../../actions';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import CreatLabel  from './CreatLabel';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';


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
    this.props.close();
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
              <div className='edit-label-box' id={"editLabel"+data.id} key={"editLabel_"+data.id}>
                  <FontIcon
                    className="material-icons del-icon"
                    tooltip="Ligature"
                    onClick={this.deleteLabel.bind(this,data.id)}>
                  delete</FontIcon>
                  <TextField
                    id={"E-D-label_"+data.id}
                    className='edit-label'
                    underlineShow={false}
                    defaultValue={data.name}>
                  </TextField>
                  <IconButton
                    iconClassName="material-icons done-icon"
                    tooltip="Ligature"
                    onClick={this.editLabel.bind(this,data)}>
                  done</IconButton>
              </div>
            )}.bind(this));
      }else if(props.length == 1) {
        labels = <div className='edit-label-box' id={"editLabel"+props[0].id} key={"editLabel_"+props[0].id}>
                  <IconButton
                    iconClassName="material-icons"
                    tooltip="Ligature"
                    onClick={this.deleteLabel.bind(this,props[0].id)}>
                  delete</IconButton>
                  <TextField
                    id={"E-D-label_"+props[0].id}
                    className='edit-label'
                    underlineShow={false}
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
  componentWillReceiveProps(nextProps) {
    if(nextProps.isOpen === true){
      this.setState({
        isOpen : true
      })
    }
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
      width: '300px',
      maxWidth: 'none',
      maring: '0 auto'
    };
    return(
      <div className='label-edit'>
          <FlatButton label="EDIT" className='edit-btn' onClick= {this.openModal} />
          <Dialog
            title="Creat and Edit Labels"
            actions={actions}
            modal={false}
            className='edit-label-dialog'
            open={this.state.isOpen}
            onRequestClose={this.closeModal}
            autoScrollBodyContent={true}
            contentStyle={customContentStyle}>
            <CreatLabel labelFetchingStatus={this.props.labelFetchingStatus} token={this.props.token} handleLabels={this.handleLabels}/>
            {this.handleLabels(this.props.labelDetails)}
          </Dialog>
      </div>
    );
  }
}

export default connect( null, mapDispatchToPros)(EditLabel);
