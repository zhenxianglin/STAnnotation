import {connect} from 'react-redux'
import {logout} from "../../redux/actions/login_action"
import React from 'react'
import axios from "axios"
import { Divider, Card, Image, Button, Space, Collapse, Popconfirm } from 'antd'
import { useNavigate } from 'react-router-dom'
import useInterval from '../../utils/timer'

import './index.scss'

const { Panel } = Collapse

const init_timer = 3000
const gap_timer = 1000

function VerificationUI (props) {
    const navigate = useNavigate()

    const gridStyle = {
        width: '33%',
        textAlign: 'center',
    }

    const [loadings, setLoadings] = React.useState(false)

    const [descriptionId, setDescriptionId] = React.useState(0)
    const [sentence, setSentence] = React.useState("null")
    const [action, setAction] = React.useState('null')
    const [targetId, setTargetId] = React.useState(null)

    const [objectList, setObjectList] = React.useState([
        [{'image': 'error'}],
        [{'image': 'error'}],
        [{'id':-1, 'image': 'error'}]]
        )
    const [choiceIndex, setChoiceIndex] = React.useState(0)

    const [img_id, changeImgId] = React.useState(2)
    const [timer, setTimer] = React.useState(init_timer)

    useInterval(() => {
        if (img_id >= 2) {
            if (objectList[0][choiceIndex].image !== 'error') {
                changeImgId(1)
                setTimer(gap_timer)
            } else if (objectList[1][choiceIndex].image !== 'error') {
                changeImgId(2)
                setTimer(gap_timer)
            }
        } else {
            if (img_id === 1) {
                setTimer(init_timer)
            }
            changeImgId(img_id + 1)
        }
    }, timer)

    React.useEffect(()=>{
        axios.post(
            '/backend/verification/get_data',
            {
                user_id: props.state.user_id,
                password: props.state.password,
            }
        ).then(
            function(response) {
                if (response.data.result === true) {
                    setDescriptionId(response.data.description_id)
                    setSentence(response.data.sentence)
                    setAction(response.data.action)
                    setObjectList(response.data.object)
                    setTargetId(response.data.target_id)
                } else {
                    alert(response.data.information)
                }
                
            },
            function(error) {
                console.log('失败', error)
            }
        )
    },[]) //仅在挂载和卸载的时候执行

    function submitToSystem (value) {
        axios.post(
            '/backend/verification/post_data',
            {
                user_id: props.state.user_id,
                password: props.state.password,
                description_id: descriptionId,
                pass: value,
            }
        ).then(
            function(response) {
                alert(response.data.information)
                setLoadings(false)
                window.location.reload()
            },
            function(error) {
                alert("提交失败")
                setLoadings(false)
            }
        )
    }

    const toConfirm = () => {
        if (choiceIndex === 0) {
            alert("请选择一个目标")
        } else {
            setLoadings(true)
            submitToSystem(objectList[2][choiceIndex].id === targetId)
        }
    }

    const toCancel = () => {
        setLoadings(true)
        submitToSystem(false)
    }


    const toBack = () => {
        navigate('/home', {
            replace: false,
            state: {},
        })
    }

    const clickLabel = (index=0, e) => {
        setChoiceIndex(index)
    }

    return (
        <div className='verificaton'>
            <div>
                <Space>
                    <h1>Grounding标注验证</h1>
                    <Button type='primary' danger onClick={toBack}>返回</Button>
                </Space>
                <Divider />
            </div>

            <div>
                <Collapse defaultActiveKey={['1']} >
                    <Panel header="描述" key="1">
                        <p>{sentence}</p>
                    </Panel>
                </Collapse>
            </div>

            <div>
                <Collapse defaultActiveKey={['2']} >
                    <Panel header="动作" key="2">
                        <p>{action}</p>
                    </Panel>
                </Collapse>
            </div>
            
            <div>
                <Card title="连续三帧图片">
                    <Card.Grid hoverable={false} style={gridStyle}>
                        <Image
                            width={768}
                            height={480}
                            src={objectList[img_id][choiceIndex].image}
                            fallback="data:image/png;base64,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"
                        />
                    </Card.Grid>
                </Card>
            </div>

            <div>
                <Space size={[8, 16]} wrap>
                    {objectList[2].map((object, index) => (
                        index !== 0 ? <Button key={index} onClick={clickLabel.bind(this, index)} danger={index === choiceIndex}>{index}</Button> : null
                    ))}
                </Space>
            </div>
            
            <div>
                <Space size={[8, 16]} wrap>
                    <Button type='primary' onClick={toConfirm} loading={loadings}>确认</Button>                
                    <Popconfirm
                        title="确认这条描述或动作是【不正确】的吗？"
                        description="确认这条描述或动作是【不正确】的吗？"
                        onConfirm={toCancel}
                    >
                        <Button type="primary" danger loading={loadings}>错误</Button>
                    </Popconfirm>
                </Space>
            </div>

            
            <Divider />
        </div>
    )
}

export default connect(
    (state) => ({state: state.user}), 
    {
      logout: logout,
    }
  )(VerificationUI)