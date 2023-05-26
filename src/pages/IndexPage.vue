<template>
  <div class="index-page">
    <!--    <a-input-search-->
    <!--      v-model:value="searchParams.text"-->
    <!--      enter-button="Search"-->
    <!--      placeholder="这个框的功能我还没实现，大家慢慢写"-->
    <!--      size="large"-->
    <!--      @search="onSearch"-->
    <!--    />-->
    <InlineLogin></InlineLogin>
    <my-divider></my-divider>
    <a-tabs
      v-model:activeKey="activeKey"
      tabBarGutter="30px"
      @change="onTabChange"
    >
      <a-tab-pane key="check" tab="查看用户">
        <!--        <PictureList :picture-list="pictureList"></PictureList>-->
        <StudentInfo :user-list="userList"></StudentInfo>
      </a-tab-pane>
      <a-tab-pane v-if="role === 'admin'" key="modify" tab="修改用户">
        <!--        <StudentInfo></StudentInfo>-->
        <ModifyStudentInfo :user-list="userList"></ModifyStudentInfo>
        <!--        <demo></demo>-->
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import MyDivider from "@/components/MyDivider.vue";
import { computed, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import myAxios from "@/plugins/myAxios";
import StudentInfo from "@/components/StudentInfo.vue";
import ModifyStudentInfo from "@/components/ModifyStudentInfo.vue";
import InlineLogin from "@/components/InlineLogin.vue";
import { useRoleStore } from "@/store";

var route = useRoute();
var router = useRouter();
const activeKey = route.params.category;
const postList = ref([]);
const userList = ref([]);

const initSearchParams = {
  text: "",
  pageSize: 10,
  pageNum: 1,
};

const searchParams = ref(initSearchParams);
const roleStore = useRoleStore();
const role = computed(() => roleStore.role);

watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,
    text: route.query.text,
  } as any;
});

const onSearch = (value: string) => {
  // alert(value);
  router.push({
    query: searchParams.value,
  });
};

const onTabChange = (key: string) => {
  router.push({
    path: `/${key}`,
    query: searchParams.value,
  });
};

myAxios.post("/post/list/page/vo", {}).then((res: any) => {
  postList.value = res.records;
});

myAxios.post("/user/list/page/vo", {}).then((res: any) => {
  userList.value = res.records;
});

// myAxios.post("/picture/list/page/vo", {}).then((res: any) => {
//   pictureList.value = res.records;
// });
</script>
