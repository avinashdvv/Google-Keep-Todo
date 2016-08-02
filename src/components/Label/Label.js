import '../../style/label.scss';
import React,{ Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLabelAction } from '../../actions';
import  CreatLabel  from './CreatLabel';
import  EditLabel  from './EditLabel';

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
    let labels = this.props.data.map(function(data){
      return(
        <div>{data.id} :{data.name}</div>
      )
    });
    return(
    <div className='side-panel'>
      <button className='btn btn-success' onClick={this.getLabel}>Label</button>
      <br/>
      <CreatLabel token={this.props.token}/>
      <EditLabel token= {this.props.token} labelDetails={this.props.data}/>
      <label>labels:</label>
      {labels}
    </div>
    );
  }
}

export default connect(mapStatetoProps, mapDispatchToPros) (Label);
