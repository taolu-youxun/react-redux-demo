import React,{ Component } from 'react';
import {connect} from './react-redux';

class Mine extends Component{
  constructor(props,context){
    super()
  }

  render(){
    return <div>
      <div onClick={()=>{ this.props.addAccount() }}>点我增加</div>
      <div>{this.props.count}</div>
    </div>
  }
}

const mapStateToProps =(state)=>{
  return {
    count:state.count,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAccount:() => dispatch({type:'plus'})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Mine);