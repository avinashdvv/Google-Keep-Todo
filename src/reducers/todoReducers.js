import {
        NOTE_FETCH_START,
        NOTE_FETCH_SUCCESS,
        NOTE_FETCH_FAILED,
        NOTE_FETCH_STATUS_NULL,

        GET_TOKEN,

        GET_TODO ,
        ADD_TODO,
        EDIT_TODO,
        DEL_TODO,

        NOTE_LABEL_MANAGEMENT,
        NOTE_LABEL_EDIT_MANAGEMENT,
        NOTE_LABEL_DEL_MANAGEMENT,
        GET_LABELS_NOTES
      } from '../actions';
let TEMP_ARRAY;
export default function(state = {
  notesData : [],
  token : '',
  fetchingStatus : {
      method  : '',
      start : false,
      success : false,
      fail : {
        status : false,
        data : null
      }
  }
}, action){
  switch (action.type) {

    case GET_TOKEN : {
       return {
               ...state,
               token : action.token,
              }
     }
    case NOTE_FETCH_START : {
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
    case NOTE_FETCH_SUCCESS:{
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
    case NOTE_FETCH_FAILED : {
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
    case NOTE_FETCH_STATUS_NULL : {
      let val = {
          method  : '',
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
    case GET_TODO:{
      console.log('GET_TODO_REDUCER',state,action);
      TEMP_ARRAY = action.payload.data;
      return{
              ...state,
              notesData : action.payload.data,
            }
    }
    case ADD_TODO:{
      console.log('ADD_TODO_REDUCER ',state,action);
      let updatedArray = state.notesData.concat([action.data])
      return {
              ...state,
              notesData : updatedArray,
            }
    }
    case EDIT_TODO: {
      console.log('EDIT_TODO_REDUCER ',state,action);
      let updatedArray = [];
      state.notesData.map(function(value) {
          if(value.id == action.payload.id) {
              value.id = action.payload.id;
              value.name = action.payload.name;
              value.body = action.payload.body;
          }
          updatedArray.push(value);
       });
      console.log('updatedArray EDIT_TODO_REDUCER >.>...',updatedArray)
       return {...state,
                notesData : updatedArray,
                }
    }
    case DEL_TODO:{
      console.log('DEL_TODO_REDUCER ',state,action);
      let updatedArray = [];
       state.notesData.map(function(value) {
          if(value.id !== action.id) {
              updatedArray.push(value);
          }
       });
       console.log('updated DEL_TODO',updatedArray);
      return {
        ...state,
        notesData : updatedArray,
      }
    }
    case NOTE_LABEL_MANAGEMENT: {
      console.log('NOTE_LABEL_MANAGEMENT',state,action)
      let updatedArray = []
      state.notesData.map((value)=>{
          if(value.id == action.data.id){
            value.labels = action.data.labels
          }
          updatedArray.push(value);
      })

      return {
              ...state,
              notesData : updatedArray,
             }
    }
    case NOTE_LABEL_EDIT_MANAGEMENT: {
      console.log('NOTE_LABEL_EDIT_MANAGEMENT',state,action);
      let updatedArray = [];
      state.notesData.map((value) =>{
        if(value.labels.length > 1){
          value.labels.map((label) =>{
            if(label.id == action.data.id){
              label.name = action.data.name
            }
          })
        }else if(value.labels.length == 1){
          value.labels[0].name = action.data.name
        }
        updatedArray.push(value);
      });
      return {
        ...state,
        notesData : updatedArray,
      }
    }
    case NOTE_LABEL_DEL_MANAGEMENT: {
      console.log('NOTE_LABEL_DEL_MANAGEMENT',state,action);
      let updatedArray = [];
      state.notesData.map((value) =>{
        updatedArray.push(value);
      })
      updatedArray.map((value) =>{
        let updatedLabels;
        if(value.labels.length >= 1 ){
            updatedLabels = value.labels.filter(function(el) {
              return el.id !== action.data;
            });
        }else{
            value.labels.pop();
        }
        value.labels = updatedLabels;
      });
      return {
        ...state,
        notesData : updatedArray,
      }
    }
    case GET_LABELS_NOTES: {
      console.log('GET_LABELS_NOTES',action.data)
      let updatedArray = [];
      TEMP_ARRAY.map((val)=>{
        val.labels.map((op)=>{
          if(op.id === action.data){
            updatedArray.push(val);
          }
        })
      })
      return {
        ...state,
        notesData : updatedArray,
      }
    }
    default:
      return state;
  }
}
