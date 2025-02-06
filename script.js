document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const comparisonSection = document.getElementById('comparisonSection');
    const originalPreview = document.getElementById('originalPreview');
    const compressedPreview = document.getElementById('compressedPreview');
    const originalSize = document.getElementById('originalSize');
    const compressedSize = document.getElementById('compressedSize');
    const qualitySlider = document.getElementById('qualitySlider');
    const qualityValue = document.getElementById('qualityValue');
    const downloadBtn = document.getElementById('downloadBtn');
    const imagesList = document.getElementById('imagesList');
    const downloadAllBtn = document.getElementById('downloadAllBtn');

    let originalImage = null;
    let images = []; // 存储所有图片信息

    // 拖放处理
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#007AFF';
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#ddd';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#ddd';
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processFiles(files);
        }
    });

    // 点击上传
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            processFiles(e.target.files);
        }
    });

    // 质量滑块变化时重新压缩所有图片
    qualitySlider.addEventListener('input', (e) => {
        qualityValue.textContent = `${e.target.value}%`;
        const quality = e.target.value / 100;
        images.forEach(image => {
            compressImage(image, quality);
        });
    });

    // 处理多个文件
    function processFiles(files) {
        Array.from(files).forEach(file => {
            if (file.type.match('image.*')) {
                processImage(file);
            }
        });
        comparisonSection.style.display = 'block';
    }

    // 处理上传的图片
    function processImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = {
                id: Date.now() + Math.random(),
                name: file.name,
                originalSize: file.size,
                originalUrl: e.target.result
            };
            
            const img = new Image();
            img.onload = () => {
                imageData.width = img.width;
                imageData.height = img.height;
                images.push(imageData);
                compressImage(imageData, qualitySlider.value / 100);
                renderImages();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // 压缩图片
    function compressImage(imageData, quality) {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            const compressedSize = Math.round((compressedDataUrl.length - 'data:image/jpeg;base64,'.length) * 3/4);
            
            imageData.compressedUrl = compressedDataUrl;
            imageData.compressedSize = compressedSize;
            
            renderImages();
        };
        img.src = imageData.originalUrl;
    }

    // 渲染图片列表
    function renderImages() {
        imagesList.innerHTML = images.map(image => `
            <div class="image-card" data-id="${image.id}">
                <h3>${image.name}</h3>
                <div class="image-preview">
                    <img src="${image.compressedUrl || image.originalUrl}" alt="${image.name}">
                </div>
                <div class="image-info">
                    <div class="size-info">
                        <div>原始：${formatFileSize(image.originalSize)}</div>
                        ${image.compressedSize ? `<div>压缩后：${formatFileSize(image.compressedSize)}</div>` : ''}
                    </div>
                    <div class="image-actions">
                        <button onclick="downloadImage('${image.id}')">下载</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 下载单张图片
    window.downloadImage = function(imageId) {
        const image = images.find(img => img.id === imageId);
        if (image) {
            const link = document.createElement('a');
            link.download = `compressed_${image.name}`;
            link.href = image.compressedUrl;
            link.click();
        }
    };

    // 批量下载所有图片
    downloadAllBtn.addEventListener('click', () => {
        images.forEach(image => {
            setTimeout(() => {
                downloadImage(image.id);
            }, 100);
        });
    });

    // 格式化文件大小
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}); 