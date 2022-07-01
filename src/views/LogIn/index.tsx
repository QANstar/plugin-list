import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import * as Api from "../../service/api";
import { ILogin, IUser } from "../../type/type";
import style from "./style.module.sass";
import store from "../../store/index";
function LogIn() {
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
    <div className={style.signMain}>
      <div className={style.signContent}>
        <div className={style.signContentLeft}>
          <div className={style.signTitle}>插件管理</div>
          <Form
            className={style.signForm}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="邮箱"
              name="email"
              rules={[{ required: true, message: "请输入邮箱" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
              <Link to="/signup">尚未注册？</Link>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={style.signContentRight}></div>
      </div>
    </div>
  );
}

export default LogIn;
