<template>
  <view class="box">
    <view class="title"
      >最高记录
      <span style="font-size: 70rpx">{{ score }}</span>
      层！</view
    >

    <image class="avatar" :src="avatarUrl"></image>

    <button
      class="avatar-wrapper"
      open-type="chooseAvatar"
      @chooseavatar="onChooseAvatar"
    >
      修改头像
    </button>

    <input
      type="nickname"
      class="weui-input"
      @change="getNickname"
      v-model="name"
      placeholder="请输入你炫酷吊炸天的名字"
    />

    <button class="btn" @click="ok">确定</button>
  </view>
</template>

<script setup>
import { ref } from "vue";
import cloud from "../api/cloud";
import { onShareTimeline } from '@dcloudio/uni-app'

onShareTimeline(() => {
	return {
	  title: '我已经冲到大气层了，你呢？',
    path: '/pages/index'
	}
})

// ========================================data========================================
const url = "https://qt1rpp-avatar.oss.laf.run/"; // 图片地址

const name = ref("");
const avatarUrl = ref("");
const score = ref(0);
const avatarShow = ref(false);

// ========================================created========================================

getUser();

// ========================================methods========================================

async function getUser() {
  const res = await cloud.invoke("get-userInfo");
  if (res.ok) {
    name.value = res.data.username;
    avatarUrl.value = url + res.data.avatar;
    score.value = res.data.score;
  }
}

async function ok() {
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

    uni.redirectTo({
      url: "/pages/index",
    });
  }
}

function onChooseAvatar(e) {
  avatarUrl.value = e.detail.avatarUrl;

  if (avatarUrl.value) {
    avatarShow.value = true;
  }
}

function getNickname(e) {
  name.value = e.detail.value;
}
</script>

<style lang="less">
.box {
  margin: 250rpx 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    font-size: 50rpx;
  }

  .avatar-wrapper {
    margin-top: 10rpx;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 28rpx;
  }
  .avatar {
    margin-top: 30rpx;
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
  }

  .avatar-wrapper::after {
    border: none;
  }

  .weui-input {
    width: 100%;
    height: 100rpx;
    border-bottom: 1px solid #e5e5e5;
    padding: 0 20rpx;
    box-sizing: border-box;
    margin-top: 20rpx;
    font-size: 28rpx;
  }

  .btn {
    margin-top: 50rpx;
    width: 220rpx;
    height: 80rpx;
    font-size: 30rpx;
  }
}
</style>
