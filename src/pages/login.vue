<template>
  <view class="box">
    <view class="title">设置一个帅气的头像和姓名吧！</view>
    <button
      class="avatar-wrapper"
      open-type="chooseAvatar"
      @chooseavatar="onChooseAvatar"
    >
      上传头像
      <image class="avatar" :src="avatarUrl"></image>
    </button>
    <input
      type="nickname"
      class="weui-input"
      @change="getNickname"
      placeholder="请输入昵称"
    />

    <button class="btn" @click="ok">确定</button>
  </view>
</template>

<script setup>
import { ref } from "vue";
import cloud from "../api/cloud";

// ========================================data========================================

const name = ref("");
const avatarUrl = ref("");

// ========================================created========================================

login();

// ========================================methods========================================

async function ok() {
  console.log(name.value, avatarUrl.value);
  if (!name.value || !avatarUrl.value) {
    uni.showToast({
      title: "请填写完整信息",
      icon: "none",
      duration: 2000,
    });
    return;
  }

  const ret = await uni.uploadFile({
    url: "https://qt1rpp.laf.run/update-avatar",
    filePath: avatarUrl.value,
    name: "file",
  });

  const res = await cloud.invoke("set-userInfo", {
    name: name.value,
    avatar: JSON.parse(ret.data).avatarUrl,
  });

  if (res.ok) {
    uni.showToast({
      title: "设置成功",
      icon: "success",
      duration: 2000,
    });

    setTimeout(() => {
      uni.navigateTo({
        url: "/pages/index",
      });
    }, 1000);
  }
}

async function login() {
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

function onChooseAvatar(e) {
  avatarUrl.value = e.detail.avatarUrl;
}

function getNickname(e) {
  name.value = e.detail.value;
}
</script>

<style lang="less">
.box {
  margin: 300rpx 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .avatar-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    .avatar {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
    }
  }

  .avatar-wrapper::after {
    border: none;
  }

  .weui-input {
    width: 100%;
    height: 100rpx;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding: 0 20rpx;
    box-sizing: border-box;
    margin-top: 20rpx;
  }
}
</style>
