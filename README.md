# ✈️ AirTix - Next-Gen Flight Booking Platform

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=30&pause=1000&color=6C63FF&center=true&vCenter=true&random=false&width=435&lines=AirTix+Frontend;Modern+Flight+Booking;React+%2B+Vite+%2B+Redux" alt="Typing SVG" />

[![React](https://img.shields.io/badge/Built_with-React_18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/⚡_Powered_by-Vite_5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Styled_with-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/State-Redux_Toolkit-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" alt="rainbow" width="100%">

<img src="https://raw.githubusercontent.com/platane/snk/output/github-contribution-grid-snake-dark.svg" alt="Snake animation" width="100%"/>

</div>

## 🎯 Project Overview

<div align="center">
<img src="https://i.imgur.com/dBaSKWF.gif" height="20" width="100%">
</div>

A blazing-fast ⚡ flight booking SPA built with the latest frontend tech stack. Our platform delivers a pixel-perfect, responsive UI with buttery-smooth animations and state-of-the-art user experience.

### 💅 UI/UX Highlights

- 🎨 Modern, minimalist design language
- 🌓 Dark/Light mode with smooth transitions
- 📱 Mobile-first responsive design
- ⚡ Lightning-fast page transitions
- 🎭 Sleek loading skeletons
- 🌈 Micro-interactions & animations
- 🎢 Scroll-triggered animations
- 🎪 Interactive hover states

### 🎭 Animation Libraries
```javascript
// 🌟 Our Animation Arsenal
import { motion, AnimatePresence } from 'framer-motion'
import { Transition } from '@headlessui/react'
import { animated, useSpring } from '@react-spring/web'
import Lottie from 'lottie-react'
import AOS from 'aos'
```

## 🛠️ Tech Stack & Architecture

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/212257454-16e3712e-945a-4ca2-b238-408ad0bf87e6.gif" width="100"><img src="https://user-images.githubusercontent.com/74038190/212257467-871d32b7-e401-42e8-a166-fcfd7baa4c6b.gif" width="100">
<img src="https://user-images.githubusercontent.com/74038190/212257472-08f6a927-c1a0-4f1c-8d30-c3182a3b1c43.gif" width="100">
<img src="https://user-images.githubusercontent.com/74038190/212257468-1e9a91f1-b626-4baa-b15d-5c385dfa7ed2.gif" width="100">
<img src="https://user-images.githubusercontent.com/74038190/212257465-7ce8d493-cac5-494e-982a-5a9deb852c4b.gif" width="100">

### 🎨 Frontend Framework
![React 18](https://img.shields.io/badge/React_18-Latest_Hooks_&_Patterns-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-Lightning_Fast_HMR-646CFF?style=flat-square&logo=vite)

### 🎭 Styling & Animation
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Utility_First-38B2AC?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-0055FF?style=flat-square)
![GSAP](https://img.shields.io/badge/GSAP-Smooth_Animations-88CE02?style=flat-square)
![Lottie](https://img.shields.io/badge/Lottie-Vector_Animations-00C8E5?style=flat-square)

</div>

## 👨‍💻 Dream Team

<div align="center">

<img src="https://i.imgur.com/dBaSKWF.gif" height="20" width="100%">

| Avatar | Name | Role | GitHub |
|--------|------|------|--------|
| <img src="https://avatars.githubusercontent.com/u/108708078?v=4" width="50" height="50" style="border-radius:50%"> | **Rafly Aziz Abdillah** | Fullstack Web | [@rafly](https://github.com/raflytch) |
| <img src="https://avatars.githubusercontent.com/u/171102959?v=4" width="50" height="50" style="border-radius:50%"> | **Tegar Alfa Rizzi** | Fullstack Web | [@tegar](https://github.com/TegarAlfaR) |
| <img src="https://avatars.githubusercontent.com/u/127614248?v=4" width="50" height="50" style="border-radius:50%"> | **Melinda Wijaya** | Fullstack Web | [@melinda](https://github.com/melindawijaya) |
| <img src="https://avatars.githubusercontent.com/u/106648832?v=4" width="50" height="50" style="border-radius:50%"> | **Yogi Efani Yancandra** | Fullstack Web | [@yogi](https://github.com/yogiefani) |

</div>

## ⚡ Animation Examples

### 🎭 Page Transitions
```jsx
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
)
```

### 🌟 Hover Effects
```jsx
const HoverCard = () => {
  const [hovered, setHovered] = useState(false)
  
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0px 10px 30px rgba(0,0,0,0.15)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {/* Card content */}
    </motion.div>
  )
}
```

### 🎪 Scroll Animations
```jsx
const ScrollReveal = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    {children}
  </motion.div>
)
```

## 🎨 UI Components with Animation

```jsx
// 🎫 Animated Flight Card Component
const FlightCard = ({ flight }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)"
      }}
      className="rounded-xl bg-white shadow-lg p-6"
    >
      <div className="flex items-center space-x-4">
        <motion.img
          whileHover={{ rotate: 360 }}
          transition={{ duration: 1 }}
          src={flight.airlineLogo}
          className="w-12 h-12"
        />
        {/* Flight details */}
      </div>
    </motion.div>
  )
}
```

[... rest of the README content remains the same ...]

<div align="center">

### 🚀 Made with caffeine and React by Frontend Dream Team

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer" width="100%"/>

![Visits](https://api.visitorbadge.io/api/visitors?path=airtix-frontend&label=repo%20views&labelColor=%23000000&countColor=%2337d67a)

</div>
