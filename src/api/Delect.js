/**
 * 删除相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 删除列表
 * 参数为当前ID
 */

export const DelectList = (listId) => {
    return request({
        method: 'DELETE',
        url: '/STU/STUBanJiDel',
        data: {
            Id: listId
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const DelectList2 = (listId2) => {
    return request({
        method: 'POST',
        url: '/STU/STUParentDel',
        data: {
            Id: listId2
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}


export const DelectList3 = (listId3) => {
    return request({
        method: 'DELETE',
        url: '/ChuFang/AnJianXiangMuDel',
        data: {
            Id: listId3
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const DelectList4 = (listId4) => {
    return request({
        method: 'DELETE',
        url: '/CAW/YinHangZhangHuDel',
        data: {
            Id: listId4
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const DelectList5 = (listId5) => {
    return request({
        method: 'POST',
        url: '/HouQin/GongYingShangDel',
        data: {
            Id: listId5
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const DelectList6 = (listId6) => {
    return request({
        method: 'DELETE',
        url: '/STU/YiMiaoDel',
        data: {
            Id: listId6
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const DelectList7 = (listId7) => {
    return request({
        method: 'DELETE',
        url: '/HR/PositionDel',
        data: {
            Id: listId7
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const DelectList8 = (listId8) => {
    return request({
        method: 'DELETE',
        url: '/STU/STUStudentDel',
        data: {
            Id: listId8
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const DelectList9 = (listId9) => {
    return request({
        method: 'DELETE',
        url: '/ChuFang/CanJuXiaoDuDel',
        data: {
            Id: listId9
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}



export const DelectList10 = (listId10) => {
    return request({
        method: 'DELETE',
        url: '/ChuFang/QuYuXiaoDuDel',
        data: {
            Id: listId10
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const DelectList11 = (listId11) => {
    return request({
        method: 'DELETE',
        url: '/CAW/NengHaoShiYongDel',
        data: {
            Id: listId11
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
export const DelectList12 = (listId12) => {
    return request({
        method: 'DELETE',
        url: '/ChuFang/ShiPinJianCeDel',
        data: {
            Id: listId12
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const DelectList13 = (listId13) => {
    return request({
        method: 'DELETE',
        url: '/CAW/ZiChanWeiXiuDel',
        data: {
            Id: listId13
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const DelectList14 = (listId14) => {
    return request({
        method: 'DELETE',
        url: '/ZiChan/ZiChanXinXiDel',
        data: {
            Id: listId14
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const DelectList15 = (listId15) => {
    return request({
        method: 'POST',
        url: '/HouQin/ChanPinDel',
        data: {
            Id: listId15
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const DelectList16 = (listId16) => {
    return request({
        method: 'POST',
        url: '/ZhaoSheng/HuanJingDiaoYanDel',
        data: {
            Id: listId16
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
