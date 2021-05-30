import { createRouter, createWebHashHistory } from "vue-router";
import login from "../views/acount/login";
import layout from "../views/layout"
import i18n from "@/language/index.js"
const t =(val)=>{
  return i18n.global.t(val)
}
const routes = [
  {
    path: "/",
    name: "Home",
    redirect:"login",
    meta:{
      hidden:true,
      name:"主页"
    }
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta:{
      hidden:true,
      name:"登陆"
    }
  },
  {
    path: "/registered",
    name: "registered",
    meta:{
      hidden:true,
      name:"注册"
    },
    component: () =>import( "../views/acount/registered.vue")
  },
  {
    path: "/forgotPasd",
    name: "forgotPasd",
    meta:{
      hidden:true,
      name:"忘记密码",

    },
    component: () =>import( "../views/acount/forgotPasd.vue")
  },
  {
    path: "/index",
    name: "index",
    redirect:"home",
    component:layout,
    meta:{
      name:t("aside.home"),
      icon:"icon-yibiaopan"
    },
    children:[
      {
        path: "/home",
        name: "home",
        meta:{
          name:t("aside.home"),
        },
        component: () =>import( "../views/home")
      }
    ]
  },
  {
    path: "/managementALl",
    name: "managementALl",
    component:layout,
    redirect:"Role",
    meta:{
      icon:"icon-icon-test30",
      name:t("aside.managementALl"),
    },
    children:[
      {
        path: "/role",
        name: "Role",
        meta:{
          name:t("aside.role"),
        },
        component: () =>import( "../views/managementALl/role"),
      },
      {
        path: "/userList",
        name: "UserList",
        meta:{
          name:t("aside.userList"),
        },
        component: () =>import( "../views/managementALl/userList"),

      },
      {
        path: "/menuMangent",
        name: "MenuMangent",
        meta:{
          name:t("aside.menuMangent"),
        },
        component: () =>import( "../views/managementALl/menuMangent"),
      },
    ]
  },
  {
    path: "/infoMangent",
    name: "InfoMangent",
    component:layout,
    meta:{
      icon:"icon-icon-test9",
      name:t("aside.infoMangent"),
    },
    redirect:"infoList",
    children:[
      {
        path: "/infoList",
        name: "InfoList",
        meta:{
          name:t("aside.infoList"),
        },
        component: () =>import( "../views/infoMangent/infoList"),
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta:{
          name:t("aside.infoCategory"),
        },
        component: () =>import( "../views/infoMangent/infoCategory"),
      }
    ]
  },
  {
    path: "/productMangent",
    name: "ProductMangent",
    component:layout,
    meta:{
      name:t("aside.productMangent"),
      icon:"icon-icon-test7",
    },
    redirect:"productList",
    children:[
      {
        path: "/productList",
        name: "ProductList",
        meta:{
          name:t("aside.productList"),
        },
        component: () =>import( "../views/productMangent/productList"),
      },
      {
        path: "/productCtegory",
        name: "ProductCtegory",
        meta:{
          name:t("aside.productCtegory"),
        },
        component: () =>import( "../views/productMangent/productCtegory"),
        
      }
    ]
  },
  {
    path: "/vipMangent",
    name: "VipMangent",
    redirect:"vipMangent",
    component:layout,
    meta:{
      icon:"icon-icon-test35",
      name:t("aside.vipMangent")
    },
    children:[
      {
        path: "/vipMangent",
        name: "VipMangent",
        component: () =>import( "../views/vipMangent"),
        meta:{
          name:t("aside.vipMangent")
        },
      }
    ]
  }

  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


export default router;
