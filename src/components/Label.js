import React,{ Component } from 'react';
import '../style/label.scss';
import $ from 'jquery';
import { getLabelAction } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStatetoProps({networkReducers}){
  return {
    data : networkReducers.id,
  }
}
function mapDispatchToPros (dispatch) {
  return bindActionCreators({ getLabelAction : getLabelAction},dispatch);
}
class Label extends Component {
  constructor(props) {
    super(props);
    this.getLabel = this.getLabel.bind(this);
  }
  getLabel(){
    console.log("labels-------------",this.props);
    $.ajax({
       type: "GET",
       url: "http://54.199.244.49/todo/label/",
       dataType: 'json',
       data: JSON.stringify({
         Authorization: this.props.Token,
       }),
       dataType: 'json',
       success: function(response) {
            // dispatch({ type : 'FETCH_DATA', payload : response.data })
            this.props.getLabelAction(response);
           console.log("response-->",response);
        }.bind(this),
       error: function(err) {
         console.error('error',this.props);
       }.bind(this)
     });
  }
  render(){
    return(
    <div className='side-panel'>
      <button className='btn btn-success' onClick={this.getLabel}>labels</button>
    </div>
    );
  }
}

export default Label;
