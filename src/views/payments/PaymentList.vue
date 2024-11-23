<script setup lang="ts">
import {ArrowRight, Delete, Download, EditPen, Open} from "@element-plus/icons-vue";
import BaseDataTable from "@/components/base/BaseDataTable.vue";
import ValidatedInvoice from "@/views/invoices/ValidatedInvoice.vue";
import {reactive, ref, watch} from "vue"
import router from "@/router/index.js";
import store from "@/store/index.js";
import {FormInstance, FormRules} from "element-plus";
import {formatDate} from "@/utility/functions"
import BaseLoader from "@/components/base/BaseLoader.vue";

const ruleForm = ref<FormInstance>();
const rules = reactive<FormRules>({});
const columns = ref([
  {
    title: "Name",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Payment Method",
    dataIndex: "payment_method",
    key: "payment_method",
  },
  {
    title: "Date Of Payment",
    dataIndex: "created_at",
    key: "created_at",
  }
]);


const attemptKraValidation = (invoice_number, invoice_id)=>{
  store.state.submitLoading = true
  selected_invoice_id.value = invoice_id
  console.log('invoice id ',invoice_id)

  store.dispatch('postData', {data: {"invoice_number": invoice_number}, url:"invoice"})
      .then((response)=>{
        if (selected_invoice_id.value != null && response.data?.download_url){
          store.dispatch('patchData', {url: 'invoice-list', id: selected_invoice_id.value,
            data:{is_validated:true, validated_invoice_url: response.data?.download_url}})
        }
        showValidatedInvoice.value = true;
        validatedInvoicePdfUrl.value = response.data?.download_url;
        store.state.submitLoading = false

      })
      .catch((err)=>{
        showValidatedInvoice.value = false;
        store.state.submitLoading = false
      })
  ;
}
const viewSelectedInvoice = (download_url)=>{
  console.log(download_url, 'url')
  showValidatedInvoice.value = true;
  validatedInvoicePdfUrl.value = download_url;
}

const form = ref({
  invoice_number:1020
})
const postManually = ref(false)

const invoiceNumberFilter = ref('')
const backendUrl = ref('payments')

watch(invoiceNumberFilter, (newFilterValue) => {
  if (newFilterValue) {
    // Ensure no slash before '?'
    backendUrl.value = `invoice-list?invoice_number=${newFilterValue}`;
    store.state.refreshData = true;
  } else {
    backendUrl.value = 'invoice-list';
    store.state.refreshData = false;
  }
});


const showValidatedInvoice = ref(false)
const validatedInvoicePdfUrl = ref('')
const selected_invoice_id = ref(null)
const submitLoading = ref(false);

const handleDialogClose = ()=> {
  showValidatedInvoice.value = false
}

const submitForm = async (formEl: FormInstance | undefined) => {
  store.state.submitLoading = true;
  console.log(form.value, 'form')
  validatedInvoicePdfUrl.value = '';

  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      store.dispatch("postData", {url: 'invoice',
        data:form.value}).then((response) => {
        if (selected_invoice_id.value != null){
          store.dispatch('patchData', {url: 'invoice', id: selected_invoice_id.value,
            data:{is_validated:true, validated_invoice_url: response.download_url}})
        }
        showValidatedInvoice.value = true;
        validatedInvoicePdfUrl.value = response.data?.download_url;
        store.state.submitLoading = false
      }).catch((err)=>{
        store.state.submitLoading = false
      })
    } else {
      store.state.submitLoading = false;
      showValidatedInvoice.value = true;
    }
    store.state.submitLoading = false;
  });
};



</script>

<template>
  <div class=" h-full w-full">
    <router-view/>


    <div v-if="store.state.submitLoading" class="h-full w-full flex justify-center items-center text-blue-500">
      <BaseLoader/>
    </div>

    <BaseDataTable
        :columns="columns"
        :show-other-items="true"
        :fetch-url="backendUrl"
        v-if="!store.state.submitLoading"
        title="Payments">

      <template v-slot:bodyCell="slotProps">

        <template v-if="slotProps.column.key === 'download_action'">
          <el-checkbox v-if="slotProps.text.is_validated === true" size="large" />
        </template>

        <template v-if="slotProps.column.key === 'created_date'">
          {{formatDate(slotProps.text)}}
        </template>
        <template v-if="slotProps.column.key === 'customer'">
          {{slotProps.text?.first_name}}
          {{slotProps.text?.last_name}}
        </template>

        <template v-if="slotProps.column.key === 'is_active'">
          <el-tag size="large" type="success" v-if="slotProps.text === true" class="capitalize">
            {{slotProps.text}}
          </el-tag>

          <el-tag type="danger" size="large" v-else class="capitalize">
            {{slotProps.text}}
          </el-tag>
        </template>

      </template>
    </BaseDataTable>
  </div>

</template>

<style scoped>

</style>