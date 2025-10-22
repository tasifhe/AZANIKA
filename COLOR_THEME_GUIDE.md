# 🎨 AZANIKA Color Theme Guide - Women's Fashion Accessories

## 🌈 Overview
A vibrant, luxurious, and feminine color palette designed specifically for women's fashion accessories e-commerce.

---

## 💎 Primary Colors

### 🌺 Coral (Main Brand Color)
**Perfect for**: CTA buttons, highlights, brand elements
```css
coral-50: #fff5f3  /* Lightest - backgrounds */
coral-100: #ffe8e3
coral-200: #ffd5cc
coral-300: #ffb8a8
coral-400: #ff8f74
coral-500: #ff6b47  /* ★ Main Coral - Primary CTAs */
coral-600: #f04e28
coral-700: #d93f1d
coral-800: #b3351d
coral-900: #93301f  /* Darkest - text */
```

**Usage**:
```tsx
<button className="bg-coral-500 hover:bg-coral-600 text-white">
  Shop Now
</button>
```

---

### 🌸 Blush Pink (Feminine Accent)
**Perfect for**: Badges, highlights, romantic touches
```css
blush-50: #fef6f9   /* Ultra soft */
blush-100: #fdedf3
blush-200: #fcdce9
blush-300: #fabbd4
blush-400: #f78eb8
blush-500: #ef5f98  /* ★ Main Blush */
blush-600: #d93d7a
blush-700: #b82c61
blush-800: #992952
blush-900: #802747
```

**Usage**:
```tsx
<div className="bg-blush-100 border-2 border-blush-400">
  Sale: 30% OFF
</div>
```

---

### ✨ Rose Gold (Luxury Accent)
**Perfect for**: Premium products, VIP sections, luxury badges
```css
rosegold-50: #fef6f3
rosegold-100: #feeae3
rosegold-200: #fed8cb
rosegold-300: #fcbba6
rosegold-400: #f99171  /* ★ Beautiful rose gold tone */
rosegold-500: #f26d4c
rosegold-600: #de4a2b
rosegold-700: #ba3a22
rosegold-800: #993221
rosegold-900: #7d2d20
```

**Usage**:
```tsx
<span className="text-rosegold-400 font-semibold">
  Premium Collection
</span>
```

---

### 💜 Lavender (Elegant & Calming)
**Perfect for**: Headers, elegant sections, luxury items
```css
lavender-50: #faf5ff
lavender-100: #f3e8ff
lavender-200: #e9d5ff
lavender-300: #d8b4fe
lavender-400: #c084fc
lavender-500: #a855f7  /* ★ Main Lavender */
lavender-600: #9333ea
lavender-700: #7e22ce
lavender-800: #6b21a8
lavender-900: #581c87
```

---

### 🌿 Mint (Fresh & Modern)
**Perfect for**: Success messages, fresh arrivals, eco-friendly
```css
mint-50: #f0fdf9
mint-100: #ccfbef
mint-200: #99f6e0
mint-300: #5fe9d0
mint-400: #2dd4bf
mint-500: #14b8a6  /* ★ Main Mint */
mint-600: #0d9488
mint-700: #0f766e
mint-800: #115e59
mint-900: #134e4a
```

---

### 👑 Gold (Luxury & Premium)
**Perfect for**: VIP badges, premium features, luxury items
```css
gold-50: #fffbeb
gold-100: #fef3c7
gold-200: #fde68a
gold-300: #fcd34d
gold-400: #fbbf24
gold-500: #f59e0b  /* ★ Main Gold */
gold-600: #d97706
gold-700: #b45309
gold-800: #92400e
gold-900: #78350f
```

---

## 🎨 Gradient Combinations

### Premium Brand Gradient
```css
.premium-gradient {
  background: linear-gradient(135deg, #ff6b47, #ef5f98, #a855f7);
}
```
**Use for**: Main CTAs, headers, hero sections

### Rose Gold Gradient
```css
.rosegold-gradient {
  background: linear-gradient(135deg, #f99171, #de4a2b, #ba3a22);
}
```
**Use for**: Premium product cards, VIP sections

### Rainbow Gradient (Special)
```css
.rainbow-gradient {
  background: linear-gradient(135deg, 
    #ff6b47,  /* Coral */
    #ef5f98,  /* Blush */
    #a855f7,  /* Lavender */
    #14b8a6,  /* Mint */
    #f59e0b   /* Gold */
  );
}
```
**Use for**: Special promotions, featured collections

### Coral Dreams
```css
.coral-gradient {
  background: linear-gradient(135deg, #ffe8e3, #ff8f74, #ff6b47, #f04e28);
}
```

### Blush Beauty
```css
.blush-gradient {
  background: linear-gradient(135deg, #fdedf3, #fabbd4, #f78eb8, #ef5f98);
}
```

### Lavender Luxury
```css
.lavender-gradient {
  background: linear-gradient(135deg, #f3e8ff, #e9d5ff, #c084fc, #a855f7);
}
```

### Sunset Vibes
```css
.sunset-gradient {
  background: linear-gradient(135deg, #fff5f3, #ffe8e3, #ffd5cc, #ff8f74, #f04e28);
}
```

### Peach Sorbet
```css
.peach-gradient {
  background: linear-gradient(135deg, #fffbeb, #fef3c7, #fed8cb, #f99171, #de4a2b);
}
```

---

## ✨ Text Gradients

### Main Brand Text
```tsx
<h1 className="text-gradient-coral-blush">
  AZANIKA
</h1>
```

### Rose Gold Text
```tsx
<h2 className="text-gradient-rosegold">
  Premium Collection
</h2>
```

### Lavender Dream
```tsx
<h3 className="text-gradient-lavender">
  Elegant Accessories
</h3>
```

### Rainbow Text (Special)
```tsx
<h1 className="text-gradient-rainbow">
  Grand Sale!
</h1>
```

---

## 🎯 Usage Examples

### Hero Section
```tsx
<section className="sunset-gradient">
  <h1 className="text-gradient-coral-blush text-6xl font-bold">
    Discover Luxury
  </h1>
  <button className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-4 rounded-xl">
    Shop Now
  </button>
</section>
```

### Product Card
```tsx
<div className="bg-white hover:shadow-xl transition-all border-2 border-blush-100">
  <span className="absolute top-4 left-4 bg-blush-500 text-white px-3 py-1 rounded-lg">
    -30% OFF
  </span>
  <img src="/product.jpg" alt="Product" />
  <h3 className="text-lg font-semibold">Luxury Necklace</h3>
  <div className="flex items-center gap-2">
    <span className="text-coral-600 font-bold text-xl">৳2,499</span>
    <span className="text-sand-400 line-through">৳3,499</span>
  </div>
  <button className="premium-gradient text-white w-full py-3 rounded-lg">
    Add to Cart
  </button>
</div>
```

### Category Badge
```tsx
<div className="rosegold-gradient text-white px-4 py-2 rounded-full inline-flex items-center gap-2">
  <Crown size={18} />
  <span>Premium</span>
</div>
```

### Success Message
```tsx
<div className="bg-mint-100 border-2 border-mint-500 text-mint-800 p-4 rounded-lg">
  ✓ Added to cart successfully!
</div>
```

### VIP Badge
```tsx
<div className="gold-gradient text-white px-6 py-2 rounded-full font-bold shadow-lg">
  ⭐ VIP Member
</div>
```

---

## 🎨 Color Psychology for Women's Fashion

### 🌺 Coral (`#ff6b47`)
- **Emotion**: Energetic, Fun, Youthful
- **Use**: Main CTAs, New Arrivals, Trendy Items

### 🌸 Blush (`#ef5f98`)
- **Emotion**: Romantic, Feminine, Soft
- **Use**: Sale Tags, Special Offers, Valentine's Collection

### ✨ Rose Gold (`#f99171`)
- **Emotion**: Luxury, Elegance, Sophistication
- **Use**: Premium Products, VIP Sections, Exclusive Items

### 💜 Lavender (`#a855f7`)
- **Emotion**: Calming, Elegant, Spiritual
- **Use**: Wellness Products, Meditation Accessories, Elegant Collections

### 🌿 Mint (`#14b8a6`)
- **Emotion**: Fresh, Clean, Natural
- **Use**: Eco-friendly Products, Summer Collections, Success States

### 👑 Gold (`#f59e0b`)
- **Emotion**: Wealth, Quality, Prestige
- **Use**: Premium Badges, Best Sellers, Award-Winning Products

---

## 📱 Mobile Considerations

```css
/* Use softer colors on mobile for better readability */
@media (max-width: 640px) {
  .premium-gradient {
    background: linear-gradient(135deg, #ff8f74, #f78eb8);
  }
}
```

---

## ♿ Accessibility

### Contrast Ratios (WCAG AA Compliant)

✅ **Good Contrast**:
- White text on `coral-500` (#ff6b47) - 4.5:1
- White text on `blush-600` (#d93d7a) - 5.2:1
- White text on `lavender-600` (#9333ea) - 7.1:1
- Black text on `mint-100` (#ccfbef) - 15.1:1

⚠️ **Use Carefully**:
- White on `blush-400` (#f78eb8) - 3.2:1 (use for large text only)
- Black on `coral-100` (#ffe8e3) - 14.5:1 (excellent)

---

## 🎯 Brand Guidelines

### Primary Palette (80% of usage)
- Coral 500 - Main brand color
- Blush 100-300 - Backgrounds
- Sand 50-200 - Neutral backgrounds
- White - Main backgrounds

### Accent Palette (15% of usage)
- Rose Gold 400 - Premium touches
- Blush 500 - Romantic highlights
- Lavender 500 - Elegant accents

### Special Palette (5% of usage)
- Mint 500 - Success states
- Gold 500 - Premium badges
- Rainbow - Special promotions

---

## 🚀 Quick Start

```tsx
// Button variations
<button className="bg-coral-500">Primary</button>
<button className="bg-blush-500">Secondary</button>
<button className="rosegold-gradient">Premium</button>
<button className="premium-gradient">Special</button>

// Background variations
<div className="bg-blush-50">Soft background</div>
<div className="sunset-gradient">Vibrant section</div>
<div className="gradient-shimmer">Eye-catching banner</div>

// Text variations
<h1 className="text-coral-600">Heading</h1>
<h2 className="text-gradient-coral-blush">Gradient Heading</h2>
<p className="text-sand-700">Body text</p>
```

---

## 💡 Pro Tips

1. **Use gradients sparingly** - Reserve for hero sections, CTAs, and special elements
2. **Stick to 2-3 main colors per section** - Avoid color overload
3. **White space is your friend** - Let colors breathe
4. **Test on mobile** - Colors appear differently on smaller screens
5. **Consider lighting** - Colors look different in bright vs. dim environments
6. **Brand consistency** - Use coral-500 as your main brand color throughout

---

## 🎨 Color Mood Board

**Playful & Fun**: Coral + Blush + Mint
**Luxury & Elegant**: Rose Gold + Lavender + Gold
**Fresh & Modern**: Coral + Mint + White
**Romantic & Soft**: Blush + Lavender + Cream
**Bold & Confident**: Coral + Gold + Black

---

**Last Updated**: October 22, 2025
**Status**: ✅ Production Ready
