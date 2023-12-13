import {connect} from 'react-redux'
import {logout} from "../../redux/actions/login_action"
import React from 'react'
import {
  Form,
  Input,
  Button,
  DatePicker,
  Card,
} from 'antd'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


function UploadUI (props) {
    const navigate = useNavigate()
    const [loadings, setLoadings] = React.useState(false)

    function postRequest(data) {
        axios.post('/backend/upload/',
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
        setLoadings(true)
        postRequest(values)
    }

    return (
        <div>
            <div>
                <h1>数据上传</h1>
                <h4>/Users/apple/Desktop/test/123/professor_apartment_zip_10-14-16-34-53-5.json</h4>
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
                        name="location"
                        label="拍摄地点"
                        rules={[
                            {
                                required: true, 
                                message: '填写拍摄地点' 
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                        
                    <Form.Item
                        name="date"
                        label="日期"
                        rules={[
                            {
                                required: true, 
                                message: '填写拍摄日期' 
                            }
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item 
                        name="filepath"
                        label="文件路径"   
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
  )(UploadUI)