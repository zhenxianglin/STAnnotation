import React from "react"
import { Card } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import {connect} from 'react-redux'
import {login} from "../../redux/actions/login_action"

import './index.scss'


function LoginUI (props) {
    const navigate = useNavigate()

    function postRequest(data) {
        axios.post('/backend/login/',{
            data
        }).then(
            function(response) {
                if (response.data['login'] === true) {
                    props.login(response.data)
                    navigate('/home', {
                        replace: true,
                        state: {},
                      })
                } else {
                    alert(response.data['information'])
                }
            },
            function(error) {
                console.log('失败', error)
            }
        )
    }

    const onFinish = (values) => {
        postRequest(values)
    }

    return (
        <div className="login">
            <Card className="login-container">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: '请输入用户名',
                        },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                        ]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        登陆
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}


export default connect(
        state => ({state: state.user}), 
        {login: login}
    )(LoginUI)
