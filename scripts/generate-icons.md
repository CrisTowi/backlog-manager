# Generating PWA Icons

To generate the required PWA icons for iOS and Android:

## Option 1: Using Online Tool (Recommended)

1. Visit https://realfavicongenerator.net/
2. Upload the `app/icon.svg` file
3. Configure the settings:
   - iOS: Enable "Apple touch icon"
   - Android: Enable "Android Chrome"
   - Generate 192x192 and 512x512 icons
4. Download the generated icons
5. Place the following files in the `public/` folder:
   - `icon-192.png` (192x192)
   - `icon-512.png` (512x512)
   - `apple-icon.png` (180x180 for iOS)

## Option 2: Using ImageMagick

If you have ImageMagick installed:

```bash
# Generate Android icons
convert -background none -resize 192x192 app/icon.svg public/icon-192.png
convert -background none -resize 512x512 app/icon.svg public/icon-512.png

# Generate iOS icon (180x180)
convert -background none -resize 180x180 app/icon.svg public/apple-icon.png
```

## Option 3: Using Sharp (Node.js)

Install sharp: `npm install sharp --save-dev`

Then create a script to generate icons programmatically.

