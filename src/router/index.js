import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/Index"
import Articles from "../components/Articles"
import Login from "../components/Login"
import Comment from "../components/Comment"
import LoginManage from "../components/LoginManage"
import ManageIndex from "../views/ManageIndex"
import PostAritcle from "../views/PostAritcle"
import ManageAritcle from "../views/ManageAritcle"
import Search from '../components/Search'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:"/index"
    },
    {
      path: '/index',
      component:Index,
    },
    {
      path: '/articles/:code',
      component:Articles,
    },
    {
      path: '/login',
      component:Login,
    },
    {
      path:'/comment',
      component:Comment
    },
    {
      path: '/loginManage',
     component:LoginManage
    },
    {
      path: '/manageIndex',
     component:ManageIndex,
     children:[
       {
        path: 'postAritcle',
        component:PostAritcle
       },
       {
        path: 'ManageAritcle',
        component:ManageAritcle
       }
     ]
    },
    {
      path:'/search',
      component:Search
    },
   
  ]
})
