import React, { useState } from "react";
import { Input, Form, Checkbox, Button } from "antd";
import "./login.css";
import { useParams, Link } from "react-router-dom";

const Login = (props) => {
  const layout = {
    labelCol: { span: 90 },
    wrapperCol: { span: -10 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const [validPassword, setValidPassword] = useState(false);
  const [valid1, setValid1] = useState(true);
  const [valid2, setValid2] = useState(true);
  const [change, setChange] = useState("");

  const onFinish = (values) => {
    console.log(values);
    if (values.password === "123456") {
      console.log("yofi");
      setValidPassword(true);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onchange = () => {
    setChange(change);
  };

  return (
    <div className="border">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onFieldsChange={onchange}
      >
        <Form.Item
          name="password"
          rules={[{ required: true, message: "הכנס סיסמה" }]}
        >
          <Input
            className="enterPassword"
            placeholder="הכנס את הסיסמה 123456 ולחץ פעמיים על כפתור השליחה"
            type="password"
          />
        </Form.Item>
        {!validPassword && (
          <Button className="send" type="primary" htmlType="submit">
            שלח
          </Button>
        )}
        {validPassword && (
          <Link to="/changeServer">
            <Button className="send" type="primary" htmlType="submit">
              שלח
            </Button>
          </Link>
        )}

        {(close) => <div></div>}

        <br />
        <br />
        <Link to="/" className="linkShop">
          בחזרה לחנות
        </Link>
      </Form>
    </div>
  );
};

export default Login;
