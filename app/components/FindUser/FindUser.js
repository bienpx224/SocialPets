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
      isSearch: true,
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.type !== this.props.match.params.type){
      this.state.isSearch = false; this.state.listSearch = [];
      this.setState(this.state);
      this.checkTypeSearch(nextProps.match.params.type);
    }
  }
  componentDidMount(){
    let key = this.refs.key.value;
      let type = this.props.match.params.type;
      this.checkTypeSearch(type)
  }
  checkTypeSearch(type){

      let user = this.props.user;
      let skip = this.state.isSearch===true?0:this.state.listSearch.length;  let limit = 6;
      if(type==="rank"){
        this.getListRecommendRank(user, skip, limit);
      }else if(type==="common"){
        this.getListRecommendCommon(user, skip, limit);
      }else{
        this.handleSearch(user, skip, limit);
      }
  }
  getListRecommendCommon(user, skip, limit){
    if(!user) return this.setState({...this.state,loading: false});
    io.socket.post('/follow/recommend_common',{userId: user.id, skip, limit}, (resData, jwres)=>{
        if(resData.ok){ console.log("resData Common: ", resData.ok);
          let newListSearch = [];
          if(this.state.isSearch===true){
              newListSearch = resData.ok;
          }else{
            newListSearch = this.state.listSearch.concat(resData.ok);
          }
          return this.setState({...this.state,loading: false, listSearch: newListSearch});
        }
    })
  }
  getListRecommendRank(user, skip, limit){
    if(!user) return this.setState({...this.state,loading: false});
     io.socket.post('/follow/recommend_rank',{userId: user.id,skip, limit}, (resData, jwres)=>{
        if(resData.ok){ console.log("resData Rank: ", resData.ok);
          let newListSearch = [];
          if(this.state.isSearch===true){
              newListSearch = resData.ok;
          }else{
            newListSearch = this.state.listSearch.concat(resData.ok);
          }
          return this.setState({...this.state,loading: false, listSearch: newListSearch});
        }
      })
  }
  handleSearch(user, skip, limit){
    let key = this.refs.key.value;
    if(!user) return this.setState({...this.state,loading: false});
     io.socket.post('/user/searchUser',{userId: user.id,skip, limit, key}, (resData, jwres)=>{
        if(resData.listUser){ console.log("resData Search: ", resData.listUser);
          let newListSearch = [];
          if(this.state.isSearch===true){
              newListSearch = resData.listUser;
          }else{
            newListSearch = this.state.listSearch.concat(resData.listUser);
          }
          return this.setState({...this.state,loading: false, listSearch: newListSearch});
        }
      })
  }
  handleTypeKey(){
    let {type} = this.props.match.params;
    this.state.isSearch = true;
    this.setState(this.state);
    this.checkTypeSearch("type");
  }
  handleShowmore(){
    let {type} = this.props.match.params;
    this.state.isSearch = false;
    this.setState(this.state);
    this.checkTypeSearch(type);
  }
  render(){
    if (this.state.loading===true) return(
        <div className="col-md-7 static fixed-content">
          <div className="col-md-12 col-sm-12">
            <input type="text" ref="key" className="form form-control" onChange={this.handleTypeKey.bind(this)} placeholder="Type name, email, phone..."/>
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
                    <input type="text" ref="key" className="form form-control" onChange={this.handleTypeKey.bind(this)} placeholder="Type name, email, phone..."/>
                  </div>
                </div>
            </div>

            <div className="friend-list">
              <div className="row">
                <div className="col-md-12">
                     {this.state.listSearch.map( (user, i)=>{
                       if(i === this.state.listSearch.length-1){
                         return(
                           <div key={i}>
                             <Following key={i} data={user} />
                             <input id="show-more" type="button" className="show-more btn btn-success" defaultValue="Show more" onClick={this.handleShowmore.bind(this)} />
                           </div>
                         )
                       }
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
