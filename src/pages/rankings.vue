<template>

    <view class="page">
      <view class="title">天梯榜</view>
      <view class="champion">
        <view class="left">
          <image class="img" src="../static/one.png" />
        </view>

        <view class="center">
          <image class="img" src="../static/test.png" />
          <view class="name">这是我的名字</view>
        </view>

        <view class="right"> 通关200层 </view>
      </view>

      <view class="runnerUp">
        <view class="left">
          <image class="img" src="../static/two.png" />
        </view>

        <view class="center">
          <image class="img" src="../static/test.png" />
          <view class="name">这是我的名字</view>
        </view>

        <view class="right"> 通关200层 </view>
      </view>


      <view class="third">
        <view class="left">
          <image class="img" src="../static/three.png" />
        </view>

        <view class="center">
          <image class="img" src="../static/test.png" />
          <view class="name">这是我的名字</view>
        </view>

        <view class="right"> 通关200层 </view>
      </view>



      <view v-for="(item,index) in 5" :key="index" class="item">
        <view class="left">
        <view class="img">4</view>
        </view>

        <view class="center">
          <image class="img" src="../static/test.png" />
          <view class="name">这是我的名字</view>
        </view>

        <view class="right"> 通关200层 </view>
      </view>




    </view>

</template>

<script setup>
import { reactive, toRefs } from "vue";
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
    .right{
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
    .right{
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
    .right{
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
    .right{
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
