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
    StudentId,
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
    TeShuJiNianRiDate,
    TeShuJiNianRiName,
    ZiYuan,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/STU/STUParentAdd',
        data: {
            StudentIdName,
            StudentId,
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
            TeShuJiNianRiDate,
            TeShuJiNianRiName,
            ZiYuan,
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

export const AddList14 = ({
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
        url: '/CAW/ZiChanWeiXiuAdd',
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

export const AddList15 = ({
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
        url: '/ZiChan/ZiChanXinXiAdd',
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

export const AddList16 = ({
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
        url: '/HouQin/ChanPinAdd',
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

export const AddList17 = ({
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
        url: '/ZhaoSheng/HuanJingDiaoYanAdd',
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

export const AddList18 = ({
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
        url: '/ZhaoSheng/HuoDongAdd',
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

export const AddList19 = ({
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
        url: '/ZhaoSheng/HuoDongLaiFangAdd',
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

export const AddList20 = ({
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
        url: '/RiChang/ChenWuWanJianAdd',
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

export const AddList21 = ({
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
        url: '/RiChang/JiaoJieBanAdd',
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

export const AddList22 = ({
    Date,
    Title,
    HuoDongFangShi,
    DuiXiang,
    NeiRong,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/RiChang/JianKangDengJiAdd',
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

export const AddList23 = ({
    Date,
    Title,
    ZhiXingRen,
    DuiXiang,
    FangKong,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/RiChang/JiBingDengJiAdd',
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

export const AddList24 = ({
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
        url: '/RiChang/ShanShiHuiYiAdd',
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

export const AddList25 = ({
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
        url: '/RiChang/ChuanRanBingDengJiAdd',
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

export const AddList26 = ({
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
        url: '/RiChang/TiRuoDengJiAdd',
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

export const AddList27 = ({
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
        url: '/RiChang/ShangHaiDengJiAdd',
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

export const AddList28 = ({
    Title,
    ShiYongDate,
    BanFangDiDian,
    JianChaBuWei,
    IsShiYong,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/RiChang/DaXingWanJuAdd',
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
export const AddList29 = ({
    StudentIdName,
    StudentId,
    BanJiIdName,
    XingBie,
    NianLing,
    YiYuanMingCheng,
    Date,
    ZuoYan,
    YouYan,
    QueZhenMingCheng,
    JiaoZhiFangFa,
    FuChaDate1,
    FuChaZuoYan1,
    FuChaYouYan1,
    FuChaDate2,
    FuChaZuoYan2,
    FuChaYouYan2,
    BeiZhu,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/RiChang/ShiLiDengJiAdd',
        data: {
            StudentIdName,
            StudentId,
            BanJiIdName,
            XingBie,
            NianLing,
            YiYuanMingCheng,
            Date,
            ZuoYan,
            YouYan,
            QueZhenMingCheng,
            JiaoZhiFangFa,
            FuChaDate1,
            FuChaZuoYan1,
            FuChaYouYan1,
            FuChaDate2,
            FuChaZuoYan2,
            FuChaYouYan2,
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

export const AddList30 = ({
    StudentIdName,
    StudentId,
    BanJiIdName,
    JianChaRiQi,
    NianLing,
    ShangQuChi,
    XiaQuChi,
    QuChiKeShu,
    JiaoZhiKeShu,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/RiChang/QuChiDengJiAdd',
        data: {
            StudentIdName,
            StudentId,
            BanJiIdName,
            JianChaRiQi,
            NianLing,
            ShangQuChi,
            XiaQuChi,
            QuChiKeShu,
            JiaoZhiKeShu,
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

export const AddList31 = ({
    RiQi
}) => {
    return request({
        method: 'POST',
        url: '/STU/STUKaoQinAdd',
        data: {
            RiQi
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

export const AddList32 = ({
    FoodCode,
    FoodName,
    LingYongRen,
    JiaGongRen,
    JiaGongDate,
    ChuLiFangFa,
    ChuLiShuLiang,
    KeYongShuLiang,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/ChuFang/ShiCaiChuLiJiLuAdd',
        data: {
            FoodCode,
            FoodName,
            LingYongRen,
            JiaGongRen,
            JiaGongDate,
            ChuLiFangFa,
            ChuLiShuLiang,
            KeYongShuLiang,
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

export const AddList33 = ({
    CanBie,
    CaiYaoIdName,
    CaiYaoId,
    LiuYangRen,
    JiaGongRen,
    LiuYangRiQi,
    LiuYangWeiZhi,
    YuJiXiaoHuiRiQi,
    XiaoHuiRiQi,
    XiaoHuiRen,
    BeiZhu,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/ChuFang/CaiPinLiuYangAdd',
        data: {
            CanBie,
            CaiYaoIdName,
            CaiYaoId,
            LiuYangRen,
            JiaGongRen,
            LiuYangRiQi,
            LiuYangWeiZhi,
            YuJiXiaoHuiRiQi,
            XiaoHuiRiQi,
            XiaoHuiRen,
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

export const AddList34 = () => {
    return request({
        method: 'POST',
        url: '/HR/UserJiXiaoKaoHeAdd',
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

export const AddList35 = ({
    UsersIdName,
    UsersId,
    RiQi,
    LaiYuan,
    LeiBie,
    JinE,
    YinHangZhangHuIdName,
    YinHangZhangHuId,
    IsJiangCheng,
    NeiRong,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/CAW/UserJiangChengAdd',
        data: {
            UsersIdName,
            UsersId,
            RiQi,
            LaiYuan,
            LeiBie,
            JinE,
            YinHangZhangHuIdName,
            YinHangZhangHuId,
            IsJiangCheng,
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

export const AddList36 = ({
    UsersIdName,
    UsersId,
    Title,
    StartDate,
    EndDate,
    JiaoShiFeiYong,
    YuanSuoFeiYong,
    JiangShi,
    YinHangZhangHuIdName,
    YinHangZhangHuId,
    NeiRong,
    ChengGuo,
    Id
}) => {
    return request({
        method: 'POST',
        url: '/CAW/UserPeiXunAdd',
        data: {
            UsersIdName,
            UsersId,
            Title,
            StartDate,
            EndDate,
            JiaoShiFeiYong,
            YuanSuoFeiYong,
            JiangShi,
            YinHangZhangHuIdName,
            YinHangZhangHuId,
            NeiRong,
            ChengGuo,
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
