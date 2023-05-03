<script>
import cloud from "./api/cloud.js";

export default {
  onLaunch: function () {
    console.log('App Launch')
    async function login(){
      const user = uni.getStorageSync("user");
      if (user) return;
      // 登录
      wx.login({
        success: (res) => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            //发起网络请求
            cloud.invoke(`wx-login/?code=${res.code}`).then(res=>{
              console.log('login')
              uni.setStorageSync("access_token", res.access_token);
              uni.setStorageSync("user", res.user);
            }).catch(err=>{
              console.log("登录失败！" ,err)
            })
          } else {
            console.log("登录失败！" , res.errMsg);
          }
        },
      });
    }
    login();
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }



  

}
</script>

<style>
/*每个页面公共 css */
</style>
