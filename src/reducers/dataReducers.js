import {GET_TODO ,
        EDIT_TODO,
        DEL_TODO,
        GET_USER_CREDENTAILS} from '../actions';
export default function(state = {
  id : '',
  desc : '',
  lebel : '',
  data : '',
  username: '',
  password: ''
}, action){
  switch (action.type) {
    case GET_TODO:{
      return{...state,
                id : action.payload.id,
                desc : action.payload.desc,
                label : action.payload.label
                }
    }
    case EDIT_TODO: {
       return {...state,
                id : action.payload.id,
                desc : action.payload.desc,
                label : action.payload.label
                }
    }
    case DEL_TODO:{
       return {...state,
                id : action.payload.id,
                label : action.payload.label
                }
    }
    case GET_USER_CREDENTAILS:{
      return {...state,
              username : action.payload.username,
              password : action.payload.username
      }
    }
    default:
      return state;
  }
}
