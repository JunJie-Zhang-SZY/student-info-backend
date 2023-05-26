<template>
  <a-form
    :model="formState"
    layout="inline"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item>
      <a-input v-model:value="formState.user" placeholder="Username">
        <template #prefix>
          <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-model:value="formState.password"
        placeholder="Password"
        type="password"
      >
        <template #prefix>
          <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        :disabled="formState.user === '' || formState.password === ''"
        html-type="submit"
        type="primary"
      >
        登陆
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import myAxios from "@/plugins/myAxios";
import { LockOutlined, UserOutlined } from "@ant-design/icons-vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { defineComponent, reactive, ref, UnwrapRef } from "vue";
import { useRoleStore } from "@/store";

interface FormState {
  user: string;
  password: string;
}

const role = ref();

export default defineComponent({
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      user: "",
      password: "",
    });

    const roleStore = useRoleStore();
    // console.log(roleStore.role);

    const handleFinish = (values: FormState) => {
      // console.log(formState);
      const loginParams = {
        userAccount: formState.user,
        userPassword: formState.password,
      };
      myAxios
        .post("/user/login", loginParams)
        .then((res: any) => {
          role.value = res.userRole; // 获取响应数据中的用户角色
          alert(res.userName + "你好，你的角色为" + roleStore.role);
        })
        .catch((error) => {
          console.log(error);
        });
      // 调用操作
      roleStore.setRole(role.value);
      console.log(roleStore.role);
    };
    const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
      console.log(errors);
    };
    return {
      formState,
      handleFinish,
      handleFinishFailed,
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
  },
});
</script>
