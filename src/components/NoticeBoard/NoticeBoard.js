import React,{ Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import '../../style/noticeboard.scss';

// function mapStatetoProps({dataReducers}){
//   return {
//     id : dataReducers.id,
//     description: dataReducers.desc,
//     label: dataReducers.label
//   }
// }
class NoticeBoard extends Component {
  constructor(props) {
    super(props);
    this.getNotes = this.getNotes.bind(this);
    this.creatNote = this.creatNote.bind(this);
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
         console.log("response-->",response);
        }.bind(this),
       error: function(err) {
         console.error('LABEL EDIT IS NOT WORKING',err);
       }.bind(this)
     });
  }
  creatNote(){
    let todoData = this.refs.todoData.value
    $.ajax({
       type: "POST",
       url: "http://54.199.244.49/todo/note/",
       dataType: 'json',
       headers:{
         'Authorization': "Token "+this.props.token,
       },
       data:{
         name: 'www',
         body: 'asuper'
       },
       success: function(response) {
         console.log("response-->",response);
        }.bind(this),
       error: function(err) {
         console.error('LABEL EDIT IS NOT WORKING',err);
       }.bind(this)
     });
  }
  render(){
    return(
      <div className='notice-board'>
        <div className='row'>
            <div className="col-md-offset-3 col-md-3">
              <input ref='todoData' className="form-control"  type="text"/>
            </div>
            <button type="submit" className="btn btn-default" onClick={this.creatNote}>Submit</button>
          <button type="submit" onClick={this.getNotes} className="btn btn-success">Notes</button>
        </div>

      </div>
    );
  }
}

export default NoticeBoard;
 // connect(mapStatetoProps)
