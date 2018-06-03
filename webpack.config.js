var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

module.exports = {
  entry: "./app/index.js", // string | object | array
  // Here the application starts executing
  // and webpack starts bundling
  output: {
    filename:"./assets/js/bundle.js",
    path:__dirname
  },

  resolve:{
    modules:[__dirname,'node_modules'],
    extensions: ['*','.jsx','.js','.json'],
    alias:{
      // reducer
      store : 'app/store.js',
      reducer : 'app/reducer/reducer.js',

      testReducer : 'app/reducer/test.js',
      userReducer : 'app/reducer/userReducer.js',
      followReducer : 'app/reducer/followReducer.js',
      postReducer : 'app/reducer/postReducer.js',
      historyReducer : 'app/reducer/historyReducer.js',
      chatReducer : 'app/reducer/chatReducer.js',
      // action
      testAction : 'app/action/test.js',
      followAction : 'app/action/followAction.js',
      userAction : 'app/action/userAction.js',
      postAction : 'app/action/postAction.js',
      historyAction : 'app/action/historyAction.js',
      chatAction : 'app/action/chatAction.js',
      // api
      apiUser: 'app/api/apiUser.js',

      //Components
      AppTest : 'components/App.js',
      Test : 'app/components/Test.js',
      App : 'app/components/App.js',
      Notfound: 'app/components/Notfound.js',
          // PostInfo
          PostInfo: 'app/components/PostInfo/PostInfo.js',
          PostWeek: 'app/components/PostInfo/PostWeek.js',
          // Find User
          FindUser: 'app/components/FindUser/FindUser.js',
          FindPost: 'app/components/FindUser/components/FindPost.js',
          // FindUser: 'app/components/FindUser/FindUser.js',
          //Feedback
          Feedback : 'app/components/Feedback/Feedback.js',
          FeedbackItem : 'app/components/Feedback/FeedbackItem.js',
          // Notification
          Notification : 'app/components/Notification/Notification.js',
          NotificationItem : 'app/components/Notification/NotificationItem.js',
          // Popup
          PopupUser : 'app/components/Popup/PopupUser.js',
          PopupChangePicture : 'app/components/Popup/PopupChangePicture.js',
          PopupAddPet : 'app/components/Popup/PopupAddPet.js',
          PopupFeedback : 'app/components/Popup/PopupFeedback.js',
          // utilities
          InputComponent : 'app/components/Utilities/InputComponent.js',
          validateInfoUser:'app/components/Utilities/validateInfoUser.js',
          authenticated:'app/components/Utilities/authenticated.js',
          //  Layout
          Layout: 'app/components/Layout/Layout.js',
          Menu: 'app/components/Layout/Menu.js',
          Search: 'app/components/Layout/Search.js',
          Footer: 'app/components/Layout/Footer.js',
          Header: 'app/components/Layout/Header.js',
          // Homepage
          Home:'app/components/Homepage/Home.js',
          Homepage:'app/components/Homepage/Homepage.js',
          Login:'app/components/Homepage/Login.js',
          FormLoginReg :'app/components/Homepage/FormLoginReg.js',
          FormLogin:'app/components/Homepage/FormLogin.js',
          FormReg: 'app/components/Homepage/FormReg.js',
          Notify: 'app/components/Homepage/Notify.js',
          IndexHome: 'app/components/Homepage/IndexHome.js',
          //MenuLeft
          MenuLeft:'app/components/MenuLeft/MenuLeft.js',
          ChatList:'app/components/MenuLeft/components/ChatList.js',
          MenuVertical:'app/components/MenuLeft/components/MenuVertical.js',
          //Newsfeed
          Newsfeed:'app/components/Newsfeed/Newsfeed.js',
          NewsfeedContent:'app/components/Newsfeed/components/NewsfeedContent.js',
          NewsfeedContent2:'app/components/Newsfeed/components/NewsfeedContent2.js',
          Comment:'app/components/Newsfeed/components/Comment.js',
          Post:'app/components/Newsfeed/components/Post.js',
          //ChatRoom
          ChatRoom : 'app/components/ChatRoom/ChatRoom.js',
          InboxList : 'app/components/ChatRoom/components/InboxList.js',
          Inbox : 'app/components/ChatRoom/components/Inbox.js',
          SearchInbox : 'app/components/ChatRoom/components/SearchInbox.js',
          ListMessage : 'app/components/ChatRoom/components/ListMessage.js',
          Message : 'app/components/ChatRoom/components/Message.js',
          //Profile
          ChangePass: 'app/components/Profile/components/ChangePass.js',
          IndexContent :'app/components/Profile/IndexContent.js',
          Profile : 'app/components/Profile/Profile.js',
          Information: 'app/components/Profile/components/Information.js',
          ListHistoryUser: 'app/components/Profile/components/ListHistoryUser.js',
          HistoryUser: 'app/components/Profile/components/HistoryUser.js',
          BasicInformation: 'app/components/Profile/components/BasicInformation.js',
          Timeline: 'app/components/Profile/components/Timeline.js',
          TimelineContent :'app/components/Profile/components/TimelineContent.js',
          ListFollowers:'app/components/Profile/components/ListFollowers.js',
          Follower: 'app/components/Profile/components/Follower.js',
          ListFollowings:'app/components/Profile/components/ListFollowings.js',
          Following: 'app/components/Profile/components/Following.js',
          Pet: 'app/components/Profile/components/Pet.js',
          ListPet: 'app/components/Profile/components/ListPet.js',
          // User
          User : 'app/components/User/User.js',
          UserManagement : 'app/components/User/UserManagement.js',
          UserManagementItem : 'app/components/User/UserManagementItem.js',
          IndexUser : 'app/components/User/IndexUser.js',
          // RecommendFollow
          IndexListRecommend : 'app/components/RecommendFollow/IndexListRecommend.js',
          ListRecommendRank : 'app/components/RecommendFollow/ListRecommendRank.js',
          ListRecommendCommon : 'app/components/RecommendFollow/ListRecommendCommon.js',
          RecommendFollow : 'app/components/RecommendFollow/components/RecommendFollow.js',

    }
  },
  node: {
    console: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    console:true
  },
  module:{
    loaders:[
      {
        loader:'babel-loader',
        query:{
          presets:['react','es2015','stage-0']
        },
        test:/\.jsx?$/,    //file nao xu dung trong goi bundel
        exclude:/node_modules/ //ngoai tru khog su dung
      }
    ]
  }
};
