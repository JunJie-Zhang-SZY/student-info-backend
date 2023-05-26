import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import IndexPage from "../pages/IndexPage.vue";
import Login from "@/pages/LoginPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    //登录页面组件
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "home",
    component: IndexPage,
  },
  {
    path: "/:category",
    component: IndexPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   //守卫
//   //添加loading效果
//   // store.state.user = sessionStorage.getItem("user");
//
//   if (to.path === "/login") {
//     //钩子函数
//     next();
//   } else {
//     // location.replace("/login");
//   }
// });
//
// router.afterEach((router) => {
//   //添加一个loading加载完成的效果
// });

export default router;
