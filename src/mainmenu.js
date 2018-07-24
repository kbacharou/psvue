let generateMainMenu = (highlight) => {
  let menu = {
    home: {
      to: {
        path: '/',
      },
      name: 'Home',
    },
    search: {
      to: {
        path: '/search',
      },
      name: 'Search',
    },
    new: {
      to: {
        path: '/playlist/new',
      },
      name: 'New',
    },
    import: {
      to: {
        path: '/playlist/import',
      },
      name: 'Import',
    },
    settings: {
      to: {
        path: '/settings',
      },
      name: 'Settings',
    },
  };

  menu[highlight].isActive = true;

  return menu;
};

export default generateMainMenu;
