import type { UserRole } from '@slink/lib/auth/Type/UserRole';

type UserDropdownGroup = {
  title: string;
  access: UserRole[];
  items: UserDropdownItem[];
  badge?: string;
};

type UserDropdownItem = {
  title: string;
  access: string[];
  icon: string;
  link: string;
  state?: 'active' | 'inactive' | 'hidden';
  badge?: string;
};

export const UserDropdownItems: UserDropdownGroup[] = [
  {
    title: 'Admin',
    access: ['ADMIN_ROLE'],
    badge: 'Coming Soon',
    items: [
      {
        title: 'Dashboard',
        access: ['ADMIN_ROLE'],
        icon: 'solar:graph-line-duotone',
        link: '/admin',
        state: 'inactive',
      },
      {
        title: 'Settings',
        access: ['ADMIN_ROLE'],
        icon: 'mingcute:settings-7-line',
        link: '/admin/settings',
        state: 'inactive',
      },
    ],
  },
  {
    title: 'Account',
    access: ['USER_ROLE'],
    items: [
      {
        title: 'View Profile',
        access: ['USER_ROLE', 'ADMIN_ROLE'],
        icon: 'ph:user',
        link: '/profile',
        state: 'active',
      },
      {
        title: 'Upload History',
        access: ['USER_ROLE', 'ADMIN_ROLE'],
        icon: 'material-symbols-light:history',
        link: '/history',
        state: 'active',
      },
    ],
  },

  {
    title: 'System',
    access: ['USER_ROLE', 'ADMIN_ROLE'],
    items: [
      {
        title: 'About',
        access: ['USER_ROLE', 'ADMIN_ROLE'],
        icon: 'material-symbols-light:conversion-path',
        link: '/about',
        state: 'hidden',
      },
      {
        title: 'Logout',
        access: ['USER_ROLE', 'ADMIN_ROLE'],
        icon: 'solar:logout-line-duotone',
        link: '/logout',
        state: 'active',
      },
    ],
  },
];
