import axios from "axios";
import { config } from "./config";
import { store } from "./store";

const api = {
  removeCoupon(id) {
    return axios.delete(config.restUrl + "/coupon/" + id);
  },
  fetchCoupons(page) {
    // 파이어베이스 토큰이 만료되었을 경우 요청이 실패함. 401 에러 발생할 경우 토큰을 교체하고 다시 요청을 해야 되는데
    // 모든 요청에서 그렇게 구현하기가 힘듦. 그래서 http 요청 전에 항상 새로운 토큰을 받아와야 함...
    store.dispatch("setHeader");

    var isFirstPage = false;
    if (page == 1) {
      isFirstPage = true;
    }

    var params = {
      page: page,
      isFirstPage: isFirstPage,
      searchParam: ""
    };

    return axios.get(config.restUrl + "/coupon/summary/admin", { params });
  }
};

export { api };
