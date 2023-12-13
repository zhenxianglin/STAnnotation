import React from 'react'
import { Col, Row } from 'antd';
import { Divider } from 'antd';
import { Button } from 'antd'
import { Card } from 'antd'
import { useNavigate } from 'react-router-dom'

import {connect} from 'react-redux'
import {login, logout} from "../../redux/actions/login_action"

import axios from 'axios'

import './index.scss'

const { Meta } = Card

function HomeUI (props) {
  const navigate = useNavigate()

  const toAnnotation = () => {
    navigate('/annotation', {
      replace: false,
      state: {},
    })
  }

  const toVerification = () => {
    navigate('/verification', {
      replace: false,
      state: {},
    })
  }

  const toEdit = () => {
    navigate('/edit', {
      replace: false,
      state: {},
    })
  }

  const toUpload = () => {
    navigate('/upload', {
      replace: false,
      state: {},
    })
  }

  const toBatchUpload = () => {
    navigate('/batch_upload', {
      replace: false,
      state: {},
    })
  }

  const toDownload = () => {
    navigate('/download', {
      replace: false,
      state: {},
    })
  }

  const logout = () => {
      props.logout()
      navigate('/', {
        replace: true,
        state: {},
      })
  }

  React.useEffect(() => {
    axios.post('/backend/login/',{
        data: {
              username: props.state.username,
              password: props.state.password,
          }
    }).then(
        function(response) {
            if (response.data['login'] === true) {
                props.login(response.data)
            } else {
                alert('登陆异常请重新登陆')
                navigate('/login')
            }
        },
        function(error) {
            console.log('失败', error)
        }
    )
},[]) //仅在挂载和卸载的时候执行
  
  return (
    <div className="home">
      <div>
        <Row>
          <Col span={6}>
            <Button type="text" disabled>
              欢迎 {props.state.name}
            </Button>
          </Col>
          <Col span={12}>
            <Button type="text" disabled>
              标注量: {props.state.sentences} ({props.state.annotations})
            </Button>
          </Col>
          <Col span={6}>
            <Button type="link" onClick={logout}>退出登陆</Button>
          </Col>
        </Row>

        <Divider orientation="left" plain>
          所有应用
        </Divider>
      </div>      
      
      {
        props.state.login ? (
          <div>
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={6}>
                <Card
                  hoverable
                  style={{
                    width: 240,
                  }}
                  onClick={toAnnotation}
                  cover={<img alt="example" src="https://img1.baidu.com/it/u=280203119,3626186298&fm=253&fmt=auto&app=138&f=JPEG?w=333&h=500" />}
                >
                  <Meta title="Grounding标注" />
                </Card>
              </Col>
              <Col className="gutter-row" span={6}>
                <Card
                  hoverable
                  style={{
                    width: 240,
                  }}
                  onClick={toVerification}
                  cover={<img alt="example" src="https://img1.baidu.com/it/u=280203119,3626186298&fm=253&fmt=auto&app=138&f=JPEG?w=333&h=500" />}
                >
                  <Meta title="Grounding验证" />
                </Card>
              </Col>
              <Col className="gutter-row" span={6}>
                <Card
                  hoverable
                  style={{
                    width: 240,
                  }}
                  onClick={toEdit}
                  cover={<img alt="example" src="https://img1.baidu.com/it/u=280203119,3626186298&fm=253&fmt=auto&app=138&f=JPEG?w=333&h=500" />}
                >
                  <Meta title="Grounding标注修改" />
                </Card>
              </Col>

              { props.state.authority === 'Manager' ? (<Col className="gutter-row" span={6}>
                <Card
                  hoverable
                  style={{
                    width: 240,
                  }}
                  onClick={toUpload}
                  cover={<img alt="example" src="https://img1.baidu.com/it/u=280203119,3626186298&fm=253&fmt=auto&app=138&f=JPEG?w=333&h=500" />}
                >
                  <Meta title="数据上传" />
                </Card>
              </Col>) : <></>}

              { props.state.authority === 'Manager' ? (<Col className="gutter-row" span={6}>
                <Card
                  hoverable
                  style={{
                    width: 240,
                  }}
                  onClick={toBatchUpload}
                  cover={<img alt="example" src="https://img1.baidu.com/it/u=280203119,3626186298&fm=253&fmt=auto&app=138&f=JPEG?w=333&h=500" />}
                >
                  <Meta title="数据批量上传" />
                </Card>
              </Col>) : <></>}

              { props.state.authority === 'Manager' ? (<Col className="gutter-row" span={6}>
                <Card
                  hoverable
                  style={{
                    width: 240,
                  }}
                  onClick={toDownload}
                  cover={<img alt="example" src="https://img1.baidu.com/it/u=280203119,3626186298&fm=253&fmt=auto&app=138&f=JPEG?w=333&h=500" />}
                >
                  <Meta title="数据下载" />
                </Card>
              </Col>) : <></>}
            </Row>
          </div>) : <></>
      }
    </div>
  )
}



export default connect(
  (state) => ({state: state.user}), 
  {
    logout: logout,
    login: login,
  }
)(HomeUI)
