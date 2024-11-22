<script setup>

import BaseDialog from "@/components/base/BaseDialog.vue";
import router from "@/router/index.js";
import {useRoute} from "vue-router";
import {ref, onMounted} from "vue"
import store from "@/store/index.js";
const attemptSubmit = ()=>{
  store.state.carToRent.carObject = vehicleDetails?.value
  const authData = JSON.parse(localStorage.getItem("authData"));
  console.log('in function')
  if (authData?.user) {
    console.log('with user')
    store.dispatch('postData', {url:'rentals', data: {
        car: vehicleDetails?.value?.id,
        rental_date: store.state.carToRent.startDate,
        return_date: store.state.carToRent.endDate,
        customer: authData?.user?.id
      }})
        .then((response)=>{
          router.push({name:'checkout',params:{id:response?.data?.id}})
        })
  }else {
    console.log('no user')
    localStorage.setItem("rentalDetails", JSON.stringify( {
      car: vehicleDetails?.value?.id,
      rental_date: store.state.carToRent.startDate,
      return_date: store.state.carToRent.endDate,
      customer: authData?.user?.id
    }));
    router.push({name:'login'})

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

const disabledDate = (time) => {
  return time.getTime() < Date.now();
};

onMounted(()=>{
  getVehicleById();
})

const dateRange = ref('')
</script>

<template>
  <BaseDialog>
    <template #title>
      <div class="flex items-center gap-2">
        <div v-if="vehicleDetails?.car_make" class="h-full font-bold flex items-center text-center justify-center text-xl">
          {{vehicleDetails?.car_make}} ,
          {{vehicleDetails?.car_model}}
        </div>
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

        {{store.state.carToRent.dateRange}}
        <div class="flex flex-wrap gap-2">
          <el-date-picker
              v-model="store.state.carToRent.startDate"
              type="datetime"
              size="large"
              clearable
              placeholder="Start date"
              :disabled-date="disabledDate"
          />
          <el-date-picker
              v-model="store.state.carToRent.endDate"
              type="datetime"
              placeholder="End date"
              size="large"
              clearable
              :disabled-date="disabledDate"
          />
        </div>

        <el-button size="large" type="primary"
                   :disabled="(!(store.state.carToRent.startDate && store.state.carToRent.endDate))"
                   plain
                   class=""
                   @click="attemptSubmit">
          Rent This Car
        </el-button>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>