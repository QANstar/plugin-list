import { Observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import style from "./style.module.sass";
import store from "../../store";

function MainLayout() {
  const user = store.user;
  return (
    <Observer>
      {() => (
        <div>
          <header className={style.top_nav}>
            <Nav behind={<div>{user.userName}</div>} />
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
