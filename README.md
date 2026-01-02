# Maglo Finansal Dashboard - Next.js & TypeScript

Bu proje, bir Front-End Developer ve Web Uzmanı olarak modern web standartlarını, performansı ve kullanıcı deneyimini merkeze alarak geliştirdiğim gelişmiş bir finansal yönetim panelidir. Kariyerim boyunca odaklandığım sayfa yükleme sürelerini optimize etme ve ölçeklenebilir yapılar kurma prensiplerini bu projeye yansıttım.

## Teknik Özellikler ve Teknoloji Yığını

Projenin mimarisi, yüksek performans ve tip güvenliği sağlamak amacıyla aşağıdaki teknolojilerle inşa edilmiştir:

* **Framework:** Next.js 16 (App Router) kullanılarak sunucu taraflı render ve optimize edilmiş yönlendirme yapısı kurulmuştur.
* **Dil:** Geliştirme sürecinin her aşamasında TypeScript kullanılarak kod kalitesi ve sürdürülebilirlik artırılmıştır.
* **Kullanıcı Arayüzü:** Radix UI tabanlı modüler bileşenler (Accordion, Dialog, Tabs vb.) ve Tailwind CSS ile tamamen responsive bir tasarım oluşturulmuştur.
* **Veri Görselleştirme:** Finansal metriklerin analiz edilebilmesi için Recharts kütüphanesi entegre edilmiştir.
* **Form Yönetimi:** Veri giriş süreçleri React Hook Form ve Zod şema validasyonu ile güvenli hale getirilmiştir.

## Temel Fonksiyonlar

* **Finansal Özet Paneli:** Toplam gelir, gider ve tasarruf verilerinin anlık takibi için dinamik stat kartları.
* **İşlem Geçmişi ve Takibi:** Son yapılan harcamaların kategorize edilmiş şekilde listelenmesi ve durum takibi.
* **Cüzdan ve Kart Yönetimi:** Kayıtlı banka/kredi kartlarının bakiye ve limit bilgilerinin görsel sunumu.
* **Grafik Analizleri:** İşletme sermayesi ve nakit akışının aylık bazda karşılaştırmalı analizi.
* **Güvenli Erişim:** Next.js Middleware ve cookie tabanlı kimlik doğrulama kontrolleri ile dashboard güvenliği sağlanmıştır.

## Proje Dizini

```text
├── app/                  # Next.js uygulama rotaları ve sayfa yapıları
├── components/           # Projeye özel ve genel UI bileşenleri
│   ├── dashboard/        # Dashboard'a özgü modüler parçalar
│   └── ui/               # Radix UI ve temel arayüz elemanları
├── lib/                  # API fetch yapılandırması ve yardımcı fonksiyonlar
├── types/                # TypeScript tip ve arayüz tanımlamaları
└── hooks/                # Özel React hook'ları (use-mobile vb.)

```

## Kurulum ve Çalıştırma

Projeyi yerel makinenizde test etmek için aşağıdaki adımları izleyebilirsiniz:

1. Bağımlılıkları yükleyin: `npm install`
2. Geliştirme sunucusunu başlatın: `npm run dev`
3. Tarayıcınızdan erişin: `http://localhost:3000`
