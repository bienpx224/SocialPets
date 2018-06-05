import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import Post from 'Post';
import TimelineContent from 'TimelineContent';
import {list_my_post,add_more_my_post} from 'postAction';
import ReactPlaceholder from 'react-placeholder';

class Timeline extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      listMyPost: [],
      total: 0
    }
    this.getMorePost = this.getMorePost.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.person !== nextProps.person ){
      this.getListMyPost(nextProps.person.id);
    }
    if(nextProps.listMyPost){
      this.setState({...this.state, listMyPost : nextProps.listMyPost});
    }
  }
  componentDidMount(){
    let id = "";
    if(this.props.type === "person"){
      id = this.props.person?this.props.person.id:"";
    }else{
      id = this.props.user?this.props.user.id:"";
    }
    this.getListMyPost(id);
  }
  getListMyPost(id){
    let {dispatch} = this.props;
    let that = this;
    io.socket.post('/post/getListMyPost',{userId:id, skip: this.state.total},function(resData, jwres){
      if(resData.posts){
        dispatch(list_my_post(resData.posts));
        return that.setState({...that.state,loading: false, total: resData.posts.length});
      }else{
        dispatch(list_my_post([]));
        return that.setState({...that.state,loading: false, total: 0});
      }
    });
  }
  getMorePost(){
    let id = "";
    if(this.props.type === "person" && this.props.person){
      id = this.props.person.id;
    }else if(this.props.user){
      id = this.props.user.id;
    }
    var that = this;
    let {dispatch} = this.props;
    io.socket.post('/post/getListMyPost',{userId: id, skip: this.state.total},function(resData, jwres){
      if(resData.err){
        alert(resData.err);
      }
      if(resData.posts){
        var listMyPost = resData.posts;
        if(listMyPost.length === 0) document.getElementById('show-more').style.display = 'none';
        for(let i = listMyPost.length-1; i >= 0; i--){
          that.state.total ++;
          dispatch(add_more_my_post(listMyPost[i]));
        }
        return that.setState({...that.state,loading: false});
      }
    })
  }
  render(){
    let renderPost = this.props.type==="person"?<div className="create-post"></div>:<Post/>;
    let that = this;
    var countPost = this.state.listMyPost.length;
    if(this.state.loading){
      return (
        <div>
          <div className="col-md-3"></div>
          <div className="col-md-8">
              {renderPost}
              <ReactPlaceholder ready={false} type="media" rows={7} showLoadingAnimation={true}>
                <h3></h3>
              </ReactPlaceholder>
          </div>
        </div>

      )
    }else if(this.state.listMyPost.length === 0){
      return (
        <div>
          <div className="col-md-3"></div>
          <div className="col-md-8">
              {renderPost}
              <h3> Nothing to show !!! </h3>
          </div>
        </div>
      )
    }else
    return(
    <div>
      <div className="col-md-3"></div>
      <div className="col-md-8">
              {renderPost}
              {this.state.listMyPost.map(function(i,index){
                if(index === countPost-1){
                  return (
                    <div key={index}>
                      <TimelineContent key={index} owner={i.userId} post={i} />
                      <input id="show-more" type="button" className="show-more btn btn-success" defaultValue="Show more" onClick={that.getMorePost} />
                    </div>
                  )
                }else return <TimelineContent key={index} owner={i.userId} post={i} />
            })
          }
      </div>
    </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user, listMyPost: state.postReducer.listMyPost, person: state.userReducer.person};
})(Timeline);
