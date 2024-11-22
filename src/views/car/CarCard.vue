<script setup>
const props = defineProps({
  carObject : {
    type: Object,
    default : {
      name:'',
      YOF:'',
      rate:'800',
      avatar:''
    }
  }
})
</script>

<template>
  <div class="flex flex-col gap-4 cursor-pointer w-full md:w-fit">
    <div class="w-full md:w-[330px] h-fit border rounded-lg flex flex-col justify-between hover:bg-gray-50 hover:shadow">
      <div class="w-full flex justify-end items-center relative">
        <div class="absolute top-0 left-0 flex items-center gap-2 p-1">
          <el-tag v-if="carObject?.status === 'rented'" type="warning">Rented</el-tag>
          <el-tag v-if="carObject?.status === 'available'" type="success">Available</el-tag>
        </div>
        <img class=" h-auto w-full rounded-t-lg min-h-16" :alt="carObject?.car_make" :src="carObject?.car_image">
      </div>
      <div class="flex flex-col gap-2 capitalize p-2">
        <h3 class="text-blue-900">{{carObject?.car_model}}</h3>
        <div class="flex justify-between font-bold">
          <div>{{carObject?.car_make}},{{carObject?.car_manufactured_year}}</div>
          <div>KES {{carObject?.daily_rental_rate}}/day</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>