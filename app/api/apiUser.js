function get_alldata_user(email){
  return new Promise( (resolve, reject)=>{
    io.socket.post('/user/getUser', {email:email}, function(resData, jwres){
      if(resData.error){
        reject(resData.error);
      }
      if(resData.notFound){
      }else{
        resolve(resData.user);
      }
    })
  })
}
module.exports = {get_alldata_user};