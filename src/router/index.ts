import Vue from 'vue'
import VueRouter from 'vue-router'

const context = require.context('@/views/', true, /\/*\/route\.ts$/)
const keys = context.keys()

const routes: Array<any> = keys.reduce((initial, key) => {
  const module = context(key)
  return initial.concat(module instanceof Array ? module : module.default)
}, [])
const popRoute: Array<any> = [] // 全屏布局的路由界面
const layoutRoute: Array<any> = [] // 使用layout布局的路由界面

/**
 * 通过书写路由type传递区分当前路由使用哪种布局方式
 * 'pop' // 全屏布局的路由界面
 * 'layout' // layout布局的路由界面，一般用于子路由采用layout布局时增加type
 * js处理将不同布局抽离出，放在不同的布局下面
 * @param {*} arr
 */

function getPageRoute (arr: Array<any>) {
  arr.forEach((item) => {
    const copyItem = { ...item }
    const copyChildren: Array<any> = []
    if (copyItem.children) {
      copyItem.children.forEach((t: any) => {
        if (t.type === 'include') {
          copyChildren.push(t)
        }
      })
    }
    copyItem.children = copyChildren
    if (copyItem.type === 'pop') {
      copyItem.meta.type = 'blank'
      popRoute.push(copyItem)
    } else if (copyItem.type !== 'include') {
      layoutRoute.push(copyItem)
    }
    if (item.children && item.children.length > 0) {
      getPageRoute(item.children)
    }
  })
}

getPageRoute(routes)
Vue.use(VueRouter)

const BaseRoutes = [
  {
    path: '/',
    name: 'layout',
    component: () => import(/* webpackChunkName: "about" */ '../views/layout/index.vue'),
    children: [ ...layoutRoute ],
  },
  {
    path: '*',
    name: 'Error',
    component: () => import(/* webpackChunkName: "layout" */ '../views/error/Error.vue'),
  },
]

const router = new VueRouter({
  routes: BaseRoutes,
})

export default router
