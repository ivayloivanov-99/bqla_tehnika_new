import Vue from 'vue';
import VueRouter, { RouteConfig } from "vue-router";
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/products",
    name: "products",
    component: () => import("./components/ProductList.vue")
  },
  {
    path: "/product/:id",
    name: "product-view",
    component: () => import("./components/Product.vue")
  },
  {
    path: "/addtech",
    name: "addproduct",
    component: () => import("./components/AddProduct.vue")
  },
  {
    path: '/signin',
    component: Login
  },
  {
    path: '/users/register',
    component: Register
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('./components/Profile.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('./components/BoardAdmin.vue')
  },
  {
    path: '/mod',
    name: 'moderator',
    component: () => import('./components/BoardModerator.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('./components/BoardUser.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});


export default router;


