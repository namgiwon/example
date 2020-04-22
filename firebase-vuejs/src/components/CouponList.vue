<template>
  <div class="container">
    <b-table striped responsive head-variant="dark" hover :items="items" :fields="fields" small>
      <template v-slot:cell(qrCodeUrl)="data">
        <a :href="`${data.value}`">
          <i class="fas fa-qrcode" aria-hidden="true" style="color:black;"></i>
        </a>
      </template>
      <template v-slot:cell(removeCouponId)="data">
        <a @click="removeCoupon(`${data.value}`)">
          <i class="fas fa-trash-alt" aria-hidden="true"></i>
        </a>
      </template>
    </b-table>
    <Paging v-bind:propsdata="pagiingInfo" v-on:change-page="changePage"></Paging>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { store } from "../store";
import { config } from "../config";
import { api } from "../api";
import listMixins from "../listMixins.js";
import Paging from "./common/Paging.vue";

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
      pagiingInfo: {}
    };
  },
  mounted: function() {
    var _this = this;

    api
      .fetchCoupons(1)
      .then(function(res) {
        _this.pagiingInfo = res.data.extraInfo;
        localStorage.setItem(
          "messageTotalCount",
          _this.pagiingInfo.messageTotalCount
        );
        for (var i = 0; i < res.data.message.length; i++) {
          var item = res.data.message[i];
          item.removeCouponId = item.couponId;

          var pictures = JSON.parse(item.pictures);
          for (var j = 0; j < pictures.length; j++) {
            if (pictures[j].type == 2) {
              item.qrCodeUrl =
                config.restUrl + "/picture/qrcode/" + pictures[j].id;
            }
          }
        }
        _this.items = res.data.message;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    fetchData() {
      console.log("Fetch Data");
    },
    changePage(data) {
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        item.removeCouponId = item.couponId;

        var pictures = JSON.parse(item.pictures);
        for (var j = 0; j < pictures.length; j++) {
          if (pictures[j].type == 2) {
            item.qrCodeUrl =
              config.restUrl + "/picture/qrcode/" + pictures[j].id;
          }
        }
      }
      this.items = data;
    },
    removeCoupon(id) {
      if (confirm("선택한 쿠폰을 삭제하시겠읍니까?")) {
        store.dispatch("setHeader");
        var _this = this;

        api
          .removeCoupon(id)
          .then(function(res) {
            for (var i = _this.items.length - 1; i >= 0; i--) {
              if (_this.items[i].couponId == id) {
                _this.items.splice(i, 1);
              }
            }
          })
          .catch(function(error) {
            alert(error.response.data.message);
          });
      } else {
        return;
      }
    }
  },
  components: {
    Paging: Paging
  },
  mixins: [listMixins]
};
</script>
