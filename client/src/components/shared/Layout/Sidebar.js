import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout successfully");
    navigate("/login");
  };

  const logoStyle = { height: '56px' };
  const iconStyle = { width: "30px", height: "30px" };

  const renderListItems = () => {
    const items = {
      organisation: [
        { icon: "inventory.png", text: "Inventory", link: "/" },
        { icon: "donar.png", text: "Donar", link: "/donar" },
        { icon: "hospital.png", text: "Hospital", link: "/hospital" },
      ],
      admin: [
        { icon: "donar-list.png", text: "Donar List", link: "/donar-list" },
        { icon: "hospital-list.jpg", text: "Hospital List", link: "/hospital-list" },
        { icon: "org-list.png", text: "Organisation List", link: "/org-list" },
      ],
      donar: [
        { icon: "organisation.png", text: "Organisation", link: "/organisation" },
        { icon: "donation.png", text: "Donation", link: "/donation" },
      ],
      hospital: [
        { icon: "organisation.png", text: "Organisation", link: "/organisation" },
        { icon: "consumer.png", text: "Consumer", link: "/consumer" },
      ],
    };

    return (items[user?.role] || []).map(({ icon, text, link }) => (
      <ListItem
        key={text}
        sx={{ py: 1, px: 0 }}
        component={Link}
        to={link}
        underline="none"
        color="inherit"
      >
        <ListItemIcon>
          <img src={`/assets/images/icons/${icon}`} style={iconStyle} alt={`${text} Icon`} />
        </ListItemIcon>
        <ListItemText sx={{ mr: 2 }} primary={text} />
      </ListItem>
    ));
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'end', height: 60 }}>
        <Button component="a" href="/">
          <img src="/assets/images/logo.png" style={logoStyle} alt="Website's logo" />
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', maxWidth: 500 }}>
        <List disablePadding>
          <Box sx={{ display: 'flex', flexDirection: { sm: 'column', md: 'row' }, alignItems: 'center', gap: '4px' }}>
            <Typography variant="body1">
              {user?.name || user?.hospitalName || user?.organisationName}
            </Typography>
            <Chip label={user?.role} />
          </Box>
          {renderListItems()}

          {(location.pathname === "/admin") ? (
            <></>
          ) : (
            (location.pathname === "/" || location.pathname === "/donar" || location.pathname === "/hospital") ? (
              <ListItem sx={{ py: 1, px: 0 }} component={Link} to={"/analytics"} underline="none" color="inherit">
                <ListItemIcon>
                  <img src={`/assets/images/icons/analysis.png`} style={iconStyle} alt="Analytics icon" />
                </ListItemIcon>
                <ListItemText sx={{ mr: 2 }} primary={"Analytics"} />
              </ListItem>
            ) : (
              <ListItem sx={{ py: 1, px: 0 }} component={Link} to={"/"} underline="none" color="inherit">
                <ListItemIcon>
                  <img src={`/assets/images/icons/home.png`} style={iconStyle} alt="Home icon" />
                </ListItemIcon>
                <ListItemText sx={{ mr: 2 }} primary={"Home"} />
              </ListItem>
            )
          )}

          <ListItem>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default Sidebar;
