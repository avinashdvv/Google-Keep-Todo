import '../../style/label.scss';
import React,{ Component } from 'react';
import  EditLabel  from './EditLabel';
import ActionLabel from 'react-material-icons/icons/action/label';


class Label extends Component {
  constructor(props) {
    super(props);
    this.handleLabels = this.handleLabels.bind(this);
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
    }else{
      if(this.props.isLabelFetchingFailed.length < 1){
        labels  = <div>
                    NO LABELS
                  </div>
      }
    }
    if(this.props.isLabelFetchingFailed.length > 1){
      document.getElementById('error').innerHTML = this.props.isLabelFetchingFailed || null
    }
    return labels;    
  }
  
  render(){

    let labels;
    if(this.props.isLabelFetching){
      labels = this.handleLabels(this.props.labels);
    }else{
      labels = 'Loading .....'
    }
    
        
    return(
      <div className='label-list'>
        <div className='row label-options'>
          <label className='col-md-6 label-heading text-left'>labels:</label>
          <EditLabel token= {this.props.token} labelDetails={this.props.labels}/>
        </div>
        <div>
        <div id='error'>
        </div>
          <ul>
            {labels}
          </ul>
        </div>
      </div>
    );
  }
}

export default Label;
