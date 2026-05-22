
# Frontend Developer Portfolio

A modern, animated portfolio website for a frontend developer specializing in React, Next.js, and modern UI engineering. Features a WhatsApp-integrated contact form, smooth animations, and responsive design.

## 🔗 Live Demo

[View Live Portfolio](#) *(Replace with your actual deployment URL)*

## ✨ Features

- **Animated Logo** — Gradient shimmer, glow effect, and interactive hover/click animations
- **Animated Navigation** — Underline hover effects, animated CTA button with WhatsApp integration
- **Dynamic Background** — Floating gradient orbs, grid pattern, and subtle noise texture
- **Responsive Design** — Fully responsive across all devices (mobile, tablet, desktop)
- **WhatsApp Contact Form** — Direct WhatsApp integration with formatted project inquiries
- **Smooth Scroll** — Anchor navigation with smooth scrolling behavior
- **Reveal Animations** — Scroll-triggered fade-in effects for cards and sections
- **Parallax Orbs** — Mouse-following gradient orbs for immersive experience

## 🛠️ Technologies Used

- HTML5
- CSS3 (Custom properties, animations, flexbox, grid)
- JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Inter, Space Grotesk)
- WhatsApp API (wa.me direct link)

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── style.css           # All styles and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Any modern web browser
- Code editor (VS Code recommended)
- Live server extension (optional)

### Installation

1. **Clone or download** this repository
2. **Open the project folder** in your code editor
3. **Update WhatsApp number** in `script.js`:
   ```javascript
   const WHATSAPP_PHONE_NUMBER = '254700000000'; // Replace with your number
   ```
4. **Launch** the website by opening `index.html` in your browser
5. For best experience, use **Live Server** extension

## 📱 WhatsApp Integration

The contact form sends inquiries directly to your WhatsApp. To configure:

1. Open `script.js`
2. Find line with `WHATSAPP_PHONE_NUMBER`
3. Replace with your actual phone number (country code + number, no spaces, no plus sign)

**Format example:**
- Kenya: `254700123456`
- USA: `14155552671`
- UK: `447700900000`

## 🎨 Customization

### Colors
Edit CSS variables in `style.css`:
```css
:root {
    --bg: #010104;           /* Background color */
    --accent: #6366f1;       /* Primary accent */
    --accent-2: #a855f7;     /* Secondary accent */
    --whatsapp: #25D366;     /* WhatsApp green */
}
```

### Projects
Update project cards in `index.html` inside the `#work` section.

### Tech Stack
Modify the `.tech-stack` div in hero section and `.expertise-grid` in expertise section.

## 📧 Contact

For questions or collaborations:
- Email: studio@kingfetson.com
- WhatsApp: [Click to chat](https://wa.me/254716920853)

## 📄 License

© 2026 KINGFETSON — All rights reserved.

## 🙌 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- WhatsApp for business API

---

**Built with precision for high-performance frontend experiences.**
```
