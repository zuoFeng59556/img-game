<template>
  <view>
    <image class="img" src="../static/test.png" />
    <view class="prompt">根据图片猜成语，图片来自AI，人工挑战智能！</view>
    <uni-input class="uni-input" placeholder="请输入姓名" />
    <button class="btn" @click="goStart">开始</button>
    <button class="btn">排行榜</button>
    <button class="btn">我的</button>
  </view>
</template>

<script setup>
import { ref } from "vue";

// ========================================data========================================

// ========================================created========================================
isLogin();

login();

// ========================================methods========================================

function isLogin() {
  // uniapp 本地存储
  const user = uni.getStorageSync("user");
  if (!user) {
    uni.redirectTo({
      url: "/pages/login",
    });
  }
}

async function login() {
  const user = uni.getStorageSync("user");
  if (user) return;

  // 登录
  wx.login({
    success: (res) => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      if (res.code) {
        //发起网络请求
        wx.request({
          url: "https://qt1rpp.laf.run/wx-login",
          data: {
            code: res.code,
          },
          success(res) {
            uni.setStorageSync("access_token", res.data.access_token);
            uni.setStorageSync("user", res.data.user);
          },
        });
      } else {
        console.log("登录失败！" + res.errMsg);
      }
    },
  });
}

function goStart() {
  uni.navigateTo({
    url: "/pages/home",
  });
}
</script>

<style lang="less">
@font-face {
  font-family: "Press Start 2P";
  src: url("~@/static/PressStart2P-1.ttf") format("truetype");
}
.img {
  width: 100%;
}
.prompt {
  width: 100%;
  text-align: center;
  margin: 50rpx 0 0 0;
}
.btn {
  background-color: gray;
  color: white;
  font-size: 24px;
  font-family: "Press Start 2P", cursive;
  padding: 10px 20px;
  border: 3px solid white;
  border-radius: 5px;
  text-transform: uppercase;
}
</style>
