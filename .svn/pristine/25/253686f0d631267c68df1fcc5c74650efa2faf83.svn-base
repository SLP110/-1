import wxApi from './wx.api';
import http from './http';
function formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

//用户登录
const userLogin = (event = '') => {
    return new Promise(async (resolve, reject) => {

        const userInfo = wx.getStorageSync('userInfo');

        if (!userInfo) {
            const res = await wxApi.login();
            const user = await wxApi.getUserInfo();
            const flag = await isOAuth();//是否授权过

            if (!flag) {
                //已经授权过, 直接通过code获取uid
                const data = await http.post('/user/login', {
                    code: res.code,
                })

                wx.setStorageSync('userInfo', data.user_info);
                wx.setStorageSync('tokenInfo', data.token_data);
                wx.setStorageSync('oid', data.user_info.openid);
                wx.setStorageSync('uid', data.user_info.unionid);
                resolve(data)

            } else {
                const oData = event.target;
                //没有授权过
                if (/ok/.test(oData.errMsg)) {
                    //授权成功, 登录
                    const data = await http.post('/user/login', {
                        code: res.code,
                        encryptedData: user.encryptedData,
                        iv: user.iv
                    })

                    wx.setStorageSync('userInfo', data.user_info);
                    wx.setStorageSync('tokenInfo', data.token_data);
                    wx.setStorageSync('oid', data.user_info.openid);
                    wx.setStorageSync('uid', data.user_info.unionid);
                    resolve(data)
                } else {
                    reject()
                }
            }
        } else {
            resolve()
        }

    })

}

const isOAuth = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        })
    })
}

function formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('/')
    const t2 = [hour, minute, second].map(formatNumber).join(':')

    return `${t1} ${t2}`
}

const paging = (oldData, newData, page, num) => {
    if (page == 1) {
        page++;
        return { data: newData, page, num };
    }

    if (newData.length < num) {

    }


}

//计算浮点数
const calc = {
    add(num1, num2) {
        //加
        var r1, r2, m, n;
        try { r1 = num1.toString().split(".")[1].length } catch (e) { r1 = 0 }
        try { r2 = num2.toString().split(".")[1].length } catch (e) { r2 = 0 }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        return ((num1 * m + num2 * m) / m).toFixed(n);
    },
    //减
    sub(num1, num2) {
        var r1, r2, m, n;
        try { r1 = num1.toString().split(".")[1].length } catch (e) { r1 = 0 }
        try { r2 = num2.toString().split(".")[1].length } catch (e) { r2 = 0 }
        n = (r1 >= r2) ? r1 : r2;
        m = Math.pow(10, Math.max(r1, r2));
        return ((num1 * m - num2 * m) / m).toFixed(n);
    },
    //乘
    mul(num1, num2) {
        var m = 0;
        try { m += num1.toString().split(".")[1].length } catch (e) { }
        try { m += num2.toString().split(".")[1].length } catch (e) { }
        return (Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", ""))) / Math.pow(10, m)
    },
    //除
    div() {
        var t1 = 0, t2 = 0, r1, r2;
        try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
        try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    }
}

export default {
    formatNumber,
    formatTime,
    userLogin,
    isOAuth,
    paging,
    calc
}
