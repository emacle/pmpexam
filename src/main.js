import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { $http } from '@/common/http'

import { Button, Tag, NavBar, ActionSheet } from 'vant'
Vue.use(Button)
Vue.use(Tag)

Vue.use(NavBar)
Vue.use(ActionSheet)
import { Sticky } from 'vant';

Vue.use(Sticky);
import { DropdownMenu, DropdownItem } from 'vant';

Vue.use(DropdownMenu);
Vue.use(DropdownItem);
import { Popup } from 'vant';

Vue.use(Popup);
import { Cell, CellGroup } from 'vant';

Vue.use(Cell);
Vue.use(CellGroup);
import { Grid, GridItem } from 'vant';

Vue.use(Grid);
Vue.use(GridItem);
import { Col, Row } from 'vant';

Vue.use(Col);
Vue.use(Row);
import { List } from 'vant';

Vue.use(List);

import VueClipboard from 'vue-clipboard2' 
Vue.use(VueClipboard)

Vue.config.productionTip = false
Vue.prototype.$http = $http

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
