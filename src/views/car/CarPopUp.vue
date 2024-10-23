<script setup>

import BaseDialog from "@/components/base/BaseDialog.vue";
import router from "@/router/index.js";
import {useRoute} from "vue-router";
import {ref, onMounted} from "vue"
import store from "@/store/index.js";
const attemptSubmit = ()=>{
  store.state.carToRent.carObject = vehicleDetails?.value
  if (route.name === 'car'){
    store.state.rentCar = true
    router.push({name:'login'})
  }else {
    router.push({name:'checkout'})
  }

}

const route = useRoute()

const vehicleDetails = ref({})

const getVehicleById = ()=>{
  store.dispatch('fetchSingleItem', {url:'cars', id:route.params.carId})
      .then((res)=>{
        vehicleDetails.value = res.data
      })
  // if (route?.name === 'car'){
  //
  // }else {
  //   vehicleDetails.value = store.state.carToRent.carObject
  // }


}

onMounted(()=>{
  getVehicleById();
})

const dateRange = ref('')
</script>

<template>
  <BaseDialog>
    <template #title>
      <div class="flex items-center gap-2">
        <div class="h-full font-bold flex items-center text-center justify-center text-xl">Bugatti Chevron</div>
      </div>
    </template>

    <template #content>
      <div class="flex flex-col gap-4">

        <div class="w-full flex flex-col items-center justify-center gap-6">
          <img class=" h-auto w-96" :alt="vehicleDetails?.car_model" :src="vehicleDetails?.car_image">
        </div>

        <div class="flex flex-col gap-2 border-b">
          <span class="font-bold text-lg text-gray-500">About This Car</span>
          <el-tag>{{vehicleDetails?.car_number_plate}}</el-tag>
          <span v-if="vehicleDetails?.car_description !== ''">{{vehicleDetails?.car_description}}</span>
          <el-skeleton :rows="5" v-else/>
        </div>

        <div
            class="mt-4 text-orange-500"
        >To Rent This Car , Select Start and End Period</div>

        <el-date-picker
            v-model="store.state.carToRent.dateRange"
            type="daterange"
            size="large"
            clearable
            style="width: 100%"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
        />

        <el-button size="large" type="success"
                   :disabled="store.state.carToRent.dateRange ? false : true"
                   plain
                   class=""
                   round @click="attemptSubmit">Rent This Car</el-button>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>