const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const iconSvg = path.join(__dirname, '../app/icon.svg');
const publicDir = path.join(__dirname, '../public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const sizes = [
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 180, name: 'apple-icon.png' },
];

async function generateIcons() {
  console.log('Generating PWA icons...');
  
  for (const { size, name } of sizes) {
    try {
      await sharp(iconSvg)
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, name));
      console.log(`✓ Generated ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`✗ Error generating ${name}:`, error.message);
    }
  }
  
  console.log('\nIcons generated successfully!');
}

generateIcons().catch(console.error);
