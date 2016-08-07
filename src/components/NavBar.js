import '../style/navbar.scss';
import React,{ Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';

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

export default connect(mapStatetoProps, mapDispatchToPros) (NavBar);
