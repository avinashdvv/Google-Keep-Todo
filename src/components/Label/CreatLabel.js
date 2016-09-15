import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { creatLabelCall } from '../../actions';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

function mapDispatchToPros (dispatch) {
  return bindActionCreators({ creatLabelCall : creatLabelCall },dispatch);
}

class CreatLabel extends Component {
  constructor(props) {
    super(props);
    this.makeLabel = this.makeLabel.bind(this);
  }

  makeLabel(event){
    console.log('MAKE LABEL',this.props)
    let labe = document.getElementById('newLabel').value;
    this.props.creatLabelCall({
      label: labe,
      token : this.props.token
    });
  }

  render(){
    console.log('CREAT_LABEL ---------', this.props);
    if(this.props.labelFetchingStatus.method === 'CREAT_LABEL' &&
      this.props.labelFetchingStatus.success === true){
            document.getElementById('newLabel').value = null
      }
    return(
      <div className='create-label'>
          <IconButton
            iconClassName="material-icons addicon"
            id = 'addBtn'
            onClick={()=> {
                    document.getElementById('newLabel').value = null
                  }}
          >cancel</IconButton>
          <TextField
            className='new-label'
            id="newLabel"
            ref="newLabel"
            underlineShow={false}
            hintText="Creat new label">
          </TextField>
          <IconButton
            iconClassName="material-icons"
            className='add-btn'
            tooltip="Ligature"
            onClick={this.makeLabel}>
            done</IconButton>
      </div>
    );
  }
}


export default connect(null, mapDispatchToPros)(CreatLabel);
