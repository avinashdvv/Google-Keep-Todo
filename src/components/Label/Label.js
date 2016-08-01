import '../../style/label.scss';
import React,{ Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLabelAction } from '../../actions';

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
       dataType: 'json',
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
    let labels = this.props.data.map((label) => {
      return(
        <div>{label}</div>
      )
    });


    return(
    <div className='side-panel'>
      <button className='btn btn-success' onClick={this.getLabel}>Label</button>
      <button className= 'btn btn-sm btn-info'>Edit</button>
      <br/>
      labels:
      {labels}
    </div>
    );
  }
}

export default connect(mapStatetoProps, mapDispatchToPros) (Label);
