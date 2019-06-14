<template>
  <div id="app">
    <v-navbar></v-navbar>
    <router-view/>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Footer from "@/shared/footer.vue";
import NavBar from "@/shared/navbar.vue";

export default {
  components: {
    "v-footer": Footer,
    "v-navbar": NavBar
  }
};
</script>

<style>
.main-section {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
