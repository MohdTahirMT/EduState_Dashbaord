// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Admin from "layouts/admin";
import Teacher from "layouts/teacher";

// @mui icons
import Icon from "@mui/material/Icon";

const token = localStorage.getItem("accessToken");

const routes = 

  token ?
  [
    {
      type: "collapse",
      name: "Dashboard",
      key: "dashboard",
      icon: <Icon fontSize="small">dashboard</Icon>,
      route: "/dashboard",
      component: <Dashboard />,
    },
    {
      type: "collapse",
      name: "Admin",
      key: "admin",
      icon: <Icon fontSize="small">admin_panel_settings</Icon>,
      route: "/admin",
      component: <Admin />,
    },
    {
      type: "collapse",
      name: "Teacher",
      key: "teacher",
      icon: <Icon fontSize="small">school</Icon>,
      route: "/teacher",
      component: <Teacher />,
    }
  ] :
  [
    {
      type: "collapse",
      name: "Dashboard",
      key: "dashboard",
      icon: <Icon fontSize="small">dashboard</Icon>,
      route: "/dashboard",
      component: <Dashboard />,
    },
  ]

export default routes;
