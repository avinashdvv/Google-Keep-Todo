import {
        GET_TOKEN,
        NOTE_FETCH_CARDS_START,
        NOTE_FETCH_FAILED,
        GET_TODO ,
        ADD_TODO,
        EDIT_TODO,
        DEL_TODO,
        NOTE_LABEL_MANAGEMENT,
        NOTE_LABEL_EDIT_MANAGEMENT,
        NOTE_LABEL_DEL_MANAGEMENT
      } from '../actions';
export default function(state = {
  notesData : [],
  token : '',
  isfetching : false,
  isFetchingFailed : ''
}, action){
  switch (action.type) {
    
    case GET_TOKEN : {
       return {
               ...state,
               token : action.token,
               isFetchingFailed : ''
              }
     }
    case NOTE_FETCH_CARDS_START : {
      return {
        ...state,
        isfetching : true
      }
    }
    case NOTE_FETCH_FAILED : {
      console.error('NOTE_FAILED',action.data)
      return {
        ...state,
        isFetchingFailed :  action.data
      }
    }
    case GET_TODO:{
      console.log('GET_TODO_REDUCER',state,action);
      return{
              ...state,
              notesData : action.payload.data,
              isFetchingFailed : ''
            }
    }
    case ADD_TODO:{
      console.log('ADD_TODO_REDUCER ',state,action);
      let updatedArray = state.notesData.concat([action.data])
      return {
              ...state,
              notesData : updatedArray,
              isFetchingFailed : ''
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
                isFetchingFailed : ''
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
        isFetchingFailed : ''
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
              isFetchingFailed : ''
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
        isFetchingFailed : ''
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
        if(value.labels.length > 1 ){
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
        isFetchingFailed : ''
      }
    }
    default:
      return state;
  }
}
