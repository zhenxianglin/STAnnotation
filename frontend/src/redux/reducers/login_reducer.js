import { LOGIN, LOGOUT } from "../constant"

/*
    1.创建一个为Login组建服务的Reducer
    2.reducer函数会接到两个参数，分别为之前的状态，动作对象
*/

const initState = { // 初始化时候
    'login': false,
    'user_id': null,
    'username': null,
    'email': null,
    'name': null,
    'authority': null,
    'annotations': -1,
    'sentences': -1,
    'password': null,
} 

export default function loginReducer(preState=initState, action) {
    // 从action对象中获取: type, data
    const {type, data} = action

    //更加type决定如何加工数据
    switch (type) {
        case LOGIN:
            return {
                'login': data.login,
                'user_id': data.user_id,
                'username': data.username,
                'email': data.email,
                'name': data.name,
                'authority': data.authority,
                'annotations': data.annotations,
                'sentences': data.sentences,
                'password': data.password,
            }
        
        case LOGOUT:
            return initState

        default:   // 初始化
            return preState
    }   
}