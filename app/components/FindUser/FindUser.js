import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import SearchInbox from 'SearchInbox';
import InboxList from 'InboxList';
import Following from 'Following';
import ReactPlaceholder from 'react-placeholder';

class FindUser extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      listSearch: [],
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.type !== this.props.match.params.type){
      this.checkTypeSearch(nextProps.match.params.type);
    }
  }
  componentDidMount(){
    let key = this.refs.key.value;
    console.log("=================== key :",key)
      let type = this.props.match.params.type;
      this.checkTypeSearch(type)
  }
  checkTypeSearch(type){
      let user = this.props.user;
      let skip = 0;  let limit = 15;
      if(type==="rank"){
        this.getListRecommendCommon(user, skip, limit);
      }else if(type==="common"){
        this.getListRecommendRank(user, skip, limit);
      }else{
        this.handleSearch(user, skip, limit);
      }
  }
  getListRecommendCommon(user, skip, limit){
    if(!user) return this.setState({...this.state,loading: false});
    io.socket.post('/follow/recommend_common',{userId: user.id, skip, limit}, (resData, jwres)=>{
        if(resData.ok){
          return this.setState({...this.state,loading: false, listSearch: resData.ok});
        }
    })
  }
  getListRecommendRank(user, skip, limit){
    if(!user) return this.setState({...this.state,loading: false});
     io.socket.post('/follow/recommend_rank',{userId: user.id,skip, limit}, (resData, jwres)=>{
        if(resData.ok){
          return this.setState({...this.state,loading: false, listSearch: resData.ok});
        }
      })
  }
  handleSearch(user, skip, limit){
      let key = this.refs.key.value;
    if(!user) return this.setState({...this.state,loading: false});
     io.socket.post('/user/searchUser',{userId: user.id,skip, limit, key}, (resData, jwres)=>{
        if(resData.listUser){
          return this.setState({...this.state,loading: false, listSearch: resData.listUser});
        }
      })
  }
  render(){
    if (this.state.loading===true) return(
        <div className="col-md-7 static fixed-content">
          <div className="col-md-12 col-sm-12">
            <input type="text" ref="key" className="form form-control" onChange={this.handleSearch.bind(this)} placeholder="Type name, email, phone..."/>
          </div>
           <ReactPlaceholder ready={false} type="media" rows={7} showLoadingAnimation={true}>
            <h3></h3>
          </ReactPlaceholder>
        </div>
      );
    else return(
          <div className="col-md-7 static fixed-content">
          <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            <div className="create-post">
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <input type="text" ref="key" className="form form-control" onChange={this.handleSearch.bind(this)} placeholder="Type name, email, phone..."/>
                  </div>
                </div>
            </div>

            <div className="friend-list">
              <div className="row">
                <div className="col-md-12">
                     {this.state.listSearch.map( (user, i)=>{
                        return <Following key={i} data={user} />
                     })
                    }
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
    )
  }
}

module.exports = connect(function(state){
return {user: state.userReducer.user};
})(FindUser);
