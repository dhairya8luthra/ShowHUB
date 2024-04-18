import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconBrandGoogleAnalytics,
  IconTicket,
  IconLogout2
} from '@tabler/icons-react';
//import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './NavbarSimpleColored.module.css';
import BigLogo from './BigLogo';
import { useNavigate } from 'react-router-dom';



const data = [
  { link: '/home', label: 'MODIFY DATABASE', icon: IconDatabaseImport },
  { link: '', label: 'ANALYTICS', icon: IconBrandGoogleAnalytics },
  { link: '', label: 'Log out', icon: IconLogout2},
];



export default function NavbarSimpleColored() {
  const [active, setActive] = useState('Billing');
  const navigate = useNavigate();
  

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
        <BigLogo></BigLogo>
      <div className={classes.navbarMain}>
        
        <Group className={classes.header} justify="space-between">
          
          
        </Group>
        {links}
      </div>
    </nav>
  );
}