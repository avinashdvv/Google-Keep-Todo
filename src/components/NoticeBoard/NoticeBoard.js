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
  	let board;
  	if(!this.props.isCardsFetching){
  		board = 'Loading .......'
  	}else{
  		board = <TodoCard 
                token={this.props.token}
                labelsData={this.props.labelsData} 
                isCardsFetchingFailed = {this.props.isCardsFetchingFailed}
                cardsData={this.props.cardsData}/>
  	}
    
   return(
   	 <div className='notice-board'>
          <div className='row'>
              <div className="col-md-offset-3 col-md-7">
                <CreatTodo token={this.props.token} labelsData={this.props.labelsData}/>
              </div>
          </div>
          {board}
        </div>
    )
 }
}
export default NoticeBoard;
