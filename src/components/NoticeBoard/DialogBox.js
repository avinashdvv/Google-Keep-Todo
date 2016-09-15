import React , { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCardCall , editCardCall } from '../../actions';


import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem, MakeSelectable} from 'material-ui/List';

let ADD_LABEL = [], DEL_LABEL = [];

class DialogBox extends Component {

  value = this.props.value;

  state = {
    popOpen : false,
    body : '',
    name : '',
    labelsData : {
      addlabel : '',
      deleteLabel : ''
    },
    tempLabels : '',
  }
  componentWillMount() {
      this.setState({
        body : this.props.value.body,
        name : this.props.value.name
      })
  }
  handleTouchTap = (event) =>{
    this.setState({
      popOpen: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose = () =>{
    this.setState({
      popOpen: false
    });
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
  editCard = () => {
    console.error(this.state);
    this.props.editCardCall({
      token : this.props.token,
      id : this.value.id,
      name: this.state.name,
      body : this.state.body,
      addLabelsData : this.state.labelsData.addlabel,
      deleteLabelData : this.state.labelsData.deleteLabel
    })

  }

  deleteCard = () => {
     this.props.deleteCardCall({
      token: this.props.token,
      id: this.value.id
    })

  }
  handleList(value, event)   {
    console.error(value, document.getElementById('listitem_checkbox_'+value.id).checked );
    if(document.getElementById('listitem_checkbox_'+value.id).checked === false){
      document.getElementById('badge'+value.id).remove();
    }
    if(document.getElementById('listitem_checkbox_'+value.id).checked === true){
        var z = document.createElement('span');
        z.className='badge';
        z.innerHTML = ""+value.name;
        document.getElementById('labels').appendChild(z)
        DEL_LABEL = DEL_LABEL.filter(item => item !== value.id);
        ADD_LABEL.push(value.id)
    }else{
         ADD_LABEL = ADD_LABEL.filter(item => item !== value.id);
         DEL_LABEL.push(value.id);
    };
    console.error(ADD_LABEL,DEL_LABEL)
   this.setState({
    labelsData : {
                    addlabel : ADD_LABEL.toString(),
                    deleteLabel : DEL_LABEL.toString()
                  }
   })
  }

  render() {
    console.error('DialogBox',this.props);
    let value = this.props.value
    const customContentStyle = {
        width: '40%',
        maxWidth: 'none',
        margin:'0 auto'
      };
    const actions = [
                        <FlatButton
                          onClick={this.handleTouchTap}
                          className='edit-label-btn'
                          label="EDIT LABELS" />,
                        <FlatButton label="EDIT"
                          className='edit-btn'
                          onClick={this.editCard}/>,
                        <FlatButton label="DELETE"
                          className='del-btn'
                            onClick={this.deleteCard}/>,
                        <FlatButton label="DONE"
                            className='done-btn'
                                onClick={this.props.dialogClose}/>,
                      ];
  return(
          <Dialog
           actions={actions}
           modal={true}
           className='dialog-box'
           contentStyle={customContentStyle}
           open={this.props.dialogState}>
           <TextField
               id={'name_'+value.id}
               key={'name_'+value.id}
               defaultValue={value.name}
               className='todo-title'
               underlineShow={false}
               onChange={this.handleNameChange}/>
            <div>
              <TextField
                 multiLine={true}
                 key={'body_'+value.id}
                 className='todo-body'
                 underlineShow={false}
                 fullWidth={true}
                 defaultValue = {value.body}
                 id={'body_'+value.id}
                 onChange={this.handleBodyChange}/>
            </div>
            <div id='labels' className='labelsData'>
            {this.props.value.labels.map((val)=>{
              return <span className='badge' id={'badge'+val.id}>{val.name}</span>
            })}
            </div>

            <MuiThemeProvider>
             <Popover
               ref='Popover'
               key={'popover_'+value.id}
               open={this.state.popOpen}
               anchorEl={this.state.anchorEl}
               anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
               targetOrigin={{horizontal: 'left', vertical: 'top'}}
               onRequestClose={this.handleRequestClose}>

               <List/>

               {
                 (()=>{
                    let value = this.props.value

                   if(value.labels.length >= 1) {
                     console.error(value.labels);
                      return value.labels.map((re)=>
                              <ListItem
                                primaryText={""+re.name}
                                key={'Checkbox||'+re.id}
                                onClick={() => this.handleList(re)}
                                leftCheckbox={<Checkbox id={'listitem_checkbox_'+re.id}
                                defaultChecked={true}/>} />)
                    }
                })()
              }
              {
                 (() =>{
                   let value = this.props.value;
                   let list3 = this.props.labelsData.filter(function(itm){
                                 let occurance = false;
                                  if(value.labels.length >= 1) {
                                     value.labels.forEach(function(itm1) {
                                        if(itm.id == itm1.id) {
                                           occurance = true;
                                           return;
                                         }
                                     })
                                   }
                                   return !occurance;
                               })
                   let diff = list3.map((val)=>{
                                   return  <ListItem primaryText={""+val.name}
                                                id={"listitem_"+val.id}
                                                onClick={() => this.handleList(val)}
                                                key={'Checkbox__'+val.id} leftCheckbox={<Checkbox id={'listitem_checkbox_'+val.id}/>} />
                               })
                   return diff;
                 })()
               }

               <List/>
             </Popover>
            </MuiThemeProvider>
       </Dialog>
   )

  }
}


function mapDispatchToPros (dispatch) {
  return bindActionCreators({
    deleteCardCall : deleteCardCall,
    editCardCall : editCardCall,
   },dispatch);
}

export default connect(null,mapDispatchToPros) (DialogBox);
