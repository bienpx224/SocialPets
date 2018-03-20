import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {set_user} from 'userAction';
import Post from 'Post';
import NewsfeedContent from 'NewsfeedContent';
import {get_post_err, get_postNewsfeed} from 'postAction';
import ReactPlaceholder from 'react-placeholder';

class Newsfeed extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      postsNewsfeed: []
    }
  }
  componentDidMount(){
    this.getPostNewsfeed(this.props.user);
  }
  getPostNewsfeed(user){
    var that = this;
    if(!user) return;
    this.setState({loading: true})
    let {dispatch} = this.props;
    io.socket.post('/post/getPostNewsfeed',{},function(resData, jwres){
      if(resData.posts){
        return that.setState({postsNewsfeed: resData.posts, loading: false});
      }
    })
  }
  // componentWillMount(){
  //   var {dispatch} = this.props;
  //   console.log("Newsfeed: componentWillMount: ", this.props.user);
  //   io.socket.post('/post/getPostNewsfeed',{},function(resData, jwres){
  //     if(resData.notFound){
  //       dispatch(get_post_err(resData.notFound));
  //     }else if(resData.posts){
  //       dispatch(get_postNewsfeed(resData.posts));
  //     }else{
  //       dispatch(get_post_err(resData.err));
  //     }
  //   })
  // }
  componentWillReceiveProps(nextProps){
      if (
        (!this.props.user && nextProps.user) ||
        this.props.user.id !== nextProps.user.id
      ) {
        this.getPostNewsfeed(nextProps.user);
      }
  }
  render(){
    if(this.state.loading) return(
        <div className="col-md-8 static">
        <Post />
        <ReactPlaceholder ready={false} type="media" rows={7} showLoadingAnimation={true}>
          <h3></h3>
        </ReactPlaceholder>
      </div>
                                  )
    else if(this.state.postsNewsfeed.length === 0)
      return(
             <div className="col-md-8 static">
        <Post />
        <h3>Nothing to show!!!</h3>
      </div>
                                                      )
    else
    return(
      <div className="col-md-8 static">
        <Post />
        {this.state.postsNewsfeed.map(function(i,index){
            return(
                   <NewsfeedContent key={index} content={i.content} image={i.image} title={i.title} createdAt={i.createdAt} owner={i.userId} />
                   )
          })
        }
      </div>
    )
  }
}

module.exports = connect( function(state){
  return {user: state.userReducer.user, postsNewsfeed: state.postReducer.postsNewsfeed};
})(Newsfeed);