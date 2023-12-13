import {connect} from 'react-redux'
import {logout} from "../../redux/actions/login_action"
import React from 'react'
import {
  Form,
  Input,
  Button,
  Card,
} from 'antd'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


function BatchUploadUI (props) {
    const navigate = useNavigate()
    const [loadings, setLoadings] = React.useState(false)

    function postRequest(data) {
        axios.post('/backend/upload/batch_upload',
            {
                authority: props.state.authority,
                data: data,
            }
        ).then(
            function(response) {
                alert(response.data.information)
                if (response.data.result === true) {
                    navigate('/home', {
                        replace: false,
                        state: {},
                      })
                }
                setLoadings(false)
            },
            function(error) {
                setLoadings(false)
            }
        )
    }

    const onFinish = (values) => {
        // console.log(loadings)
        setLoadings(true)
        postRequest(values)
    }

    return (
        <div>
            <div>
                <h1>数据批量上传</h1>
            </div>
            <Card>
                <Form
                    labelCol={{
                    span: 4,
                    }}
                    wrapperCol={{
                    span: 14,
                    }}
                    layout="horizontal"
                    onFinish={onFinish}
                >
                    <Form.Item 
                        name="folderpath"
                        label="文件夹路径"  
                    >
                        <Input />
                    </Form.Item>
                        
                    <Form.Item label="提交">
                        <Button type="primary" htmlType="submit" loading={loadings}>提交</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default connect(
    (state) => ({state: state.user}), 
    {
      logout: logout,
    }
  )(BatchUploadUI)