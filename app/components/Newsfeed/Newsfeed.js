import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {set_user} from 'userAction';
import Post from 'Post';
import NewsfeedContent from 'NewsfeedContent';
import {get_post_err, get_postNewsfeed,add_new_post,add_more_post} from 'postAction';
import ReactPlaceholder from 'react-placeholder';

class Newsfeed extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      postsNewsfeed: []
    }
    this.getMorePost = this.getMorePost.bind(this);
  }
  componentDidMount(){
    this.getPostNewsfeed(this.props.user);
  }
  getPostNewsfeed(user){
    var that = this;
    if(!user) return;
    this.setState({loading: true})
    let {dispatch} = this.props;
    io.socket.post('/post/getPostNewsfeed',{userId:user.id},function(resData, jwres){
      if(resData.err){
        that.msg.show('ERROR: '+resData.err, {
                          type: 'error',
                          icon: <img src="/images/error.png" />
        })
              console.log(resData);
        var listPostNewfeed = [];
        dispatch(get_postNewsfeed(listPostNewfeed));
        return that.setState({...that.state,loading: false});
      }
      if(resData.posts){
        var listPostNewfeed = resData.posts;
        dispatch(get_postNewsfeed(listPostNewfeed));
        return that.setState({...that.state,loading: false});
      }
    })
  }

  getMorePost(){
    let {id}= this.props.user;
    var that = this;
    let {dispatch} = this.props;
    io.socket.post('/post/getPostNewsfeed',{userId: id},function(resData, jwres){
      if(resData.err){
        that.msg.show('ERROR: '+resData.err, {
                          type: 'error',
                          icon: <img src="/images/error.png" />
        })
      }
      if(resData.posts){
        var listPostNewfeed = resData.posts;
        for(let i = listPostNewfeed.length-1; i >= 0; i--){
          dispatch(add_more_post(listPostNewfeed[i]));
        }
        return that.setState({...that.state,loading: false});
      }
    })
  }

  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 3000,
    transition: 'scale'
  }
  componentWillReceiveProps(nextProps){
    this.setState({...this.state, postsNewsfeed : nextProps.postsNewsfeed});
  }
  render(){
    let that = this;
    var countPost = this.state.postsNewsfeed.length;
    if(this.state.loading) return(
        <div className="col-md-7 static">
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <Post />
        <ReactPlaceholder ready={false} type="media" rows={7} showLoadingAnimation={true}>
          <h3></h3>
        </ReactPlaceholder>
      </div>
    )
    else if(this.state.postsNewsfeed.length === 0)
      return(
      <div className="col-md-7 static">
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <Post />
        <h3>Nothing to show!!!</h3>
      </div>
    )
    else
    return(
      <div className="col-md-7 static">
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <Post />
        {this.state.postsNewsfeed.map(function(i,index){
          if(index === countPost-1)
          return (
            <div key={index}>
              <NewsfeedContent key={index} content={i.content} image={i.image} title={i.title}
              createdAt={i.createdAt} owner={i.userId} />
              <input type="button" className="btn btn-success" defaultValue="Show more" onClick={that.getMorePost} />
            </div>
          )
          else return(
              <NewsfeedContent key={index} content={i.content} image={i.image} title={i.title}
              createdAt={i.createdAt} owner={i.userId} />
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
