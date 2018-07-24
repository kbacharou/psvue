import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import PlaylistImportView from '@/components/PlaylistImportView'
import PlaylistView from '@/components/PlaylistView'
import SearchView from '@/components/SearchView'
import Settings from '@/components/Settings'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/playlist/import',
      name: 'PlaylistImport',
      component: PlaylistImportView
    },
    {
      path: '/playlist/view/:id/:filter?',
      name: 'PlaylistView',
      component: PlaylistView
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/search',
      name: 'Search',
      component: SearchView
    },
  ],
});
