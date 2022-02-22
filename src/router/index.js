import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Application',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../layouts/application.vue'),
        children: [
            {
                path: '/home',
                name: 'Home',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
            },
            {
                path: '/about',
                name: 'About',
                component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
            },
            {
                path: '/users',
                name: 'User',
                component:()=>import('../views/Users.vue')
            },
            {
                path: '/users/show',
                name: 'UserShow',
                component:()=>import('../views/users/show.vue')
            },

            {
                path: '/admins',
                name: 'Admin',
                component:()=>import('../views/Admins.vue'),
            },
            
            {
                path: '/admins/details',
                name: 'AdminDetails',
                component:()=>import('../views/admins/details.vue'),
            },


            {
                path: '/articles/tags',
                name: 'Tag',
                component:()=>import('../views/articles/tags.vue')
        
            },
            {
                path: '/articles/index',
                name: 'Article',
                component:()=>import('@/views/articles/article.vue')
            }
        
        ]
    },
    
    
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
