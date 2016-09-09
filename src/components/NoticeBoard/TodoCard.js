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
class TodoCard extends Component {
  constructor(props) {
    super(props);
    this.token = this.props.token;
    this.state = {
      open : false,
      popOpen : false,
      value: '',
      labelsData : {}
    }
  }
  handleTouchTap(event){
    // this.refs.Popover.parentElement.setAttribute('z-index','80000');
    this.setState({
      popOpen: true,
      anchorEl: event.currentTarget,
    });
  }handleChange
  handleRequestClose() {
    this.setState({
      popOpen: false
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
    console.error(this.state);
    this.props.editCardCall({
      token : this.token,
      id : this.state.value.id,
      name: this.state.value.name,
      body : this.state.value.body,
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
    let addlabel=[],deleteLabel=[]
    if(document.getElementById('listitem_checkbox_'+value).checked === true){
      deleteLabel = deleteLabel.filter(item => item !== value);
      addlabel.push(value)
    }else{
      addlabel = addlabel.filter(item => item !== value);
      deleteLabel.push(value);
    };
    let addlabelData = '',dellabelData = '';
    addlabelData = addlabel.map((op)=>{
                          return op+","
                        });
    dellabelData = deleteLabel.map((op)=>{
                          return op+","
                        });
    console.error(addlabel,deleteLabel,addlabelData,dellabelData);
   this.setState({
    labelsData : {
                    addlabel : addlabelData.slice(0,-1),
                    deleteLabel : dellabelData.slice(0,-1)
                  }
   })
   
  }
  haddleLabelList(label) {
   let value = labels.map((op)=>{
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
                  let tiggerHandleChange = this.handleChange.bind(this);
                  let tiggerHandleClose = this.handleClose.bind(this);
                  let tiggerEditCard = this.editCard.bind(this, value);
                  let tiggerDeleteCard = this.deleteCard.bind(this, value.id);
                  let tiggerHandleTouchTap = this.handleTouchTap.bind(this);
                  let tiggerhandleRequestClose = this.handleRequestClose.bind(this);
                  let tiggerHandleList = this.handleList.bind(this);
                  let tiggerHaddleLabelList = this.haddleLabelList.bind(this);
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
                              {value.id} -->
                              {value.body}
                              <br/>
                              labeles :{tiggerHaddleLabelList(value.labels)}                              
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
                                  <List>
                                    {value.labels.map((re)=> 
                                      <div>
                                        <input type="Checkbox" id={'listitem_checkbox_'+re.id} onChange={() => tiggerHandleList(re.id)} 
                                         value={re.id} defaultChecked={true} />{re.id}
                                        <ListItem primaryText={""+re.name+"--"+re.id} 
                                        key={'Checkbox||'+re.id} onClick={() => tiggerHandleList(re.id)} 
                                       leftCheckbox={<Checkbox id={'listitem_checkbox_'+re.id} />} />
                                      </div> 
                                    )}
                                    {
                                      this.props.labelsData.map((ele)=>{
                                        check = value.labels.map((op)=>{
                                                      if(ele.id != op.id){
                                                        return <ListItem primaryText={""+ele.name+"--"+ele.id}
                                                         id={"listitem_"+ele.id}
                                                         onClick={() => tiggerHandleList(ele.id)}
                                                         key={'Checkbox__'+ele.id} leftCheckbox={<Checkbox id={'listitem_checkbox_'+ele.id}/>} />
                                                      }
                                                    });
                                        return check;
                                      })
                                    }
                                  </List>
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
