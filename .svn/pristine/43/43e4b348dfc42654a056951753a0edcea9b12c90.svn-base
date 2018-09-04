/**
 * @author 陈威霖
 * @description promise化微信api接口
 * @version 0.0.1
 */

const getLocation = ()=> {
    return new Promise((resolve, reject) => {
        wx.getLocation({
            success(res) {
                resolve(res)
            },
            fail(err){
                reject(err)
            }
        })
    })
}

const login = ()=> {
    return new Promise((resolve, reject)=> {
        wx.login({
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

const scanCode = () => {
    return new Promise((resolve, reject) => {
        wx.scanCode({
            onlyFromCamera: true,
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

const getUserInfo = ()=> {
    return new Promise((resolve, reject)=> {
        wx.getUserInfo({
            withCredentials: true,
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

const getSetting = () => {
    return new Promise((resolve, reject)=> {
        wx.getSetting({
            success(res){
                resolve(res)
            },
            fail(err){
                reject(err)
            }
        })
    })
}

export default  {
    getLocation,
    login,
    scanCode,
    getUserInfo,
    getSetting
}