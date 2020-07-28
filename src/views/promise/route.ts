const promise = () => import('./index.vue')
const detail = () => import('./detail.vue')

module.exports = [
  {
    path: 'promise',
    name: 'promise',
    component: promise,
    children: [
      {
        path: 'detail',
        name: 'promiseDetail',
        component: detail,
      },
    ],
  },
]
