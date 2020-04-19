<template>
  <div>
    <AdminHeader></AdminHeader>
    <div style="margin:20px 0;"></div>
    <router-view></router-view>
    <AdminFooter></AdminFooter>
  </div>
</template>

<script>
import AdminHeader from "./common/AdminHeader.vue";
import AdminFooter from "./common/AdminFooter.vue";
export default {
  components: {
    AdminHeader: AdminHeader,
    AdminFooter: AdminFooter
  }
};
</script>