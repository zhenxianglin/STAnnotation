import {connect} from 'react-redux'
import {logout} from "../../redux/actions/login_action"
import React from 'react'
import { Divider, Card, Image, Input, Button, Space, Popconfirm } from 'antd'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import useInterval from '../../utils/timer'

import './index.scss'

const sampleDescription = "This is a sunny day. There is a girl wearing a white T-shirt. She is playing basketball. Meanwhile, she is gazing at a guy who is drinking. The guy perhaps is her boyfriend."
const sampleAction = "play;drink"

const { TextArea } = Input

const gridStyle = {
    width: '33%',
    textAlign: 'center',
}

const init_timer = 3000
const gap_timer = 1000

const initDescriptionList = [
    {description: '', action: ''},
    {description: '', action: ''},
]

function AnnotationUI (props) {
    const navigate = useNavigate()

    const [loadings, setLoadings] = React.useState(false)
    const [instance_id, setInstanceId] = React.useState(-1)
    const [imgList, setImgList] = React.useState([
        {'image': 'error'},
        {'image': 'error'},
        {'image': 'error'}
    ])
    const [descriptionList, setDescriptionList] = React.useState(initDescriptionList)
    const [img_id, changeImgId] = React.useState(2)
    const [timer, setTimer] = React.useState(init_timer)

    useInterval(() => {
        if (img_id >= 2) {
            if (imgList[0].image !== 'error') {
                changeImgId(0)
                setTimer(gap_timer)
            } else if (imgList[1].image !== 'error') {
                changeImgId(1)
                setTimer(gap_timer)
            }
        } else {
            if (img_id === 1) {
                setTimer(init_timer)
            }
            changeImgId(img_id + 1)
        }
    }, timer)
    

    React.useEffect(() => {
        axios.get(
            '/backend/annotation/add',
        ).then(
            function(response) {
                console.log(response.data)
                if (response.data.result === false) {
                    alert("已经没有数据了")
                } else {
                    setInstanceId(response.data.instance_id)
                    setImgList(response.data.image)
                }
                
            },
            function(error) {
                console.log('失败', error)
            }
        )
    },[]) //仅在挂载和卸载的时候执行

    const toHome = () => {
        navigate('/home', {
            replace: false,
            state: {},
        })
    }

    const addNewDescription = () => {
        setDescriptionList([...descriptionList, ...[{description: '', action: ''}]])
    }

    const toSubmit = () => {
        setLoadings(true)
        axios.post(
            '/backend/annotation/add',
            {
                user: {
                    user_id: props.state.user_id,
                    password: props.state.password,
                },
                instance_id: instance_id,
                description: descriptionList,
            }
        ).then(
            function(response) {
                // console.log('成功', response)
                if (response.data.result === false) {
                    alert(response.data.information)
                    setLoadings(false)
                } else {
                    alert('录入数据成功')
                    setLoadings(false)
                    window.location.reload()
                }
            },
            function(error) {
                setLoadings(false)
            }
        )
    }

    const changeDescription = (index, e) => {
        setDescriptionList(() => {
            descriptionList[index].description = e.target.value
            return descriptionList
        })
    }

    const changeAction = (index, e) => {
        setDescriptionList(() => {
            descriptionList[index].action = e.target.value
            return descriptionList
        })
    }

    const toHelp = () => {
        alert("    描述要求：通过这一描述，我们可以找到，且只能找到该目标任务。可以使用短语或者句子。\n    动作要求：该描述中所有涉及人物的动作单词（包括必要介词），用分号连接，如：jump;play;hold;stand")
    }

    const addHard = () => {
        setLoadings(true)
        axios.post(
            '/backend/annotation/ishard',
            {
                user: {
                    user_id: props.state.user_id,
                    password: props.state.password,
                },
                instance_id: instance_id,
            }
        ).then(
            function(response) {
                // console.log('成功', response)
                if (response.data.result === false) {
                    alert(response.data.information)
                    setLoadings(false)
                } else {
                    setLoadings(false)
                    window.location.reload()
                }
            },
            function(error) {
                alert('刷新失败')
                setLoadings(false)
            }
        )
    }

    return (
        <div className='annotation'>
            <div>
                <h1>Grounding标注系统</h1>
                <h3>要求：</h3>
                <p>在描述框中对标记的对象进行描述，通过该描述可以并只能找到描述框中的对象。确保一条描述有且只有一个人物可以与之对应。</p>
                <p>在动作框中填入使用的动作词，动作词并非指动词，而是能体现物体动态性的词，如stand,walk。类似wear,have这类词，无法体现物体的运动特征，不用归结为动作词。</p>
                <h4>动作词可以是单一动词，或是动词介词词组，多个动作词之间用分号‘;’连接，且中间没有空格，如‘jump;play’，若没有，则不填。</h4>
                <Divider />
            </div>

            <div>
                <Card title="连续三帧图片">
                    <Image
                        width={768}
                        height={480}
                        src={imgList[img_id].image}
                        fallback="data:image/png;base64,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"
                    />
                </Card>
            </div>
            <Divider orientation="left" plain>请在下方描述</Divider>
            <div>
                <Space size="large" direction='vertical'>
                    <Space size="large">
                        <Button type="primary" onClick={toSubmit} loading={loadings}>提交</Button>
                        <Button type="primary" danger onClick={toHome}>回到主页</Button>
                        <Button onClick={toHelp}>帮助</Button>
                        <Popconfirm
                            title="确认这个目标【无法描述】的吗？"
                            description="确认这个目标【无法描述】的吗？"
                            onConfirm={addHard}
                        >
                            <Button danger loading={loadings}>无法描述</Button>
                        </Popconfirm>
                        
                    </Space>
                    {
                        descriptionList.map((item, index) => {
                            return (
                                <Card
                                    style={{
                                    width: 900,
                                    }}
                                    key={'Card'+index}
                                >
                                    描述: <TextArea onChange={changeDescription.bind(this, index)} rows={4} placeholder={sampleDescription} maxLength={1024} />
                                    动作: <Input onChange={changeAction.bind(this, index)} placeholder={sampleAction} allowClear />
                                </Card>
                            )
                        })
                    }
                    <Button onClick={addNewDescription}>添加一条新的描述</Button>
                </Space>
            </div>
        </div>
    )
}

export default connect(
    (state) => ({state: state.user}), 
    {
      logout: logout,
    }
  )(AnnotationUI)