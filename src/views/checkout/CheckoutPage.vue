<script setup>
  import store from "@/store/index.js";
  import {onMounted, ref} from "vue";
  import {formatDate} from "../../utility/functions.js";
  import router from "@/router/index.js";

  const rentalDetails = ref(null)
  const showError = ref(false)

  const getRentalDetails = ()=>{
    let authData = JSON.parse(localStorage.getItem("authData"))

    if (!store.state?.carToRent || !store.state?.carToRent?.carObject || !store.state?.carToRent?.dateRange){
      console.log('defult')
      router.push({name: 'cars'})
    }else {
      console.log(store.state?.carToRent, 'failed')
      if (JSON.parse(localStorage.getItem("authData"))?.user){
        store.dispatch('postData', {data: {
            customer: authData.user?.id,
            car:store.state?.carToRent?.carObject?.id,
            rental_date:store.state?.carToRent?.dateRange?.[0] || null,
            return_date:store.state?.carToRent?.dateRange?.[1] || null
          }, url:'rentals'})
            .then((response)=>{
              rentalDetails.value = response.data
              showError.value = false
            }).catch((err)=>{
              showError.value = true
        })
      }else {
        router.push({name:'login'})
      }

    }

  }

  onMounted(()=>{
    getRentalDetails()
  })
</script>

<template>
  <div class="h-full flex flex-col items-center justify-start gap-8">
    <div class="w-full flex flex-col items-center justify-center gap-6">
      <img class=" h-auto w-full md:w-[30%]" alt="bugatti" src="/bg1.png">
    </div>

    <el-empty v-if="showError || rentalDetails === null"/>

    <div v-else
        class="flex flex-col md:grid md:grid-cols-2 w-full items-start justify-between gap-4 h-fit">
      <div class="flex flex-col items-center gap-2 border p-4 rounded-lg">
        <span class="font-bold text-2xl text-gray-500">Rent Cost</span>
        <span>KES {{rentalDetails?.total_cost}}</span>
      </div>

      <div class="flex flex-col items-center gap-2 border p-4 rounded-lg">
        <span class="font-bold text-2xl text-gray-500">Rent Period</span>
        <span class="flex gap-2">
          <span class="font-bold">{{ formatDate(rentalDetails?.rental_date) }} </span>
          To
          <span class="font-bold">{{ formatDate(rentalDetails?.return_date) }}</span>
        </span>
      </div>
    </div>

    <div v-if="rentalDetails !== null || !showError " class="flex flex-col items-center gap-2 w-full md:w-1/2">
      <span class="font-bold text-3xl text-blue-500">Payment Details</span>
      <span class="font-bold">Method : Mpesa</span>
      <el-input-number style="width: 100%;" size="large" placeholder="amount"></el-input-number>
      <el-input size="large" placeholder="mpesa reference number"></el-input>
      <el-button class="w-full" type="primary" size="large" round>Complete Payment</el-button>
    </div>

  </div>

</template>

<style scoped>

</style>