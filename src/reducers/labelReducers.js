import {
      FETCH_LABEL_START,
      FETCH_LABEL_SUCCESS,
      FETCH_LABEL_FAILED,
      FETCH_LABELS_NULL,
      FETCH_LABELS,
      CREAT_LABEL,
      EDIT_LABEL,
      DEL_LABEL,
      EDIT_LABEL_DETAILS
    } from '../actions';

export default function ( state = {
  arrayData : [],
  fetchingStatus : {
      method  : "",
      start : false,
      success : false,
      fail : {
        status : false,
        data : null
      }
  }
 }, action){
   switch (action.type) {
    case FETCH_LABEL_START : {
      let val = {
        method : action.data,
        start : true,
        success : false,
        fail : {
          status : false,
          data : null
        }
      }
      return {
        ...state,
        fetchingStatus : val
      }
    }
    case FETCH_LABEL_SUCCESS:{
      let val = {
        method : action.data,
        start : false,
        success: true,
        fail : {
          status : false,
          data : null
        }
      }
      return {
        ...state,
        fetchingStatus : val
      }
    }
    case FETCH_LABEL_FAILED : {
      let val = {
          method : action.method,
          start : false,
          success: false,
          fail : {
            status : true,
            data : action.data
          }
      }
      return {
        ...state,
        fetchingStatus : val
      }
    }
    case FETCH_LABELS_NULL :{
      let val =  {
          method  : "",
          start : false,
          success : false,
          fail : {
            status : false,
            data : null
          }
      }
      return {
        ...state,
        fetchingStatus : val
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
