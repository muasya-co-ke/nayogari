<template>
  <div class="card-container" @mousemove="handleMouseMove" @mouseleave="resetRotation">
    <div class="card" :style="cardStyle">
      <div class="image-container">
        <img :src="imageSrc" alt="3D Card Image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      rotationX: 0,
      rotationY: 0,
    };
  },
  computed: {
    cardStyle() {
      return {
        transform: `rotateY(${this.rotationY}deg) rotateX(${this.rotationX}deg)`,
      };
    },
  },
  methods: {
    handleMouseMove(event) {
      const xAxis = (window.innerWidth / 2 - event.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - event.pageY) / 25;
      this.rotationY = xAxis;
      this.rotationX = yAxis;
    },
    resetRotation() {
      this.rotationY = 0;
      this.rotationX = 0;
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.card-container {
  perspective: 1000px; /* Adding 3D perspective */
}

.card {
  width: 300px;
  height: 400px;
  border-radius: 15px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.1s ease;
  transform-style: preserve-3d; /* Enables 3D transformations */
  overflow: hidden;
}

.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translateZ(20px); /* Give the image a 3D depth effect */
}
</style>

