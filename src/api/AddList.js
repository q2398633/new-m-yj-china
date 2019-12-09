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

export const AddList9 = ({
    CanBie,
    FuZeRen,
    CaoZuoYuan1,
    XiaoDuFangFa,
    Date,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/ChuFang/CanJuXiaoDuAdd',
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

export const AddList10 = ({
    XiaoDuQuYu,
    FuZeRen,
    CaoZuoYuan1,
    XiaoDuFangFa,
    Date,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/ChuFang/QuYuXiaoDuAdd',
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

export const AddList11 = ({
    Date,
    Title,
    NengHaoXiangMuId,
    JiLiangDanWei,
    DanJia,
    YuSuanShuLiang,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/CAW/NengHaoShiYongAdd',
        data: {
            Date,
            Title,
            NengHaoXiangMuId,
            JiLiangDanWei,
            DanJia,
            YuSuanShuLiang,
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

export const AddList12 = ({
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
        url: '/ChuFang/ShiPinJianCeAdd',
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

export const AddList13 = ({
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
        url: '/HR/UsersAdd',
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
