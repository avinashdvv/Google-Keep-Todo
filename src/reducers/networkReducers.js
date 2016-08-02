import {
      FETCH_DATA,
      FETCH_REJECTED,
      FETCH_LABELS,
      GET_TOKEN,
      CREAT_LABEL,
      EDIT_LABEL,
      EDIT_LABEL_DETAILS
    } from '../actions';

export default function ( state ={
  data : '',
  arrayData : [],
  token : '',
  label : ''
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
               arrayData: action.payload.data
       }
     }
     case GET_TOKEN : {
       return {...state,
               token : action.payload.token
       }
     }
     case CREAT_LABEL : {
       return {...state,
              label : action.payload.label
       }
     }
     case EDIT_LABEL : {
       return {...state,
              label : action.payload.label
       }
     }
     case EDIT_LABEL_DETAILS : {
       return {...state,
              data : action.payload.data
       }
     }
     default:
       return state;
   }
 }
