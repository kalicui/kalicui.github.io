// EXPORTS: MOCK_PRODUCTS, PLATFORM_CONFIG, CATEGORY_CONFIG, SORT_TYPES

import type { IProduct } from '@/types/products';

export const PLATFORM_CONFIG = [
  { key: 'all', label: '全部' },
  { key: 'pinduoduo', label: '拼多多' },
  { key: 'taobao', label: '淘宝' },
  { key: 'douyin', label: '抖音' },
  { key: 'jd', label: '京东' },
] as const;

export const CATEGORY_CONFIG = [
  { key: 'featured', label: '精选' },
  { key: 'clothing', label: '服饰' },
  { key: 'digital', label: '数码' },
  { key: 'food', label: '食品' },
  { key: 'home', label: '家居' },
  { key: 'beauty', label: '美妆' },
  { key: 'baby', label: '母婴' },
] as const;

export const SORT_TYPES = [
  { key: 'default', label: '默认' },
  { key: 'price-asc', label: '价格升序' },
  { key: 'price-desc', label: '价格降序' },
] as const;

export const MOCK_PRODUCTS: IProduct[] = [
  {
    id: '1',
    name: '碎花连衣裙',
    platform: 'taobao',
    category: 'clothing',
    price: 189,
    image: '/spark/app/app_4kd9uu1nqwp88/runtime/api/v1/storage/object/bucket_aadkgiwjv6ghs_static/static%2Faadkgimnwtinw_ve_miaoda',
    description: '法式复古碎花连衣裙，轻盈雪纺面料，V领收腰设计，适合春夏日常穿搭',
  },
  {
    id: '2',
    name: '降噪蓝牙耳机',
    platform: 'jd',
    category: 'digital',
    price: 349,
    image: '/spark/app/app_4kd9uu1nqwp88/runtime/api/v1/storage/object/bucket_aadkgiwjv6ghs_static/static%2Faadkgisbcoucs_ve_miaoda',
    description: '主动降噪无线蓝牙耳机，40小时续航，Hi-Res音质，支持快充',
  },
  {
    id: '3',
    name: '坚果混合礼盒',
    platform: 'pinduoduo',
    category: 'food',
    price: 79,
    image: '/spark/app/app_4kd9uu1nqwp88/runtime/api/v1/storage/object/bucket_aadkgiwjv6ghs_static/static%2Faadkgimv6j4bs_ve_miaoda',
    description: '每日坚果混合装，6种坚果果干科学配比，独立小包锁鲜',
  },
  {
    id: '4',
    name: '北欧金属台灯',
    platform: 'taobao',
    category: 'home',
    price: 259,
    image: '/spark/app/app_4kd9uu1nqwp88/runtime/api/v1/storage/object/bucket_aadkgiwjv6ghs_static/static%2Faadkgil2hemku_ve_miaoda',
    description: '极简北欧风金属台灯，三档色温无极调光，护眼阅读办公适用',
  },
  {
    id: '5',
    name: '保湿精华液',
    platform: 'douyin',
    category: 'beauty',
    price: 159,
    image: '/spark/app/app_4kd9uu1nqwp88/runtime/api/v1/storage/object/bucket_aadkgiwjv6ghs_static/static%2Faadkginc64abs_ve_miaoda',
    description: '玻尿酸保湿精华液，深层补水锁水，清爽不黏腻，适合所有肤质',
  },
  {
    id: '6',
    name: '婴儿纸尿裤',
    platform: 'jd',
    category: 'baby',
    price: 89,
    image: '/spark/app/app_4kd9uu1nqwp88/runtime/api/v1/storage/object/bucket_aadkgiwjv6ghs_static/static%2Faadkgimxs7qns_ve_miaoda',
    description: '超薄透气婴儿纸尿裤，3D珍珠面层，12小时干爽，L码60片装',
  },
  {
    id: '7',
    name: '运动跑鞋',
    platform: 'pinduoduo',
    category: 'clothing',
    price: 219,
    image: '/spark/app/app_4kd9uu1nqwp88/runtime/api/v1/storage/object/bucket_aadkgiwjv6ghs_static/static%2Faadkgilkjmcdu_ve_miaoda',
    description: '轻量缓震运动跑鞋，飞织透气鞋面，回弹中底，适合日常慢跑',
  },
  {
    id: '8',
    name: '智能运动手表',
    platform: 'taobao',
    category: 'digital',
    price: 599,
    image: '/spark/app/app_4kd9uu1nqwp88/runtime/api/v1/storage/object/bucket_aadkgiwjv6ghs_static/static%2Faadkgiqie4mgs_ve_miaoda',
    description: '智能运动手表，GPS定位血氧监测，14天续航，50米防水',
  },
  {
    id: '9',
    name: '有机核桃仁',
    platform: 'douyin',
    category: 'food',
    price: 49,
    image: '/spark/app/app_4kd9uu1nqwp88/runtime/api/v1/storage/object/bucket_aadkgiwjv6ghs_static/static%2Faadkgimv6j4bs_ve_miaoda',
    description: '新疆薄皮核桃仁，原味无添加，低温烘焙保留营养，250g罐装',
  },
  {
    id: '10',
    name: '香薰蜡烛套装',
    platform: 'jd',
    category: 'home',
    price: 129,
    image: '/spark/app/app_4kd9uu1nqwp88/runtime/api/v1/storage/object/bucket_aadkgiwjv6ghs_static/static%2Faadkgil2hemku_ve_miaoda',
    description: '大豆蜡香薰蜡烛礼盒，4种香型，燃烧时长约25小时/个',
  },
  {
    id: '11',
    name: '防晒隔离霜',
    platform: 'pinduoduo',
    category: 'beauty',
    price: 99,
    image: '/spark/app/app_4kd9uu1nqwp88/runtime/api/v1/storage/object/bucket_aadkgiwjv6ghs_static/static%2Faadkginc64abs_ve_miaoda',
    description: '清爽防晒隔离霜SPF50+，轻薄不假白，养肤级防晒',
  },
  {
    id: '12',
    name: '儿童积木套装',
    platform: 'douyin',
    category: 'baby',
    price: 139,
    image: '/spark/app/app_4kd9uu1nqwp88/runtime/api/v1/storage/object/bucket_aadkgiwjv6ghs_static/static%2Faadkgimxs7qns_ve_miaoda',
    description: '大颗粒儿童积木100粒装，安全环保ABS材质，锻炼动手创造力',
  },
];
