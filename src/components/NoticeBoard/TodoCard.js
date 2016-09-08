import React , { Component } from 'react';
import {Card, CardHeader, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { deleteCardCall , editCardCall } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Popover from 'material-ui/Popover';
import {Menu, MenuItem} from 'material-ui/Menu';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import  CheckBoxList from 'react-checkbox-list';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
function mapDispatchToPros (dispatch) {
  return bindActionCreators({
    deleteCardCall : deleteCardCall,
    editCardCall : editCardCall,
   },dispatch);
}
class TodoCard extends Component {
  constructor(props) {
    super(props);
    this.token = this.props.token;
    this.state = {
      open : false,
      popOpen : false,
      value: 'Property Value',
      labelValue : null,
    }
  }
  handleTouchTap(event){
    // this.refs.Popover.parentElement.setAttribute('z-index','80000');
    this.setState({
      popOpen: true,
      anchorEl: event.currentTarget,
    });
  }
  handleRequestClose() {
    
    this.setState({
      popOpen: false,
    });
  };

  handleOpen(value){
    this.setState({
      open: true,
      value: value
    });
  };

  handleClose(event){
    this.setState({open: false});
  };

  handleChange(event){
    console.log(event);
    this.setState({
      value: event.target.value,
    });
  }

  editCard(value, e){
    console.log('state',this.state.labelValue);
    let delLabelData = '';
    if(this.props.labelsData.length > 1) {
      this.props.labelsData.map((op) =>{
        if(this.state.labelValue.length > 1) {
          this.state.labelValue.map((re)=>{
              if(op.id != re.value){
                console.log(op.id,re.value);
                delLabelData += op.id+","
              }
          })
        }else if(this.state.labelValue.length > 1){
              if(op.id != this.state.labelValue[0].value){
                console.log(op.id,re.value);
                delLabelData += op.id+","
              }
        }
      })
    }
    // }else if(this.props.labelsData.length == 0) {
    //   if(this.state.labelValue.length > 1) {
    //       this.state.labelValue.map((re)=>{
    //           if(this.props.labelsData[0].id != re.value){
    //             console.log(this.props.labelsData[0].id,re.value);
    //             delLabelData += this.props.labelsData[0].id+","
    //           }
    //       })
    //     }else if(this.state.labelValue.length > 1){
    //           if(this.props.labelsData[0].id != this.state.labelValue[0].value){
    //             console.log(op.id,re.value);
    //             delLabelData += op.id+","
    //           }
    //     }
    // }
    console.log(delLabelData);
    let body = document.getElementById('body_'+value.id).value;
    let labels = "";
    if(this.state.labelValue.length > 1){
      this.state.labelValue.map(function(re){
        labels += re.value+","
      }) 
    }else if (this.state.labelValue.length == 1){
      labels += this.state.labelValue[0].value
    }
    
    this.props.editCardCall({
      token : this.token,
      id : value.id,
      name: value.name,
      body : body,
      addLabelsData : labels.slice(0,-1)
    })
    this.handleClose();
  }

  deleteCard(cardId,e){
     this.props.deleteCardCall({
      token: this.props.token,
      id: cardId
    })
     this.handleClose();

  }
  handleLabelChange = (value) => {
    this.setState({
      labelValue : value
    });    
  }
  handleNoteLabel(labelsData) {
    let labels = [];
    if(labelsData.length >1){
      labelsData.map(function(value){
      labels.push({ value: value.id , label: value.name })
      })
    }else if (labelsData.length == 1){
      labels.push({value: labelsData[0].id,label: labelsData[0].name})
    }
    return labels
  }

  render(){
    const customContentStyle = {
        width: '40%',
        maxWidth: 'none',
        margin:'0 auto'
      };
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };
    console.log('TODO CARD-------------',this.props);
    return(
      <div>
        {
          this.props.cardsData.map((value) => {
                  let tiggerExpandCard = this.handleOpen.bind(this, value);
                  let tiggerHandleChange = this.handleChange.bind(this);
                  let tiggerHandleClose = this.handleClose.bind(this);
                  let tiggerEditCard = this.editCard.bind(this,value);
                  let tiggerDeleteCard = this.deleteCard.bind(this, value.id);
                  let tiggerHandleTouchTap = this.handleTouchTap.bind(this);
                  let tiggerhandleRequestClose = this.handleRequestClose.bind(this);
                  let tiggerhandleNoteLabel = this.handleNoteLabel.bind(this);
                  let check;
                  const actions = [
                                      <RaisedButton
                                        onClick={tiggerHandleTouchTap}
                                        label="Click me" />,            
                                      <RaisedButton label="EDIT" primary={true}
                                        onClick={tiggerEditCard}/>,
                                      <RaisedButton label="DELETE" secondary={true}
                                          onClick={tiggerDeleteCard}/>,
                                      <RaisedButton label="CLOSE" secondary={true}
                                              onClick={tiggerHandleClose}/>,
                                    ];
                         
                  return(
                        <div className='col-md-4' key={'TodoCard_'+value.id}>
                          <Card onClick={tiggerExpandCard}>
                            <CardHeader
                              title={value.name}>
                            </CardHeader>
                            <CardText>
                              {value.body}
                              <br/>
                              labeles :{value.labels.map((op)=>{
                                              return op.name+" "
                                           }) || value.labels[0].name }  
                              
                              <Dialog
                                title={this.state.value.name}                                    
                                actions={actions}
                                modal={true}
                                contentStyle={customContentStyle}
                                open={this.state.open} >
                               <TextField
                                  multiLine={true}
                                  className='todo-body'
                                  defaultValue = {this.state.value.body}
                                  onChange={tiggerHandleChange}
                                 id={'body_'+value.id}/>
                              <MuiThemeProvider>
                                <Popover
                                  ref='Popover'
                                  open={this.state.popOpen}
                                  anchorEl={this.state.anchorEl}
                                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                  onRequestClose={tiggerhandleRequestClose}>
                                    {/*value.labels.map((re)=> <ListItem primaryText={""+re.name} key={'Checkbox'+value.id} leftCheckbox={<Checkbox defaultChecked={true} />} />)*/}
                                    {
                                        this.props.labelsData.map((ele)=>{
                                        let check = value.labels.map((op)=>{
                                                      if(ele.id != op.id){
                                                        return <ListItem primaryText={""+ele.name} key={'Checkbox'+ele.id} leftCheckbox={<Checkbox />} />
                                                      }
                                                    });
                                        return check;
                                    })}
                                </Popover>
                              </MuiThemeProvider>
                              </Dialog>                              
                            </CardText>
                          </Card>
                          <br/>
                        </div>
                         );
                })
        }
      </div>
    );
  }
}
export default connect(null, mapDispatchToPros) (TodoCard);
