<template>
  <div class="container">
    {{firebaseToken}}
    <b-table striped responsive head-variant="dark" hover :items="items" :fields="fields" small>
      <template v-slot:cell(qrCodeUrl)="data">
        <a :href="`${data.value}`">
          <i class="fas fa-qrcode" aria-hidden="true"></i>
        </a>
      </template>
      <template v-slot:cell(removeCouponId)="data">
        <a @click="removeCoupon(`${data.value}`)">
          <i class="fas fa-trash-alt" aria-hidden="true"></i>
        </a>
      </template>
    </b-table>

    <!-- 모달 -->
    <Modal v-if="showModal" @close="showModal = false">
      <h5 slot="header">요청 실패</h5>
      <span slot="footer" @click="showModal = false">
        {{ msg }}
        <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </span>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { config } from "../config";
import Modal from "./common/Modal.vue";
import { store } from "../store";
import { firebaseUtil } from "../firebase";

export default {
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "이름",
          sortable: true
        },
        {
          key: "price",
          label: "가격",
          sortable: true
        },
        {
          key: "neededCoins",
          label: "필요 코인",
          sortable: true
        },
        {
          key: "storeName",
          label: "가맹점 이름",
          sortable: true
        },
        {
          key: "qrCodeUrl",
          label: "QR 코드",
          sortable: false
        },
        {
          key: "removeCouponId",
          label: "삭제",
          sortable: false
        }
      ],
      items: [],
      showModal: false,
      msg: ""
    };
  },
  created: function() {
    var params = {
      page: 1,
      isFirstPage: true,
      searchParam: ""
    };

    // 파이어베이스 토큰이 만료되었을 경우 요청이 실패함. 401 에러 발생할 경우 토큰을 교체하고 다시 요청을 해야 되는데
    // 모든 요청에서 그렇게 구현하기가 힘듦. 그래서 http 요청 전에 항상 새로운 토큰을 받아와야 함...
    store.dispatch("setHeader");
    var _this = this;
    this.$http
      .get(config.getRestUrlBase() + "/coupon/summary/admin", {
        params
      })
      .then(function(res) {
        _this.items = res.data.message;
        for (var i = 0; i < _this.items.length; i++) {
          var item = _this.items[i];
          item.removeCouponId = item.couponId;

          var pictures = JSON.parse(item.pictures);
          for (var j = 0; j < pictures.length; j++) {
            if (pictures[j].type == 2) {
              item.qrCodeUrl =
                config.getRestUrlBase() + "/picture/qrcode/" + pictures[j].id;
            }
          }
        }
      })
      .catch(function(error) {
        if (error.response.status == 401) {
          _this.msg = "토큰이 만료되었습니다.";
          _this.showModal = !_this.showModal;
        }
      });
  },
  methods: {
    removeCoupon(id) {
      store.dispatch("setHeader");
      this.$http
        .delete(config.getRestUrlBase() + "/coupon/" + id)
        .then(function(res) {
          alert("오란요");
        });
    }
  },
  computed: {
    ...mapGetters({
      firebaseToken: "getFirebaseToken"
    })
  },
  components: {
    Modal: Modal
  }
};
</script>
