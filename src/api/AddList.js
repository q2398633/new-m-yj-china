/**
 * 添加相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 添加列表
 * 传值为表单
 */

export const AddList = ({
    Title,
    Status,
    NianJi,
    Mark,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/STU/STUBanJiAdd',
        data: {
            Title,
            Status,
            NianJi,
            Mark,
            Id
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

export const AddList2 = ({
    StudentIdName,
    RealName,
    GuanXi,
    Mobile,
    IsJieSongRen,
    IsJianHuRen,
    WorkPlace,
    IdNumber,
    WeChat,
    QQ,
    XueLi,
    ZhuZhi,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/STU/STUParentAdd',
        data: {
            StudentIdName,
            RealName,
            GuanXi,
            Mobile,
            IsJieSongRen,
            IsJianHuRen,
            WorkPlace,
            IdNumber,
            WeChat,
            QQ,
            XueLi,
            ZhuZhi,
            Id
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

export const AddList3 = ({
    Title,
    JiLiangDanWei,
    CanKaoZhi,
    BeiZhu,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/ChuFang/AnJianXiangMuAdd',
        data: {
            Title,
            JiLiangDanWei,
            CanKaoZhi,
            BeiZhu,
            Id
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

export const AddList4 = ({
    Title,
    ZhangHao,
    YuE,
    Sort,
    BeiZhu,
    Status,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/CAW/YinHangZhangHuAdd',
        data: {
            Title,
            ZhangHao,
            YuE,
            Sort,
            BeiZhu,
            Status,
            Id
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


export const AddList5 = ({
    Title,
    LianXiRen,
    Mobile,
    QQ,
    WinXin,
    Email,
    DiZhi,
    Status,
    BeiZhu,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/HouQin/GongYingShangAdd',
        data: {
            Title,
            LianXiRen,
            Mobile,
            QQ,
            WinXin,
            Email,
            DiZhi,
            Status,
            BeiZhu,
            Id
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

export const AddList6 = ({
    Title,
    Age,
    ZhenCi,
    XiaoGuo,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/STU/YiMiaoAdd',
        data: {
            Title,
            Age,
            ZhenCi,
            XiaoGuo,
            Id
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

export const AddList7 = ({
    Title,
    Grade,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/HR/PositionAdd',
        data: {
            Title,
            Grade,
            Id
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


export const AddList8 = ({
    Title,
    BanJi,
    XingBie,
    MinZu,
    RuTuoRiQi,
    Status,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/STU/STUStudentAdd',
        data: {
            Title,
            BanJi,
            XingBie,
            MinZu,
            RuTuoRiQi,
            Status,
            Id
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
