<script setup lang="ts">
import {onMounted, ref} from 'vue'
import CarCard from "@/views/car/CarCard.vue";
import {useRouter} from "vue-router";
const checkAll = ref(false)
const showFilters = ref(false)
import store from "@/store/index"

const isIndeterminate = ref(true)
const checkedCities = ref(['Shanghai', 'Beijing'])
const cities = ['Toyota', 'Mercedes', 'Tesla']

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : []
  isIndeterminate.value = false
}

const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}

const router = useRouter()

const vehicles = ref([])

const pageCount = ref(1)
const loadMore = ref(false)
const loadMoreCars = ()=>{
  pageCount.value += 1
  loadMore.value = true
  getVehicles()
}

const getVehicles  = ()=>{
  store.dispatch("fetchList", {url: `cars?page=${pageCount.value}`})
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


const rentCar = (id)=>{
  router.push({name: 'rent-car', params: {carId: 1 }})
}
</script>

<template>
  <div class="md:p-4 py-4 h-full w-full flex flex-col md:flex-row gap-4">

    <router-view/>

    <div class="flex flex-col gap-2 h-full w-full md:w-[300px] pb-2 md:border-r md:pr-2">
      <div class="font-semibold text-lg">Filters</div>

      <div class="text-blue-500 mt-2">By Make</div>
      <div class=" w-full">
        <el-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
        >
          <el-checkbox v-for="city in cities" :key="city" :label="city" :value="city">
            {{ city }}
          </el-checkbox>
        </el-checkbox-group>
      </div>

      <div class="text-blue-500 mt-2">By Year</div>
      <div class=" w-full">
        <el-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
        >
          <el-checkbox v-for="city in cities" :key="city" :label="city" :value="city">
            {{ city }}
          </el-checkbox>
        </el-checkbox-group>
      </div>

      <div class="text-blue-500 mt-2">By Name</div>
      <el-input placeholder="search by name" size="large"/>
    </div>

    <div class="h-fit w-full flex flex-wrap items-start justify-start gap-4 gap-y-4">
      <CarCard @click="rentCar" :car-object="vehicle" v-for="vehicle in vehicles" :key="vehicle"/>
    </div>
  </div>

</template>

<style scoped>

</style>