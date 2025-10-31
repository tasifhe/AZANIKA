# 🎨 Animation Components - Usage Guide

## Overview
This guide shows you how to use the new animation components in your AZANIKA project.

---

## 📦 Import Components

```tsx
// Basic animations
import { 
  AnimatedContent, 
  FadeIn, 
  ScaleIn, 
  StaggerContainer, 
  StaggerItem 
} from '@/components/animations/AnimatedContent';

// List/Grid animations
import { AnimatedList, AnimatedGrid } from '@/components/animations/AnimatedList';

// Scroll animations
import { 
  Parallax, 
  ScrollFade, 
  ScrollScale, 
  RevealOnScroll 
} from '@/components/animations/ScrollAnimations';
```

---

## 🎯 AnimatedContent

Animate elements as they enter the viewport with directional effects.

### Basic Usage
```tsx
<AnimatedContent direction="up">
  <h1>This fades in from bottom</h1>
</AnimatedContent>
```

### With Options
```tsx
<AnimatedContent 
  direction="left"     // up, down, left, right
  delay={0.2}          // delay in seconds
  duration={0.6}       // animation duration
  once={true}          // animate only once
  className="mb-4"
>
  <div>Your content</div>
</AnimatedContent>
```

### Directions
- `up` - Slides up and fades in (default)
- `down` - Slides down and fades in
- `left` - Slides from left and fades in
- `right` - Slides from right and fades in

---

## 💫 FadeIn

Simple fade-in animation for subtle effects.

```tsx
<FadeIn delay={0.3} duration={0.8}>
  <p>This fades in smoothly</p>
</FadeIn>
```

---

## 🎪 ScaleIn

Scale and fade-in animation for attention-grabbing elements.

```tsx
<ScaleIn delay={0.1}>
  <div className="card">
    This pops in with scale effect
  </div>
</ScaleIn>
```

---

## 📊 StaggerContainer & StaggerItem

Create staggered animations for lists.

```tsx
<StaggerContainer staggerDelay={0.1}>
  <StaggerItem>
    <div>Item 1</div>
  </StaggerItem>
  <StaggerItem>
    <div>Item 2</div>
  </StaggerItem>
  <StaggerItem>
    <div>Item 3</div>
  </StaggerItem>
</StaggerContainer>
```

---

## 📋 AnimatedList

Automatically animate array of children with stagger.

```tsx
<AnimatedList 
  delay={0}
  staggerDelay={0.1}
  className="space-y-4"
>
  {items.map(item => (
    <div key={item.id}>
      {item.content}
    </div>
  ))}
</AnimatedList>
```

---

## 🎯 AnimatedGrid

Perfect for product grids and card layouts.

```tsx
<AnimatedGrid 
  className="grid grid-cols-3 gap-6"
  staggerDelay={0.08}
>
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</AnimatedGrid>
```

---

## 🌊 Parallax

Create depth with parallax scrolling effect.

```tsx
<Parallax offset={50} className="my-section">
  <div>
    This moves slower than scroll
  </div>
</Parallax>
```

**Offset**: Positive values move element down, negative moves up.

---

## 👻 ScrollFade

Fade in/out based on scroll position.

```tsx
<ScrollFade>
  <div className="hero-image">
    Fades in when entering viewport,
    fades out when leaving
  </div>
</ScrollFade>
```

---

## 📏 ScrollScale

Scale element based on scroll position.

```tsx
<ScrollScale>
  <img src="/feature.jpg" alt="Feature" />
</ScrollScale>
```

---

## 🎭 RevealOnScroll

Reveal effect with sliding overlay.

```tsx
<RevealOnScroll width="full">
  <h2>This text gets revealed</h2>
</RevealOnScroll>
```

**Width Options**: 
- `fit` - Wraps content
- `full` - Full width

---

## 🎨 CSS Animation Classes

### Pattern Backgrounds
```tsx
<div className="pattern-dots">Animated dots</div>
<div className="pattern-waves">Wave pattern</div>
<div className="pattern-mesh">Mesh gradient</div>
<div className="pattern-gradient-bg">Grid pattern</div>
```

### Gradient Backgrounds
```tsx
<div className="gradient-rose-gold">Rose gold</div>
<div className="gradient-sunset">Sunset</div>
<div className="gradient-peachy">Peachy</div>
<div className="gradient-blush-dream">Blush dream</div>
```

### Glass Effects
```tsx
<div className="glass-effect">Frosted glass</div>
<div className="glass-effect-dark">Dark glass</div>
```

### Hover Effects
```tsx
<button className="glow-on-hover">Glowing button</button>
<div className="shimmer">Shimmer effect</div>
```

### Animations
```tsx
<div className="bounce-gentle">Bounces gently</div>
<div className="animate-spin-slow">Rotates slowly</div>
<div className="fade-in-up">Fades in from bottom</div>
<button className="pulse-ring">Pulsing ring</button>
```

---

## 💡 Real-World Examples

### Product Card with Animations
```tsx
<motion.div whileHover={{ y: -8 }}>
  <AnimatedContent direction="up">
    <div className="card glow-on-hover">
      <img src="/product.jpg" alt="Product" />
      <h3>Product Name</h3>
      <button className="pulse-ring premium-gradient">
        Add to Cart
      </button>
    </div>
  </AnimatedContent>
</motion.div>
```

### Hero Section
```tsx
<section className="pattern-mesh">
  <Parallax offset={30}>
    <AnimatedContent direction="up" delay={0.2}>
      <h1 className="gradient-text">Welcome to AZANIKA</h1>
    </AnimatedContent>
    
    <FadeIn delay={0.4}>
      <p>Discover premium fashion accessories</p>
    </FadeIn>
    
    <ScaleIn delay={0.6}>
      <button className="btn-primary pulse-ring">
        Shop Now
      </button>
    </ScaleIn>
  </Parallax>
</section>
```

### Feature Grid
```tsx
<AnimatedGrid 
  className="grid grid-cols-4 gap-8"
  staggerDelay={0.15}
>
  {features.map(feature => (
    <div key={feature.id} className="glass-effect glow-on-hover">
      <div className="bounce-gentle">
        <feature.Icon />
      </div>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </div>
  ))}
</AnimatedGrid>
```

### Newsletter Section
```tsx
<section className="gradient-blush-dream">
  <ScaleIn>
    <div className="glass-effect">
      <div className="animate-spin-slow">
        <Star />
      </div>
      <h2>Join Our Newsletter</h2>
      <form>
        <input className="shimmer" />
        <button className="pulse-ring">Subscribe</button>
      </form>
    </div>
  </ScaleIn>
</section>
```

---

## ⚡ Performance Tips

1. **Use `once={true}`** for scroll animations (default behavior)
2. **Limit nested animations** to avoid performance issues
3. **Use CSS classes** for simple animations
4. **Use Framer Motion** for complex interactions
5. **Test on mobile** devices for smooth performance

---

## 🎯 Best Practices

### DO ✅
- Use animations to guide attention
- Keep animations subtle and purposeful
- Match animation duration to content importance
- Use consistent easing functions
- Test animations on slower devices

### DON'T ❌
- Over-animate everything
- Use long animation durations (>1s)
- Animate critical content (makes it harder to access)
- Use animations that cause layout shift
- Forget to test with reduced motion preferences

---

## 🌈 Color Theme Variables

Use these Tailwind classes for consistent styling:

### Blush Theme (Primary)
- `bg-blush-50` to `bg-blush-900` - Background colors
- `text-blush-50` to `text-blush-900` - Text colors
- `border-blush-50` to `border-blush-900` - Border colors
- `premium-gradient` - Main gradient
- `gradient-text` - Animated gradient text

### Common Patterns
```tsx
// Cards
className="bg-white shadow-lg hover:shadow-xl glow-on-hover"

// Buttons
className="premium-gradient text-white shadow-md hover:shadow-lg pulse-ring"

// Links
className="text-blush-600 hover:text-blush-700 smooth-transition"

// Badges
className="bg-gradient-to-r from-blush-100 to-blush-50 text-blush-700"
```

---

## 📱 Responsive Considerations

All animations are responsive, but consider:

```tsx
// Reduce motion on mobile
<AnimatedContent 
  direction="up"
  className="motion-reduce:transform-none"
>
  Content
</AnimatedContent>

// Conditional animations
<div className="hidden md:block">
  <AnimatedContent direction="left">
    Desktop only animation
  </AnimatedContent>
</div>
```

---

## 🐛 Troubleshooting

### Animation not triggering
- Check if element is in viewport
- Verify `once` property if animation should repeat
- Ensure parent has proper overflow settings

### Choppy animations
- Reduce number of simultaneous animations
- Check if too many elements are animating
- Test on target devices

### Layout shift issues
- Reserve space for animated elements
- Use `transform` instead of `position`
- Set explicit dimensions

---

## 📚 Additional Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [React Bits Components](https://reactbits.dev/)
- [Gradienty Patterns](https://gradienty.codes/)

---

**Happy Animating! 🎉**
