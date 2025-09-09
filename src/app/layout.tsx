import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { CartProvider } from '@/lib/cart-context'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AZANIKA - Women\'s Fashion Accessories',
  description: 'Elevating women\'s style with premium fashion accessories. Discover jewelry, handbags, scarves, and sunglasses.',
  keywords: 'women fashion, accessories, jewelry, handbags, scarves, sunglasses, AZANIKA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
      </body>
    </html>
  )
}
