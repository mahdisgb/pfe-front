
import React from 'react'
import { Button, Layout, Menu, MenuProps, theme, Tooltip } from "antd"
import { useEffect, useState } from "react"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  CalendarOutlined,
  PlusCircleOutlined,
  TeamOutlined,
  DatabaseOutlined,
  PicCenterOutlined,
  CarOutlined,
  UserOutlined,
  ApartmentOutlined,
  ScheduleOutlined,
  RocketOutlined,
  EnvironmentOutlined,
  ShopOutlined,
  WalletOutlined,
  CustomerServiceOutlined,
  BuildOutlined,
  HomeOutlined,
  BankOutlined,
  BlockOutlined,
  RocketFilled,
  WindowsOutlined,
  SwapOutlined,
  ContainerOutlined,
  ApiOutlined,
  DashboardOutlined,
  FileAddOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
  ToolOutlined,
  IdcardOutlined,
  ThunderboltOutlined,
  AuditOutlined,
  DollarOutlined,
  UsergroupAddOutlined,
  AimOutlined,
  GlobalOutlined,
  CompassOutlined,
  HddOutlined,
  KeyOutlined,
  TagOutlined,
  ShoppingOutlined,
  SolutionOutlined,
  ClusterOutlined,
  CoffeeOutlined,
  GoldOutlined,
  InboxOutlined,
  CreditCardOutlined,
  CarryOutOutlined,
  SafetyOutlined,
  GiftOutlined,
  FundOutlined,
  DeploymentUnitOutlined,
  DiffOutlined
} from "@ant-design/icons"
import { Link, useNavigate, useLocation } from "react-router-dom"

import "./SideBar.css"
import { Blocks, Building, Building2, CompassIcon, Fuel, FuelIcon, Hotel, LocateIcon, Plane, PlaneIcon, PlaneTakeoff, Server, Stamp, TicketCheck, User2Icon } from "lucide-react"

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false)
  const { Sider } = Layout
  const navigate = useNavigate()
  const location = useLocation()

  type MenuItem = Required<MenuProps>["items"][number]


  const {
    token: { colorBgContainer },
  } = theme.useToken()

//   function getItem(
//     label: React.ReactNode,
//     key?: React.Key | null,
//     icon?: React.ReactNode,
//     children?: MenuItem[],
//     user?: IAppUser,
//     theme?: "light"
//   ): MenuItem {
//     return {
//       key,
//       icon,
//       children,
//       user,
//       label,
//       theme,
//     } as MenuItem
//   }

  const items = [
   
    {
      key: 'infield-manifest',
      icon: <FileTextOutlined />,
      label: 'Infield Manifest',
      onClick: () => navigate("/skystay/infield-manifest"),
      roles:["Admin", "Administrator", "HR", "AviationManager", "AviationTeam", "DepartmentAssistant"]
    },
     {
      key: 'aviation-operations',
      icon: <RocketOutlined />,
      label: 'Aviation Operations',
      children: [
        
        {
          key: 'journey-management',
          icon: <CarOutlined />,
          label: 'Journey Management',
          children: [
            {
              key: 'journey-requests',
              icon: <FileAddOutlined />,
              label: 'Journey Request',
              onClick: () => navigate("/skystay/journeys/assistant"),
              roles:["Admin", "Administrator", "HR", "AviationManager", "AviationTeam", "DepartmentAssistant"]
            },
          ]
        },
      ]
    },
    

    {
        key: 'courses',
        // icon: <FileTextOutlined />,
        label: 'Courses',
        // onClick: () => navigate("/skystay/infield-manifest"),
        // roles:["Admin", "Administrator", "HR", "AviationManager", "AviationTeam", "DepartmentAssistant"]
      },
  ]


//   const filterMenuItemsByRole = (items) => {
//     if (!items) return [];
    
//     return items
//       .filter(item => {
//         if (!item.roles || item.roles.length === 0) {
//           return true;
//         }
        
//         return item.roles.some(role => user.roles.includes(role));
//       })
//       .map(item => {
//         if (item.children && item.children.length > 0) {
//           const filteredChildren = filterMenuItemsByRole(item.children);
          
//           return {
//             ...item,
//             children: filteredChildren
//           };
//         }
        
//         return item;
//       })
//       .filter(item => {
//         if (item.children) {
//           return item.children.length > 0;
//         }
//         return true;
//       });
//   };
  
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={280}
      style={{
        background: '#ccc',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        height: '100%',
      }}
      className="sidebar-container"
      theme="light"
      trigger={null}
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
        <span className="text-slate-600 font-medium flex items-center">
          {!collapsed && (
            <>
              SKY STAY
            </>
          )}
        </span>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger-icon',
          onClick: () => setCollapsed(!collapsed),
          style: {
            fontSize: '15px',
            color: '#475569',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '6px',
            transition: 'all 0.2s ease'
          }
        })}
      </div>
      <Menu
        mode="inline"
        theme="light"
        defaultSelectedKeys={[location.pathname.split('/')[2] || 'dashboard']}
        defaultOpenKeys={[location.pathname.split('/')[2]]}
        style={{
          borderRight: 0,
          padding: '12px 8px',
        //   height: 'calc(100vh - 64px)',
          overflowY: 'auto',
          background:"#ccc"
        }}
        items={items}
        className="custom-sidebar-menu"
      />
    </Sider>
  );
}
