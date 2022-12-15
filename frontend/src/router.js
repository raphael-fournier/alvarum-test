import Vue from "vue";
import Router from "vue-router";
import NotFound from "./pages/_notFound";
import store from "./store";

// const PassThrough = {
//   render(c) {
//     return c("router-view");
//   },
// };

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      components: {
        default: require("./pages/_layout.user").default,
      },
      children: [
        {
          path: "/",
          components: {
            default: require("./pages/home").default,
          },
        },
        {
          path: "/logout",
          meta: {
            public: true,
          },
          beforeEnter: async () => {
            await store.dispatch("LOGOUT");
          },
        },
        {
          path: "/signin/:type?",
          components: {
            default: require("./pages/signin").default,
          },
          meta: {
            public: true,
          },
          beforeEnter: (to, from, next) => {
            if (store.state.me) {
              next("/");
            } else {
              next();
            }
          },
        },
      ],
    },
    {
      path: "/*",
      component: NotFound,
      meta: {
        public: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.query && to.query.auth) {
    store.commit("AUTH", { access_token: to.query.auth });
    let query = Object.assign({}, to.query);
    delete query.auth;
    router.replace({ path: to.path, query: query });
    return;
  }
  if (isPublicPath(to)) {
    return next();
  }
  store.dispatch("AUTHENTICATE").then(() => {
    if (store.state.me) {
      next();
    } else {
      next({
        path: "signin/smsCode",
        replace: true,
      });
    }
  });
});

const isPublicPath = (to) => {
  for (let i = to.matched.length - 1; i >= 0; i--) {
    if (to.matched[i].meta.public !== undefined) {
      return to.matched[i].meta.public;
    }
  }
  return null;
};

export default router;
