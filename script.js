 
    const images = document.querySelectorAll('.image-box img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    let currentIndex = 0;
    let currentImages = [];

  
    function updateCurrentImages() {
      currentImages = Array.from(document.querySelectorAll('.image-box:not([style*="display: none"]) img'));
    }

    images.forEach((img, index) => {
      img.addEventListener('loadstart', () => {
        img.parentElement.classList.add('loading');
      });
      
      img.addEventListener('load', () => {
        img.parentElement.classList.remove('loading');
      });
      
      img.addEventListener('click', () => {
        updateCurrentImages();
        currentIndex = currentImages.indexOf(img);
        openLightbox(img.src);
      });
    });

    function openLightbox(src) {
      lightbox.style.display = 'flex';
      lightboxImg.src = src;
      document.body.style.overflow = 'hidden'; 
    }

    function closeLightbox() {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }

    function prevImage() {
      if (currentImages.length === 0) return;
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      lightboxImg.src = currentImages[currentIndex].src;
    }

    function nextImage() {
      if (currentImages.length === 0) return;
      currentIndex = (currentIndex + 1) % currentImages.length;
      lightboxImg.src = currentImages[currentIndex].src;
    }

    function filterImages(category) {
      document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');


      const boxes = document.querySelectorAll('.image-box');
      boxes.forEach(box => {
        if (category === 'all' || box.classList.contains(category)) {
          box.style.display = 'block';
          box.style.animation = 'fadeIn 0.5s ease';
        } else {
          box.style.display = 'none';
        }
      });
      
      updateCurrentImages();
    }

    document.addEventListener('keydown', (e) => {
      if (lightbox.style.display === 'flex') {
        switch(e.key) {
          case 'Escape':
            closeLightbox();
            break;
          case 'ArrowLeft':
            prevImage();
            break;
          case 'ArrowRight':
            nextImage();
            break;
        }
      }
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    updateCurrentImages();
  