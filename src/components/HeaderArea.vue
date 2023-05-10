<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },
  methods: {
    redirectToHome() {
      window.location.href = '/';
    },
  }
};
</script>

<template>
  <v-app-bar :elevation="6" location="top">
    <v-app-bar-title @click="redirectToHome">
      <img :src="`/img/${icon}/Dolphin${icon}_light.png`" :alt="title" />
    </v-app-bar-title>
  </v-app-bar>
</template>

<style scoped>
img {
  max-height: 120px;
  min-height: 120px;
  width: auto;
}

.v-app-bar-title * {
  display: flex;
  align-content: center;
  justify-content: flex-start;
}
</style>
