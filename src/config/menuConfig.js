/*
* 导航菜单配置
*/
const menuList = [
    {
        title: 'Home',
        key: 'home',
        path: '/admin/home',
        icon: 'HomeOutlined'
    },
    {
        title: 'Appstore',
        key: 'prod_about',
        path: '/admin/products',
        icon: 'AppstoreOutlined',
        children: [
            {
                title: 'Category',
                key: 'category',
                path: '/admin/prod_about/category',
                icon: 'BarsOutlined',
            },
            {
                title: 'Product',
                key: 'product',
                path: '/admin/prod_about/product',
                icon: 'ToolOutlined',
            }
        ]
    },
    {
        title: 'User',
        key: 'user',
        path: '/admin/user',
        icon: 'UserOutlined'
    },
    {
        title: 'Role',
        key: 'role',
        path: '/admin/role',
        icon: 'SafetyOutlined'
    },
    {
        title: 'Charts',
        key: 'charts',
        path: '/admin/charts',
        icon: 'AreaChartOutlined',
        children: [
            {
                title: 'Bar',
                key: 'bar',
                path: '/admin/charts/bar',
                icon: 'BarChartOutlined',
            },
            {
                title: 'Line',
                key: 'line',
                path: '/admin/charts/line',
                icon: 'LineChartOutlined',
            },
            {
                title: 'Pie',
                key: 'pie',
                path: '/admin/charts/pie',
                icon: 'PieChartOutlined',
            }
        ]
    },
]

export default menuList;
