import { useState, useMemo, useCallback, type FormEvent, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Search, X, ShoppingCart, Plus, Minus, Trash2, ChevronDown, ChevronUp, PackageOpen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Image } from '@/components/ui/image';
import { scopedStorage } from '@lark-apaas/client-toolkit-lite';

import type { IProduct, ICartItem, Platform, Category } from '@/types/products';
import {
  MOCK_PRODUCTS,
  PLATFORM_CONFIG,
  CATEGORY_CONFIG,
  SORT_TYPES,
} from '@/data/products';

const CART_STORAGE_KEY = '__global_openxd_cart';

function loadCart(): ICartItem[] {
  try {
    const raw = scopedStorage.getItem(CART_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ICartItem[];
  } catch { /* ignore */ }
  return [];
}

function saveCart(items: ICartItem[]) {
  scopedStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

const platformBadgeVariant: Record<Platform, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  pinduoduo: 'destructive',
  taobao: 'default',
  douyin: 'secondary',
  jd: 'outline',
};

const platformBadgeClass: Record<Platform, string> = {
  pinduoduo: 'bg-red-600 hover:bg-red-600 text-white border-0',
  taobao: 'bg-orange-500 hover:bg-orange-500 text-white border-0',
  douyin: 'bg-black hover:bg-black text-white border-0',
  jd: 'bg-red-500 hover:bg-red-500 text-white border-0',
};

export default function HomePage() {
  // ---- filter / sort state ----
  const [keyword, setKeyword] = useState('');
  const [platform, setPlatform] = useState<string>('all');
  const [category, setCategory] = useState<string>('featured');
  const [sortType, setSortType] = useState<string>('default');

  // ---- cart state ----
  const [cart, setCart] = useState<ICartItem[]>(loadCart);
  const [cartOpen, setCartOpen] = useState(false);

  // ---- detail dialog ----
  const [detailProduct, setDetailProduct] = useState<IProduct | null>(null);

  // ---- derived: filtered + sorted ----
  const filtered = useMemo(() => {
    let list = [...MOCK_PRODUCTS];

    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(kw));
    }

    if (platform !== 'all') {
      list = list.filter(p => p.platform === platform);
    }

    if (category !== 'featured') {
      list = list.filter(p => p.category === category);
    }

    if (sortType === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [keyword, platform, category, sortType]);

  // ---- cart helpers ----
  const cartTotalCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const cartTotalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const addToCart = useCallback((product: IProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      let next: ICartItem[];
      if (existing) {
        next = prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        next = [
          ...prev,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            platform: product.platform,
            quantity: 1,
            image: product.image,
          },
        ];
      }
      saveCart(next);
      return next;
    });
    toast.success(`已添加「${product.name}」到购物车`);
  }, []);

  const updateQuantity = useCallback((productId: string, delta: number) => {
    setCart(prev => {
      const next = prev
        .map(item =>
          item.productId === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter(item => item.quantity > 0);
      saveCart(next);
      return next;
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => {
      const next = prev.filter(item => item.productId !== productId);
      saveCart(next);
      return next;
    });
  }, []);

  // ---- handlers ----
  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleClearSearch = () => {
    setKeyword('');
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* ========== 品牌标识区 ========== */}
        <section className="w-full">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
              XD
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight">
                迅达 OpenXD
              </h1>
              <p className="text-xs text-muted-foreground">
                聚合好物，一站比价
              </p>
            </div>
          </div>
        </section>

        {/* ========== 搜索栏 ========== */}
        <section className="w-full">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={keyword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
              placeholder="搜索商品关键词…"
              className="bg-card pl-9 pr-9 h-11 text-sm"
            />
            {keyword && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="!absolute right-1.5 top-1/2 z-20 h-7 w-7 -translate-y-1/2"
                onClick={handleClearSearch}
                aria-label="清除搜索"
              >
                <X className="size-4" />
              </Button>
            )}
          </form>
        </section>

        {/* ========== 平台筛选栏 ========== */}
        <section className="w-full">
          <div className="flex flex-wrap gap-2">
            {PLATFORM_CONFIG.map(p => (
              <Button
                key={p.key}
                variant={platform === p.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPlatform(p.key)}
                className="text-xs h-8 px-3"
              >
                {p.label}
              </Button>
            ))}
          </div>
        </section>

        {/* ========== 分类筛选栏 ========== */}
        <section className="w-full">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORY_CONFIG.map(c => (
              <Button
                key={c.key}
                variant={category === c.key ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setCategory(c.key)}
                className="text-xs h-8 px-3 shrink-0"
              >
                {c.label}
              </Button>
            ))}
          </div>
        </section>

        {/* ========== 排序控制栏 ========== */}
        <section className="w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              共 {filtered.length} 件商品
            </span>
            <div className="flex gap-1">
              {SORT_TYPES.map(s => (
                <Button
                  key={s.key}
                  variant={sortType === s.key ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSortType(s.key)}
                  className="text-xs h-7 px-2"
                >
                  {s.key === 'price-asc' && <ChevronUp className="size-3 mr-0.5" />}
                  {s.key === 'price-desc' && <ChevronDown className="size-3 mr-0.5" />}
                  {s.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* ========== 商品列表区 ========== */}
        <section className="w-full">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <PackageOpen className="size-12 mb-3 opacity-40" />
              <p className="text-sm">暂无匹配商品</p>
              <p className="text-xs mt-1 opacity-60">试试其他关键词或筛选条件</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, delay: Math.min(i, 6) * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Card
                      className="overflow-hidden cursor-pointer group border-border/50 hover:border-primary/30 transition-colors duration-150"
                      onClick={() => setDetailProduct(product)}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                        <Image
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <Badge
                          className={`!absolute left-2 top-2 z-20 text-[10px] h-5 px-1.5 ${platformBadgeClass[product.platform]}`}
                        >
                          {PLATFORM_CONFIG.find(p => p.key === product.platform)?.label}
                        </Badge>
                      </div>
                      <CardContent className="p-3 space-y-2">
                        <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-base font-bold text-primary tabular-nums">
                            ¥{product.price}
                          </span>
                          <Button
                            size="sm"
                            className="h-7 px-2.5 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                          >
                            <Plus className="size-3 mr-0.5" />
                            加购
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* ========== 购物车角标 ========== */}
        <div className="fixed right-4 bottom-6 z-40">
          <Button
            size="icon"
            className="relative h-12 w-12 rounded-full shadow-lg"
            onClick={() => setCartOpen(true)}
            aria-label="购物车"
          >
            <ShoppingCart className="size-5" />
            {cartTotalCount > 0 && (
              <motion.span
                key={cartTotalCount}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground px-1"
              >
                {cartTotalCount > 99 ? '99+' : cartTotalCount}
              </motion.span>
            )}
          </Button>
        </div>

        {/* ========== 购物车抽屉 ========== */}
        <Sheet open={cartOpen} onOpenChange={setCartOpen}>
          <SheetContent side="bottom" className="max-h-[70vh] rounded-t-xl">
            <SheetHeader className="mb-4">
              <SheetTitle className="flex items-center gap-2">
                <ShoppingCart className="size-5" />
                购物车
                {cartTotalCount > 0 && (
                  <span className="text-sm font-normal text-muted-foreground">
                    ({cartTotalCount} 件)
                  </span>
                )}
              </SheetTitle>
            </SheetHeader>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <ShoppingCart className="size-12 mb-3 opacity-30" />
                <p className="text-sm">购物车是空的</p>
                <p className="text-xs mt-1 opacity-60">快去挑选心仪的商品吧</p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {cart.map(item => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border/50"
                    >
                      <div className="size-14 shrink-0 rounded-md overflow-hidden bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          ¥{item.price}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.productId, -1)}
                          aria-label="减少数量"
                        >
                          <Minus className="size-3" />
                        </Button>
                        <span className="w-7 text-center text-sm font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.productId, 1)}
                          aria-label="增加数量"
                        >
                          <Plus className="size-3" />
                        </Button>
                      </div>
                      <div className="text-sm font-semibold text-foreground w-16 text-right tabular-nums shrink-0">
                        ¥{item.price * item.quantity}
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
                        onClick={() => removeFromCart(item.productId)}
                        aria-label="删除"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* 底部总价栏 */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
                  <div>
                    <span className="text-xs text-muted-foreground">合计</span>
                    <span className="ml-2 text-lg font-bold text-foreground tabular-nums">
                      ¥{cartTotalPrice.toFixed(2)}
                    </span>
                  </div>
                  <Button
                    onClick={() => {
                      toast.success('已提交订单，感谢购买！');
                      setCart([]);
                      saveCart([]);
                      setCartOpen(false);
                    }}
                  >
                    立即结算
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* ========== 商品详情弹窗 ========== */}
        <Dialog open={!!detailProduct} onOpenChange={(open) => { if (!open) setDetailProduct(null); }}>
          <DialogContent className="max-w-sm gap-0 p-0 overflow-hidden">
            {detailProduct && (
              <>
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={detailProduct.image}
                    alt={detailProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    className={`!absolute left-3 top-3 z-20 text-xs h-6 px-2 ${platformBadgeClass[detailProduct.platform]}`}
                  >
                    {PLATFORM_CONFIG.find(p => p.key === detailProduct.platform)?.label}
                  </Badge>
                </div>
                <div className="p-5 space-y-4">
                  <DialogHeader className="space-y-1">
                    <DialogTitle className="text-lg font-bold">
                      {detailProduct.name}
                    </DialogTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {CATEGORY_CONFIG.find(c => c.key === detailProduct.category)?.label}
                      </Badge>
                      <span className="text-2xl font-black text-primary tabular-nums">
                        ¥{detailProduct.price}
                      </span>
                    </div>
                  </DialogHeader>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {detailProduct.description}
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => {
                      addToCart(detailProduct);
                      setDetailProduct(null);
                    }}
                  >
                    <Plus className="size-4 mr-1" />
                    加入购物车
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

      </main>
    </div>
  );
}
