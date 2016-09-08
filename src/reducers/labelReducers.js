import {
      FETCH_LABEL_START,
      FETCH_LABEL_FAILED,
      FETCH_LABELS,
      CREAT_LABEL,
      EDIT_LABEL,
      DEL_LABEL,
      EDIT_LABEL_DETAILS
    } from '../actions';

export default function ( state = {
  arrayData : [],
  isFetchStart : false,
  isFetchFailed : ''
 }, action){
   switch (action.type) {
    case FETCH_LABEL_START: {
      return{
        ...state,
        isFetchStart : true
      }
    }
    case FETCH_LABEL_FAILED: {
      console.log('FETCH_LABELS FAILED',action.data);
      return{
        ...state,
        isFetchFailed : action.data
      }
    }
    case FETCH_LABELS : {
      console.log('FETCH_LABELS REDUCER',action.data);
       return {
        ...state,
        arrayData : action.data
       }
    }

    case CREAT_LABEL : {
    console.log('CREAT_LABEL_REDUCER',...state.arrayData,action.payload.label);
      let updatedArray = state.arrayData.concat([action.payload.label])
      return {
        ...state,
        arrayData : updatedArray
      }
     }
     
     case EDIT_LABEL : {
      console.log('EDIT_LABEL_REDUCER ',action);
      let updatedArray = [];
      state.arrayData.map(function(value) {
          if(value.id == action.data.id){
            value.id = action.data.id;
            value.name = action.data.name;
          }
          updatedArray.push(value);
      })
      return {
        ...state,
        arrayData : updatedArray
      }
     }

     case DEL_LABEL : {
      console.log('DEL_LABEL_REDUCER ',action);
      let updatedArray = [];
       state.arrayData.map(function(value) {
          if(value.id !== action.id) {
              updatedArray.push(value);
          }
       });
      return {
        ...state,
        arrayData : updatedArray
      }
     }

     default:
       return state;
   }
}

