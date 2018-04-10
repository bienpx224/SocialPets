import React from 'react';
import {connect} from 'react-redux';
import ReactPlaceholder from 'react-placeholder';
import validateInfoUser from 'validateInfoUser';
import AlertContainer from 'react-alert';
import {set_user} from 'userAction';
import {list_history,add_more_history} from 'historyAction';
import HistoryUser from 'HistoryUser';

class ListHistoryUser extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      total: 0,
      listHistory : []
    }
    this.getMoreHistory = this.getMoreHistory.bind(this);
    // this.getHistoryUser = this.getHistoryUser.bind(this);
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'light',
    time: 3000,
    transition: 'scale'
  }
  componentDidMount(){
    let userId = this.props.user.id;
    this.getHistoryUser(userId);
  }
  getHistoryUser(userId){
    let that = this;
    let {dispatch} = this.props;
    let skip = this.state.total;
    this.setState({loading: true});
    io.socket.post('/history/getHistoryUser',{userId,skip},function(resData, jwres){ console.log("res2: ",resData);
      if(resData.err){
        that.msg.show('ERROR: '+resData.err, {
                          type: 'error',
                          icon: <img src="/images/error.png" />
        })
        var listHistory = [];
        dispatch(list_history(listHistory));
        return that.setState({...that.state,loading: false});
      }
      if(resData.listHistory){
        var listHistory = resData.listHistory;
        dispatch(list_history(listHistory));
        return that.setState({...that.state,loading: false, total: listHistory.length});
      }
    })
  }
  getMoreHistory(){
    let {id}= this.props.user;
    var that = this;
    let {dispatch} = this.props;
    io.socket.post('/history/getHistoryUser',{userId: id, skip: this.state.total},function(resData, jwres){
      if(resData.err){
        that.msg.show('ERROR: '+resData.err, {
                          type: 'error',
                          icon: <img src="/images/error.png" />
        })
      }
      if(resData.listHistory){
        var listHistory = resData.listHistory;
        if(listHistory.length === 0) document.getElementById('show-more').style.display = 'none';
        for(let i = listHistory.length-1; i >= 0; i--){
          that.state.total ++;
          dispatch(add_more_history(listHistory[i]));
        }
        return that.setState({...that.state,loading: false});
      }
    })
  }
  componentWillReceiveProps(nextProps){
    this.setState({...this.state, listHistory : nextProps.listHistory});
  }
  render(){
    let that = this;
    var countPost = this.state.listHistory.length;
    if(this.state.loading) return(
        <div className="col-md-7 static">
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <div id="" className="block-title">
          <h4 className="grey">
            <i className="icon ion-android-checkmark-circle"></i>
            {that.props.user.name} activity
          </h4>
          <ReactPlaceholder ready={false} type="media" rows={7} showLoadingAnimation={true}>
            <h3></h3>
          </ReactPlaceholder>
        </div>
      </div>
    )
    else if(this.state.listHistory.length === 0)
      return(
      <div className="col-md-7 static">
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <div id="" className="block-title">
          <h4 className="grey">
            <i className="icon ion-android-checkmark-circle"></i>
            {that.props.user.name} activity
          </h4>
          <h3>Nothing to show!!!</h3>
        </div>
      </div>
    )
    else
    return(
      <div className="col-md-7 static edit-profile-container">
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <div className="block-title">
          <h4 className="grey">
            <i className="icon ion-android-checkmark-circle"></i>
            {that.props.user.name} activity
          </h4>
          <hr />
        </div>
        {this.state.listHistory.map(function(i,index){
          if(index === countPost-1)
          return (
            <div key={index}>

              <HistoryUser key={index} data={i} />

              <input id="show-more" type="button" className="show-more btn btn-success" defaultValue="Show more" onClick={that.getMoreHistory} />
            </div>
          )
          else return(
            <HistoryUser key={index} data={i} />
          )
        })
        }
        <div className="history-temp"></div>
      </div>
    )
  }
}
module.exports = (connect( function(state){
  return {user: state.userReducer.user, listHistory:state.historyReducer.listHistory};
})(ListHistoryUser));
