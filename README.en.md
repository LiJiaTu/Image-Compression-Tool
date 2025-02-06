# Image Compression Tool

A user-friendly online image compression tool that supports batch processing of multiple images, featuring a modern interface design and smooth user experience.
![Homepage](./imgs/主页.png)

## Features

- 🖼️ Support for multiple image formats (PNG, JPG, JPEG, WEBP, etc.)
- 📦 Batch upload and process multiple images
- 🎚️ Adjustable compression quality
- 👀 Real-time compression preview
- 📊 Display file size comparison before and after compression
- 💾 Support single/batch download of compressed images
- 📱 Responsive design, mobile-friendly

## Local Deployment
1. Clone the project
2. Open index.html directly, or run with a local server
3. Access in browser

## Instructions

1. **Upload Images**
   - Click the upload area to select images
   - Or drag and drop images to the upload area
   - Support multiple image selection

2. **Adjust Compression Quality**
   - Use slider to adjust compression quality (1-100)
   - Higher value means better quality but larger file size
   - Lower value means higher compression rate but smaller file size

3. **Preview and Download**
   - Real-time compression preview
   - View file size comparison
   - Click "Download" button under each image to download single image
   - Click "Download All Images" to download all processed images

## Usage Examples

### Scenario 1: Compress Single Image
1. Click upload area
2. Select an image to compress
3. Adjust compression quality using the slider to find the right balance
4. Click "Download" to save the compressed image
![Compress Single Image](./imgs/单张.png)

### Scenario 2: Batch Process Multiple Images
1. Select multiple images or drag them to the upload area
2. Adjust compression quality
3. Download individual images or use "Download All Images" button to download all at once
![Batch Process Multiple Images](./imgs/多张.png)

## Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla)
- Canvas API

## Browser Support

- Chrome (Recommended)
- Firefox
- Safari
- Edge
- Opera

## Notes

- Recommended image size limit: 10MB
- Compression is performed in browser, no server upload required
- Processing large images may take a few seconds
- Some browsers may block multiple file downloads, permission needs to be granted
