import { Playfair_Display, Cormorant_Garamond, Lora, Montserrat, Dancing_Script } from 'next/font/google'
import '../styles/globals.css'
import { CartProvider } from '@/lib/cart-context'
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from '@/components/ErrorBoundary'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const lora = Lora({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora',
  display: 'swap',
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

const dancing = Dancing_Script({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dancing',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'AZANIKA - Premium Women\'s Fashion Accessories',
    template: '%s | AZANIKA'
  },
  description: 'Elevating women\'s style with premium fashion accessories. Discover elegant jewelry, luxury handbags, silk scarves, and designer sunglasses. Free shipping on orders over $100.',
  keywords: ['women fashion accessories', 'premium jewelry', 'luxury handbags', 'silk scarves', 'designer sunglasses', 'AZANIKA fashion', 'elegant accessories', 'women\'s jewelry'],
  authors: [{ name: 'AZANIKA Team' }],
  creator: 'AZANIKA',
  publisher: 'AZANIKA',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://azanika.com',
    title: 'AZANIKA - Premium Women\'s Fashion Accessories',
    description: 'Elevating women\'s style with premium fashion accessories. Discover elegant jewelry, luxury handbags, silk scarves, and designer sunglasses.',
    siteName: 'AZANIKA',
    images: [
      {
        url: '/AZANIKA_LOGO.png',
        width: 1200,
        height: 630,
        alt: 'AZANIKA - Premium Women\'s Fashion Accessories'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AZANIKA - Premium Women\'s Fashion Accessories',
    description: 'Elevating women\'s style with premium fashion accessories.',
    images: ['/AZANIKA_LOGO.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#e8956d',  // Rose gold from logo
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${playfair.variable} ${cormorant.variable} ${montserrat.variable} ${dancing.variable} font-body`}>
        <ErrorBoundary>
          <CartProvider>
            {children}
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </CartProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
