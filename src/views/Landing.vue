<script setup>

import {ArrowDown, ArrowLeft, ArrowRight} from "@element-plus/icons-vue";
import CarCard from "@/views/car/CarCard.vue";
import router from "@/router/index.js";
import store from "@/store/index.js";
import {onMounted, ref} from "vue"

const viewCar = (id)=>{
  router.push({name:'car',params:{carId:id}});
}

const vehicles = ref([])

const pageCount = ref(1)
const loadMore = ref(false)
const loadMoreCars = ()=>{
  pageCount.value += 1
  loadMore.value = true
  getVehicles()
}

const getVehicles  = ()=>{
      store.dispatch("fetchList", {url: `cars`})
        .then((res)=>{

          if (loadMore) {
            res?.data?.results.map((item)=>{
              vehicles?.value.push(item)
            })
          }else {
            vehicles.value = res?.data?.results
          }
        })
    ;
}


onMounted(()=>{
  getVehicles()
})
</script>

<template>
  <div class="flex flex-col items-center gap-6">

    <router-view/>

    <div class="h-[300px] md:h-[400px]  xl:h-[650px] flex flex-col items-start justify-center
     bg-cover bg-no-repeat bg-center bg-[url('/bg4.jpg')]
      w-full bg-blue-500 relative">

      <div class="absolute shadow top-0 md:top-2 left-1/2 transform -translate-x-1/2 w-full md:w-[90%] h-fit
       md:rounded-full bg-gray-100 py-2 px-4 flex justify-between items-center">
        <div class="font-extrabold text-xlx  text-gray-800">MACAR</div>
        <div class="flex gap-4 h-fit items-center">
          <router-link to="/">Home</router-link>

          <router-link to="/login">
            <el-button type="primary" round size="large">Get Started</el-button>
          </router-link>

        </div>
      </div>

      <div class="mt-10 md:mt-0 w-full h-full text-gray-600 flex flex-col items-center justify-center bg-white bg-opacity-80">
        <h3 class="text-4xl md:text-7xl font-extrabold text-blue-900 w-full text-center">
          Ride Easy, Pay Less
          <br/>
          &nbsp;
          Kenya’s Smoothest Car Hire
        </h3>

      </div>
    </div>


    <!--    cards-->
    <div class="flex gap-2 flex-wrap items-center justify-start px-4">
      <car-card @click="viewCar(vehicle?.id)" v-for="vehicle in vehicles" :key="vehicle?.id" :carObject="vehicle"/>
    </div>

    <!--    cards-->
<!--    <el-button type="primary" round size="large"-->
<!--               @click="loadMoreCars"-->
<!--               :icon="ArrowDown">Load More</el-button>-->

    <div class="py-4 px-16 bg-gray-100 rounded-lg flex items-center justify-center w-fit text-center hidden">
      <div class="text-4xl font-extrabold text-orange-400">Best Car Dealers / Renters in Kenya</div>
    </div>

    <div class="p-4 w-full bg-blue-500 text-white flex items-center justify-between">
      <div class="font-extrabold text-xlx">MACAR</div>
      <div>Gacheru Limited</div>
    </div>

  </div>
</template>

<style scoped>

</style>