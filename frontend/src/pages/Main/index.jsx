import { Card } from 'antd'
import { Button, Space } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import './index.scss'

function Main () {
  const navigate = useNavigate()

  function toLogin () {
    navigate('/login', {
      replace: false,
      state: {},
    })

  }

  const toRegist = () => {
    // console.log("目前在Main页面，成功点击[注册]")
    navigate('/regist', {
      replace: false,
      state: {},
    })
  }

  return (
    <div className="main">
      <Card className="main-container">
        {/* 欢迎 */}
        <h1>Welcome to 4DVLab Annotation System</h1>
        {/* 登陆按钮 */}
        <Space wrap>
          <Button
            type="primary"
            onClick={toLogin}
          >
            登陆
          </Button>
          <Button
            type="primary"
            onClick={toRegist}
          >
            注册
          </Button>
        </Space>
      </Card>
    </div>
  )
}

export default Main