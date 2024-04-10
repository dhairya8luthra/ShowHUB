import { Button, Menu, Text, rem, useMantineTheme } from '@mantine/core';
import {
   IconUser,
  IconChevronDown,
  IconUserPentagon,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export default function ButtonLogin() {
  const theme = useMantineTheme();
  return (
    <Menu
      transitionProps={{ transition: 'pop-top-right' }}
      position="top-end"
      width={220}
      withinPortal
    >
      <Menu.Target>
      
        <Button
          rightSection={
            <IconChevronDown style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          }
          pr={12}
        variant='filled' color='yellow'>
          Login
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
       
        
        
        <Menu.Item
          leftSection={
            <IconUser
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.violet[6]}
              stroke={1.5}
            />
          }
        >
          <Link to={'/login'}>
          Login as User
          </Link>
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconUserPentagon
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.violet[6]}
              stroke={1.5}
            />
          }
        >
          <Link to={'/Adminlogin'}>
          Login as Admin
          </Link>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}