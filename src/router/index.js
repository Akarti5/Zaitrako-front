import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Catalogue from "../views/Catalogue.vue"
import About from "../views/About.vue"
import Contact from "../views/Contact.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/catalogue",
    name: "Catalogue",
    component: Catalogue,
  },
  {
    path: "/a-propos",
    name: "About",
    component: About,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
