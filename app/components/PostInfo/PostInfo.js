import React from 'react';
import {connect} from 'react-redux';
import NewsfeedContent from 'NewsfeedContent';
import {BrowserRouter as Router,Route,Switch,hashHistory,Redirect,NavLink,withRouter,Link} from 'react-router-dom';

class PostInfo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading : true,
      data: {}
    }
  }
  componentDidMount(){

    let {id} = this.props.match.params;
    io.socket.post('/post/getPostById',{id},(resData, jwres)=>{
      if(resData.err){
        alert("co loi")
      }
      if(resData.post){ 
        this.setState({loading:false, data: resData.post})
      }
    })
  }
  render(){
    let renderPost = this.state.loading===false?<NewsfeedContent data={this.state.data} owner={this.state.data.userId} />:<h1>dang loading</h1>;
    return(
      <div id="page-contents">
        <div className="row">
          <div className="col-md-12">

            {renderPost}

          </div>
        </div>
      </div>
    )
  }
}
module.exports = withRouter(connect( function(state){
  return {user: state.userReducer.user};
})(PostInfo));
