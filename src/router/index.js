import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/view/LoginView.vue"
import RegisterView from "@/views/auth/view/RegisterView.vue"
import TheDashboardView from "@/components/TheDashboardView.vue";
import UserProfile from "@/views/profile/UserProfile.vue";
import Landing from "@/views/Landing.vue";
import CarPopUp from "@/views/car/CarPopUp.vue";
import ComingSoon from "@/components/ComingSoon.vue";
import CheckoutPage from "@/views/checkout/CheckoutPage.vue";
import BrowseCars from "@/views/car/BrowseCars.vue";
import Employees from "@/views/profile/Employees.vue";
import RegisterForm from "@/views/auth/forms/RegisterForm.vue";
import PaymentList from "@/views/payments/PaymentList.vue";


const routes = [
  {
    name:'home',
    path: '/',
    component: Landing,
    requiresAuth: false,
    meta: {
      slug: 'Home',
    },
    children: [
      {
        name:'car',
        path: 'car/:carId',
        component: CarPopUp,
        requiresAuth: false,
        meta: {
          slug: 'Detailed View',
        },
      }
    ]
  },{
    name:'register',
    path: '/register',
    component: RegisterView,
    requiresAuth: true,
    roles: ['admin', 'store_owner'],
    meta: {
      slug: 'User Registration',
    },
  },
  {
    name:'login',
    path: '/login',
    component: LoginView,
    meta: {
      slug: 'Login',
    },
  },
  {
    name:'dashboard',
    path:'/dashboard',
    component: TheDashboardView,
    requiresAuth: true,
    meta: {
      slug: 'Dashboard',
    },
    children : [
      {
        name: 'payments',
        path: 'payments',
        component: PaymentList,
        requiresAuth: true,
        meta: {
          slug: 'Payments',
        },
      },
        {
          name: 'profile',
          path: 'profile',
          component: UserProfile,
          requiresAuth: true,
          meta: {
            slug: 'Profile',
          },
        },
        {
          name: 'users',
          path: 'users',
          component: Employees,
          requiresAuth: true,
          meta: {
            slug: 'Users',
          },
        },
        {
          name: 'checkout',
          path: 'checkout/:id',
          component: CheckoutPage,
          requiresAuth: true,
          meta: {
            slug: 'Checkout',
          },
        },
        {
          name: 'register-car',
          path: 'register-car',
          component: CheckoutPage,
          requiresAuth: true,
          meta: {
            slug: 'Checkout',
          },
        },
      {
          name: 'register-user',
          path: 'register-user',
          component: RegisterForm,
          requiresAuth: true,
          meta: {
            slug: 'Checkout',
          },
        },
        {
          name: 'cars',
          path: 'cars',
          component: BrowseCars,
          requiresAuth: true,
          meta: {
            slug: 'Browse Cars',
          },
          children: [
            {
              name:'rent-car',
              path: 'rent-car/:carId',
              component: CarPopUp,
              requiresAuth: false,
              meta: {
                slug: 'Rent Car',
              },
            }
          ]
        },
      ]

  },


]

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;