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
            },

            {
                path: '/takeouts/orders/index',
                name: 'TakoutOrder',
                component:()=>import('../views/takeouts/orders/index.vue')
            },
            {
                path: '/takeouts/orders/show',
                name: 'TakeoutOrderShow',
                component:()=>import('../views/takeouts/orders/show.vue')
            },
            {
                path: '/takeouts/restaurants/index',
                name: 'TakeoutRestaurant',
                component:()=>import('../views/takeouts/restaurants/index.vue')
            },
            {
                path: '/takeouts/restaurants/edit',
                name: 'TakeoutRestaurantEdit',
                component:()=>import('../views/takeouts/restaurants/edit.vue')
            }
        
        ]
    },
    
    
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
