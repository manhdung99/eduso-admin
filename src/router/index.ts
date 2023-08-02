import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import QuanLyKhoSachVue from "../views/QuanLyKhoSachVue.vue";
import QuanLyDoanhThuVue from "../views/QuanLyDoanhThuVue.vue";
import QuanLyTaiKhoanVue from "../views/QuanLyTaiKhoanVue.vue";
import QuanLyNapEP from "../views/QuanLyNapEP.vue";
import QuanLyEPnguoidung from "../views/QuanLyEPnguoidung.vue";
import QuanLyDonHang from "../views/QuanLyDonHang.vue";
import QuanLyNguoiDung from "../views/QuanLyNguoiDung.vue";
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
    meta: { title: "Quản lý kho sách" },
  },
  {
    path: "/quanlydoanhthu",
    name: "QuanLyDoanhThu",
    component: QuanLyDoanhThuVue,
    meta: { title: "Quản lý doanh thu" },
  },
  {
    path: "/quanlytheodonvi",
    name: "QuanLyKhTheoDonVi",
    component: QuanLyTheoDonViVue,
    meta: { title: "Quản lý đơn vị" },
  },
  {
    path: "/quanlytaikhoan",
    name: "QuanLyTaiKhoan",
    component: QuanLyTaiKhoanVue,
    meta: { title: "Quản lý tài khoản" },
  },
  {
    path: "/quanlyEPnguoidung",
    name: "quanlyEPnguoidung",
    component: QuanLyEPnguoidung,
    meta: { title: "Quản lý EP người dùng" },
  },
  {
    path: "/quanlynapEP",
    name: "QuanLyEP",
    component: QuanLyNapEP,
    meta: { title: "Quản lý nạp EP" },
  },
  {
    path: "/quanlydonhang",
    name: "QuanLyDonHang",
    component: QuanLyDonHang,
    meta: { title: "Quản lý đơn hàng" },
  },
  {
    path: "/quanlynguoidung",
    name: "QuanLyNguoiDung",
    component: QuanLyNguoiDung,
    meta: { title: "Quản lý người dùng" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  document.title = (to.meta?.title ?? "Default Title") as string;
});

export default router;
