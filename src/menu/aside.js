// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '商品管理',
    icon: 'folder-o',
    children: [
      { path: '/goods/brandmanager', title: '品牌管理' },
      { path: '/goods/categorymanager', title: '分类管理' },
      { path: '/goods/goodsmanager', title: '商品管理' }
    ]
  }
]
