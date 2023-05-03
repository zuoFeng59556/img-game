<template>
  <view>
    <view class="slideshow">
      <image class="titleimg" src="../static/test1.gif" />
    </view>
    <view class="prompt">根据图片猜成语，图片来自 AI，人工挑战智能！</view>

    <view class="btn" @click="goStart">
      <view class="item">
        <image class="img" src="../static/go.png" />
        <view class="name"> 开始 </view>
      </view>
    </view>

    <view @click="goRakings" class="btn">
      <view class="item">
        <image class="img" src="../static/phb.png" />
        <view class="name"> 天梯榜 </view>
      </view>
    </view>

    <view class="btn" @click="goMy">
      <view class="item">
        <image class="img" src="../static/mine.png" />
        <view class="name"> 我的 </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onShareTimeline } from '@dcloudio/uni-app'
import { ref } from "vue";

// ========================================data========================================

// ========================================created========================================

onShareTimeline(() => {
	return {
	  title: '我已经冲到大气层了，你呢？',
    path: '/pages/index'
	}
})

// ========================================methods========================================

function goStart() {
  uni.navigateTo({
    url: "/pages/home",
  });
}

function goRakings() {
  uni.navigateTo({
    url: "/pages/rankings",
  });
}

function goMy() {
  uni.navigateTo({
    url: "/pages/my",
  });
}
</script>

<style lang="less">
page {
  background-image: linear-gradient(#fff, #fff, #e6dede);
}

.slideshow {
  width: 200rpx;
  height: 200rpx;
  margin: auto;
  margin-top: 80rpx;
  .titleimg {
    border-radius: 30rpx;
    width: 200rpx;
    height: 200rpx;
  }
}

.prompt {
  margin-top: 50rpx;
  width: 100%;
  height: 80rpx;
  text-align: center;
  font-size: 30rpx;
  color: #808080;
  margin-bottom: 80rpx;
  line-height: 80rpx;
}
.btn {
  margin: auto;

  width: 680rpx;
  margin-top: 30rpx;
  display: flex;
  background-color: #eee;
  color: #000;
  font-size: 36rpx;
  padding: 10rpx 20rpx;
  border: 3rpx solid #000;
  border-radius: 15rpx;
  line-height: 80rpx;
  font-weight: 700;
  .item {
    display: flex;
    margin: auto;
    .img {
      margin-right: 30rpx;
      width: 80rpx;
      height: 80rpx;
    }
  }
}
</style>
