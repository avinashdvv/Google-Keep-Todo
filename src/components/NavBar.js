import '../style/navbar.scss';
import React,{ Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { bindActionCreators } from 'redux';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';


function mapStatetoProps({dataReducers}){
  return {
    id : dataReducers.id,
    description:dataReducers.desc,
    label: dataReducers.label
  }
}
function mapDispatchToPros (dispatch) {
  return bindActionCreators({creatCard : addCard},dispatch);
}
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleLabel = this.handleLabel.bind(this);
    this.creatCard = this.props.creatCard;
    this.state = {
      modalIsOpen: false
    }
  }
  openModal(){
   this.setState({modalIsOpen: true});
  };
  closeModal(){
   this.setState({modalIsOpen: false});
  }
  handleLabel(){
    let desc = this.refs.inputTodo.value;
    console.log(desc);
  }
  render(){
    const {onCompleteTask, tasks } = this.props;

    var options = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three'},
        { value: 'four', label: 'four' },
    ];
   return(
    <div>
      <div className='row nav-bar'>
        <div className='col-md-4'>
          <div id='todoDisc'>google</div>
        </div>
        <div className='col-md-5 search-panel'>
          <input className="form-control search" id="search" />
        </div>
        <div className='col-md-3 activity-icons'>
          <i className='glyphicon glyphicon-plus' onClick={this.handleLabel}></i>
          <input ref='inputTodo' />
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
        </div>
      </div>
    </div>
    );
  }
}



export default connect(mapStatetoProps, mapDispatchToPros) (NavBar);
