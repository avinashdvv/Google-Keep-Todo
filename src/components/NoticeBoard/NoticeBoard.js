import React,{ Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import '../../style/noticeboard.scss';
import { addCard, getCards } from '../../actions';
import { bindActionCreators } from 'redux';
import TodoCard from './TodoCard';
import CreatTodo from './CreatTodo';
function mapStatetoProps({dataReducers}){
  return {
    cardsData: dataReducers.notesData
  }
}
function mapDispatchToPros (dispatch) {
  return bindActionCreators({ addCard : addCard,getCards : getCards },dispatch);
}
class NoticeBoard extends Component {
  constructor(props) {
    super(props);
    this.getNotes = this.getNotes.bind(this);
  }
  getNotes(){
    $.ajax({
       type: "GET",
       url: "http://54.199.244.49/todo/note/",
       dataType: 'json',
       headers:{
         'Authorization': "Token "+this.props.token,
       },
       success: function(response) {
        //  console.log("response-->",response);
         this.props.getCards(response);
         console.log("NOTIECE BORAD -------",this.props);
        }.bind(this),
       error: function(err) {
         console.error('LABEL EDIT IS NOT WORKING',err);
       }.bind(this)
     });
  }

  render(){
    let cardId;
    let cards = this.props.cardsData.map(function(value){
      cardId = value.id;
      return  null
    });
    if((this.props.token) && (this.props.cardsData.length == 0)){
        this.getNotes();
    }
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
