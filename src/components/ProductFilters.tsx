'use client';

import React, { useState } from 'react';
import { X, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterSection {
  id: string;
  title: string;
  type: 'checkbox' | 'range' | 'color' | 'radio';
  options?: FilterOption[];
  min?: number;
  max?: number;
}

interface ProductFiltersProps {
  onFilterChange: (filters: any) => void;
  activeFilters: any;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ onFilterChange, activeFilters }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['price', 'category', 'color']);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const filterSections: FilterSection[] = [
    {
      id: 'category',
      title: 'Category',
      type: 'checkbox',
      options: [
        { label: 'Jewelry', value: 'jewelry', count: 45 },
        { label: 'Handbags', value: 'handbags', count: 32 },
        { label: 'Scarves', value: 'scarves', count: 28 },
        { label: 'Sunglasses', value: 'sunglasses', count: 21 },
        { label: 'Watches', value: 'watches', count: 18 },
        { label: 'Accessories', value: 'accessories', count: 56 },
      ],
    },
    {
      id: 'price',
      title: 'Price Range',
      type: 'range',
      min: 0,
      max: 10000,
    },
    {
      id: 'color',
      title: 'Color',
      type: 'color',
      options: [
        { label: 'Rose Gold', value: 'rosegold' },
        { label: 'Champagne', value: 'champagne' },
        { label: 'Blush Pink', value: 'blush' },
        { label: 'Pearl White', value: 'pearl' },
        { label: 'Gold', value: 'gold' },
        { label: 'Mauve', value: 'mauve' },
        { label: 'Copper', value: 'copper' },
        { label: 'Black', value: 'black' },
      ],
    },
    {
      id: 'material',
      title: 'Material',
      type: 'checkbox',
      options: [
        { label: 'Leather', value: 'leather', count: 34 },
        { label: 'Metal', value: 'metal', count: 28 },
        { label: 'Fabric', value: 'fabric', count: 42 },
        { label: 'Silk', value: 'silk', count: 19 },
        { label: 'Gold Plated', value: 'gold-plated', count: 25 },
        { label: 'Sterling Silver', value: 'sterling-silver', count: 16 },
      ],
    },
    {
      id: 'size',
      title: 'Size',
      type: 'checkbox',
      options: [
        { label: 'One Size', value: 'one-size', count: 67 },
        { label: 'Small', value: 'small', count: 23 },
        { label: 'Medium', value: 'medium', count: 31 },
        { label: 'Large', value: 'large', count: 28 },
        { label: 'Adjustable', value: 'adjustable', count: 45 },
      ],
    },
    {
      id: 'rating',
      title: 'Customer Rating',
      type: 'radio',
      options: [
        { label: '4★ & Above', value: '4' },
        { label: '3★ & Above', value: '3' },
        { label: '2★ & Above', value: '2' },
        { label: 'All Ratings', value: '0' },
      ],
    },
  ];

  const colorMap: { [key: string]: string } = {
    rosegold: '#e8824b',
    champagne: '#f2d4a8',
    blush: '#ea6280',
    pearl: '#f5f5f4',
    gold: '#f0a020',
    mauve: '#a37b9e',
    copper: '#d96744',
    black: '#1c1917',
  };

  const handleCheckboxChange = (sectionId: string, value: string) => {
    const currentValues = activeFilters[sectionId] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v: string) => v !== value)
      : [...currentValues, value];
    
    onFilterChange({ ...activeFilters, [sectionId]: newValues });
  };

  const handleRadioChange = (sectionId: string, value: string) => {
    onFilterChange({ ...activeFilters, [sectionId]: value });
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    onFilterChange({ ...activeFilters, priceMin: min, priceMax: max });
  };

  const clearAllFilters = () => {
    onFilterChange({});
    setPriceRange([0, 10000]);
  };

  const activeFilterCount = Object.keys(activeFilters).filter(
    (key) => activeFilters[key] && (Array.isArray(activeFilters[key]) ? activeFilters[key].length > 0 : true)
  ).length;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-pearl-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={20} className="text-brand-600" />
          <h3 className="font-display font-bold text-lg text-pearl-900">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="bg-brand-100 text-brand-700 text-xs font-bold px-2 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-brand-600 hover:text-brand-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filter Sections */}
      {filterSections.map((section) => (
        <div key={section.id} className="border-b border-pearl-100 pb-4">
          <button
            onClick={() => toggleSection(section.id)}
            className="flex items-center justify-between w-full mb-3 group"
          >
            <span className="font-semibold text-pearl-900 group-hover:text-brand-600 transition-colors">
              {section.title}
            </span>
            {expandedSections.includes(section.id) ? (
              <ChevronUp size={18} className="text-pearl-500" />
            ) : (
              <ChevronDown size={18} className="text-pearl-500" />
            )}
          </button>

          {expandedSections.includes(section.id) && (
            <div className="space-y-2 animate-slide-down">
              {section.type === 'checkbox' && section.options && (
                <div className="space-y-2">
                  {section.options.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={(activeFilters[section.id] || []).includes(option.value)}
                          onChange={() => handleCheckboxChange(section.id, option.value)}
                          className="w-4 h-4 rounded border-pearl-300 text-brand-500 focus:ring-brand-500 focus:ring-offset-0 cursor-pointer"
                        />
                        <span className="text-sm text-pearl-700 group-hover:text-brand-600 transition-colors">
                          {option.label}
                        </span>
                      </div>
                      {option.count && (
                        <span className="text-xs text-pearl-400">({option.count})</span>
                      )}
                    </label>
                  ))}
                </div>
              )}

              {section.type === 'radio' && section.options && (
                <div className="space-y-2">
                  {section.options.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name={section.id}
                        checked={activeFilters[section.id] === option.value}
                        onChange={() => handleRadioChange(section.id, option.value)}
                        className="w-4 h-4 border-pearl-300 text-brand-500 focus:ring-brand-500 cursor-pointer"
                      />
                      <span className="text-sm text-pearl-700 group-hover:text-brand-600 transition-colors">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {section.type === 'color' && section.options && (
                <div className="grid grid-cols-4 gap-2">
                  {section.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleCheckboxChange(section.id, option.value)}
                      className={`relative group flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                        (activeFilters[section.id] || []).includes(option.value)
                          ? 'bg-brand-50 ring-2 ring-brand-500'
                          : 'hover:bg-pearl-50'
                      }`}
                      title={option.label}
                    >
                      <span
                        className="w-8 h-8 rounded-full border-2 border-pearl-200 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: colorMap[option.value] || option.value }}
                      />
                      <span className="text-[10px] text-pearl-600 text-center leading-tight">
                        {option.label.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {section.type === 'range' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-pearl-700">৳{priceRange[0]}</span>
                    <span className="text-pearl-700">৳{priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min={section.min}
                    max={section.max}
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(priceRange[0], parseInt(e.target.value))}
                    className="w-full h-2 bg-pearl-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(parseInt(e.target.value) || 0, priceRange[1])}
                      className="w-full px-3 py-2 border border-pearl-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(priceRange[0], parseInt(e.target.value) || 10000)}
                      className="w-full px-3 py-2 border border-pearl-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="Max"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="sticky top-24 bg-white rounded-2xl shadow-soft border border-pearl-100 p-6">
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="btn btn-primary shadow-luxury flex items-center gap-2"
        >
          <SlidersHorizontal size={18} />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-white text-brand-600 text-xs font-bold px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl animate-slide-up">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-pearl-200">
                <h2 className="font-display font-bold text-lg text-pearl-900">Filters</h2>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 hover:bg-pearl-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <FilterContent />
              </div>
              <div className="p-4 border-t border-pearl-200">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full btn btn-primary"
                >
                  Show Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilters;
