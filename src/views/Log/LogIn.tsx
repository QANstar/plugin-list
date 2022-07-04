import { Button, Form, Input, message } from "antd";
import store from "../../store";
import style from "./style.module.sass";
import * as Api from "../../service/api";
import { ILogin, IUser } from "../../type/type";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const onFinish = async (values: ILogin) => {
    try {
      let res = await Api.signin(values);
      if (res.status === 200) {
        store.user.setToken(res.data);
        let userRes = await Api.getUserInfo();
        let userData: IUser = {
          token: res.data,
          email: userRes.data.email,
          userName: userRes.data.userName,
        };
        store.user.setUser(userData);
        navigate("/");
      }
    } catch (error) {
      message.error("账号或密码错误");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={style.log_form}>
      <div className={style.log_title}>登录</div>
      <Form
        className={style.signForm}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "请输入邮箱" }]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
          <Button className={style.log_btn} type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LogIn;
