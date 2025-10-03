import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  specs: {
    height: string;
    width: string;
    depth: string;
    load: string;
    shelves: number;
  };
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Стеллаж промышленный усиленный',
    price: 12999,
    image: '/img/9abb24da-fcc8-4ec6-869d-7592ed4a4a40.jpg',
    description: 'Надежный металлический стеллаж для складских помещений',
    specs: {
      height: '200 см',
      width: '120 см',
      depth: '50 см',
      load: '500 кг на полку',
      shelves: 5
    }
  },
  {
    id: 2,
    name: 'Стеллаж усиленный для склада',
    price: 15999,
    image: '/img/2f5fa7c7-41ee-46ed-9c0c-b6448c45181f.jpg',
    description: 'Сверхпрочный стеллаж для тяжелых грузов',
    specs: {
      height: '220 см',
      width: '150 см',
      depth: '60 см',
      load: '800 кг на полку',
      shelves: 4
    }
  },
  {
    id: 3,
    name: 'Стеллаж для дома и офиса',
    price: 7999,
    image: '/img/05d69430-ba4d-4713-8930-0c1747a43b6b.jpg',
    description: 'Компактный стеллаж для небольших помещений',
    specs: {
      height: '180 см',
      width: '90 см',
      depth: '40 см',
      load: '150 кг на полку',
      shelves: 4
    }
  },
  {
    id: 4,
    name: 'Стеллаж мобильный на колесах',
    price: 9999,
    image: '/img/9abb24da-fcc8-4ec6-869d-7592ed4a4a40.jpg',
    description: 'Удобный передвижной стеллаж с колесами',
    specs: {
      height: '170 см',
      width: '100 см',
      depth: '45 см',
      load: '200 кг на полку',
      shelves: 5
    }
  },
  {
    id: 5,
    name: 'Стеллаж архивный высокий',
    price: 11999,
    image: '/img/2f5fa7c7-41ee-46ed-9c0c-b6448c45181f.jpg',
    description: 'Оптимальное решение для архивов и документов',
    specs: {
      height: '250 см',
      width: '100 см',
      depth: '35 см',
      load: '100 кг на полку',
      shelves: 6
    }
  },
  {
    id: 6,
    name: 'Стеллаж угловой многоярусный',
    price: 13999,
    image: '/img/05d69430-ba4d-4713-8930-0c1747a43b6b.jpg',
    description: 'Экономит пространство, идеален для углов',
    specs: {
      height: '200 см',
      width: '100 см',
      depth: '50 см',
      load: '300 кг на полку',
      shelves: 5
    }
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [consultantOpen, setConsultantOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleConsultantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо! Наш консультант свяжется с вами в ближайшее время.');
    setConsultantOpen(false);
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Warehouse" className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">СтеллажПро</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">
              Каталог
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              О компании
            </a>
            <a href="#delivery" className="text-sm font-medium hover:text-primary transition-colors">
              Доставка
            </a>
            <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">
              Контакты
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button onClick={() => setConsultantOpen(true)} variant="outline" size="sm" className="hidden sm:flex">
              <Icon name="MessageCircle" className="mr-2 h-4 w-4" />
              Консультация
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="default" size="sm" className="relative">
                  <Icon name="ShoppingCart" className="h-4 w-4" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {cartCount > 0 ? `Товаров в корзине: ${cartCount}` : 'Корзина пуста'}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Добавьте товары в корзину</p>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 items-center border-b pb-4">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto"
                              >
                                <Icon name="Trash2" className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="pt-4 border-t">
                        <div className="flex justify-between mb-4">
                          <span className="font-bold">Итого:</span>
                          <span className="font-bold text-lg">{cartTotal.toLocaleString()} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              Прочность и надежность
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Металлические стеллажи для любых задач
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Широкий выбор стеллажей для склада, офиса и дома. Доставка по всей России. Гарантия качества.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="Package" className="mr-2 h-5 w-5" />
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline" onClick={() => setConsultantOpen(true)}>
                <Icon name="MessageCircle" className="mr-2 h-5 w-5" />
                Получить консультацию
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Каталог стеллажей</h2>
            <p className="text-muted-foreground text-lg">Выберите подходящее решение для ваших нужд</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Высота:</span>
                      <span className="font-medium text-foreground">{product.specs.height}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ширина:</span>
                      <span className="font-medium text-foreground">{product.specs.width}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Глубина:</span>
                      <span className="font-medium text-foreground">{product.specs.depth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Нагрузка:</span>
                      <span className="font-medium text-foreground">{product.specs.load}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Полок:</span>
                      <span className="font-medium text-foreground">{product.specs.shelves}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</p>
                  </div>
                  <Button onClick={() => addToCart(product)}>
                    <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">О компании СтеллажПро</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Мы специализируемся на производстве и продаже металлических стеллажей более 15 лет. 
                Наша продукция используется на складах, в офисах и домах по всей России.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Гарантируем высокое качество, надежность и долговечность каждого изделия. 
                Все стеллажи проходят строгий контроль качества.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">лет на рынке</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-sm text-muted-foreground">довольных клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">моделей стеллажей</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <Icon name="Shield" className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-bold mb-2">Гарантия качества</h3>
                <p className="text-sm text-muted-foreground">5 лет гарантии на все изделия</p>
              </Card>
              <Card className="p-6 text-center">
                <Icon name="Truck" className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-bold mb-2">Быстрая доставка</h3>
                <p className="text-sm text-muted-foreground">Доставка по России от 3 дней</p>
              </Card>
              <Card className="p-6 text-center">
                <Icon name="Wrench" className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-bold mb-2">Сборка</h3>
                <p className="text-sm text-muted-foreground">Простая сборка или под ключ</p>
              </Card>
              <Card className="p-6 text-center">
                <Icon name="HeadphonesIcon" className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-bold mb-2">Поддержка 24/7</h3>
                <p className="text-sm text-muted-foreground">Всегда на связи с клиентами</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Доставка и оплата</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Truck" className="h-5 w-5 text-primary" />
                  Условия доставки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">По Москве и МО</p>
                    <p className="text-sm text-muted-foreground">От 500 ₽, от 1-2 дней</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">По России</p>
                    <p className="text-sm text-muted-foreground">Транспортные компании, от 3 дней</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Самовывоз</p>
                    <p className="text-sm text-muted-foreground">Бесплатно со склада в Москве</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="CreditCard" className="h-5 w-5 text-primary" />
                  Способы оплаты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Онлайн оплата</p>
                    <p className="text-sm text-muted-foreground">Банковские карты Visa, MasterCard, Мир</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Безналичный расчет</p>
                    <p className="text-sm text-muted-foreground">Для юридических лиц</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Наличными</p>
                    <p className="text-sm text-muted-foreground">При получении или самовывозе</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Контакты</h2>
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Icon name="MapPin" className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Адрес офиса</h3>
                      <p className="text-muted-foreground">г. Москва, ул. Складская, д. 10, стр. 2</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="Phone" className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Телефон</h3>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                      <p className="text-sm text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="Mail" className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <p className="text-muted-foreground">info@stellazhpro.ru</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Button size="lg" onClick={() => setConsultantOpen(true)} className="w-full">
                    <Icon name="MessageCircle" className="mr-2 h-5 w-5" />
                    Связаться с нами
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-muted/50 py-8 border-t">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Warehouse" className="h-5 w-5 text-primary" />
              <span className="font-bold">СтеллажПро</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2024 СтеллажПро. Все права защищены.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">Политика конфиденциальности</Button>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={consultantOpen} onOpenChange={setConsultantOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Онлайн-консультант</DialogTitle>
            <DialogDescription>
              Оставьте заявку, и наш специалист поможет подобрать оптимальное решение для ваших задач
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleConsultantSubmit} className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Ваше имя</label>
              <Input
                placeholder="Иван Иванов"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Телефон</label>
              <Input
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Опишите вашу задачу</label>
              <Textarea
                placeholder="Например: нужен стеллаж для гаража, высота 2 метра..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full">
              <Icon name="Send" className="mr-2 h-4 w-4" />
              Отправить заявку
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Button
        onClick={() => setConsultantOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 rounded-full shadow-lg h-14 w-14 p-0 md:h-auto md:w-auto md:px-6"
      >
        <Icon name="MessageCircle" className="h-6 w-6 md:mr-2" />
        <span className="hidden md:inline">Консультация</span>
      </Button>
    </div>
  );
}
