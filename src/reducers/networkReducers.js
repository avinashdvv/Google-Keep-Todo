import {
      FETCH_DATA,
      FETCH_REJECTED,
      FETCH_LABELS,
      GET_TOKEN
    } from '../actions';

export default function ( state ={
  token : ''
 }, action){
   switch (action.type) {
     case FETCH_DATA : {
       return {...state,
                data : action.payload.data
                }
     }
     case FETCH_REJECTED : {
       return {...state,
               data: action.payload.data
       }
     }
     case FETCH_LABELS : {
       return {...state,
               data: action.payload.data
       }
     }
     case GET_TOKEN : {
       return {...state,
               data: action.payload.token
       }
     }
     default:
       return state;
   }
 }
