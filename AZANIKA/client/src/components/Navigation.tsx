import React from 'react';
import Link from 'next/link';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-primary-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link href="/">AZANIKA</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/products" className="text-white hover:underline">
              Products
            </Link>
          </li>
          <li>
            <Link href="/cart" className="text-white hover:underline">
              Cart
            </Link>
          </li>
          <li>
            <Link href="/checkout" className="text-white hover:underline">
              Checkout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;