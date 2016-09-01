import '../style/navbar.scss';
import React,{ Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    let button;
    if(this.props.token){
        button =  <RaisedButton label="Secondary" secondary={true} />
    }else{
        button =  <RaisedButton label="Secondary" primary={true} />
    }
   return(
      <div>
        <AppBar
        title="Google Keep"
        iconElementRight = {button}
        className='nav-bar'/>
      </div>
    );
  }
}

NavBar.childContextTypes = {
  muiTheme: React.PropTypes.object,
};


export default NavBar;
