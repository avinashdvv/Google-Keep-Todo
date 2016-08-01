import React,{ Component } from 'react';
import { connect } from 'react-redux';
import Card from './Card';

import '../style/noticeboard.scss';

function mapStatetoProps({dataReducers}){
  return {
    id : dataReducers.id,
    description: dataReducers.desc,
    label: dataReducers.label
  }
}
class NoticeBoard extends Component {
  constructor(props) {
    super(props);
  }
  render(){
  	// console.log(this.props)
    return(
      <div className='row notice-board'>
        <Card details = {this.props}/>
      </div>
    );
  }
}

export default connect(mapStatetoProps) (NoticeBoard);
