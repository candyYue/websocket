import Login from './pages/Login';
import ChartRoom from './pages/ChartRoom'

import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    name: 'login',
    path: '/',
    component: Login,
  },
  {
    name: 'chartroom',
    path: '/chartroom',
    component: ChartRoom,
  },
  // {
  //   name: '404',
  //   path: '/404',
  //   component: Test,
  // },
];
const routers = createRouter({
  history: createWebHistory(), 
  routes
})
export default routers;