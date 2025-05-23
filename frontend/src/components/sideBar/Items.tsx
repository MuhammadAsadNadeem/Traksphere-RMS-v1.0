import RouteOutlinedIcon from "@mui/icons-material/RouteOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import TrafficOutlinedIcon from "@mui/icons-material/TrafficOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { routes } from "../../routes";

export const adminMenu = [
  {
    label: "Dashboard",
    icon: <DashboardOutlinedIcon />,
    view: routes.Dashboard,
  },
  {
    label: "Bus Status",
    icon: <LocationOnOutlinedIcon />,
    view: routes.busStatus,
  },
  {
    label: "User Management",
    icon: <GroupsOutlinedIcon />,
    view: routes.userManagement,
  },
  {
    label: "Driver Management",
    icon: <PersonAddAltOutlinedIcon />,
    view: routes.driverManagement,
  },
  {
    label: "Stops Management",
    icon: <TrafficOutlinedIcon />,
    view: routes.stopManagement,
  },
  {
    label: "Route Management",
    icon: <RouteOutlinedIcon />,
    view: routes.routeManagement,
  },
  {
    label: "Email Messages",
    icon: <EmailOutlinedIcon />,
    view: routes.emailMessages,
  },
  {
    label: "Account Settings",
    icon: <SettingsOutlinedIcon />,
    view: routes.changePassword,
  },
  // {
  //   label: "Logout",
  //   icon: <LogoutOutlinedIcon />,
  //   view: "logout",

  // },
];

export const userMenu = [
  {
    label: "Dashboard",
    icon: <DashboardOutlinedIcon />,
    view: routes.Dashboard,
  },
  {
    label: "Live Tracking",
    icon: <LocationOnOutlinedIcon />,
    view: routes.liveTracking,
  },
  {
    label: "Routes",
    icon: <RouteOutlinedIcon />,
    view: routes.routesDetails,
  },
  {
    label: "Profile",
    icon: <PersonIcon />,
    view: routes.userProfile,
  },
  {
    label: "Account Settings",
    icon: <SettingsOutlinedIcon />,
    view: routes.changePassword,
  },
  // {
  //   label: "Logout",
  //   icon: <LogoutOutlinedIcon />,
  //   view: "logout",

  // },
];
