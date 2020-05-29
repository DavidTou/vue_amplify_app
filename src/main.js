import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Configure Amplify
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

Amplify.configure(aws_exports);

new Vue({
  render: h => h(App),
}).$mount('#app')
