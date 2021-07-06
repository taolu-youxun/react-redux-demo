import { Component } from 'react';
import PropTypes from 'prop-types'

class Provider extends Component{
  static childContextTypes = {    
    store: PropTypes.object  
} 

  getChildContext() {    
    return { store: this.store }  
}  

constructor(props, context) {    
    super(props, context)    
    this.store = props.store  
} 

  render(){
    return this.props.children
  }
}

export default Provider