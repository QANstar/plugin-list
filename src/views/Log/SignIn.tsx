import { Button, Form, Input, message } from "antd";
import store from "../../store";
import style from "./style.module.sass";
import * as Api from "../../service/api";
import { ILogin, IRegisterInput, IUser } from "../../type/type";
import { useNavigate } from "react-router-dom";

interface Props {
  changeLog: (isLogin: boolean) => void;
}

const SignIn = (props: Props) => {
  const navigate = useNavigate();
  const onFinish = async (values: IRegisterInput) => {
    if (values.password === values.re_password) {
      try {
        let res = await Api.signUp(values);
        if (res.status === 200) {
          message.success("注册成功");
          props.changeLog(true);
        }
      } catch (error) {
        message.error(error as string);
      }
    } else {
      message.error("两次密码输入不相同");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={style.log_form}>
      <div className={style.log_title}>注册</div>
      <Form
        className={style.signForm}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
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
        <Form.Item
          name="re_password"
          rules={[{ required: true, message: "请再次输入密码" }]}
        >
          <Input.Password placeholder="请再次输入密码" />
        </Form.Item>
        <Form.Item>
          <Button className={style.log_btn} type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
