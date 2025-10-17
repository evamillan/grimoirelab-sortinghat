export default [
  {
    path: "",
    name: "Dashboard",
    component: () => import("../../src/views/Dashboard.vue"),
    meta: {
      requiresAuth: true, 
      title: "Identities - GrimoireLab"
    },
  },
  {
    path: "organization/:name",
    name: "Organization",
    component: () => import("../../src/views/Organization.vue"),
    meta: {
      breadcrumb: {
        title: '',
        param: 'name'
      }
    }
  },
  {
    path: "individual/:mk",
    name: "Individual",
    component: () => import("../../src/views/Individual.vue"),
    meta: {
      breadcrumb: {
        title: 'Identity',
        param: 'mk'
      }
    }
  },
  {
    path: "/search-help",
    name: "SearchHelp",
    component: () => import("../../src/views/SearchHelp.vue"),
    meta: { title: "Search Help - GrimoireLab" },
  },
]