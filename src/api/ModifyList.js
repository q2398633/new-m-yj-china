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

export const ModifyList14 = ({
    Title,
    ZiChanXinXiId,
    Type,
    WeiHuType,
    Date,
    YinHangZhangHuIdName,
    YinHangZhangHuId,
    FeiYong,
    WeiHuNeiRong,
    BeiZhu,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/CAW/ZiChanWeiXiuEdit',
        data: {
            Title,
            ZiChanXinXiId,
            Type,
            WeiHuType,
            Date,
            YinHangZhangHuIdName,
            YinHangZhangHuId,
            FeiYong,
            WeiHuNeiRong,
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

export const ModifyList15 = ({
    Title,
    Type,
    GouZhiRiQi,
    RuZhangRiQi,
    YuanZhi,
    RuZhangJiaZhi,
    JiLiangDanWei,
    Total,
    ShiYongYue,
    CanZhiLv,
    BianHao,
    GuiGe,
    CunFangDiDian,
    YongTu,
    GouZhiLeiXing,
    GongYingShang,
    ChanDi,
    ShiYongDi,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/ZiChan/ZiChanXinXiEdit',
        data: {
            Title,
            Type,
            GouZhiRiQi,
            RuZhangRiQi,
            YuanZhi,
            RuZhangJiaZhi,
            JiLiangDanWei,
            Total,
            ShiYongYue,
            CanZhiLv,
            BianHao,
            GuiGe,
            CunFangDiDian,
            YongTu,
            GouZhiLeiXing,
            GongYingShang,
            ChanDi,
            ShiYongDi,
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

export const ModifyList16 = ({
    BarCode,
    Title,
    ChanPinTypeId,
    GongYingShangId,
    DanJia,
    CangKuId,
    DanWeiId,
    Status,
    MaxNum,
    MinNum,
    BeiZhu,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/HouQin/ChanPinEdit',
        data: {
            BarCode,
            Title,
            ChanPinTypeId,
            GongYingShangId,
            DanJia,
            CangKuId,
            DanWeiId,
            Status,
            MaxNum,
            MinNum,
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

export const ModifyList17 = ({
    Title,
    DiZhi,
    JuLi,
    JiaoShiRenShu,
    YuanZhangXingMing,
    ShiYouBi,
    JiaoShiXueLi,
    LianXiDianHua,
    CanDianLeiXing1,
    CanDianLeiXing2,
    YuanSuoJiBie1,
    YuanSuoJiBie2,
    YuanSuoJiBie3,
    YuanSuoXingZhi,
    TuoFeiLeiXing,
    TuoFei,
    CanFeiLeiXing,
    CanFei,
    ShengYuanRongLiang,
    XianShengYuanShuLiang,
    BanE,
    CaoChangMianJi,
    ZhouBianFangJia,
    ZhouBianZhiMingDu,
    RenQiRenShuZhiLiang,
    JiaoYuTeSe,
    XiaoQuTeZheng,
    BeiZhu,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/ZhaoSheng/HuanJingDiaoYanEdit',
        data: {
            Title,
            DiZhi,
            JuLi,
            JiaoShiRenShu,
            YuanZhangXingMing,
            ShiYouBi,
            JiaoShiXueLi,
            LianXiDianHua,
            CanDianLeiXing1,
            CanDianLeiXing2,
            YuanSuoJiBie1,
            YuanSuoJiBie2,
            YuanSuoJiBie3,
            YuanSuoXingZhi,
            TuoFeiLeiXing,
            TuoFei,
            CanFeiLeiXing,
            CanFei,
            ShengYuanRongLiang,
            XianShengYuanShuLiang,
            BanE,
            CaoChangMianJi,
            ZhouBianFangJia,
            ZhouBianZhiMingDu,
            RenQiRenShuZhiLiang,
            JiaoYuTeSe,
            XiaoQuTeZheng,
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

export const ModifyList18 = ({
    Title,
    FuZeRen,
    StartDate,
    EndDate,
    JianJie,
    BeiJing,
    YuJiZhaoShengShu,
    DiZhi,
    HuoDongMoBanId,
    NeiRong,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/ZhaoSheng/HuoDongEdit',
        data: {
            Title,
            FuZeRen,
            StartDate,
            EndDate,
            JianJie,
            BeiJing,
            YuJiZhaoShengShu,
            DiZhi,
            HuoDongMoBanId,
            NeiRong,
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

export const ModifyList19 = ({
    HuoDongIdName,
    Status,
    JieDaiRen,
    LaiFangLeiXing,
    StudentName,
    XingBie,
    StudentShengRi,
    JiaZhangName,
    JiaZhangGuanXi,
    JiaZhangDianHua,
    JiaZhangWeiXin,
    JiaZhangQQ,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/ZhaoSheng/HuoDongLaiFangEdit',
        data: {
            HuoDongIdName,
            Status,
            JieDaiRen,
            LaiFangLeiXing,
            StudentName,
            XingBie,
            StudentShengRi,
            JiaZhangName,
            JiaZhangGuanXi,
            JiaZhangDianHua,
            JiaZhangWeiXin,
            JiaZhangQQ,
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

export const ModifyList20 = ({
    StudentIdName,
    StudentId,
    BanJiName,
    Date,
    JianChaRen,
    ZhengZhuang,
    TiZheng,
    ZhenDuan,
    ChuLiFangShi,
    JiBingFenLei,
    ZhengZhuangFenLei,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/RiChang/ChenWuWanJianEdit',
        data: {
            StudentIdName,
            StudentId,
            BanJiName,
            Date,
            JianChaRen,
            ZhengZhuang,
            TiZheng,
            ZhenDuan,
            ChuLiFangShi,
            JiBingFenLei,
            ZhengZhuangFenLei,
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

export const ModifyList21 = ({
    BanJiId,
    Date,
    ShangWuLaoShi,
    YingDaoRenShu,
    ShiDaoRenShu,
    XiaWuBanLaoShi,
    JieBanRenShu,
    ChuYuanRenShu,
    ShangWuShiXiang,
    XiaWuShiXiang,
    YeBanQingKuang,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/RiChang/JiaoJieBanEdit',
        data: {
            BanJiId,
            Date,
            ShangWuLaoShi,
            YingDaoRenShu,
            ShiDaoRenShu,
            XiaWuBanLaoShi,
            JieBanRenShu,
            ChuYuanRenShu,
            ShangWuShiXiang,
            XiaWuShiXiang,
            YeBanQingKuang,
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

export const ModifyList22 = ({
    Date,
    Title,
    HuoDongFangShi,
    DuiXiang,
    NeiRong,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/RiChang/JianKangDengJiEdit',
        data: {
            Date,
            Title,
            HuoDongFangShi,
            DuiXiang,
            NeiRong,
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

export const ModifyList23 = ({
    Date,
    Title,
    ZhiXingRen,
    DuiXiang,
    FangKong,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/RiChang/JiBingDengJiEdit',
        data: {
            Date,
            Title,
            ZhiXingRen,
            DuiXiang,
            FangKong,
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

export const ModifyList24 = ({
    RiQi,
    Title,
    ZhuChiRen,
    HuiYiRenYuan,
    JueYi,
    NeiRong,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/RiChang/ShanShiHuiYiEdit',
        data: {
            RiQi,
            Title,
            ZhuChiRen,
            HuiYiRenYuan,
            JueYi,
            NeiRong,
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

export const ModifyList25 = ({
    StudentIdName,
    StudentId,
    BanJiIdName,
    XingBie,
    Date,
    FaBingMingCheng,
    QuYuDate,
    JiLuRen,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/RiChang/ChuanRanBingDengJiEdit',
        data: {
            StudentIdName,
            StudentId,
            BanJiIdName,
            XingBie,
            Date,
            FaBingMingCheng,
            QuYuDate,
            JiLuRen,
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

export const ModifyList26 = ({
    StudentIdName,
    StudentId,
    BanJiName,
    XingBie,
    NianLing,
    JianChaRiQi,
    JieAnRiQi,
    FenLeiMingCheng,
    IsZhuanAn,
    ShouCiJieGuo,
    FuCha,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/RiChang/TiRuoDengJiEdit',
        data: {
            StudentIdName,
            StudentId,
            BanJiName,
            XingBie,
            NianLing,
            JianChaRiQi,
            JieAnRiQi,
            FenLeiMingCheng,
            IsZhuanAn,
            ShouCiJieGuo,
            FuCha,
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

export const ModifyList27 = ({
    StudentIdName,
    StudentId,
    BanJiIdName,
    XingBie,
    NianLing,
    Date,
    ShangHaiXingZhi,
    ShangHaiDiDian,
    ShangHaiBuWei,
    ShangHaiQingKuang,
    ShangHaiLeiXing,
    DaiBanLaoShi,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/RiChang/ShangHaiDengJiEdit',
        data: {
            StudentIdName,
            StudentId,
            BanJiIdName,
            XingBie,
            NianLing,
            Date,
            ShangHaiXingZhi,
            ShangHaiDiDian,
            ShangHaiBuWei,
            ShangHaiQingKuang,
            ShangHaiLeiXing,
            DaiBanLaoShi,
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

export const ModifyList28 = ({
    Title,
    ShiYongDate,
    BanFangDiDian,
    JianChaBuWei,
    IsShiYong,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/RiChang/DaXingWanJuEdit',
        data: {
            Title,
            ShiYongDate,
            BanFangDiDian,
            JianChaBuWei,
            IsShiYong,
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
