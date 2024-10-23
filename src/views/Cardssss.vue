<template>
  <div id="app">
    <RotatingCard imageSrc="/bg4.jpg" />
  </div>
</template>

<script>
import RotatingCard from '@/components/RotatingCard.vue';

export default {
  components: {
    RotatingCard,
  },
};
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}
</style>
