<template>
  <view class="page">
    <view class="title">天梯榜</view>
    <view v-for="(item, index) in userList" :key="index">
      <view class="champion" v-if="index === 0">
        <view class="left">
          <image class="img" src="../static/one.png" />
        </view>

        <view class="center">
          <image class="img" :src="url + item.avatar" />
          <view class="name">{{ item.username }}</view>
        </view>

        <view class="right"> 通关{{ item.score }}层 </view>
      </view>

      <view class="runnerUp" v-if="index === 1">
        <view class="left">
          <image class="img" src="../static/two.png" />
        </view>

        <view class="center">
          <image class="img" :src="url + item.avatar" />
          <view class="name">{{ item.username }}</view>
        </view>

        <view class="right"> 通关{{ item.score }}层 </view>
      </view>

      <view class="third" v-if="index === 2">
        <view class="left">
          <image class="img" src="../static/three.png" />
        </view>

        <view class="center">
          <image class="img" :src="url + item.avatar" />
          <view class="name">{{ item.username }}</view>
        </view>

        <view class="right"> 通关{{ item.score }}层 </view>
      </view>

      <view class="item" v-if="index > 3">
        <view class="left">
          <view class="img">{{ index }}</view>
        </view>

        <view class="center">
          <image class="img" :src="url + item.avatar" />
          <view class="name">{{ item.username }}</view>
        </view>

        <view class="right"> 通关{{ item.score }}层 </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

import cloud from "../api/cloud";

const url = "https://qt1rpp-avatar.oss.laf.run/"; // 图片地址
const userList = ref([]);

getList();

async function getList() {
  const res = await cloud.invoke("get-ranking-list");
  if (res.ok) {
    userList.value = res.data;
  }
}
</script>

<style lang="less">
.page {
  .title {
    text-align: center;
    font-size: 38rpx;
    font-weight: 700;
    letter-spacing: 5rpx;
  }
  .champion {
    display: flex;
    width: 680rpx;
    height: 70rpx;
    padding: 20rpx;
    margin: auto;
    margin-top: 20rpx;
    border: 4rpx solid #000;
    border-radius: 80rpx 0 0 80rpx;
    background-image: linear-gradient(to right, #fff, #fed530);
    .left {
      width: 160rpx;
      .img {
        margin-left: 20rpx;
        width: 80rpx;
        height: 80rpx;
      }
    }
    .center {
      display: flex;
      line-height: 80rpx;
      .img {
        width: 80rpx;
        height: 80rpx;
        border-radius: 80rpx;
      }
      .name {
        width: 280rpx;
        margin-left: 10rpx;
        font-size: 26rpx;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .right {
      margin: auto;
      width: 200rpx;
      height: 58rpx;
      line-height: 58rpx;
      font-size: 26rpx;
      background-color: #000;
      color: #fff;
      text-align: center;
      border-radius: 15rpx;
    }
  }

  .runnerUp {
    display: flex;
    width: 680rpx;
    height: 70rpx;
    padding: 20rpx;
    margin: auto;
    margin-top: 20rpx;
    border: 4rpx solid #000;
    border-radius: 80rpx 0 0 80rpx;
    background-image: linear-gradient(to right, #fff, #e8e8e8);
    .left {
      width: 160rpx;
      .img {
        margin-left: 20rpx;
        width: 80rpx;
        height: 80rpx;
      }
    }
    .center {
      display: flex;
      line-height: 80rpx;
      .img {
        width: 80rpx;
        height: 80rpx;
        border-radius: 80rpx;
      }
      .name {
        width: 280rpx;
        margin-left: 10rpx;
        font-size: 26rpx;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .right {
      margin: auto;
      width: 200rpx;
      height: 58rpx;
      line-height: 58rpx;
      font-size: 26rpx;
      background-color: #000;
      color: #fff;
      text-align: center;
      border-radius: 15rpx;
    }
  }

  .third {
    display: flex;
    width: 680rpx;
    height: 70rpx;
    padding: 20rpx;
    margin: auto;
    margin-top: 20rpx;
    border: 4rpx solid #000;
    border-radius: 80rpx 0 0 80rpx;
    background-image: linear-gradient(to right, #fff, #ca9561);
    .left {
      width: 160rpx;
      .img {
        margin-left: 20rpx;
        width: 80rpx;
        height: 80rpx;
      }
    }
    .center {
      display: flex;
      line-height: 80rpx;
      .img {
        width: 80rpx;
        height: 80rpx;
        border-radius: 80rpx;
      }
      .name {
        width: 280rpx;
        margin-left: 10rpx;
        font-size: 26rpx;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .right {
      margin: auto;
      width: 200rpx;
      height: 58rpx;
      line-height: 58rpx;
      font-size: 26rpx;
      background-color: #000;
      color: #fff;
      text-align: center;
      border-radius: 15rpx;
    }
  }

  .item {
    display: flex;
    width: 680rpx;
    height: 70rpx;
    padding: 20rpx;
    margin: auto;
    margin-top: 20rpx;
    border: 4rpx solid #000;
    border-radius: 80rpx 0 0 80rpx;
    background-image: linear-gradient(to right, #fff, #6abcf3);
    .left {
      width: 160rpx;
      .img {
        margin-left: 20rpx;
        font-size: 46rpx;
        font-weight: 700;
        text-align: center;
        line-height: 80rpx;
        width: 80rpx;
        height: 80rpx;
      }
    }
    .center {
      display: flex;
      line-height: 80rpx;
      .img {
        width: 80rpx;
        height: 80rpx;
        border-radius: 80rpx;
      }
      .name {
        width: 280rpx;
        margin-left: 10rpx;
        font-size: 26rpx;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .right {
      margin: auto;
      width: 200rpx;
      height: 58rpx;
      line-height: 58rpx;
      font-size: 26rpx;
      background-color: #000;
      color: #fff;
      text-align: center;
      border-radius: 15rpx;
    }
  }
}
</style>
