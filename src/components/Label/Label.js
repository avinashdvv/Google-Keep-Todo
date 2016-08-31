import '../../style/label.scss';
import React,{ Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLabelCall } from '../../actions';
import  EditLabel  from './EditLabel';
import ActionLabel from 'react-material-icons/icons/action/label';

function mapStatetoProps({labelReducers}){
  return {
    data : labelReducers.arrayData
  }
}
function mapDispatchToPros (dispatch) {
  return bindActionCreators({ getLabelCall : getLabelCall},dispatch);
}
class Label extends Component {
  constructor(props) {
    super(props);
    this.handleLabels = this.handleLabels.bind(this);
  }
  componentDidMount() {
    this.props.getLabelCall(this.props.token);
  }
  handleLabels(data) {
    let labels;
    if(data.length > 1){
      console.log('LABEL DATA LENGHT >1 _____ ',data)
      labels = data.map(function(value){
                return(
                  <li className='label-name' id={'label_'+value.id} key={'label_'+value.id}>
                    <ActionLabel/>
                    <span>{value.name}</span>
                  </li>
                  
                )});
    }else if ( data.length == 1 ){
      console.log('LABEL DATA LENGHT <1 -------- ',data)
        labels =  <li className='label-name' id={data[0].id} key={"label_"+data[0].id}>
                      <ActionLabel/>
                      <span>{data[0].name}</span>
                  </li>
    }else {
      labels  = <div>
                  NO LABELS
                </div>
    }
    return labels;    
  }
  render(){
    console.log("labels-------------",this.props);
    return(
      <div className='label-list'>
        <div className='row label-options'>
          <label className='col-md-6 label-heading text-left'>labels:</label>
          <EditLabel token= {this.props.token} labelDetails={this.props.data}/>
        </div>
        <div>
          <ul>
            {this.handleLabels(this.props.data)}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(mapStatetoProps, mapDispatchToPros) (Label);
