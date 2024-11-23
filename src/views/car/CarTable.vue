<script setup>
import {Delete, EditPen} from "@element-plus/icons-vue";
import BaseDataTable from "@/components/base/BaseDataTable.vue";
import {ref} from "vue"
import router from "@/router/index.js";
import store from "@/store/index.js";
const userType = JSON.parse(localStorage.getItem("authData"))?.user?.user_type;

const props = defineProps(
    {
      newUrl : {
        type: String,
        default : 'users'
      },
    })

const columns = ref([
  {
    title: "Make",
    dataIndex: "car_make",
    key: "car_make",
  },
  {
    title: "Model",
    dataIndex: "car_model",
    key: "car_model",
  },{
    title: "Plate Number",
    dataIndex: "car_number_plate",
    key: "car_number_plate",
  },
  {
    title: "Daily Rental Rate",
    dataIndex: "daily_rental_rate",
    key: "daily_rental_rate",
  },
  {
    title: "Actions",
    dataIndex: "",
    key: "actions",
  },
]);

const goTo = (name, id)=>{
  router.push({name: name, params: {id: id}});
}

const deleteUser =  (id)=> {
  store.dispatch('deleteData',{id: id, url: 'cars'});
  allowDelete.value = ''
}


const activateUser =  (id)=> {
  store.dispatch('putData',{id: id, url: 'cars', data:null});
}
const allowDelete = ref('');

const downloadReport = () => {
  try {
    store.dispatch('downloadFirmData', {
      url: 'cars/download/report',
      report_name:'car_report'
    })
        .then((response) => {

        });
  } catch (error) {
    console.error("Error downloading report:", error);
  }
};

const authData = JSON.parse(localStorage.getItem("authData"));

</script>

<template>
  <router-view/>


  <BaseDataTable
      :columns="columns"
      show-other-items
      create-route-name="create-car"
      fetch-url="cars/"
      title="My Cars">

    <template #otherItems>
      <el-button type="primary"
                 size="large"
                 v-if="authData?.user?.user_type === 'car_owner'" @click="downloadReport"
                 class="mb-2 mr-2">Download Car Report
      </el-button>

    </template>

    <template v-slot:bodyCell="slotProps">

      <template v-if="slotProps.column.key === 'user_type'">
        <el-tag size="large" type="info" v-if="slotProps.text === 'car_owner'" class="capitalize">
          Car Owner
        </el-tag>

        <el-tag type="info" size="large" v-else class="capitalize">
          Customer
        </el-tag>
      </template>

      <template v-if="slotProps.column.key === 'actions'">
        <!--                      {{ slotProps.text }}-->

        <ElButton type="primary"
                  @click="goTo('edit-car', slotProps.text?.id)"
                  size="default" plain>
          <template #icon>
            <EditPen class="h-fit"/>
          </template>
        </ElButton>

        <el-popover
            placement="bottom"
            title=""
            :width="200"
            trigger="click"
        >
          <template #reference>
            <ElButton type="danger"

                      title="Fire User"
                      v-if="(userType === 'super_admin' || userType === 'firm_owner') && slotProps.text?.is_active === true"
                      size="default" plain>
              <template #icon>
                <Delete class="h-fit"/>
              </template>
            </ElButton>
          </template>

          <template #default>
            <div class="flex flex-col gap-2">
              <!--              <span>Type the word <span>delete</span> to confirm</span>-->
              <el-form
                  label-position="top"
              >
                <el-form-item label="Type delete to confirm">
                  <el-input placeholder="delete" v-model="allowDelete" size="large"></el-input>
                </el-form-item>
              </el-form>


              <el-button
                  type="danger"
                  class="capitalize"
                  :disabled="allowDelete == 'delete' ? false : true"
                  @click="deleteUser(slotProps.text?.id)"
                  size="large">
                confirm and delete
              </el-button>
            </div>

          </template>

        </el-popover>

        <ElButton
            type="success"
            v-if="slotProps.text?.is_active === false"
            @click="activateUser(slotProps.text?.id)"
            size="default" plain>
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </template>
        </ElButton>
      </template>
    </template>
  </BaseDataTable>
</template>

<style scoped>

</style>