// Carousel functionality for 2D and 3D carousels

// Native Scroll Video Slider functionality
class CategorySlider {
    constructor() {
        this.sliderContainer = document.getElementById('videoSliderContainer');
        this.slider = document.getElementById('videoSlider');
        this.prevBtn = document.getElementById('sliderPrevBtn');
        this.nextBtn = document.getElementById('sliderNextBtn');
        this.categoryButtons = [];
        
        this.selectedCategory = null;
        this.masterVideoData = null;
        
        this.init();
    }
    
    init() {
        this.setupNavListeners();
    }
    
    setupNavListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                const scrollAmount = this.slider.clientWidth * 0.8;
                this.slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                const scrollAmount = this.slider.clientWidth * 0.8;
                this.slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }
    }
    
    setVideoData(videoData) {
        this.masterVideoData = videoData;
        this.generateTabs();
    }
    
    generateTabs() {
        const tabsContainer = document.getElementById('long-form-tabs');
        if (!tabsContainer || !this.masterVideoData) return;
        
        const categories = [...new Set(this.masterVideoData.map(v => v.category).filter(Boolean))];
        
        tabsContainer.innerHTML = '';
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-studio btn-sm category-btn hover-scale';
            btn.dataset.category = category;
            btn.textContent = category;
            tabsContainer.appendChild(btn);
        });
        
        this.categoryButtons = tabsContainer.querySelectorAll('.category-btn');
        this.categoryButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                if (this.selectedCategory !== category) {
                    this.openCategory(category);
                }
            });
        });
    }
    
    openCategory(category) {
        this.selectedCategory = category;
        this.categoryButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        
        const videosForCategory = this.masterVideoData.filter(v => v.category === category);
        
        this.slider.innerHTML = '';
        videosForCategory.forEach(video => {
            const item = document.createElement('div');
            item.className = 'video-slide-item';
            
            item.innerHTML = `
                <div class="video-slide-wrapper">
                    <iframe src="${video.src}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                </div>
            `;
            this.slider.appendChild(item);
        });
        
        this.sliderContainer.classList.remove('hidden');
        // Reset scroll position to start
        this.slider.scrollLeft = 0;
    }
}

// Native Scroll Video Slider functionality for Short Form
class ShortCategorySlider {
    constructor() {
        this.sliderContainer = document.getElementById('shortVideoSliderContainer');
        this.slider = document.getElementById('shortVideoSlider');
        this.prevBtn = document.getElementById('shortSliderPrevBtn');
        this.nextBtn = document.getElementById('shortSliderNextBtn');
        this.categoryButtons = [];
        
        this.selectedCategory = null;
        this.masterVideoData = null;
        
        this.init();
    }
    
    init() {
        this.setupNavListeners();
    }
    
    setupNavListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                const scrollAmount = this.slider.clientWidth * 0.8;
                this.slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                const scrollAmount = this.slider.clientWidth * 0.8;
                this.slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }
    }
    
    setVideoData(videoData) {
        this.masterVideoData = videoData;
        this.generateTabs();
    }
    
    generateTabs() {
        const tabsContainer = document.getElementById('short-form-tabs');
        if (!tabsContainer || !this.masterVideoData) return;
        
        const categories = [...new Set(this.masterVideoData.map(v => v.category).filter(Boolean))];
        
        tabsContainer.innerHTML = '';
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-studio btn-sm short-category-btn hover-scale';
            btn.dataset.category = category;
            btn.textContent = category;
            tabsContainer.appendChild(btn);
        });
        
        this.categoryButtons = tabsContainer.querySelectorAll('.short-category-btn');
        this.categoryButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                if (this.selectedCategory !== category) {
                    this.openCategory(category);
                }
            });
        });
    }
    
    openCategory(category) {
        this.selectedCategory = category;
        this.categoryButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        
        const videosForCategory = this.masterVideoData.filter(v => v.category === category);
        
        this.slider.innerHTML = '';
        
        if (videosForCategory.length === 0) {
            this.slider.innerHTML = '<p class="text-muted" style="padding: 2rem; width: 100%; text-align: center;">More content coming soon for this category!</p>';
        } else {
            videosForCategory.forEach(video => {
                const item = document.createElement('div');
                item.className = 'video-slide-item short-video-slide-item';
                
                item.innerHTML = `
                    <div class="video-slide-wrapper short-video-slide-wrapper">
                        <iframe src="${video.src}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                    </div>
                `;
                this.slider.appendChild(item);
            });
        }
        
        this.sliderContainer.classList.remove('hidden');
        // Reset scroll position to start
        this.slider.scrollLeft = 0;
    }
}

// Native Scroll Graphics Slider functionality
class GraphicsCategorySlider {
    constructor() {
        this.sliderContainer = document.getElementById('graphicsSliderContainer');
        this.slider = document.getElementById('graphicsSlider');
        this.prevBtn = document.getElementById('graphicsSliderPrevBtn');
        this.nextBtn = document.getElementById('graphicsSliderNextBtn');
        this.categoryButtons = [];
        
        this.selectedCategory = null;
        this.masterData = null;
        
        this.init();
    }
    
    init() {
        this.setupNavListeners();
    }
    
    setupNavListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                const scrollAmount = this.slider.clientWidth * 0.8;
                this.slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                const scrollAmount = this.slider.clientWidth * 0.8;
                this.slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }
    }
    
    setData(data) {
        this.masterData = data;
        this.generateTabs();
    }
    
    generateTabs() {
        const tabsContainer = document.getElementById('graphics-tabs');
        if (!tabsContainer || !this.masterData) return;
        
        const categories = [...new Set(this.masterData.map(v => v.category).filter(Boolean))];
        
        tabsContainer.innerHTML = '';
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-studio btn-sm graphic-category-btn hover-scale';
            btn.dataset.category = category;
            btn.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            tabsContainer.appendChild(btn);
        });
        
        this.categoryButtons = tabsContainer.querySelectorAll('.graphic-category-btn');
        this.categoryButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                if (this.selectedCategory !== category) {
                    this.openCategory(category);
                }
            });
        });
    }
    
    openCategory(category) {
        this.selectedCategory = category;
        this.categoryButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        
        const dataForCategory = this.masterData.filter(v => v.category === category);
        
        this.slider.innerHTML = '';
        
        if (dataForCategory.length === 0) {
            this.slider.innerHTML = '<p class="text-muted" style="padding: 2rem; width: 100%; text-align: center;">More content coming soon for this category!</p>';
        } else {
            dataForCategory.forEach(item => {
                const div = document.createElement('div');
                div.className = 'video-slide-item artwork-card clickable';
                div.dataset.category = item.category;
                div.dataset.imageUrl = item.imageUrl;
                div.style.cursor = 'pointer';
                
                div.innerHTML = `
                    <div style="position: relative; padding-bottom: 56.25%; height: 0; width: 100%;">
                        <img src="${item.previewUrl}" alt="${item.title}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;" loading="lazy">
                        <div class="artwork-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.7); display: flex; flex-direction: column; justify-content: center; align-items: center; opacity: 0; transition: opacity 0.3s; color: white;">
                            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; color: #fff;">${item.title}</h3>
                            <p style="text-align: center; padding: 0 1rem; font-size: 0.9rem; color: #ccc;">${item.description || ""}</p>
                        </div>
                    </div>
                `;
                
                // Hover effect
                div.addEventListener('mouseenter', () => {
                    div.querySelector('.artwork-overlay').style.opacity = '1';
                });
                div.addEventListener('mouseleave', () => {
                    div.querySelector('.artwork-overlay').style.opacity = '0';
                });

                this.slider.appendChild(div);
            });
        }
        
        this.sliderContainer.classList.remove('hidden');
        // Reset scroll position to start
        this.slider.scrollLeft = 0;
    }
}

class ScriptingCategorySlider {
    constructor() {
        this.sliderContainer = document.getElementById('scriptingSliderContainer');
        this.slider = document.getElementById('scriptingSlider');
        this.prevBtn = document.getElementById('scriptingSliderPrevBtn');
        this.nextBtn = document.getElementById('scriptingSliderNextBtn');
        this.categoryButtons = [];
        
        this.selectedCategory = null;
        this.masterVideoData = null;
        
        this.init();
    }
    
    init() {
        this.setupNavListeners();
    }
    
    setupNavListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                const scrollAmount = this.slider.clientWidth * 0.8;
                this.slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                const scrollAmount = this.slider.clientWidth * 0.8;
                this.slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }
    }
    
    setVideoData(videoData) {
        this.masterVideoData = videoData;
        this.generateTabs();
    }
    
    generateTabs() {
        const tabsContainer = document.getElementById('scripting-tabs');
        if (!tabsContainer || !this.masterVideoData) return;
        
        const categories = [...new Set(this.masterVideoData.map(v => v.category).filter(Boolean))];
        
        tabsContainer.innerHTML = '';
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-studio btn-sm scripting-category-btn hover-scale';
            btn.dataset.category = category;
            btn.textContent = category;
            tabsContainer.appendChild(btn);
        });
        
        this.categoryButtons = tabsContainer.querySelectorAll('.scripting-category-btn');
        this.categoryButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                if (this.selectedCategory !== category) {
                    this.openCategory(category);
                }
            });
        });
    }
    
    openCategory(category) {
        this.selectedCategory = category;
        this.categoryButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        
        const videosForCategory = this.masterVideoData.filter(v => v.category === category);
        
        this.slider.innerHTML = '';
        
        if (videosForCategory.length === 0) {
            this.slider.innerHTML = '<p class="text-muted" style="padding: 2rem; width: 100%; text-align: center;">More content coming soon for this category!</p>';
        } else {
            videosForCategory.forEach(video => {
                const item = document.createElement('div');
                item.className = 'video-slide-item';
                
                item.innerHTML = `
                    <div class="video-slide-wrapper">
                        <iframe src="${video.src}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                    </div>
                `;
                this.slider.appendChild(item);
            });
        }
        
        this.sliderContainer.classList.remove('hidden');
        // Reset scroll position to start
        this.slider.scrollLeft = 0;
    }
}

// Testimonial Carousel functionality
class TestimonialCarousel {
    constructor() {
        this.carousel = document.querySelector('.testimonial-carousel');
        if (!this.carousel) return;
        
        this.rafId = null;
        this.speedPxPerSec = 40; // adjusted for smoother motion
        this.lastTs = 0;
        this.paused = false;
        this.resumeTimeoutId = null;
        this.range = document.getElementById('testimonialRange');
        // Transform-loop state
        this.offsetPx = 0;
        this.contentLoopWidth = 0;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupLoop();
        this.startAuto();
    }
    
    setupEventListeners() {
        // Do not pause on hover to prevent stutter; just reset timing baseline
        this.carousel.addEventListener('mouseenter', () => { this.lastTs = 0; });
        this.carousel.addEventListener('mouseleave', () => { this.lastTs = 0; });
        
        // Range control
        if (this.range) {
            this.range.addEventListener('input', this.handleRangeInput.bind(this));
            this.range.addEventListener('mousedown', () => { this.paused = true; });
            this.range.addEventListener('change', this.scheduleResume.bind(this));
            this.range.addEventListener('touchstart', () => { this.paused = true; }, { passive: true });
            this.range.addEventListener('touchend', this.scheduleResume.bind(this), { passive: true });
        }
        
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    
    setupLoop() {
        const originalHTML = this.carousel.innerHTML;
        // Create multiple copies to ensure smooth infinite loop
        this.carousel.innerHTML = originalHTML + originalHTML + originalHTML;
        requestAnimationFrame(() => {
            const total = this.carousel.scrollWidth || 0;
            this.contentLoopWidth = Math.max(0, Math.floor(total / 3));
            this.offsetPx = 0;
            this.applyTransform();
        });
    }
    
    getMaxScroll() {
        return Math.max(0, this.carousel.scrollWidth - this.carousel.clientWidth);
    }
    
    step(ts) {
        if (this.paused) { 
            this.rafId = requestAnimationFrame(this.step.bind(this)); 
            return; 
        }
        if (!this.lastTs) this.lastTs = ts;
        const dt = (ts - this.lastTs) / 1000; // seconds
        this.lastTs = ts;
        const speed = this.speedPxPerSec * dt;
        this.offsetPx += speed;
        const loopW = this.contentLoopWidth || 0;
        if (loopW > 0) {
            this.offsetPx = ((this.offsetPx % loopW) + loopW) % loopW;
        }
        this.applyTransform();
        if (this.range && loopW > 0) {
            const pct = (this.offsetPx / loopW) * 100;
            this.range.value = String(Math.round(pct));
        }
        this.rafId = requestAnimationFrame(this.step.bind(this));
    }
    
    startAuto() {
        if (this.rafId) cancelAnimationFrame(this.rafId);
        this.lastTs = 0;
        this.rafId = requestAnimationFrame(this.step.bind(this));
    }
    
    stopAuto() {
        if (this.rafId) cancelAnimationFrame(this.rafId);
        this.rafId = null;
    }
    
    handleRangeInput() {
        this.paused = true;
        const loopW = this.contentLoopWidth || 0;
        if (loopW > 0) {
            const pct = Math.min(100, Math.max(0, parseInt(this.range.value, 10) || 0));
            this.offsetPx = (pct / 100) * loopW;
            this.applyTransform();
        }
        this.lastTs = 0;
        this.scheduleResume();
    }
    
    scheduleResume() {
        if (this.resumeTimeoutId) clearTimeout(this.resumeTimeoutId);
        this.resumeTimeoutId = setTimeout(() => { 
            this.paused = false; 
            this.resumeTimeoutId = null; 
        }, 700);
    }
    
    handleResize() {
        const total = this.carousel.scrollWidth || 0;
        this.contentLoopWidth = Math.max(0, Math.floor(total / 3));
        this.lastTs = 0;
        this.applyTransform();
    }
    
    applyTransform() {
        this.carousel.style.transform = `translateX(${-this.offsetPx}px)`;
    }
}

class ClientWinsSlider {
    constructor() {
        this.slider = document.getElementById('clientWinsSlider');
        this.prevBtn = document.getElementById('clientWinsPrevBtn');
        this.nextBtn = document.getElementById('clientWinsNextBtn');
        
        if (this.slider && this.prevBtn && this.nextBtn) {
            this.setupListeners();
        }
    }

    setupListeners() {
        this.prevBtn.addEventListener('click', () => {
            this.slider.scrollBy({ left: -400, behavior: 'smooth' });
        });

        this.nextBtn.addEventListener('click', () => {
            this.slider.scrollBy({ left: 400, behavior: 'smooth' });
        });
    }

    setData(data) {
        if (!this.slider || !data) return;
        this.slider.innerHTML = '';
        data.forEach(item => {
            const slide = document.createElement('div');
            slide.className = 'client-win-slide artwork-card clickable';
            slide.dataset.imageUrl = item.imageUrl;
            slide.style.cursor = 'pointer';
            slide.innerHTML = `
                <img src="${item.imageUrl}" alt="Client Win" loading="lazy" class="client-win-img">
            `;
            this.slider.appendChild(slide);
        });
    }
}

// Initialize carousels
let categorySlider, shortCategorySlider, graphicsCategorySlider, scriptingCategorySlider, testimonialCarousel, clientWinsSlider;

function initializeCarousels(videoData) {
    categorySlider = new CategorySlider();
    categorySlider.setVideoData(videoData);
    
    // Auto-open first category
    setTimeout(() => {
        if (categorySlider.categoryButtons.length > 0) {
            categorySlider.openCategory(categorySlider.categoryButtons[0].dataset.category);
        }
    }, 100);
}

function initializeShortFormCarousel(shortFormData) {
    if (!shortCategorySlider) {
        shortCategorySlider = new ShortCategorySlider();
    }
    shortCategorySlider.setVideoData(shortFormData);
    
    // Auto-open first category
    setTimeout(() => {
        if (shortCategorySlider.categoryButtons.length > 0) {
            shortCategorySlider.openCategory(shortCategorySlider.categoryButtons[0].dataset.category);
        }
    }, 100);
}

function initializeGraphicsCarousel(graphicsData) {
    if (!graphicsCategorySlider) {
        graphicsCategorySlider = new GraphicsCategorySlider();
    }
    graphicsCategorySlider.setData(graphicsData);
    
    // Auto-open first category
    setTimeout(() => {
        if (graphicsCategorySlider.categoryButtons.length > 0) {
            graphicsCategorySlider.openCategory(graphicsCategorySlider.categoryButtons[0].dataset.category);
        }
    }, 100);
}

function initializeClientWinsCarousel(clientWinsData) {
    if (!clientWinsSlider) {
        clientWinsSlider = new ClientWinsSlider();
    }
    clientWinsSlider.setData(clientWinsData);
}

function initializeScriptingCarousel(scriptingData) {
    if (!scriptingCategorySlider) {
        scriptingCategorySlider = new ScriptingCategorySlider();
        
        testimonialCarousel = new TestimonialCarousel();
    }
    scriptingCategorySlider.setVideoData(scriptingData);
    
    // Auto-open first category
    setTimeout(() => {
        if (scriptingCategorySlider.categoryButtons.length > 0) {
            scriptingCategorySlider.openCategory(scriptingCategorySlider.categoryButtons[0].dataset.category);
        }
    }, 100);
}
