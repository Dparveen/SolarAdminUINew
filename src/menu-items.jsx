const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/dashboard',
          roles: [0, 1, 2]
        },
        {
          id: 'department',
          title: 'Department',
          type: 'item',
          icon: 'feather icon-briefcase',
          url: '/department',
          roles: [0]
        },
        {
          id: 'staff',
          title: 'Staff',
          type: 'item',
          icon: 'feather icon-users',
          url: '/staff',
          roles: [0,2]
        },
        {
          id: 'inquery',
          title: 'Inquery',
          type: 'item',
          icon: 'feather icon-list',
          url: '/inquery',
          roles: [0, 1, 2]
        },
        {
          id: 'location',
          title: 'Loaction',
          type: 'item',
          icon: 'feather icon-map-pin',
          url: '/location',
          roles: [0]
        },
        {
          id: 'discom',
          title: 'Discom',
          type: 'item',
          icon: 'feather icon-list',
          url: '/discom',
          roles: [0]
        },
        {
          id: 'scheme',
          title: 'Scheme',
          type: 'item',
          icon: 'feather icon-list',
          url: '/schemes',
          roles: [0]
        },
        {
          id: 'questions',
          title: 'Questions',
          type: 'item',
          icon: 'feather icon-help-circle',
          url: '/questions',
          roles: [0]
        },
        {
          id: 'material',
          title: 'Materials',
          type: 'item',
          icon: 'feather icon-codepen',
          url: '/materials',
          roles: [0]
        },
        {
          id: 'profile',
          title: 'Profile',
          type: 'item',
          icon: 'feather icon-user',
          url: '/profile',
          roles: [0, 1, 2]
        }
      ]
    },
    // {
    //   id: 'utilities',
    //   title: 'Utilities',
    //   type: 'group',
    //   icon: 'icon-ui',
    //   children: [
    //     {
    //       id: 'component',
    //       title: 'Component',
    //       type: 'collapse',
    //       icon: 'feather icon-box',
    //       children: [
    //         {
    //           id: 'button',
    //           title: 'Button',
    //           type: 'item',
    //           url: '/basic/button'
    //         },
    //         {
    //           id: 'badges',
    //           title: 'Badges',
    //           type: 'item',
    //           url: '/basic/badges'
    //         },
    //         {
    //           id: 'breadcrumb-pagination',
    //           title: 'Breadcrumb & Pagination',
    //           type: 'item',
    //           url: '/basic/breadcrumb-pagination'
    //         },
    //         {
    //           id: 'collapse',
    //           title: 'Collapse',
    //           type: 'item',
    //           url: '/basic/collapse'
    //         },
    //         {
    //           id: 'typography',
    //           title: 'Typography',
    //           type: 'item',
    //           url: '/basic/typography'
    //         },
    //         {
    //           id: 'tooltip-popovers',
    //           title: 'Tooltip & Popovers',
    //           type: 'item',
    //           url: '/basic/tooltip-popovers'
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   id: 'auth',
    //   title: 'Authentication',
    //   type: 'group',
    //   icon: 'icon-pages',
    //   children: [
    //     {
    //       id: 'sign in',
    //       title: 'Login',
    //       type: 'item',
    //       icon: 'feather icon-lock',
    //       url: '/auth/signin',
    //       target: true,
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'sign Up',
    //       title: 'Register',
    //       type: 'item',
    //       icon: 'feather icon-log-in',
    //       url: '/auth/signup',
    //       target: true,
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'reset-pass',
    //       title: 'Reset Password',
    //       type: 'item',
    //       icon: 'feather icon-unlock',
    //       url: '/auth/reset-password',
    //       target: true,
    //       breadcrumbs: false
    //     }
    //   ]
    // },
    // {
    //   id: 'support',
    //   title: 'Support',
    //   type: 'group',
    //   icon: 'icon-support',
    //   children: [
    //     {
    //       id: 'sample-page',
    //       title: 'Sample Page',
    //       type: 'item',
    //       url: '/sample-page',
    //       classes: 'nav-item',
    //       icon: 'feather icon-sidebar'
    //     },
    //     {
    //       id: 'documentation',
    //       title: 'Documentation',
    //       type: 'item',
    //       icon: 'feather icon-help-circle',
    //       classes: 'nav-item',
    //       url: 'https://codedthemes.gitbook.io/gradient-able-react/',
    //       target: true,
    //       external: true
    //     }
    //   ]
    // }
  ]
};

export default menuItems;
