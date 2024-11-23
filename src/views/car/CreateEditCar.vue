<template>
  <BaseDialog>
    <template #content>
      <el-form
          ref="formRef"
          :model="formState"
          class="md:mt-0 grid gap-2 grid-cols-1 md:grid-cols-2"
          label-position="top"
          @submit.native.prevent="handleSubmit"
      >
        <!-- Name Field -->
        <el-form-item
            :rules="[{ required: true, message: 'Please input the product name!' }]"
            label="Make"
            prop="car_make"
        >
          <el-input v-model="formState.car_make" class="rounded-none" placeholder="Product name" size="large"
                    style="border-radius:0"/>
        </el-form-item>

        <!-- Model Field -->
        <el-form-item
            label="Model"
            prop="car_model"
        >
          <el-input v-model="formState.car_model" class="rounded-none" placeholder="Product Description" size="small"
                    type="textarea"/>
        </el-form-item>

        <!-- Model Field -->
        <el-form-item
            label="YOF"
            prop="car_manufactured_year"
        >
          <el-date-picker
              size="large"
              style="width: 100%" class="w-full"
              v-model="formState.car_manufactured_year"

              type="datetime"
              format="YYYY-MM-DD HH:mm:ss"
              date-format="YYYY/MM/DD ddd"
              value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <!-- Plate Field -->
        <el-form-item
            label="Plate Number"
            prop="car_number_plate"
        >
          <el-input v-model="formState.car_number_plate" class="rounded-none" placeholder="Product Description" size="small"
                    type="textarea"/>
        </el-form-item>

        <!-- Chesis Field -->
        <el-form-item
            :rules="[{ required: true, message: 'Selling Price is required' }]"
            label="Chesis Number"
            prop="car_chesis_number"
        >
          <el-input v-model="formState.car_chesis_number" class="rounded-none w-full" placeholder="Price"
                           size="large"/>
        </el-form-item>

        <!-- Capacity Field -->
        <el-form-item
            label="Capacity"
            prop="car_capacity"
        >
          <el-input-number v-model="formState.car_capacity" class="rounded-none w-full" placeholder="Price" size="large"/>
        </el-form-item>

        <!-- Consumption Field -->
        <el-form-item
            label="Fuel Consumption"
            prop="car_fuel_consumption"
        >
          <el-input v-model="formState.car_fuel_consumption" class="rounded-none w-full" placeholder="Price" size="large"/>
        </el-form-item>

        <!-- Consumption Field -->
        <el-form-item
            label="Description"
            prop="car_description"
        >
          <el-input v-model="formState.car_description" class="rounded-none w-full" placeholder="car_description" size="large"/>
        </el-form-item>

        <!-- Allowable Discount Field -->
        <el-form-item
            label="Daily Rental Rate"
            prop="daily_rental_rate"
        >
          <el-input-number v-model="formState.daily_rental_rate" class="rounded-none w-full" placeholder="100"
                           size="large"/>
        </el-form-item>

        <!--  Car Image Field      -->
        <el-form-item class="col-span-2 w-full" label="Car Image" prop="car_image">
          <a-upload
              v-model:file-list="fileList"
              :progress="{
                showInfo: true,
              }"
              :show-upload-list="{
                showPreviewIcon: true,
                showRemoveIcon: false,
              }"
              accept=".jpg,.png,.jpeg"
              class="avatar-uploader w-full flex flex-col justify-center bg-gray-100 border border-dashed border-blue-400 p-4 rounded-lg"
              list-type="picture"
              name="teaser"
              @remove="handleRemove"
          >
            <div
                class="ant-upload-drag-icon text-blue-400 w-full flex justify-center py-4"
            >
              <upload class="h-8 w-8"></upload>
            </div>
            <div class="flex flex-col items-center">
              <p class="ant-upload-text">
                Click or drag file to this area to upload
                <span class="font-bold"> the car image</span>
              </p>
            </div>

            <base-loader v-if="loadingCoverPhotoUpload"/>
          </a-upload>
        </el-form-item>

        <!--  Log Book Field      -->
        <el-form-item class="col-span-2 w-full" label="Log Book Image" prop="car_logbook">
          <a-upload
              v-model:file-list="logBookList"
              :progress="{
                showInfo: true,
              }"
              :show-upload-list="{
                showPreviewIcon: true,
                showRemoveIcon: false,
              }"
              accept=".jpg,.png,.jpeg"
              class="avatar-uploader w-full flex flex-col justify-center bg-gray-100 border border-dashed border-blue-400 p-4 rounded-lg"
              list-type="picture"
              name="teaser"
              @remove="handleRemove"
          >
            <div
                class="ant-upload-drag-icon text-blue-400 w-full flex justify-center py-4"
            >
              <upload class="h-8 w-8"></upload>
            </div>
            <div class="flex flex-col items-center">
              <p class="ant-upload-text">
                Click or drag file to this area to upload
                <span class="font-bold"> the logbook image</span>
              </p>
            </div>

            <base-loader v-if="loadingCoverPhotoUpload"/>
          </a-upload>

          <!--        <div class="file-upload-container w-full hidden">-->
          <!--          <input-->
          <!--              accept=".jpg,.png,.jpeg"-->
          <!--              class="file-input w-full h-full"-->
          <!--              type="file"-->
          <!--              @change="handlePhotoChange"-->
          <!--          />-->
          <!--          <div class="file-upload-content">-->
          <!--            <el-icon>-->
          <!--              <upload-filled/>-->
          <!--            </el-icon>-->
          <!--            <div class="file-upload-text">-->
          <!--              <span>Drop file here or <em>click to upload</em></span>-->
          <!--              <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--        </div>-->
        </el-form-item>

        <!-- Submit Button -->
        <el-form-item class="md:col-span-2">
          <el-button
              :loading="registerLoading"
              class="w-full bg-red-400 border-none hover:bg-red-500 focus:bg-red-500 rounded-none p-0 my-6 text-sm font-medium"
              size="large"
              type="primary"
              @click="handleSubmit"
          >
            Submit
          </el-button>
        </el-form-item>
      </el-form>
    </template>

  </BaseDialog>
</template>

<script>
import BaseDialog from "@/components/base/BaseDialog.vue";
import store from "@/store";
import {notification} from "ant-design-vue";
import axios from "axios";
import {baseUrl} from "@/utility/constants";
import router from "@/router";
import {useRoute} from "vue-router";

export default {
  name: "ProductForm",
  components: {
    BaseDialog,
  },
  data() {
    return {
      formState: {},
      registerLoading: false,
      categories: [],
      categoryLoader: false,
      counter: 0,
      loadingProfilePhotoUpload: false,
      fileList: [],
      logBookList: [],
      info: {
        file: {
          status: "uploading",
        },
      },
      uploadUrl: ''
    };
  },
  methods: {
    fetchOnMount() {
      this.categoryLoader = true;
      const route = useRoute()

      store.dispatch("fetchSingleItem", {url: "cars", id:route?.params?.id})
          .then((res) => {
            this.formState = res.data;
            this.categoryLoader = false;
          })
          .catch(() => {
            this.categoryLoader = false;
          });
    },
    handlePhotoChange(event) {
      this.fileList = event.target.files[0];
    },
    async handleSubmit() {
      const formData = new FormData();

      // Append each file to the formData if it meets the size condition
      for (let attachment of this.fileList) {
        if (attachment?.originFileObj.size <= 4 * 1024 * 1024) {
          formData.append('car_image', attachment?.originFileObj);
        } else {
          notification["error"]({
            message: "Error",
            description: `${attachment?.name} exceeds 4MB size limit and won't be uploaded`,
          });
          continue;
        }
      }
      for (let attachment of this.logBookList) {
        if (attachment?.originFileObj.size <= 4 * 1024 * 1024) {
          formData.append('car_logbook', attachment?.originFileObj);
        } else {
          notification["error"]({
            message: "Error",
            description: `${attachment?.name} exceeds 4MB size limit and won't be uploaded`,
          });
          continue;
        }
      }

      for (let key in this.formState) {
        formData.append(key, this.formState[key]);
      }

      console.log("FormData entries:", Array.from(formData.entries()));

      this.registerLoading = true;

      try {
        const authData = JSON.parse(localStorage.getItem("authData"));
        const route = useRoute()

        if (route?.name === 'create-car'){
          // Make the PATCH request with formData as payload
          const resp = await axios.post(`${baseUrl}/api/cars/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data", // Ensure multipart form-data header
              Authorization: "Bearer " + authData?.access, // Include authorization token
            },
          });
        }else {
          const resp = await axios.patch(`${baseUrl}/api/cars/${this.$route?.params?.id}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data", // Ensure multipart form-data header
              Authorization: "Bearer " + authData?.access, // Include authorization token
            },
          });

        }
        console.log("Success:", resp);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        this.registerLoading = false;
        router.go(-1)
      }
    }


  },
  mounted() {
    this.fetchOnMount()
  }
};
</script>

<style scoped>
.file-upload-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
}

.file-input {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.file-upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none; /* Prevent clicks on styled content */
}

.file-upload-text {
  margin-top: 8px;
  color: #666;
}

.el-upload__tip {
  font-size: 12px;
  color: #999;
}
</style>

