import { Cloud } from "laf-client-sdk";

const cloud = new Cloud({
  baseUrl: "https://qt1rpp.laf.run",
  getAccessToken: () => uni.getStorageSync("access_token"),
  environment: "wxmp",
});

export default cloud;
