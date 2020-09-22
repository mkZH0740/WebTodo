import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginPage from "@/views/LoginPage";
import InvalidPage from "@/views/InvalidPage";
import TaskPage from "@/views/TaskPage";


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/task',
    name: 'Task',
    component: TaskPage
  },
  {
    path: '/invalid',
    name: 'Invalid',
    component: InvalidPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
