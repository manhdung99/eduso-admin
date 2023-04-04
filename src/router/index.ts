import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import QuanLyKhoSachVue from "../views/QuanLyKhoSachVue.vue";
import QuanLyDoanhThuVue from "../views/QuanLyDoanhThuVue.vue";
import QuanLyTaiKhoanVue from "../views/QuanLyTaiKhoanVue.vue";
import QuanLyTheoDonViVue from "../views/QuanLyTheoDonViVue.vue";
const routes: Array<RouteRecordRaw> = [
  {
    // /search/screens -> /search?q=screens
    path: "/",
    redirect: (to) => {
      // the function receives the target route as the argument
      // we return a redirect path/location here.
      return { path: "/quanlykhosach", query: { q: to.params.searchText } };
    },
  },
  {
    path: "/quanlykhosach",
    name: "QuanLyKhoSach",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: QuanLyKhoSachVue,
  },
  {
    path: "/quanlydoanhthu",
    name: "QuanLyDoanhThu",
    component: QuanLyDoanhThuVue,
  },
  {
    path: "/quanlytheodonvi",
    name: "QuanLyKhTheoDonVi",
    component: QuanLyTheoDonViVue,
  },
  {
    path: "/quanlytaikhoan",
    name: "QuanLyTaiKhoan",
    component: QuanLyTaiKhoanVue,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
