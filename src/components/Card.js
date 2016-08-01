import React , { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
  }
  render(){
  	// console.log(this.props)
  	const{ id, description, label} = this.props.details;
    return(
      <div>
   		     id : {id}<br/>
   		     desc: {description}<br/>
   		     label:{label}<br/>
      </div>
    );
  }
}
export default Card;
