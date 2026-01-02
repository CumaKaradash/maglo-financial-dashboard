import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-[#0A0A0A]">
      {/* Background Abstract Shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[50%] top-0 h-[64rem] w-[128rem] -translate-x-[50%] stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)] dark:stroke-white/5"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-27d704b0b2c8"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-27d704b0b2c8)" />
        </svg>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-6 ring-1 ring-primary/20">
          <Search className="h-6 w-6 text-primary" />
        </div>
        
        <p className="text-base font-semibold leading-8 text-primary uppercase tracking-widest">Hata 404</p>
        
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
          Aradığınız yolu bulamadık
        </h1>
        
        <p className="mt-6 text-lg leading-7 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Üzgünüz, aradığınız sayfaya şu anda ulaşılamıyor. Lütfen URL'yi kontrol edin veya aşağıdaki hızlı bağlantıları kullanarak güvenli bölgeye dönün.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Button asChild variant="default" size="lg" className="h-12 px-8 rounded-full font-medium transition-transform hover:scale-105 active:scale-95">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Panele Git
            </Link>
          </Button>
          
          <Button asChild variant="ghost" size="lg" className="h-12 px-8 rounded-full font-medium text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Geri Dön
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 w-full max-w-4xl border-t border-gray-100 pt-16 dark:border-white/5">
        <div className="text-center sm:text-left">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Destek mi lazım?</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Yardım merkezimizi ziyaret edin.</p>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Durum</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Tüm sistemler aktif ve çalışıyor.</p>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Güvenlik</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Verileriniz bizimle güvende.</p>
        </div>
      </div>
    </div>
  )
}
