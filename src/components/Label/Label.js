import '../../style/label.scss';
import React,{ Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLabelAction } from '../../actions';
import  EditLabel  from './EditLabel';
import ActionLabel from 'react-material-icons/icons/action/label';

function mapStatetoProps({networkReducers}){
  return {
    data : networkReducers.arrayData,
  }
}
function mapDispatchToPros (dispatch) {
  return bindActionCreators({ getLabelActionCall : getLabelAction},dispatch);
}
class Label extends Component {
  constructor(props) {
    super(props);
    this.getLabel = this.getLabel.bind(this);
  }
  getLabel(){
    $.ajax({
       type: "GET",
       url: "http://54.199.244.49/todo/label/",
       dataType: 'json',
       headers: {
         "Authorization": "Token "+this.props.token
       },
       success: function(response) {
            this.props.getLabelActionCall(response);
           console.log("response-->",response);
        }.bind(this),
       error: function(err) {
         console.error('error',err);
       }.bind(this)
     });
  }
  render(){
    console.log("labels-------------",this.props);
    let labelId;
    let labels = this.props.data.map(function(data){
      labelId = data.id;
      return(
        <li className='label-name' id={data.id} >
          <ActionLabel/>
          <span>{data.name}</span>
       </li>
      )
    });
    if((this.props.token) && (!labelId)){
      this.getLabel();
    }
    return(
      <div className='label-list'>
        <div className='row label-options'>
          <label className='col-md-6 label-heading text-left'>labels:</label>
          <EditLabel token= {this.props.token} labelDetails={this.props.data}/>
        </div>
        <div>
          <ul>
            {labels}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(mapStatetoProps, mapDispatchToPros) (Label);
