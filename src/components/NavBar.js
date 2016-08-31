import '../style/navbar.scss';
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';

function mapStatetoProps({todoReducers}){
  return {
    id : todoReducers.id,
    description:todoReducers.desc,
    label: todoReducers.label
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
    this.creatCard = this.props.creatCard;
    this.state = {
      modalIsOpen: false,
    }
  }

  openModal(){
   this.setState({modalIsOpen: true});
  };
  closeModal(){
   this.setState({modalIsOpen: false});
  }

  render(){
    const {onCompleteTask, tasks } = this.props;
   return(
      <div>
        <AppBar
        title="Google Keep"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        className='nav-bar'
      />
      </div>
    );
  }
}

NavBar.childContextTypes = {
  muiTheme: React.PropTypes.object,
};


export default connect(mapStatetoProps, mapDispatchToPros) (NavBar);
