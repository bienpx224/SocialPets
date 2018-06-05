import React from 'react';
import {connect} from 'react-redux';
import {test1} from 'testAction';
import {NavLink,withRouter,Link} from 'react-router-dom';

class Test extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      image: null
    }
  }
  onImageChange(event) {


    var that = this;
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            var nameImg = event.target.files[0].name;
            var position = nameImg.lastIndexOf(".");
            if(position>0) nameImg = nameImg.substring(0,position);
            reader.onload = (e) => {
                io.socket.post('/user/handleImg',{result:e.target.result,name:nameImg}, function(resData, jwres){

                  that.setState({image: e.target.result});
                });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }
  render(){
    return (
      <div className="container">
      <input type="file" name="file" onChange={this.onImageChange.bind(this)} />
      <img src={this.state.image} style={{width:"200px",height:"200px"}} />
      <li><Link to="/login"> Login </Link></li>
      <li><Link to="/ac"> nothing </Link></li>
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {isTest: state.testReducer.isTest, imageB: state.testReducer.image};
})(Test);
