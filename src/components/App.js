import React,{ Component } from 'react';
import NavBar from './NavBar';
import NoticeBoard from './NoticeBoard/NoticeBoard';
import Label from './Label/Label';
import { getToken } from '../actions';
import $ from 'jquery';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStatetoProps({networkReducers}){
  return {
    token : networkReducers.token,
  }
}

function mapDispatchToPros (dispatch) {
  return bindActionCreators({ getTokenMethod : getToken},dispatch);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    // this.hideModal = this.hideModal.bind(this);
    this.data = this.props.networkReducer;
    this.state = {
        isOpen: false
      }
  }
  openModal(){
   this.setState({
     isOpen: true
   });
  }
  componentDidMount(){
    // this.refs.username.value
    // this.refs.password.value
    let username = 'avinash';
    let password = 'password';
    $.ajax({
       type: "POST",
       url: "http://54.199.244.49/auth/login/",
       dataType: 'json',
       data: JSON.stringify({
         username: username,
         password: password
       }),
       dataType: 'json',
       success: function(response) {
         this.props.getTokenMethod(response.Token);
            this.setState({
                isOpen: false
              });
           console.log("response-->",response);
        }.bind(this),
       error: function(err) {
         console.error('error',this.props);
       }.bind(this)
     });
  }
  // componentDidMount(){
  //   // let token = localStorage.getItem("Token");
  //   // if(token){
  //   //   this.setState({
  //   //     isOpen: false
  //   //   });
  //   // }else{
  //     this.setState({
  //       isOpen: true
  //     });
  //   // }
  // }
  render(){
    return(
      <div>
          <NavBar />
          <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
            <ModalHeader>
              <ModalClose onClick={this.hideModal}/>
              <ModalTitle>Modal title</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <input className='form-control' placeholder='username' ref='username'/>
              <br/>
              <input className='form-control' placeholder='password' ref='password'/>
            </ModalBody>
            <ModalFooter>
              <button className='btn sm-btn btn-success' onClick={this.hideModal}>
                Login
              </button>
            </ModalFooter>
          </Modal>
        <div className='row'>
            <div className='col-md-2'>
              <Label token={this.props.token}/>
            </div>
            <div className='col-md-10'>
              <NoticeBoard token={this.props.token}/>
            </div>
        </div>
      </div>
    );
  }
}


export default connect(mapStatetoProps, mapDispatchToPros) (App);
