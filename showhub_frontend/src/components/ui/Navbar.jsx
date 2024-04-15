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
  IconMovie,
  IconTicket,
  IconLogout2
} from '@tabler/icons-react';
//import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './NavbarSimpleColored.module.css';
import BigLogo from './BigLogo';
import { useNavigate } from 'react-router-dom';



const data = [
  { link: '/home', label: 'Movies', icon: IconMovie },
  { link: '', label: 'Past Bookings', icon: IconTicket },
  { link: '', label: 'Settings', icon: IconSettings },
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

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}