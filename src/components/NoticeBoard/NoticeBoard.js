import React,{ Component } from 'react';
import { connect } from 'react-redux';
import '../../style/noticeboard.scss';
import { getCardsCall } from '../../actions';
import { bindActionCreators } from 'redux';
import TodoCard from './TodoCard';
import CreatTodo from './CreatTodo';


class NoticeBoard extends Component {
   constructor(props) {
     super(props);
   }
  render() {
    console.error(this.props);
  	let board;
  	if(this.props.cardsFetchingStatus.start){
  		board = 'Loading .......'
  	}else{
  		board = <TodoCard
                token={this.props.token}
                labelsData={this.props.labelsData}
                cardsFetchingStatus = {this.props.cardsFetchingStatus}
                cardsData={this.props.cardsData}/>
  	}

   return(
   	 <div className='notice-board'>
          <div className='row'>
              <div className="col-md-offset-3 col-md-7">
                <CreatTodo token={this.props.token}
                         cardsFetchingStatus={this.props.cardsFetchingStatus}
                         labelsData={this.props.labelsData}/>
              </div>
          </div>
          {board}
        </div>
    )
 }
}
export default NoticeBoard;
