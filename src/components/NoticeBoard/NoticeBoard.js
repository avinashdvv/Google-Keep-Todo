import React,{ Component } from 'react';
import { connect } from 'react-redux';
import '../../style/noticeboard.scss';
import { getCardsCall } from '../../actions';
import { bindActionCreators } from 'redux';
import TodoCard from './TodoCard';
import CreatTodo from './CreatTodo';

const NoticeBoard = (props) => 
      <div className='notice-board'>
        <div className='row'>
            <div className="col-md-offset-3 col-md-7">
              <CreatTodo token={props.token} labelsData={props.labelsData}/>
            </div>
        </div>
        <TodoCard token={props.token} labelsData={props.labelsData} cardsData={props.cardsData}/>
      </div>


export default NoticeBoard;
