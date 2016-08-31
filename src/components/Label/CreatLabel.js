import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { creatLabelCall } from '../../actions';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
function mapStatetoProps({labelReducers}){
  return {
    label : labelReducers.label,
  }
}
function mapDispatchToPros (dispatch) {
  return bindActionCreators({ creatLabelCall : creatLabelCall },dispatch);
}

class CreatLabel extends Component {
  constructor(props) {
    super(props);
    this.makeLabel = this.makeLabel.bind(this);
  }

  makeLabel(event){
    let labe = document.getElementById('newLabel').value;
    this.props.creatLabelCall({
      label: labe,
      token : this.props.token
    });
  }
  render(){
    console.log('CREAT_LABEL ---------', this.props);
    return(
      <div >
          <TextField
            className='new-label'
            id="newLabel"
            ref="newLabel"
            hintText="Creat new label">
          </TextField>
          <IconButton
            iconClassName="material-icons"
            tooltip="Ligature"
            onClick={this.makeLabel}>
            done</IconButton>
      </div>
    );
  }
}


export default connect(mapStatetoProps, mapDispatchToPros)(CreatLabel);
