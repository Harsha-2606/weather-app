import { createRouter, createWebHistory } from "vue-router";
import GoogleSignIn from "./components/GoogleSignIn.vue";
import WeatherApp from "./components/WeatherApp.vue";
import { auth } from "./firebase";

const routes = [
    {
        path: "/",
        component: GoogleSignIn,
    },
    {
        path: "/app",
        component: WeatherApp,
        meta: { requiresAuth: true},
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

let isAuthChecked = false;

router.beforeEach((to, from, next) => {
    if (!isAuthChecked) {
        auth.onAuthStateChanged((user) => {
            isAuthChecked = true;
            if (to.meta.requiresAuth && !user) {
                next("/");
            } else {
                next();
            }
        });
    } else {
        const user = auth.currentUser;
        if (to.meta.requiresAuth && !user) {
            next("/");
        } else{
            next();
        }
    }
});

export default router;