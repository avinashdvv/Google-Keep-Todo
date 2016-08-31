import {
        GET_TOKEN,
        GET_TODO ,
        ADD_TODO,
        EDIT_TODO,
        DEL_TODO,
      } from '../actions';
export default function(state = {
  notesData : [],
  token : ''
}, action){
  switch (action.type) {
    case GET_TOKEN : {
       return {
               ...state,
               token : action.token
              }
     }
    case GET_TODO:{
      console.log('GET_TODO_REDUCER',state,action);
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
              notesData : updatedArray
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
                notesData : updatedArray
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
        notesData : updatedArray
      }
    }
    default:
      return state;
  }
}
