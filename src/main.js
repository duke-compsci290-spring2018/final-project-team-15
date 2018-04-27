// only need to import bootstrap here for all components to have access to it
import 'bootstrap/dist/css/bootstrap.css'
import 'firebaseui/dist/firebaseui.css'
// import site specific global styles AFTER bootstrap
import './assets/css/style.css'

import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App.vue'
import Profile from './Profile.vue'
import { MAP_KEY } from './keys.js'

// turn off the console note about switching to production mode
Vue.config.productionTip = false

// explicit installation required in module environments
Vue.use(VueFire)

new Vue({
    el: '#app',
    // components (HTML, CSS, and JS) used by this app
    components: {
        App
    },
    // simply render the app component as this app
    template: '<App/>'
})

/*
new Vue({
    el: '#profile',
    // components (HTML, CSS, and JS) used by this app
    components: {
        Profile
    },
    // simply render the app component as this app
    template: '<Profile/>'
})
*/
