import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/goods',
  name: 'goods',
  meta,
  redirect: { name: 'goods-page' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'brandmanager', name: `${pre}brandmanager`, component: () => import('@/pages/goodsmanager/brandmanager'), meta: { ...meta, title: '品牌管理' } },
    { path: 'categorymanager', name: `${pre}categorymanager`, component: () => import('@/pages/goodsmanager/categorymanager'), meta: { ...meta, title: '分类管理' } },
    { path: 'goodsmanager', name: `${pre}goodsmanager`, component: () => import('@/pages/goodsmanager/goodsmanager'), meta: { ...meta, title: '商品管理' } }
  ])('goods')
}
