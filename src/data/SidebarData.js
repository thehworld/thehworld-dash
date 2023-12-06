import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text"
  },

  {
    title: "Orders",
    path: "/orders",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text"
  },
  {
    title: "Products",
    path: "/manage",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text"
  },
  {
    title: "Users",
    path: "/users",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text"
  },
  {
    title: "Offers",
    path: "/offers",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text"
  },
  // {
  //   title: "Blogs",
  //   path: "/blogs",
  //   icon: <IoIcons.IoMdPeople />,
  //   cName: "nav-text"
  // },
  {
    title: "Support/Help",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text"
  },
  {
    title: "Notification",
    path: "/notification",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text"
  }
];
