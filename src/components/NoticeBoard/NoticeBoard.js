import React,{ Component } from 'react';
import { connect } from 'react-redux';
import '../../style/noticeboard.scss';
import { getCardsCall } from '../../actions';
import { bindActionCreators } from 'redux';
import TodoCard from './TodoCard';
import CreatTodo from './CreatTodo';
function mapStatetoProps({todoReducers}){
  return {
    cardsData: todoReducers.notesData
  }
}
function mapDispatchToPros (dispatch) {
  return bindActionCreators({getCardsCall : getCardsCall },dispatch);
}
class NoticeBoard extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.props.getCardsCall(this.props.token);
  }

  render(){
    return(
      <div className='notice-board'>
        <div className='row'>
            <div className="col-md-offset-3 col-md-7">
              <CreatTodo token={this.props.token}/>
            </div>
        </div>
        <TodoCard token={this.props.token} cardsData={this.props.cardsData}/>
      </div>
    );
  }
}

export default connect(mapStatetoProps, mapDispatchToPros) (NoticeBoard);
