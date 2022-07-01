import { Observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import style from "./style.module.sass";
import store from "../../store";
import { Dropdown, Menu } from "antd";

function MainLayout() {
  const user = store.user;
  const navigate = useNavigate();
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <div
              onClick={() => {
                user.init();
                navigate("/log");
              }}
            >
              退出登录
            </div>
          ),
        },
      ]}
    />
  );
  return (
    <Observer>
      {() => (
        <div>
          <header className={style.top_nav}>
            <Nav
              behind={
                <Dropdown overlay={menu}>
                  <div className={style.user_name}>{user.userName}</div>
                </Dropdown>
              }
            />
          </header>
          <main className={style.main_layout_main}>
            <Outlet />
          </main>
        </div>
      )}
    </Observer>
  );
}

export default MainLayout;
