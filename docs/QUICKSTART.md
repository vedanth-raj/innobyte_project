# Quick Start Guide

## 🚀 Getting Started

### 1. Open the Website
Simply open `index.html` in your web browser:
- Double-click the `index.html` file, or
- Right-click and select "Open with" → Your preferred browser

### 2. Local Development
For development with live reload, you can use:

**Option A: VS Code Live Server**
```bash
# Install Live Server extension in VS Code
# Right-click index.html → "Open with Live Server"
```

**Option B: Python Simple Server**
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

**Option C: Node.js http-server**
```bash
# Install globally
npm install -g http-server

# Run in project directory
http-server

# Then open: http://localhost:8080
```

## 📁 File Structure

```
kingsukh-guest-house/
├── index.html              # Main HTML file
├── main.js                 # JavaScript functionality
├── css/
│   ├── styles.css         # Main stylesheet (NEW)
│   ├── contact.css        # Old contact styles
│   └── gallary.css        # Old gallery styles
├── assets/
│   ├── ayodhya.webp       # Hero background
│   ├── out.jpg            # About section
│   ├── large.jpg          # Room image
│   ├── small.jpg          # Room image
│   └── ...                # Other images
├── README.md              # Documentation
└── QUICKSTART.md          # This file
```

## 🎨 Customization Guide

### Change Colors
Edit `css/styles.css` - CSS Variables section:
```css
:root {
    --color-primary: #1E3D23;    /* Main green */
    --color-secondary: #C4A15D;  /* Gold accent */
    --color-cream: #F5F2EB;      /* Background */
}
```

### Update Content
Edit `index.html`:
- Hero text: Line ~50-60
- About section: Line ~80-120
- Room details: Line ~130-200
- Contact info: Line ~350-400

### Modify Animations
Edit `main.js`:
- AOS settings: Line ~15-20
- Animation durations: Throughout file
- Custom effects: Various functions

## 📱 Testing Responsive Design

### Browser DevTools
1. Open DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Test different screen sizes:
   - Mobile: 375px, 414px
   - Tablet: 768px, 1024px
   - Desktop: 1280px, 1920px

## 🔧 Common Customizations

### Add New Room
```html
<div class="room-card" data-aos="fade-up">
    <div class="room-card__image">
        <img src="assets/your-image.jpg" alt="Room Name">
        <div class="room-card__overlay">
            <a href="https://wa.link/at5ion" class="btn btn--white">View Details</a>
        </div>
    </div>
    <div class="room-card__content">
        <!-- Room details here -->
    </div>
</div>
```

### Add New Amenity
```html
<div class="amenity-card" data-aos="zoom-in">
    <div class="amenity-card__icon">
        <i class="ri-icon-name"></i>
    </div>
    <h3>Amenity Name</h3>
    <p>Description here</p>
</div>
```

### Change Contact Links
Update these in `index.html`:
- WhatsApp: `https://wa.link/at5ion`
- Phone: `tel:+919007062180`
- Email: `mailto:kkghosh0099@gmail.com`
- Maps: Google Maps embed URL

## 🎯 Performance Tips

1. **Optimize Images**
   - Use WebP format when possible
   - Compress images (TinyPNG, ImageOptim)
   - Recommended max size: 500KB per image

2. **Enable Caching**
   - Add cache headers in server config
   - Use CDN for static assets

3. **Minify Assets**
   - Minify CSS and JS for production
   - Use tools like UglifyJS, CSSNano

## 🐛 Troubleshooting

### Animations Not Working
- Check if AOS library is loaded
- Verify internet connection (CDN links)
- Check browser console for errors

### Images Not Loading
- Verify image paths are correct
- Check file extensions match
- Ensure images exist in assets folder

### Mobile Menu Not Opening
- Check JavaScript is enabled
- Verify main.js is loaded
- Check browser console for errors

## 📞 Support

For issues or questions:
- Email: kkghosh0099@gmail.com
- Phone: +91 9007062180

## 🎉 Launch Checklist

Before going live:
- [ ] Test all links
- [ ] Verify contact information
- [ ] Test on multiple devices
- [ ] Check all images load
- [ ] Test form submission
- [ ] Verify WhatsApp link works
- [ ] Test phone number links
- [ ] Check Google Maps embed
- [ ] Test in different browsers
- [ ] Optimize images
- [ ] Add analytics (Google Analytics)
- [ ] Set up SSL certificate
- [ ] Configure domain

---

**Happy Building! 🏨**
