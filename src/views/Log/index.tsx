import { Button } from "antd";
import { useState } from "react";
import LogIn from "./LogIn";
import SignIn from "./SignIn";
import style from "./style.module.sass";

const Log = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  return (
    <div className={style.main}>
      <div className={style.container}>
        <div
          style={
            isLogin
              ? { transform: "translateX(0%)" }
              : { transform: "translateX(80%)" }
          }
          className={style.move_card}
        >
          {isLogin ? (
            <LogIn />
          ) : (
            <SignIn
              changeLog={(isLoginP) => {
                setIsLogin(isLoginP);
              }}
            />
          )}
        </div>
        <div className={style.log_content}>
          <div className={style.hint}>
            <div className={style.title}>插件管理系统</div>
            <div className={style.info_text}>已经拥有账号?</div>
            <Button onClick={() => setIsLogin(true)}>登录</Button>
          </div>
          <div className={style.hint}>
            <div className={style.title}>插件管理系统</div>
            <div className={style.info_text}>未拥有账号?</div>
            <Button onClick={() => setIsLogin(false)}>注册</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Log;
