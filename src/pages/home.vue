<template>
  <view>
    <view class="title">第{{ index }}层</view>
    <image class="img" @click="clickImg" :src="image"></image>
    <!-- <view class="prompt">(点击图片可查看大图)</view> -->
    <view class="prompt">提示：四字成语。</view>
    <view class="answerList">
      <view v-for="item in answerNumber" class="answer">{{ answerList[item - 1] }}</view>
      <view class="del" @click="clickDelete">
        <img class="delIcon" src="../static/del.png" alt="" />
      </view>
    </view>

    <view class="promptList">
      <view class="text" v-for="item in randomChar" @click="clickText(item)">
        {{ item }}
      </view>
    </view>

    <button open-type="share" @onShareAppMessage="share" class="shareBtn">
      分享跳过 ({{ lives }}/3)
    </button>

    <view v-show="showRetro" class="retro-box">
      <view class="title">挑战失败！</view>
      <view class="text">分享可复活并跳过此关。</view>
      <button @click="close" class="btn">跳过（1 张万能卡）</button>
      <button @click="close" class="btn">重答（1 张万能卡）</button>

      <button open-type="share" @onShareAppMessage="share" class="btn">
        分享给朋友 ({{ lives }}/3)
      </button>
      <button @click="close" class="btn">结束挑战</button>
      <view v-show="index != 1" class="text"
        >您已登上天梯榜，记得去“我的”设置头像和昵称哦～</view
      >
    </view>
  </view>
</template>

<script setup>
import cloud from "../api/cloud";
import { ref } from "vue";
import { onShareAppMessage , onShareTimeline } from "@dcloudio/uni-app";
// ========================================data========================================
onShareTimeline(() => {
	return {
	  title: '我已经冲到大气层了，你呢？',
    path: '/pages/index'
	}
})

const url = "https://qt1rpp-image.oss.laf.run/"; // 图片地址

const gameId = ref(""); // 当前对局 id
const image = ref(""); // 当前图片地址
const index = ref(1); // 当前关卡
const answerNumber = ref(4); // 答案字数
const answerList = ref([]); // 答案
const showRetro = ref(false); // 是否显示复活弹窗
const lives = ref(0); // 复活次数
const randomChar = ref(null); // 随机字符 包含答案

// ========================================created========================================
onShareAppMessage(async () => {
  if (lives.value <= 0) return;

  setTimeout(async () => {
    await cloud.invoke("share", { id: gameId.value });
    getImage();
    getLives();
    index.value++;
    answer.value = [];
    showRetro.value = false;
  }, 1000);

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
    getLives();
  }
}

// 获取图片
async function getImage() {
  const res = await cloud.invoke("get-image-url", { id: gameId.value });

  if (res.ok) {
    image.value = res.url;
    image.value = url + image.value;
    randomChar.value = res.randomChar.split("");
  }
}

async function getLives() {
  const res = await cloud.invoke("get-lives", { id: gameId.value });
  lives.value = res.lives;
}

function clickText(text) {
  if (answerList.value.length >= answerNumber.value) return;
  answerList.value.push(text);
  if (answerList.value.length == answerNumber.value) {
    const answer = answerList.value.join("");
    submit(answer);
  }
}

function clickDelete() {
  answerList.value.pop();
}

async function submit(answer) {
  const res = await cloud.invoke("submit-answer", {
    id: gameId.value,
    answer: answer,
  });

  if (res.ok) {
    uni.showToast({
      title: "回答正确",
      icon: "success",
      duration: 1000,
    });

    setTimeout(() => {
      index.value++;
      answerList.value = [];
      getImage();
    }, 1000);
  } else {
    uni.showToast({
      title: "回答错误",
      icon: "error",
      duration: 500,
    });
  }
}

function close() {
  uni.navigateBack();
}

function clickImg() {
  uni.previewImage({
    urls: [image.value], //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
  });
}
</script>

<style lang="less">
.title {
  width: 100%;
  height: 100rpx;
  text-align: center;
  line-height: 100rpx;
  font-size: 30px;
}

.img {
  width: 500rpx;
  height: 500rpx;
  margin: 50rpx 0 0 130rpx;
}
.prompt {
  width: 100%;
  text-align: center;
}
.answerList {
  display: flex;
  margin: 50rpx 0 0 0;
  padding: 0 100rpx;
  justify-content: space-around;
  .answer {
    text-align: center;
    line-height: 100rpx;
    width: 100rpx;
    height: 100rpx;
    border: 1px solid #ccc;
  }
}
.promptList {
  display: flex;
  flex-wrap: wrap;
  width: 680rpx;
  margin: 50rpx 0 50rpx 0;
  padding: 0 40rpx;
  justify-content: space-around;
  .text {
    margin: 10rpx;
    width: 80rpx;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    border: 1px solid #ccc;
  }
}

.shareBtn {
  width: 300rpx;
  height: 100rpx;
  line-height: 100rpx;
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

.del {
  margin-top: 6rpx;
  width: 80rpx;
  height: 80rpx;
  text-align: center;
  line-height: 70rpx;
  border-radius: 20rpx;
}
.delIcon {
  margin-top: 10rpx;
  width: 60rpx;
  height: 60rpx;
}
</style>
