/**
 * 修改列表相关请求
 */
import request from '../utils/request'

/**
 *
 * 已登录(设置请求头 token) 修改列表
 * 传值为表单
 */

export const ModifyList = ({
    Title,
    Status,
    NianJi,
    Mark,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/STU/STUBanJiEdit',
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


export const ModifyList2 = ({
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
        url: '/STU/STUParentEdit',
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

export const ModifyList3 = ({
    Title,
    JiLiangDanWei,
    CanKaoZhi,
    BeiZhu,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/ChuFang/AnJianXiangMuEdit',
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

export const ModifyList4 = ({
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
        url: '/CAW/YinHangZhangHuEdit',
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


export const ModifyList5 = ({
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
        url: '/CAW/YinHangZhangHuEdit',
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

export const ModifyList6 = ({
    Title,
    Age,
    ZhenCi,
    XiaoGuo,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/STU/YiMiaoEdit',
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


export const ModifyList7 = ({
    Title,
    Grade,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/STU/YiMiaoEdit',
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

export const ModifyList8 = ({
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
        url: '/STU/STUStudentEdit',
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

export const ModifyList9 = ({
    CanBie,
    FuZeRen,
    CaoZuoYuan1,
    XiaoDuFangFa,
    Date,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/ChuFang/CanJuXiaoDuEdit',
        data: {
            CanBie,
            FuZeRen,
            CaoZuoYuan1,
            XiaoDuFangFa,
            Date,
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

export const ModifyList10 = ({
    XiaoDuQuYu,
    FuZeRen,
    CaoZuoYuan1,
    XiaoDuFangFa,
    Date,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/ChuFang/QuYuXiaoDuEdit',
        data: {
            XiaoDuQuYu,
            FuZeRen,
            CaoZuoYuan1,
            XiaoDuFangFa,
            Date,
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

export const ModifyList11 = ({
    Date,
    Title,
    JiLiangDanWei,
    DanJia,
    YuSuanShuLiang,
    ShiYongShuLiang,
    YinHangZhangHuIdName,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/CAW/NengHaoShiYongJieSuan',
        data: {
            Date,
            Title,
            JiLiangDanWei,
            DanJia,
            YuSuanShuLiang,
            ShiYongShuLiang,
            YinHangZhangHuIdName,
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


export const ModifyList12 = ({
    JianCeDuiXiang,
    JianCeRenYuan,
    JianCeRiQi,
    AnJianXiangMuIdName,
    AnJianXiangMuId,
    JiLiangDanWei,
    CanKaoZhi,
    JianCeZhi,
    BeiZhu,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/ChuFang/ShiPinJianCeEdit',
        data: {
            JianCeDuiXiang,
            JianCeRenYuan,
            JianCeRiQi,
            AnJianXiangMuIdName,
            AnJianXiangMuId,
            JiLiangDanWei,
            CanKaoZhi,
            JianCeZhi,
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

export const ModifyList13 = ({
    Account,
    RealName,
    XingBie,
    MinZu,
    Birthday,
    IdNumber,
    DepartmentId,
    PositionId,
    Education,
    Schools,
    Professional,
    EntryDate,
    DiZhi,
    DiZhiData,
    BanCiGroupId,
    UserJiXiaoId,
    BanJiId,
    UserGongZiFangAnId,
    RoleId,
    IsJiaZuBingShi,
    JiaZuBingShi,
    IsXianTianJiBing,
    XianTianJiBing,
    IsBaoXian,
    IsLaoDongHeTong,
    JinJiLianXiRen,
    JinJiLianXiRenDianHua,
    TeChang,
    Remarks,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/HR/UsersEdit',
        data: {
            Account,
            RealName,
            XingBie,
            MinZu,
            Birthday,
            IdNumber,
            DepartmentId,
            PositionId,
            Education,
            Schools,
            Professional,
            EntryDate,
            DiZhi,
            DiZhiData,
            BanCiGroupId,
            UserJiXiaoId,
            BanJiId,
            UserGongZiFangAnId,
            RoleId,
            IsJiaZuBingShi,
            JiaZuBingShi,
            IsXianTianJiBing,
            XianTianJiBing,
            IsBaoXian,
            IsLaoDongHeTong,
            JinJiLianXiRen,
            JinJiLianXiRenDianHua,
            TeChang,
            Remarks,
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
