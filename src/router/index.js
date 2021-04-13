import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import ChildManagement from '@/views/ChildManagement'
import DaKa from '@/views/DaKa'
import ChildAdd from '@/views/ChildLink/ChildAdd'
import ChildEdit from '@/views/ChildLink/ChildEdit'
import ChildDetails from '@/views/ChildLink/ChildDetails'
import ChildTiaoBan from '@/views/ChildLink/ChildTiaoBan'
import AttendanceAudit from '@/views/AttendanceAudit'
import store from '@/store/'
import { Dialog } from 'vant'
import ChenWuWanJian from '@/views/ChenWuWanJian'
import ChenWuWanJianAdd from '@/views/ChenWuWanJian/ChenWuWanJianAdd'
import ChenWuWanJianEdit from '@/views/ChenWuWanJian/ChenWuWanJianEdit'
import ChenWuWanJianDetail from '@/views/ChenWuWanJian/ChenWuWanJianDetail'
import JiBingDengJi from '@/views/JiBingDengJi'
import JiBingDengJiAdd from '@/views/JiBingDengJi/JiBingDengJiAdd'
import JiBingDengJiEdit from '@/views/JiBingDengJi/JiBingDengJiEdit'
import JiBingDengJiDetails from '@/views/JiBingDengJi/JiBingDengJiDetails'
import JianKangDengJis from '@/views/JianKangDengJis'
import JianKangDengJisAdd from '@/views/JianKangDengJis/JianKangDengJisAdd'
import JianKangDengJisEdit from '@/views/JianKangDengJis/JianKangDengJisEdit'
import JianKangDengJisDetails from '@/views/JianKangDengJis/JianKangDengJisDetails'
import ChuanRanBingDengJis from '@/views/ChuanRanBingDengJis'
import ChuanRanBingDengJisAdd from '@/views/ChuanRanBingDengJis/ChuanRanBingDengJisAdd'
import ChuanRanBingDengJisEdit from '@/views/ChuanRanBingDengJis/ChuanRanBingDengJisEdit'
import ChuanRanBingDengJisDetail from '@/views/ChuanRanBingDengJis/ChuanRanBingDengJisDetail'
import DaXingWanJus from '@/views/DaXingWanJus'
import DaXingWanJusAdd from '@/views/DaXingWanJus/DaXingWanJusAdd'
import DaXingWanJusEdit from '@/views/DaXingWanJus/DaXingWanJusEdit'
import DaXingWanJusDetail from '@/views/DaXingWanJus/DaXingWanJusDetail'
import DaXingWanJuJianChaDengJis from '@/views/DaXingWanJuJianChaDengJis'
import DaXingWanJuJianChaDengJisAdd from '@/views/DaXingWanJuJianChaDengJis/DaXingWanJuJianChaDengJisAdd'
import DaXingWanJuJianChaDengJisEdit from '@/views/DaXingWanJuJianChaDengJis/DaXingWanJuJianChaDengJisEdit'
import DaXingWanJuJianChaDengJisDetail from '@/views/DaXingWanJuJianChaDengJis/DaXingWanJuJianChaDengJisDetail'
import AnJianXiangMus from '@/views/AnJianXiangMus'
import AnJianXiangMusAdd from '@/views/AnJianXiangMus/AnJianXiangMusAdd'
import AnJianXiangMusEdit from '@/views/AnJianXiangMus/AnJianXiangMusEdit'
import AnJianXiangMusDetail from '@/views/AnJianXiangMus/AnJianXiangMusDetail'
import CaiPinLiuYangs from '@/views/CaiPinLiuYangs'
import CaiPinLiuYangsAdd from '@/views/CaiPinLiuYangs/CaiPinLiuYangsAdd'
import CaiPinLiuYangsEdit from '@/views/CaiPinLiuYangs/CaiPinLiuYangsEdit'
import CaiPinLiuYangsDetail from '@/views/CaiPinLiuYangs/CaiPinLiuYangsDetail'
import CanJuXiaoDus from '@/views/CanJuXiaoDus'
import CanJuXiaoDusAdd from '@/views/CanJuXiaoDus/CanJuXiaoDusAdd'
import CanJuXiaoDusEdit from '@/views/CanJuXiaoDus/CanJuXiaoDusEdit'
import CanJuXiaoDusDetail from '@/views/CanJuXiaoDus/CanJuXiaoDusDetail'
import NengHaoShiYongs from '@/views/NengHaoShiYongs'
import NengHaoShiYongsAdd from '@/views/NengHaoShiYongs/NengHaoShiYongsAdd'
import NengHaoShiYongsEdit from '@/views/NengHaoShiYongs/NengHaoShiYongsEdit'
import NengHaoShiYongsDetail from '@/views/NengHaoShiYongs/NengHaoShiYongsDetail'
import NengHaoXiangMus from '@/views/NengHaoXiangMus'
import NengHaoXiangMusAdd from '@/views/NengHaoXiangMus/NengHaoXiangMusAdd'
import NengHaoXiangMusEdit from '@/views/NengHaoXiangMus/NengHaoXiangMusEdit'
import NengHaoXiangMusDetail from '@/views/NengHaoXiangMus/NengHaoXiangMusDetail'
import QuYuXiaoDus from '@/views/QuYuXiaoDus'
import QuYuXiaoDusAdd from '@/views/QuYuXiaoDus/QuYuXiaoDusAdd'
import QuYuXiaoDusEdit from '@/views/QuYuXiaoDus/QuYuXiaoDusEdit'
import QuYuXiaoDusDetail from '@/views/QuYuXiaoDus/QuYuXiaoDusDetail'
import ShiCaiChuLiJiLus from '@/views/ShiCaiChuLiJiLus'
import ShiCaiChuLiJiLusAdd from '@/views/ShiCaiChuLiJiLus/ShiCaiChuLiJiLusAdd'
import ShiCaiChuLiJiLusEdit from '@/views/ShiCaiChuLiJiLus/ShiCaiChuLiJiLusEdit'
import ShiCaiChuLiJiLusDetail from '@/views/ShiCaiChuLiJiLus/ShiCaiChuLiJiLusDetail'
import ShiPinJianCes from '@/views/ShiPinJianCes'
import ShiPinJianCesAdd from '@/views/ShiPinJianCes/ShiPinJianCesAdd'
import ShiPinJianCesEdit from '@/views/ShiPinJianCes/ShiPinJianCesEdit'
import ShiPinJianCesDetail from '@/views/ShiPinJianCes/ShiPinJianCesDetail'
import BanJis from '@/views/BanJis'
import BanJisAdd from '@/views/BanJis/BanJisAdd'
import BanJisEdit from '@/views/BanJis/BanJisEdit'
import BanJisDetail from '@/views/BanJis/BanJisDetail'
import TiRuoDengJis from '@/views/TiRuoDengJis'
import TiRuoDengJisAdd from '@/views/TiRuoDengJis/TiRuoDengJisAdd'
import TiRuoDengJisEdit from '@/views/TiRuoDengJis/TiRuoDengJisEdit'
import TiRuoDengJisDeatil from '@/views/TiRuoDengJis/TiRuoDengJisDeatil'
import ShiLiDengJis from '@/views/ShiLiDengJis'
import ShiLiDengJisAdd from '@/views/ShiLiDengJis/ShiLiDengJisAdd'
import ShiLiDengJisEdit from '@/views/ShiLiDengJis/ShiLiDengJisEdit'
import ShiLiDengJisDetail from '@/views/ShiLiDengJis/ShiLiDengJisDetail'
import BanCiGuanLis from '@/views/BanCiGuanLis'
import BiaoDanSheJis from '@/views/BiaoDanSheJis'
import BiaoZhunGuanLis from '@/views/BiaoZhunGuanLis'
import BuMenGuanLis from '@/views/BuMenGuanLis'
import CaiYaoGuanLis from '@/views/CaiYaoGuanLis'
import CangKuGuanLis from '@/views/CangKuGuanLis'
import CeHuaFangAns from '@/views/CeHuaFangAns'
import ChanPinGuanLis from '@/views/ChanPinGuanLis'
import ChanPinLeiBie from '@/views/ChanPinLeiBie'
import ChuKuGuanLis from '@/views/ChuKuGuanLis'
import DaiChuLiLiuChengs from '@/views/DaiChuLiLiuChengs'
import DiQuGuanLis from '@/views/DiQuGuanLis'
import GongGaos from '@/views/GongGaos'
import GongYingShangs from '@/views/GongYingShangs'
import GongZiFangAns from '@/views/GongZiFangAns'
import GongZiLieBiaos from '@/views/GongZiLieBiaos'
import HuanJingDiaoYans from '@/views/HuanJingDiaoYans'
import HuoDongFangAns from '@/views/HuoDongFangAns'
import JiaoYuJingLis from '@/views/JiaoYuJingLis'
import JiaZhangGuanLis from '@/views/JiaZhangGuanLis'
import JiXiaoGuanLis from '@/views/JiXiaoGuanLis'
import JiXiaoPingFens from '@/views/JiXiaoPingFens'
import JueSeGuanLis from '@/views/JueSeGuanLis'
import KaoQinLieBiaos from '@/views/KaoQinLieBiaos'
import KaoQinShenHes from '@/views/KaoQinShenHes'
import KaoQinZuGuanLis from '@/views/KaoQinZuGuanLis'
import KuCunQingDans from '@/views/KuCunQingDans'
import LaiDianLaiFangs from '@/views/LaiDianLaiFangs'
import LiuChengSheJis from '@/views/LiuChengSheJis'
import MoKuaiGuanLis from '@/views/MoKuaiGuanLis'
import PaiBanGuanLis from '@/views/PaiBanGuanLis'
import PanDianGuanLis from '@/views/PanDianGuanLis'
import PeiCanGuanLis from '@/views/PeiCanGuanLis'
import PingCeGuanLi from '@/views/PingCeGuanLi'
import QingJiaGuanLis from '@/views/QingJiaGuanLis'
import RuKuDingDans from '@/views/RuKuDingDans'
import RuKuGuanLis from '@/views/RuKuGuanLis'
import ShiCaiGuanLis from '@/views/ShiCaiGuanLis'
import ShiLiFuChaDengJis from '@/views/ShiLiFuChaDengJis'
import ShouFeiFangAns from '@/views/ShouFeiFangAns'
import ShouZhiGuanLis from '@/views/ShouZhiGuanLis'
import ShuJuQuanXIans from '@/views/ShuJuQuanXIans'
import TiJianBiaos from '@/views/TiJianBiaos'
import TiZhiCeShis from '@/views/TiZhiCeShis'
import WoDeLiuChengs from '@/views/WoDeLiuChengs'
import WoDeXiaoXis from '@/views/WoDeXiaoXis'
import XiTongRiZhis from '@/views/XiTongRiZhis'
import XiTongSheZhis from '@/views/XiTongSheZhis'
import YiChuLiLiuChengs from '@/views/YiChuLiLiuChengs'
import YiMiaoGuanLis from '@/views/YiMiaoGuanLis'
import YiMiaoJieZhongs from '@/views/YiMiaoJieZhongs'
import YinHangs from '@/views/YinHangs'
import YuanGongGuanLis from '@/views/YuanGongGuanLis'
import YuanGongJiangChengs from '@/views/YuanGongJiangChengs'
import YuanGongPeiXuns from '@/views/YuanGongPeiXuns'
import ZhiWuGuanLis from '@/views/ZhiWuGuanLis'
import ZhuangXiuGongChengs from '@/views/ZhuangXiuGongChengs'
import ZhuangXiuGongSis from '@/views/ZhuangXiuGongSis'
import ZiChanWeiHus from '@/views/ZiChanWeiHus'
import ZiChanXinXiBiaos from '@/views/ZiChanXinXiBiaos'
import ZiDianFenLeis from '@/views/ZiDianFenLeis'
import ZiYuanGuanLis from '@/views/ZiYuanGuanLis'
import ZuZhiJiaGous from '@/views/ZuZhiJiaGous'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  try {
    return originalPush.call(this, location).catch(err => err);
  } catch (error) {
    console.error(error);
  }
};

const router = new VueRouter({
  routes: [
    { name: 'index', path: '/', redirect: '/login' },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    { name: 'childManagement', path: '/ChildManagement', component: ChildManagement, meta: { requiresAuth: true } },
    { name: 'DaKa', path: '/DaKa', component: DaKa },
    { name: 'ChildAdd', path: '/ChildAdd', component: ChildAdd, meta: { requiresAuth: true } },
    { name: 'ChildEdit', path: '/ChildEdit', component: ChildEdit, meta: { requiresAuth: true } },
    { name: 'ChildDetails', path: '/ChildDetails', component: ChildDetails, meta: { requiresAuth: true } },
    { name: 'ChildTiaoBan', path: '/ChildTiaoBan', component: ChildTiaoBan, meta: { requiresAuth: true } },
    { name: 'ChenWuWanJian', path: '/ChenWuWanJian', component: ChenWuWanJian, meta: { requiresAuth: true } },
    { name: 'ChenWuWanJianAdd', path: '/ChenWuWanJianAdd', component: ChenWuWanJianAdd, meta: { requiresAuth: true } },
    { name: 'ChenWuWanJianEdit', path: '/ChenWuWanJianEdit', component: ChenWuWanJianEdit, meta: { requiresAuth: true } },
    { name: 'ChenWuWanJianDetail', path: '/ChenWuWanJianDetail', component: ChenWuWanJianDetail, meta: { requiresAuth: true } },
    { name: 'JiBingDengJi', path: '/JiBingDengJi', component: JiBingDengJi, meta: { requiresAuth: true } },
    { name: 'JiBingDengJiAdd', path: '/JiBingDengJiAdd', component: JiBingDengJiAdd, meta: { requiresAuth: true } },
    { name: 'JiBingDengJiEdit', path: '/JiBingDengJiEdit', component: JiBingDengJiEdit, meta: { requiresAuth: true } },
    { name: 'JiBingDengJiDetails', path: '/JiBingDengJiDetails', component: JiBingDengJiDetails, meta: { requiresAuth: true } },
    { name: 'AttendanceAudit', path: '/AttendanceAudit', component: AttendanceAudit },
    { name: 'JianKangDengJis', path: '/JianKangDengJis', component: JianKangDengJis, meta: { requiresAuth: true } },
    { name: 'JianKangDengJisAdd', path: '/JianKangDengJisAdd', component: JianKangDengJisAdd, meta: { requiresAuth: true } },
    { name: 'JianKangDengJisEdit', path: '/JianKangDengJisEdit', component: JianKangDengJisEdit, meta: { requiresAuth: true } },
    { name: 'JianKangDengJisDetails', path: '/JianKangDengJisDetails', component: JianKangDengJisDetails, meta: { requiresAuth: true } },
    { name: 'ChuanRanBingDengJis', path: '/ChuanRanBingDengJis', component: ChuanRanBingDengJis, meta: { requiresAuth: true } },
    { name: 'ChuanRanBingDengJisAdd', path: '/ChuanRanBingDengJisAdd', component: ChuanRanBingDengJisAdd, meta: { requiresAuth: true } },
    { name: 'ChuanRanBingDengJisEdit', path: '/ChuanRanBingDengJisEdit', component: ChuanRanBingDengJisEdit, meta: { requiresAuth: true } },
    { name: 'ChuanRanBingDengJisDetail', path: '/ChuanRanBingDengJisDetail', component: ChuanRanBingDengJisDetail, meta: { requiresAuth: true } },
    { name: 'DaXingWanJus', path: '/DaXingWanJus', component: DaXingWanJus, meta: { requiresAuth: true } },
    { name: 'DaXingWanJusAdd', path: '/DaXingWanJusAdd', component: DaXingWanJusAdd, meta: { requiresAuth: true } },
    { name: 'DaXingWanJusEdit', path: '/DaXingWanJusEdit', component: DaXingWanJusEdit, meta: { requiresAuth: true } },
    { name: 'DaXingWanJusDetail', path: '/DaXingWanJusDetail', component: DaXingWanJusDetail, meta: { requiresAuth: true } },
    { name: 'DaXingWanJuJianChaDengJis', path: '/DaXingWanJuJianChaDengJis', component: DaXingWanJuJianChaDengJis, meta: { requiresAuth: true } },
    { name: 'DaXingWanJuJianChaDengJisAdd', path: '/DaXingWanJuJianChaDengJisAdd', component: DaXingWanJuJianChaDengJisAdd, meta: { requiresAuth: true } },
    { name: 'DaXingWanJuJianChaDengJisEdit', path: '/DaXingWanJuJianChaDengJisEdit', component: DaXingWanJuJianChaDengJisEdit, meta: { requiresAuth: true } },
    { name: 'DaXingWanJuJianChaDengJisDetail', path: '/DaXingWanJuJianChaDengJisDetail', component: DaXingWanJuJianChaDengJisDetail, meta: { requiresAuth: true } },
    { name: 'AnJianXiangMus', path: '/AnJianXiangMus', component: AnJianXiangMus, meta: { requiresAuth: true } },
    { name: 'AnJianXiangMusAdd', path: '/AnJianXiangMusAdd', component: AnJianXiangMusAdd, meta: { requiresAuth: true } },
    { name: 'AnJianXiangMusEdit', path: '/AnJianXiangMusEdit', component: AnJianXiangMusEdit, meta: { requiresAuth: true } },
    { name: 'AnJianXiangMusDetail', path: '/AnJianXiangMusDetail', component: AnJianXiangMusDetail, meta: { requiresAuth: true } },
    { name: 'CaiPinLiuYangs', path: '/CaiPinLiuYangs', component: CaiPinLiuYangs, meta: { requiresAuth: true } },
    { name: 'CaiPinLiuYangsAdd', path: '/CaiPinLiuYangsAdd', component: CaiPinLiuYangsAdd, meta: { requiresAuth: true } },
    { name: 'CaiPinLiuYangsDetail', path: '/CaiPinLiuYangsDetail', component: CaiPinLiuYangsDetail, meta: { requiresAuth: true } },
    { name: 'CaiPinLiuYangsEdit', path: '/CaiPinLiuYangsEdit', component: CaiPinLiuYangsEdit, meta: { requiresAuth: true } },
    { name: 'CanJuXiaoDus', path: '/CanJuXiaoDus', component: CanJuXiaoDus, meta: { requiresAuth: true } },
    { name: 'CanJuXiaoDusAdd', path: '/CanJuXiaoDusAdd', component: CanJuXiaoDusAdd, meta: { requiresAuth: true } },
    { name: 'CanJuXiaoDusDetail', path: '/CanJuXiaoDusDetail', component: CanJuXiaoDusDetail, meta: { requiresAuth: true } },
    { name: 'CanJuXiaoDusEdit', path: '/CanJuXiaoDusEdit', component: CanJuXiaoDusEdit, meta: { requiresAuth: true } },
    { name: 'NengHaoShiYongs', path: '/NengHaoShiYongs', component: NengHaoShiYongs, meta: { requiresAuth: true } },
    { name: 'NengHaoShiYongsAdd', path: '/NengHaoShiYongsAdd', component: NengHaoShiYongsAdd, meta: { requiresAuth: true } },
    { name: 'NengHaoShiYongsDetail', path: '/NengHaoShiYongsDetail', component: NengHaoShiYongsDetail, meta: { requiresAuth: true } },
    { name: 'NengHaoShiYongsEdit', path: '/NengHaoShiYongsEdit', component: NengHaoShiYongsEdit, meta: { requiresAuth: true } },
    { name: 'NengHaoXiangMus', path: '/NengHaoXiangMus', component: NengHaoXiangMus, meta: { requiresAuth: true } },
    { name: 'NengHaoXiangMusAdd', path: '/NengHaoXiangMusAdd', component: NengHaoXiangMusAdd, meta: { requiresAuth: true } },
    { name: 'NengHaoXiangMusDetail', path: '/NengHaoXiangMusDetail', component: NengHaoXiangMusDetail, meta: { requiresAuth: true } },
    { name: 'NengHaoXiangMusEdit', path: '/NengHaoXiangMusEdit', component: NengHaoXiangMusEdit, meta: { requiresAuth: true } },
    { name: 'QuYuXiaoDus', path: '/QuYuXiaoDus', component: QuYuXiaoDus, meta: { requiresAuth: true } },
    { name: 'QuYuXiaoDusAdd', path: '/QuYuXiaoDusAdd', component: QuYuXiaoDusAdd, meta: { requiresAuth: true } },
    { name: 'QuYuXiaoDusDetail', path: '/QuYuXiaoDusDetail', component: QuYuXiaoDusDetail, meta: { requiresAuth: true } },
    { name: 'QuYuXiaoDusEdit', path: '/QuYuXiaoDusEdit', component: QuYuXiaoDusEdit, meta: { requiresAuth: true } },
    { name: 'ShiCaiChuLiJiLus', path: '/ShiCaiChuLiJiLus', component: ShiCaiChuLiJiLus, meta: { requiresAuth: true } },
    { name: 'ShiCaiChuLiJiLusAdd', path: '/ShiCaiChuLiJiLusAdd', component: ShiCaiChuLiJiLusAdd, meta: { requiresAuth: true } },
    { name: 'ShiCaiChuLiJiLusDetail', path: '/ShiCaiChuLiJiLusDetail', component: ShiCaiChuLiJiLusDetail, meta: { requiresAuth: true } },
    { name: 'ShiCaiChuLiJiLusEdit', path: '/ShiCaiChuLiJiLusEdit', component: ShiCaiChuLiJiLusEdit, meta: { requiresAuth: true } },
    { name: 'ShiPinJianCes', path: '/ShiPinJianCes', component: ShiPinJianCes, meta: { requiresAuth: true } },
    { name: 'ShiPinJianCesAdd', path: '/ShiPinJianCesAdd', component: ShiPinJianCesAdd, meta: { requiresAuth: true } },
    { name: 'ShiPinJianCesDetail', path: '/ShiPinJianCesDetail', component: ShiPinJianCesDetail, meta: { requiresAuth: true } },
    { name: 'ShiPinJianCesEdit', path: '/ShiPinJianCesEdit', component: ShiPinJianCesEdit, meta: { requiresAuth: true } },
    { name: 'BanJis', path: '/BanJis', component: BanJis, meta: { requiresAuth: true } },
    { name: 'BanJisAdd', path: '/BanJisAdd', component: BanJisAdd, meta: { requiresAuth: true } },
    { name: 'BanJisDetail', path: '/BanJisDetail', component: BanJisDetail, meta: { requiresAuth: true } },
    { name: 'BanJisEdit', path: '/BanJisEdit', component: BanJisEdit, meta: { requiresAuth: true } },
    { name: 'TiRuoDengJis', path: '/TiRuoDengJis', component: TiRuoDengJis, meta: { requiresAuth: true } },
    { name: 'TiRuoDengJisAdd', path: '/TiRuoDengJisAdd', component: TiRuoDengJisAdd, meta: { requiresAuth: true } },
    { name: 'TiRuoDengJisDeatil', path: '/TiRuoDengJisDeatil', component: TiRuoDengJisDeatil, meta: { requiresAuth: true } },
    { name: 'TiRuoDengJisEdit', path: '/TiRuoDengJisEdit', component: TiRuoDengJisEdit, meta: { requiresAuth: true } },
    { name: 'ShiLiDengJis', path: '/ShiLiDengJis', component: ShiLiDengJis, meta: { requiresAuth: true } },
    { name: 'ShiLiDengJisAdd', path: '/ShiLiDengJisAdd', component: ShiLiDengJisAdd, meta: { requiresAuth: true } },
    { name: 'ShiLiDengJisDetail', path: '/ShiLiDengJisDetail', component: ShiLiDengJisDetail, meta: { requiresAuth: true } },
    { name: 'ShiLiDengJisEdit', path: '/ShiLiDengJisEdit', component: ShiLiDengJisEdit, meta: { requiresAuth: true } },
    { name: 'BanCiGuanLis', path: '/BanCiGuanLis', component: BanCiGuanLis, meta: { requiresAuth: true } },
    { name: 'BiaoDanSheJis', path: '/BiaoDanSheJis', component: BiaoDanSheJis, meta: { requiresAuth: true } },
    { name: 'BiaoZhunGuanLis', path: '/BiaoZhunGuanLis', component: BiaoZhunGuanLis, meta: { requiresAuth: true } },
    { name: 'BuMenGuanLis', path: '/BuMenGuanLis', component: BuMenGuanLis, meta: { requiresAuth: true } },
    { name: 'CaiYaoGuanLis', path: '/CaiYaoGuanLis', component: CaiYaoGuanLis, meta: { requiresAuth: true } },
    { name: 'CangKuGuanLis', path: '/CangKuGuanLis', component: CangKuGuanLis, meta: { requiresAuth: true } },
    { name: 'CeHuaFangAns', path: '/CeHuaFangAns', component: CeHuaFangAns, meta: { requiresAuth: true } },
    { name: 'ChanPinGuanLis', path: '/ChanPinGuanLis', component: ChanPinGuanLis, meta: { requiresAuth: true } },
    { name: 'ChanPinLeiBie', path: '/ChanPinLeiBie', component: ChanPinLeiBie, meta: { requiresAuth: true } },
    { name: 'ChuKuGuanLis', path: '/ChuKuGuanLis', component: ChuKuGuanLis, meta: { requiresAuth: true } },
    { name: 'DaiChuLiLiuChengs', path: '/DaiChuLiLiuChengs', component: DaiChuLiLiuChengs, meta: { requiresAuth: true } },
    { name: 'DiQuGuanLis', path: '/DiQuGuanLis', component: DiQuGuanLis, meta: { requiresAuth: true } },
    { name: 'GongGaos', path: '/GongGaos', component: GongGaos, meta: { requiresAuth: true } },
    { name: 'GongYingShangs', path: '/GongYingShangs', component: GongYingShangs, meta: { requiresAuth: true } },
    { name: 'GongZiFangAns', path: '/GongZiFangAns', component: GongZiFangAns, meta: { requiresAuth: true } },
    { name: 'GongZiLieBiaos', path: '/GongZiLieBiaos', component: GongZiLieBiaos, meta: { requiresAuth: true } },
    { name: 'HuanJingDiaoYans', path: '/HuanJingDiaoYans', component: HuanJingDiaoYans, meta: { requiresAuth: true } },
    { name: 'HuoDongFangAns', path: '/HuoDongFangAns', component: HuoDongFangAns, meta: { requiresAuth: true } },
    { name: 'JiaoYuJingLis', path: '/JiaoYuJingLis', component: JiaoYuJingLis, meta: { requiresAuth: true } },
    { name: 'JiaZhangGuanLis', path: '/JiaZhangGuanLis', component: JiaZhangGuanLis, meta: { requiresAuth: true } },
    { name: 'JiXiaoGuanLis', path: '/JiXiaoGuanLis', component: JiXiaoGuanLis, meta: { requiresAuth: true } },
    { name: 'JiXiaoPingFens', path: '/JiXiaoPingFens', component: JiXiaoPingFens, meta: { requiresAuth: true } },
    { name: 'JueSeGuanLis', path: '/JueSeGuanLis', component: JueSeGuanLis, meta: { requiresAuth: true } },
    { name: 'KaoQinLieBiaos', path: '/KaoQinLieBiaos', component: KaoQinLieBiaos, meta: { requiresAuth: true } },
    { name: 'KaoQinShenHes', path: '/KaoQinShenHes', component: KaoQinShenHes, meta: { requiresAuth: true } },
    { name: 'KaoQinZuGuanLis', path: '/KaoQinZuGuanLis', component: KaoQinZuGuanLis, meta: { requiresAuth: true } },
    { name: 'KuCunQingDans', path: '/KuCunQingDans', component: KuCunQingDans, meta: { requiresAuth: true } },
    { name: 'LaiDianLaiFangs', path: '/LaiDianLaiFangs', component: LaiDianLaiFangs, meta: { requiresAuth: true } },
    { name: 'LiuChengSheJis', path: '/LiuChengSheJis', component: LiuChengSheJis, meta: { requiresAuth: true } },
    { name: 'MoKuaiGuanLis', path: '/MoKuaiGuanLis', component: MoKuaiGuanLis, meta: { requiresAuth: true } },
    { name: 'PaiBanGuanLis', path: '/PaiBanGuanLis', component: PaiBanGuanLis, meta: { requiresAuth: true } },
    { name: 'PanDianGuanLis', path: '/PanDianGuanLis', component: PanDianGuanLis, meta: { requiresAuth: true } },
    { name: 'PeiCanGuanLis', path: '/PeiCanGuanLis', component: PeiCanGuanLis, meta: { requiresAuth: true } },
    { name: 'PingCeGuanLi', path: '/PingCeGuanLi', component: PingCeGuanLi, meta: { requiresAuth: true } },
    { name: 'QingJiaGuanLis', path: '/QingJiaGuanLis', component: QingJiaGuanLis, meta: { requiresAuth: true } },
    { name: 'RuKuDingDans', path: '/RuKuDingDans', component: RuKuDingDans, meta: { requiresAuth: true } },
    { name: 'RuKuGuanLis', path: '/RuKuGuanLis', component: RuKuGuanLis, meta: { requiresAuth: true } },
    { name: 'ShiCaiGuanLis', path: '/ShiCaiGuanLis', component: ShiCaiGuanLis, meta: { requiresAuth: true } },
    { name: 'ShiLiFuChaDengJis', path: '/ShiLiFuChaDengJis', component: ShiLiFuChaDengJis, meta: { requiresAuth: true } },
    { name: 'ShouFeiFangAns', path: '/ShouFeiFangAns', component: ShouFeiFangAns, meta: { requiresAuth: true } },
    { name: 'ShouZhiGuanLis', path: '/ShouZhiGuanLis', component: ShouZhiGuanLis, meta: { requiresAuth: true } },
    { name: 'ShuJuQuanXIans', path: '/ShuJuQuanXIans', component: ShuJuQuanXIans, meta: { requiresAuth: true } },
    { name: 'TiJianBiaos', path: '/TiJianBiaos', component: TiJianBiaos, meta: { requiresAuth: true } },
    { name: 'TiZhiCeShis', path: '/TiZhiCeShis', component: TiZhiCeShis, meta: { requiresAuth: true } },
    { name: 'WoDeLiuChengs', path: '/WoDeLiuChengs', component: WoDeLiuChengs, meta: { requiresAuth: true } },
    { name: 'WoDeXiaoXis', path: '/WoDeXiaoXis', component: WoDeXiaoXis, meta: { requiresAuth: true } },
    { name: 'XiTongRiZhis', path: '/XiTongRiZhis', component: XiTongRiZhis, meta: { requiresAuth: true } },
    { name: 'XiTongSheZhis', path: '/XiTongSheZhis', component: XiTongSheZhis, meta: { requiresAuth: true } },
    { name: 'YiChuLiLiuChengs', path: '/YiChuLiLiuChengs', component: YiChuLiLiuChengs, meta: { requiresAuth: true } },
    { name: 'YiMiaoGuanLis', path: '/YiMiaoGuanLis', component: YiMiaoGuanLis, meta: { requiresAuth: true } },
    { name: 'YiMiaoJieZhongs', path: '/YiMiaoJieZhongs', component: YiMiaoJieZhongs, meta: { requiresAuth: true } },
    { name: 'YinHangs', path: '/YinHangs', component: YinHangs, meta: { requiresAuth: true } },
    { name: 'YuanGongGuanLis', path: '/YuanGongGuanLis', component: YuanGongGuanLis, meta: { requiresAuth: true } },
    { name: 'YuanGongJiangChengs', path: '/YuanGongJiangChengs', component: YuanGongJiangChengs, meta: { requiresAuth: true } },
    { name: 'YuanGongPeiXuns', path: '/YuanGongPeiXuns', component: YuanGongPeiXuns, meta: { requiresAuth: true } },
    { name: 'ZhiWuGuanLis', path: '/ZhiWuGuanLis', component: ZhiWuGuanLis, meta: { requiresAuth: true } },
    { name: 'ZhuangXiuGongChengs', path: '/ZhuangXiuGongChengs', component: ZhuangXiuGongChengs, meta: { requiresAuth: true } },
    { name: 'ZhuangXiuGongSis', path: '/ZhuangXiuGongSis', component: ZhuangXiuGongSis, meta: { requiresAuth: true } },
    { name: 'ZiChanWeiHus', path: '/ZiChanWeiHus', component: ZiChanWeiHus, meta: { requiresAuth: true } },
    { name: 'ZiChanXinXiBiaos', path: '/ZiChanXinXiBiaos', component: ZiChanXinXiBiaos, meta: { requiresAuth: true } },
    { name: 'ZiDianFenLeis', path: '/ZiDianFenLeis', component: ZiDianFenLeis, meta: { requiresAuth: true } },
    { name: 'ZiYuanGuanLis', path: '/ZiYuanGuanLis', component: ZiYuanGuanLis, meta: { requiresAuth: true } },
    { name: 'ZuZhiJiaGous', path: '/ZuZhiJiaGous', component: ZuZhiJiaGous, meta: { requiresAuth: true } }

  ]
})
// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  // 判断页面是否需要登录才能访问
  if (to.meta.requiresAuth) {
    // 如已登录，通过
    if (store.state.user) {
      return next()
    }
    // 没有登录，登录
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能访问，确认登录吗'
    }).then(() => { // 确认执行
      router.replace({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }).catch(() => { // 取消执行
      // 取消，中断路由导航
      next(false)
    })
  } else {
    // 不需要登录状态的页面，直接过
    next()
  }
})
export default router
