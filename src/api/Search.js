/**
 * 搜索相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 搜索列表
 * 传值为表单
 */

export const SearchSupplier = ({
    G_Title_Like,
    G_LianXiRen_Like,
    G_Mobile_Like
}) => {
    return request({
        method: 'POST',
        url: '/HouQin/GongYingShangGrid',
        data: {
            G_Title_Like,
            G_LianXiRen_Like,
            G_Mobile_Like
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

export const SearchChild = ({
    G_RealName_Like,
    G_BanJi_Like,
    G_NianJi_IN,
    G_DangAnHao_Like,
    G_MinZu_Like,
    G_HuJi_Like,
    G_ShenFenZhengHao_Like
}) => {
    return request({
        method: 'POST',
        url: '/STU/STUStudentGrid',
        data: {
            G_RealName_Like,
            G_BanJi_Like,
            G_NianJi_IN,
            G_DangAnHao_Like,
            G_MinZu_Like,
            G_HuJi_Like,
            G_ShenFenZhengHao_Like
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

export const SearchParent = ({
    G_RealName_Like,
    G_Mobile_Like,
    G_WorkPlace_Like,
    G_ZiYuan_Like,
    G_XueLi_Like
}) => {
    return request({
        method: 'POST',
        url: '/STU/STUParentGrid',
        data: {
            G_RealName_Like,
            G_Mobile_Like,
            G_WorkPlace_Like,
            G_ZiYuan_Like,
            G_XueLi_Like
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

export const SearchFoodSafety = ({
    G_JianCeDuiXiang_Like,
    G_JianCeRenYuan_Like,
    G_AnJianXiangMuIdName_Like
}) => {
    return request({
        method: 'POST',
        url: '/ChuFang/ShiPinJianCeGrid',
        data: {
            G_JianCeDuiXiang_Like,
            G_JianCeRenYuan_Like,
            G_AnJianXiangMuIdName_Like
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

export const SearchClass = ({
    G_Title_Like
}) => {
    return request({
        method: 'POST',
        url: '/STU/STUBanJiGrid',
        data: {
            G_Title_Like
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

export const SearchStaff = ({
    G_Department_Like,
    G_Position_Like,
    G_RealName_Like,
    G_Account_Like,
    G_IdNumber_Like,
    G_Education_Like,
    G_Schools_Like,
    G_Professional_Like
}) => {
    return request({
        method: 'POST',
        url: '/HR/UsersGrid',
        data: {
            G_Department_Like,
            G_Position_Like,
            G_RealName_Like,
            G_Account_Like,
            G_IdNumber_Like,
            G_Education_Like,
            G_Schools_Like,
            G_Professional_Like
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

export const SearchAttendance = ({
    G_StudentIdName_Like,
    G_Date_Like
}) => {
    return request({
        method: 'POST',
        url: '/STU/STUKaoQinGrid',
        data: {
            G_StudentIdName_Like,
            G_Date_Like
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