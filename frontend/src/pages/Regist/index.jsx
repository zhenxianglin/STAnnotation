import React from "react"
import { Card } from 'antd'
import {
    Button,
    Form,
    Input,
} from 'antd'
import { useNavigate } from 'react-router-dom';

import axios from "axios"

import './index.scss'

const formItemLayout = {
    labelCol: {
        xs: {
        span: 24,
        },
        sm: {
        span: 8,
        },
    },
    wrapperCol: {
        xs: {
        span: 24,
        },
        sm: {
        span: 16,
        },
    },
}

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
        span: 24,
        offset: 0,
        },
        sm: {
        span: 16,
        offset: 8,
        },
    },
}


function Regist () {
    const navigate = useNavigate()

    function postRequest(data) {
        axios.post('/backend/regist/',{
            data
        }).then(
            function(response) {
                if (response.data['message'] === true) {
                    navigate('/login', {
                        replace: true,
                        state: {},
                      })
                } else {
                    alert(response.data['information'])
                }
            },
            function(error) {
                alert("注册失败")
            }
        )
    }

    const [form] = Form.useForm()


    const onFinish = (values) => {
        // console.log('Received values of form: ', values)
        postRequest(values)
    }


    return (
        <div className="regist">
            <Card className="regist-container">
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={[
                            {
                                required: true, 
                                message: '用户名不能为空' 
                            }
                        ]}
                        tooltip="ZhangSan"
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="邮箱"
                        rules={[
                            {
                                type: 'email',
                                message: '无效的邮箱地址',
                            },
                            {
                                required: true,
                                message: '邮箱不能为空',
                            },
                        ]}
                        tooltip="zhangsan@shanghaitech.edu.cn"
                    >
                        <Input placeholder="请确保邮箱没有错误，填错责任自负"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: '请确认密码',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('密码不匹配'));
                            },
                        }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="姓名"
                        tooltip="张三"
                        rules={[
                        {
                            required: true,
                            message: '请输入你的名字',
                            whitespace: true,
                        },
                        ]}
                    >
                        <Input placeholder="请填写真实姓名（中文）"/>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                        注册
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Regist