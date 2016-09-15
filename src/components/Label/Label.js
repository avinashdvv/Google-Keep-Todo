import '../../style/label.scss';
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { labelsNote,getCardsCall } from '../../actions';

import  EditLabel  from './EditLabel';
import ActionLabel from 'react-material-icons/icons/action/label';
import FontIcon from 'material-ui/FontIcon';


function mapDispatchToPros (dispatch) {
  return bindActionCreators({
    labelsNote : labelsNote,
    getCardsCall : getCardsCall
    },dispatch);
}

class Label extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen : false
    }
    this.handleLabels = this.handleLabels.bind(this);
  }


  handleLabels(data) {
    let labels;
    let labelsNote = this.props.labelsNote;

    if(data.length >= 1){
      console.log('LABEL DATA LENGHT >1 _____ ',data)
      labels = data.map(function(value){
                return(
                  <li className='label-name' id={'label_'+value.id} key={'label_'+value.id}
                      onClick={()=>{
                          labelsNote(value.id)
                        }}>
                    <ActionLabel/>
                    <span>{value.name}</span>
                  </li>

                )});
    }
    else{
       labels  = <h3 className='label-name'>
                    NO LABELS
                  </h3>

    }
    return labels;
  }

  render(){
    console.error(this.state);
    let labels;
    if(this.props.labelFetchingStatus.start === true){
      labels = <li className='label-name'>Loading .....</li>
    }else{
      labels = this.handleLabels(this.props.labels);
    }
    let token = localStorage.getItem("token")
    return(
      <div className='label-list'>
        <div className='label-options'>
          <label className='label-heading' onClick={()=> this.props.getCardsCall(token)}>Labels:</label>
          <EditLabel
            labelFetchingStatus ={this.props.labelFetchingStatus}
            token= {this.props.token} isOpen={this.state.isOpen} labelDetails={this.props.labels} close={()=>{
            this.setState({
              isOpen : false
            })
          }}/>
        </div>
        <div>
          <ul className='ul'>
            {labels}
            <li className='label-name' onClick={()=>{
              console.error("avinash");
              this.setState({
                isOpen : true
              })}}>
              <FontIcon className="material-icons addicon"
              >add</FontIcon>
              <span>Create New Label</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default  connect(null,mapDispatchToPros) (Label);
