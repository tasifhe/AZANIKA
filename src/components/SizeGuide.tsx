'use client';

import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

const SizeGuide: React.FC<SizeGuideProps> = ({ isOpen, onClose, category = 'general' }) => {
  const sizeCharts = {
    jewelry: {
      title: 'Jewelry Size Guide',
      description: 'Find your perfect fit for rings, bracelets, and necklaces.',
      tables: [
        {
          title: 'Ring Sizes',
          headers: ['US Size', 'UK Size', 'EU Size', 'Diameter (mm)', 'Circumference (mm)'],
          rows: [
            ['5', 'J', '49', '15.7', '49.3'],
            ['6', 'L', '52', '16.5', '51.9'],
            ['7', 'N', '54', '17.3', '54.4'],
            ['8', 'P', '57', '18.2', '57.2'],
            ['9', 'R', '59', '19.0', '59.7'],
          ],
        },
        {
          title: 'Bracelet Sizes',
          headers: ['Size', 'Wrist Circumference', 'Description'],
          rows: [
            ['Small', '15-17 cm (6-6.5")', 'Petite wrist'],
            ['Medium', '17-19 cm (6.5-7.5")', 'Average wrist'],
            ['Large', '19-21 cm (7.5-8.5")', 'Larger wrist'],
          ],
        },
        {
          title: 'Necklace Lengths',
          headers: ['Length', 'Measurement', 'Style'],
          rows: [
            ['Choker', '35-40 cm (14-16")', 'Sits at collarbone'],
            ['Princess', '45-50 cm (18-20")', 'Sits at collarbone or just below'],
            ['Matinee', '55-60 cm (22-24")', 'Sits at or above bust'],
            ['Opera', '75-90 cm (30-36")', 'Sits at bust or below'],
          ],
        },
      ],
    },
    handbags: {
      title: 'Handbag Size Guide',
      description: 'Choose the perfect bag size for your needs.',
      tables: [
        {
          title: 'Bag Dimensions',
          headers: ['Type', 'Width', 'Height', 'Depth', 'Best For'],
          rows: [
            ['Mini', '15-20 cm', '10-15 cm', '5-8 cm', 'Essentials only'],
            ['Small', '20-25 cm', '15-20 cm', '8-12 cm', 'Phone, wallet, keys'],
            ['Medium', '25-35 cm', '20-28 cm', '12-18 cm', 'Daily essentials'],
            ['Large', '35-45 cm', '28-35 cm', '18-25 cm', 'Work, travel'],
            ['Tote', '40-50 cm', '35-45 cm', '15-20 cm', 'Shopping, beach'],
          ],
        },
      ],
    },
    scarves: {
      title: 'Scarf Size Guide',
      description: 'Find the perfect scarf dimensions for different styling options.',
      tables: [
        {
          title: 'Scarf Sizes',
          headers: ['Type', 'Dimensions', 'Best For'],
          rows: [
            ['Skinny Scarf', '5-10 cm x 150-180 cm', 'Neck accent, hair accessory'],
            ['Square Scarf', '70 cm x 70 cm', 'Neck, head, bag charm'],
            ['Medium Scarf', '90 cm x 90 cm', 'Versatile styling'],
            ['Large Scarf', '120 cm x 120 cm', 'Shoulder wrap, shawl'],
            ['Long Scarf', '50 cm x 200 cm', 'Wrapping, draping'],
          ],
        },
      ],
    },
    sunglasses: {
      title: 'Sunglasses Size Guide',
      description: 'Choose sunglasses that fit your face shape and size.',
      tables: [
        {
          title: 'Frame Sizes',
          headers: ['Size', 'Lens Width', 'Bridge Width', 'Temple Length', 'Face Size'],
          rows: [
            ['Small', '48-52 mm', '16-18 mm', '135-140 mm', 'Petite faces'],
            ['Medium', '52-56 mm', '18-20 mm', '140-145 mm', 'Average faces'],
            ['Large', '56-60 mm', '20-22 mm', '145-150 mm', 'Larger faces'],
          ],
        },
        {
          title: 'Face Shape Guide',
          headers: ['Face Shape', 'Best Frame Styles'],
          rows: [
            ['Oval', 'Most styles work well'],
            ['Round', 'Angular, rectangular frames'],
            ['Square', 'Round, oval frames'],
            ['Heart', 'Bottom-heavy, cat-eye frames'],
          ],
        },
      ],
    },
    watches: {
      title: 'Watch Size Guide',
      description: 'Find the perfect watch size for your wrist.',
      tables: [
        {
          title: 'Watch Case Sizes',
          headers: ['Size Category', 'Case Diameter', 'Wrist Size', 'Best For'],
          rows: [
            ['Small', '26-32 mm', '14-16 cm', 'Petite wrists, elegant look'],
            ['Medium', '34-38 mm', '16-18 cm', 'Average wrists, versatile'],
            ['Standard', '38-42 mm', '18-20 cm', 'Most wrists, modern'],
            ['Large', '42-46 mm', '20-22 cm', 'Statement pieces'],
          ],
        },
        {
          title: 'Band Sizes',
          headers: ['Size', 'Length', 'Wrist Circumference'],
          rows: [
            ['Small', '15-17 cm', '14-16 cm'],
            ['Medium', '17-19 cm', '16-18 cm'],
            ['Large', '19-21 cm', '18-20 cm'],
          ],
        },
      ],
    },
    general: {
      title: 'General Size Guide',
      description: 'Measure yourself accurately for the best fit.',
      tables: [
        {
          title: 'How to Measure',
          headers: ['Item Type', 'Measurement Method'],
          rows: [
            ['Ring', 'Measure the inner diameter of a ring that fits well, or wrap a string around your finger and measure the length'],
            ['Bracelet', 'Measure your wrist with a flexible tape measure, add 1-2 cm for comfort'],
            ['Necklace', 'Measure from the base of your neck to where you want the necklace to sit'],
            ['Belt', 'Measure around your waist where you typically wear pants/skirts'],
          ],
        },
      ],
    },
  };

  const chart = sizeCharts[category as keyof typeof sizeCharts] || sizeCharts.general;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-brand-50 to-brand-100 p-6 border-b border-pearl-200">
                  <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all hover:scale-110"
                  >
                    <X size={20} className="text-pearl-700" />
                  </button>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-brand-500 rounded-xl">
                      <Ruler size={24} className="text-white" />
                    </div>
                    <div>
                      <Dialog.Title className="text-2xl font-display font-bold text-pearl-900">
                        {chart.title}
                      </Dialog.Title>
                      <p className="text-pearl-600 mt-1">
                        {chart.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  <div className="space-y-8">
                    {chart.tables.map((table, idx) => (
                      <div key={idx} className="space-y-3">
                        <h3 className="text-lg font-display font-semibold text-pearl-900 border-b-2 border-brand-200 pb-2">
                          {table.title}
                        </h3>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gradient-to-r from-brand-50 to-brand-100">
                                {table.headers.map((header, hIdx) => (
                                  <th
                                    key={hIdx}
                                    className="px-4 py-3 text-left text-sm font-bold text-pearl-900 border border-pearl-200 first:rounded-tl-lg last:rounded-tr-lg"
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {table.rows.map((row, rIdx) => (
                                <tr
                                  key={rIdx}
                                  className={`${
                                    rIdx % 2 === 0 ? 'bg-white' : 'bg-pearl-50'
                                  } hover:bg-champagne-50 transition-colors`}
                                >
                                  {row.map((cell, cIdx) => (
                                    <td
                                      key={cIdx}
                                      className="px-4 py-3 text-sm text-pearl-700 border border-pearl-200"
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}

                    {/* Tips */}
                    <div className="bg-gradient-to-br from-blush-50 to-brand-50 rounded-xl p-6 border border-blush-100">
                      <h4 className="font-display font-semibold text-pearl-900 mb-3 flex items-center gap-2">
                        <span className="text-brand-500">💡</span>
                        Measurement Tips
                      </h4>
                      <ul className="space-y-2 text-sm text-pearl-700">
                        <li className="flex gap-2">
                          <span className="text-brand-500">•</span>
                          Measure in the morning when fingers/wrists are at their smallest
                        </li>
                        <li className="flex gap-2">
                          <span className="text-brand-500">•</span>
                          Use a flexible measuring tape for accurate results
                        </li>
                        <li className="flex gap-2">
                          <span className="text-brand-500">•</span>
                          If between sizes, we recommend sizing up for comfort
                        </li>
                        <li className="flex gap-2">
                          <span className="text-brand-500">•</span>
                          Contact our customer service for personalized sizing advice
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-pearl-50 border-t border-pearl-200">
                  <p className="text-sm text-pearl-600 text-center">
                    Still unsure about sizing? <a href="/contact" className="text-brand-600 font-semibold hover:text-brand-700">Contact our team</a> for personalized assistance.
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SizeGuide;
