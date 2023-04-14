<template>
  <view>
    <view class="title">第{{ index }}层</view>
    <image class="img" :src="image"></image>
    <view class="prompt">提示：四字成语</view>
    <input class="uni-input" v-model="answer" placeholder="输入答案" />
    <button class="btn" @click="submit" type="default">提交</button>

    <view v-show="showRetro" class="retro-box">
      <view class="title">挑战失败！</view>
      <view class="text">分享可复活并跳过此关。</view>
      <button open-type="share" @onShareAppMessage="share" class="btn">
        分享给朋友({{ lives }}/3)
      </button>
      <button @click="close" class="btn">结束挑战</button>
    </view>
  </view>
</template>

<script setup>
import cloud from "../api/cloud";
import { ref } from "vue";
import { onShareAppMessage } from "@dcloudio/uni-app";
// ========================================data========================================

const url = "https://qt1rpp-image.oss.laf.run/"; // 图片地址

const gameId = ref(""); // 当前对局id
const image = ref(""); // 当前图片地址
const index = ref(1); // 当前关卡
const answer = ref(""); // 答案
const showRetro = ref(false); // 是否显示复活弹窗
const lives = ref(0); // 复活次数

// ========================================created========================================
onShareAppMessage(async () => {
  if (lives.value <= 0) return;

  await cloud.invoke("share", { id: gameId.value });
  getImage();

  index.value++;
  answer.value = "";
  showRetro.value = false;

  return {
    title: "这波啊，这波我差点到大气层了，快来帮我复活吧！",
    path: "/pages/index",
  };
});
createGame();
// ========================================methods========================================

// 创建对局
async function createGame() {
  const res = await cloud.invoke("create-game");

  if (res.ok) {
    gameId.value = res.id;
    getImage();
  }
}

// 获取图片
async function getImage() {
  const res = await cloud.invoke("get-image-url", { id: gameId.value });

  if (res.ok) {
    image.value = res.url;
    image.value = url + image.value;
    console.log(image.value);
  }
}

async function submit() {
  const res = await cloud.invoke("submit-answer", {
    id: gameId.value,
    answer: answer.value,
  });

  if (res.ok) {
    index.value++;
    answer.value = "";

    uni.showToast({
      title: "回答正确",
      icon: "success",
      duration: 2000,
    });

    getImage();
  } else {
    showRetro.value = true;

    const r = await cloud.invoke("get-lives", { id: gameId.value });
    lives.value = r.lives;
  }
}

function close() {
  uni.navigateBack();
}
</script>

<style lang="less">
@font-face {
  font-family: "Press Start 2P";
  src: url("~@/static/PressStart2P-1.ttf") format("truetype");
}
.title {
  width: 100%;
  height: 100rpx;
  text-align: center;
  line-height: 100rpx;
  font-size: 30px;
}
.img {
  width: 80%;
  margin: 50rpx 0 0 10%;
}
.prompt {
  width: 100%;
  text-align: center;
}
.uni-input {
  box-sizing: border-box;
  width: 80%;
  height: 100rpx;
  margin: 50rpx 0 0 10%;
  border: 1px solid #000;
  border-radius: 10rpx;
  padding: 0 20rpx;
}
.btn {
  width: 80%;
  margin: 50rpx 0 0 10%;
  background-color: gray;
  color: white;
  font-size: 24px;
  font-family: "Press Start 2P", cursive;
  padding: 10px 20px;
  border: 3px solid white;
  border-radius: 5px;
  text-transform: uppercase;
}
.bottom {
  display: flex;
  margin: 100rpx 0 0 0;
  .list {
    width: 30%;
    margin: 0 10% 0 10%;
    height: 100rpx;
    line-height: 100rpx;
  }
  .my {
    width: 30%;
    height: 100rpx;
    margin: 0 0 0 10%;
    line-height: 100rpx;
  }
}
.retro-box {
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  transform: translate(-50%, -50%);
  background-color: gray;
  font-family: "Press Start 2P", cursive;

  color: #ffffff;
  padding: 40rpx;
  border-radius: 20rpx;
  box-shadow: 0px 0px 20rpx rgba(255, 255, 255, 0.3);
  .title {
    font-size: 64rpx;
    text-align: center;
  }

  .text {
    margin: 20rpx 0 0 0;
    font-size: 40rpx;
    text-align: center;
  }

  .btn {
    margin-top: 60rpx;
    font-size: 48rpx;
    background-color: #ffffff;
    color: #000000;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
  }
}
</style>
