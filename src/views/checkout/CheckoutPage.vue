<script setup>
  import store from "@/store/index.js";
  import {onMounted, ref} from "vue";
  import {formatDate} from "../../utility/functions.js";
  import router from "@/router/index.js";
  import {useRoute} from "vue-router";
  import {baseUrl} from "../../utility/constants.js";

  const rentalDetails = ref(null)
  const showError = ref(false)

  const route = useRoute()

  const makePayment = ()=>{
    store.dispatch("postData", {url : 'payments', data : {
        rental: route?.params?.id,
        amount_paid : bookingDetails.value?.total_cost,
        payment_date: new Date(),
        payment_method: 'mpesa'
      }}).then((res) => {
        router.push({name:'cars'})
    })
  }

  const bookingDetails = ref({})
  const formState = ref({})

  const getRentalDetails = ()=>{
    store.dispatch('fetchSingleItem', {url:'rentals', id:route?.params.id})
        .then((response)=>{
          bookingDetails.value = response?.data
        })
        .catch(()=>{
          showError.value = true
        })
  }

  onMounted(()=>{
    getRentalDetails()
  })
</script>

<template>
  <div class="h-full flex flex-col items-center justify-between gap-8">
    <div class="w-full flex flex-col items-center justify-center gap-6">
      <img class=" h-auto w-full md:w-[30%]" alt="bugatti" :src="(baseUrl + bookingDetails?.car_details?.car_image)">
    </div>

    <el-empty v-if="showError || bookingDetails === null"/>

    <div v-else
        class="flex flex-col md:grid md:grid-cols-2 w-full items-start justify-between gap-4 h-fit">
      <div class="flex flex-col items-center gap-2 border p-4 rounded-lg">
        <span class="font-bold text-2xl text-gray-500">Rent Cost</span>
        <span>KES {{bookingDetails?.total_cost}}</span>
      </div>

      <div class="flex flex-col items-center gap-2 border p-4 rounded-lg">
        <span class="font-bold text-2xl text-gray-500">Rent Period</span>
        <span class="flex gap-2">
          <span class="font-bold">{{ formatDate(bookingDetails?.rental_date) }} </span>
          To
          <span class="font-bold">{{ formatDate(bookingDetails?.return_date) }}</span>
        </span>
      </div>
    </div>

    <div v-if="bookingDetails !== null || !showError " class="flex flex-col items-center gap-2 w-full">
      <span class="font-bold text-3xl">Payment Details</span>
      <span class="font-bold">Method : Mpesa</span>
      <el-input-number disabled v-model="bookingDetails.total_cost" style="width: 100%;" size="large" placeholder="amount"></el-input-number>
      <el-button class="w-full" type="primary" @click="makePayment" size="large">Complete Rental Payment</el-button>
    </div>

  </div>

</template>

<style scoped>

</style>