<template>
  <div
    class="fixed top-0 right-0 left-0 bottom-0 bg-modal z-10"
    v-if="openUpdateUserModal"
  >
    <form
      ref="addUserForm"
      @submit.prevent="onSubmit"
      @keydown.enter="onSubmit"
    >
      <div
        v-if="userDetail"
        class="add-new-user-modal max-h-screen lg:max-h-175"
      >
        <div class="text-blue-400 text-center font-bold text-xl mb-4 relative">
          Chỉnh sửa người dùng
          <span
            @click="updateUserModalStatus(false)"
            class="absolute right-0 cursor-pointer"
            ><img :src="closeIcon" alt="icon"
          /></span>
        </div>
        <div class="scroll-area max-h-126">
          <!-- info  -->
          <div class="pr-6">
            <div class="justify-between w-full flex mb-2 py-1">
              <span class="font-bold text-base">Email: </span>
              <div class="w-50">
                <span>{{ userDetail.Email }}</span>
              </div>
              <input
                type="text"
                class="hidden"
                :value="userDetail.Email"
                name="Account.Email"
              />
            </div>

            <div class="justify-between w-full flex mb-2">
              <span class="font-bold text-base">Tên: </span>
              <div class="w-50">
                <input
                  v-model="name"
                  name="Account.Name"
                  class="input w-full"
                  type="text"
                />
                <div
                  class="text-red-500"
                  v-for="error in v1$.name.$errors"
                  :key="error.$uid"
                >
                  {{ $t(error.$message as string) }}
                </div>
              </div>
            </div>
            <div class="justify-between w-full flex mb-2 relative">
              <span class="font-bold text-base">Password: </span>
              <div class="w-50">
                <input
                  v-model="password"
                  name="Account.Password"
                  class="input w-full"
                  :type="showPassword ? 'text' : 'password'"
                />
                <div
                  class="text-red-500"
                  v-for="error in v1$.name.$errors"
                  :key="error.$uid"
                >
                  {{ $t(error.$message as string) }}
                </div>
              </div>
              <span
                @click="showPassword = !showPassword"
                :class="showPassword ? ' icon-hide' : 'icon-eye'"
                class="text-slate-grey hover:text-slate text-2xl cursor-pointer top-1 right-2 absolute"
              ></span>
            </div>
            <div class="justify-between w-full flex mb-2">
              <span class="font-bold text-base">Loại người dùng: </span>
              <div class="w-50">
                <multiselect
                  v-model="usertype"
                  :searchable="searchable"
                  :options="types"
                  valueProp="value"
                  track-by="label"
                  label="label"
                  name="RoleID"
                ></multiselect>
              </div>
            </div>
          </div>
          <!-- Quản lý sách  -->
          <div
            v-for="(permisstion, index) in permisstions"
            :key="index"
            class="overflow-hidden transition-all"
            :class="permisstion.show ? 'h-auto' : 'h-12'"
          >
            <div class="bg-gray-200 font-medium py-2 pl-2 relative mb-4">
              {{ permisstion.value }}
              <span
                @click="permisstion.show = !permisstion.show"
                class="absolute right-4 cursor-pointer"
              >
                <img
                  class="w-6 h-6"
                  :src="permisstion.show ? downIcon : rightIcon"
                  alt=""
                />
              </span>
            </div>
            <div class="px-6">
              <div
                v-for="action in permisstion.Actions"
                :key="action.value"
                class="flex items-center justify-between my-2"
              >
                <span class="font-medium">{{ action.name }}</span>
                <input
                  @click="onCheckInput"
                  class="cursor-pointer"
                  value="true"
                  type="checkbox"
                  :data-name="`${permisstion.name}-${action.value}`"
                  :checked="
                    permissionsSelected.includes(
                      `${permisstion.name.toLowerCase()}-${action.value.toLowerCase()}`
                    )
                  "
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-4">
          <button
            class="bg-green text-white text-base rounded px-4 py-2 hover:opacity-90 font-medium"
            type="submit"
          >
            Lưu
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useModalStore } from "../../stores/modalStore";
import { useUserStore } from "../../stores/userStore";
import { storeToRefs } from "pinia";
import closeIcon from "../../assets/image/close.svg";
import uploadIcon from "../../assets/image/upload.svg";
import downloadIcon from "../../assets/image/download.svg";
import attachIcon from "../../assets/image/attach.svg";
import downIcon from "../../assets/image/user-icon-down.svg";
import rightIcon from "../../assets/image/user-icon-right.svg";
import Multiselect from "@vueform/multiselect";
import { BASE_URL, ADD_USER } from "../../constants";
import {
  checkPriceValidation,
  checkDiscountValidation,
} from "../../uses/validation";
import defaultBookCover from "../../assets/image/default-book-image.jpg";
import axios from "axios";
import { transmissionData, transmissionPermisstionData } from "@/uses/common";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default defineComponent({
  name: "updateUserModal",
  components: {
    Multiselect,
  },
  setup() {
    const modal = useModalStore();
    const { openUpdateUserModal } = storeToRefs(modal);
    const { updateUserModalStatus } = modal;
    const { getPermissions, addUser } = useUserStore();
    const { permisstions, Access_Token, userDetail } = storeToRefs(
      useUserStore()
    );
    const searchable = ref(true);
    const permissionsSelected = ref([]);
    const ctrlName = ref([]);
    const usertype = ref("Quản trị viên");
    const name = ref("");
    const password = ref("");
    const types = [
      {
        value: "Quản trị viên",
        label: "Quản trị viên",
      },
      {
        value: "Người dùng",
        label: "Người dùng",
      },
    ];
    const addNewUserRule = {
      name: { required },
      password: { required },
    };
    const v1$ = useVuelidate(addNewUserRule, { name, password });
    const showDetailAdminBook = ref(false);
    const showDetailRevenueBook = ref(false);
    const showPassword = ref(false);
    const addUserForm = ref(null);
    const onCheckInput = (e: any) => {
      if (
        !permissionsSelected.value.includes(e.target.getAttribute("data-name"))
      ) {
        permissionsSelected.value = [
          ...permissionsSelected.value,
          e.target.getAttribute("data-name"),
        ];
      } else {
        permissionsSelected.value = permissionsSelected.value.filter(
          (act) => act != e.target.getAttribute("data-name")
        );
      }
    };
    const onSubmit = async () => {
      const result = await v1$.value.$validate();
      if (result) {
        await checkPermissionsBeforeSubmit;
        const formData = new FormData(addUserForm.value);
        formData.append("Account.RoleID", usertype.value);
        formData.append("Account.ID", userDetail.value.ID);
        transmissionPermisstionData(
          formData,
          permissionsSelected.value,
          "Permissions"
        );
        const url = BASE_URL + ADD_USER;
        axios
          .post(url, formData, {
            headers: {
              Authorization: Access_Token.value,
            },
          })
          .then((response) => {
            if (response.data.Code == 200) {
              updateUserModalStatus(false);
            } else {
              alert(response.data.Message);
            }
          });
      }
    };
    const checkPermissionsBeforeSubmit = () => {
      permisstions.value.forEach((permisstion) => {
        permisstion.Actions.forEach((action) => {
          if (permissionsSelected.value.includes(action.value)) {
            ctrlName.value = [...ctrlName.value, permisstion.name];
          }
          if (!permissionsSelected.value.includes(action.value)) {
            ctrlName.value = ctrlName.value.filter(
              (ctrl) => ctrl != permisstion.name
            );
          }
        });
      });
    };
    onMounted(getPermissions);
    watch(
      () => userDetail.value,
      () => {
        name.value = userDetail.value.Name;
        password.value = userDetail.value.Password;
        permissionsSelected.value = userDetail.value.Permissions.map(
          (permission) => permission.CtrlName + "-" + permission.ActName
        );
      }
    );
    return {
      openUpdateUserModal,
      closeIcon,
      uploadIcon,
      downloadIcon,
      attachIcon,
      onSubmit,
      checkPriceValidation,
      checkDiscountValidation,
      defaultBookCover,
      downIcon,
      rightIcon,
      usertype,
      types,
      searchable,
      showDetailAdminBook,
      showDetailRevenueBook,
      updateUserModalStatus,
      permisstions,
      showPassword,
      addUserForm,
      onCheckInput,
      permissionsSelected,
      ctrlName,
      v1$,
      name,
      password,
      userDetail,
    };
  },
});
</script>
<style scoped>
.add-new-user-modal {
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px 24px;
  border-radius: 10px;
  min-width: 470px;
  max-width: 600px;
  overflow-y: auto;
}

@media screen and (max-width: 767px) {
  .add-new-user-modal {
    position: fixed;
    top: 4px;
    bottom: 4px;
    transform: translate(0, 0);
    left: 2px;
    right: 2px;
    overflow-y: auto;
    min-width: 300px;
    padding: 16px 12px;
  }
}
</style>
