import React , { Component } from 'react';
import { deleteCardCall , editCardCall } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import {Menu, MenuItem} from 'material-ui/Menu';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem, MakeSelectable} from 'material-ui/List'



function mapDispatchToPros (dispatch) {
  return bindActionCreators({
    deleteCardCall : deleteCardCall,
    editCardCall : editCardCall,
   },dispatch);
}
let ADD_LABEL = [], DEL_LABEL = [],
    ADD_LABEL_STR ='', DEL_LABEL_STR = ''
class TodoCard extends Component {
  constructor(props) {
    super(props);
    this.token = this.props.token;
    this.state = {
      open : false,
      popOpen : false,
      value: '',
      body : '',
      name : '',
      labelsData : {}
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
      popOpen: false
    });
  };

  handleOpen(value){
    this.setState({
      open: true,
      value: value,
      body : value.body,
      name : value.name
    });
  };

  handleClose(event){
    this.setState({open: false});
  };

  handleBodyChange = (event) => {
    this.setState({
      body : event.target.value
    })
  }
  handleNameChange = (event) => {
    this.setState({
      name : event.target.value
    })
  }
  editCard(value, e){
    console.error(this.state);
    this.props.editCardCall({
      token : this.token,
      id : this.state.value.id,
      name: this.state.name,
      body : this.state.body,
      addLabelsData : this.state.labelsData.addlabel,
      deleteLabelData : this.state.labelsData.deleteLabel
    })
    this.handleClose();
  }

  deleteCard(cardId,e){
     this.props.deleteCardCall({
      token: this.props.token,
      id: this.state.value.id
    })
     this.handleClose();
  }

  handleList(value, event)   {
    console.error(value, document.getElementById('listitem_checkbox_'+value).checked );
    
    if(document.getElementById('listitem_checkbox_'+value).checked === true){
      DEL_LABEL = DEL_LABEL.filter(item => item !== value);
      ADD_LABEL.push(value)
    }else{
         ADD_LABEL = ADD_LABEL.filter(item => item !== value);
         DEL_LABEL.push(value);
    };
    console.error(ADD_LABEL,DEL_LABEL)
   this.setState({
    labelsData : {
                    addlabel : ADD_LABEL.toString(),
                    deleteLabel : DEL_LABEL.toString()
                  }
   })
   
  }
  haddleLabelList = (label) => {
   let value = label.map((op)=>{
                    return op.name+" "
                })
   return value
  }

  render(){
    console.log('TodoCard',this.props);

    let status = this.props.isCardsFetchingFailed;
    if( status.length > 1 ){
        alert(status); 
    }
    const customContentStyle = {
        width: '40%',
        maxWidth: 'none',
        margin:'0 auto'
      };
    return(
      <div>
        {
          this.props.cardsData.map((value) => {
                  let tiggerExpandCard = this.handleOpen.bind(this, value);
                  let tiggerHandleClose = this.handleClose.bind(this);
                  let tiggerEditCard = this.editCard.bind(this, value);
                  let tiggerDeleteCard = this.deleteCard.bind(this, value.id);
                  let tiggerHandleTouchTap = this.handleTouchTap.bind(this);
                  let tiggerhandleRequestClose = this.handleRequestClose.bind(this);
                  let tiggerHandleList = this.handleList.bind(this);
                  let tiggerHaddleLabelList = this.haddleLabelList(value.labels);
                  let tiggerhandleNameChange = this.handleNameChange;
                  let tiggerhandleBodyChange = this.handleBodyChange;
                  let check;
                  const actions = [
                                      <RaisedButton
                                        onClick={tiggerHandleTouchTap}
                                        label="EDIT LABELS" />,            
                                        <br/>,
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
                              {value.id} -->
                              {value.body}
                              <br/>
                              labeles :{tiggerHaddleLabelList}                              
                              <Dialog
                                actions={actions}
                                modal={true}
                                contentStyle={customContentStyle}
                                open={this.state.open} >
                               <TextField
                                  id={'name_'+value.id}
                                  defaultValue={this.state.value.name}  
                                  onChange={tiggerhandleNameChange}/>
                                  
                               <TextField
                                  multiLine={true}
                                  className='todo-body'
                                  defaultValue = {this.state.value.body}
                                  id={'body_'+value.id}
                                  onChange={tiggerhandleBodyChange}/>
                              <MuiThemeProvider>
                                <Popover
                                  ref='Popover'
                                  open={this.state.popOpen}
                                  anchorEl={this.state.anchorEl}
                                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                  onRequestClose={tiggerhandleRequestClose}>
                                  {
                                      this.props.labelsData.map((ele)=>{
                                        if(value.labels.length >= 1){
                                          check = value.labels.map((op)=>{
                                                        if (op.id != ele.id) {
                                                          // console.error(ele.id,op.id, ele.id === op.id);
                                                          return <ListItem primaryText={""+ele.name+"--"+ele.id}
                                                                   id={"listitem_"+ele.id}
                                                                   onClick={() => tiggerHandleList(ele.id)}
                                                                   key={'Checkbox__'+ele.id} leftCheckbox={<Checkbox id={'listitem_checkbox_'+ele.id}/>} />
                                                        }
                                                  });
                                          return check
                                        }else{
                                          return <ListItem primaryText={""+ele.name+"--"+ele.id}
                                                    id={"listitem_"+ele.id}
                                                    onClick={() => tiggerHandleList(ele.id)}
                                                    key={'Checkbox__'+ele.id} leftCheckbox={<Checkbox id={'listitem_checkbox_'+ele.id}/>} />
                                          }
                                      })
                                    }

                                    {value.labels.map((re)=> 
                                      <ListItem 
                                        primaryText={""+re.name+"--"+re.id} 
                                        key={'Checkbox||'+re.id}
                                        onClick={() => tiggerHandleList(re.id)} 
                                        leftCheckbox={<Checkbox id={'listitem_checkbox_'+re.id}
                                        defaultChecked={true}/>} />
                                      
                                    )}
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
