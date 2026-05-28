/**
 * EXTNGO Independence Layer
 * 
 * This script runs immediately before React parses the DOM.
 * It severs ties with the legacy Next.js server infrastructure to ensure
 * the template runs flawlessly as a 100% independent static website.
 */
(function() {
    'use strict';
    
    console.log('[EXTNGO] Independence Layer initialized. Severing legacy server ties...');

    // 1. Intercept and block legacy server API calls and WebGL .tar 
    // sequences to prevent console spam and WebGL crashing.
    const origOpen = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function(method, url) {
        if (typeof url === 'string') {
            if (url.includes('.tar') || url.includes('/api/jobs')) {
                console.log('[EXTNGO] Blocked legacy server request:', url);
                const mockUrl = 'data:application/json,{"status":"blocked_by_independence_layer"}';
                return origOpen.call(this, method, mockUrl);
            }
        }
        return origOpen.apply(this, arguments);
    };

    // Kill persistent loader after 1.5s as a safety measure
    setTimeout(() => {
        const loader = document.querySelector('[class*="Loader_loader"]');
        if (loader) {
            console.log('[EXTNGO] Safety: Removing persistent loader...');
            loader.style.display = 'none';
            loader.style.opacity = '0';
            loader.style.pointerEvents = 'none';
            setTimeout(() => loader.remove(), 500);
        }
    }, 800);

    const origFetch = window.fetch;
    window.fetch = function() {
        if (arguments[0] && typeof arguments[0] === 'string') {
            const url = arguments[0];
            if (url.includes('.tar') || url.includes('/api/jobs')) {
                console.log('[EXTNGO] Blocked legacy fetch request:', url);
                return Promise.resolve(new Response(JSON.stringify({ status: "blocked" })));
            }
        }
        return origFetch.apply(this, arguments);
    };

    // 2. Eradicate Next.js Image Optimization Proxy
    function fixImage(img) {
        if (img.classList.contains('Hero_image__dYJOb')) {
            img.style.opacity = '1';
            img.style.visibility = 'visible';
            img.style.zIndex = '1';
            img.style.position = 'absolute';
        }

        if (img.src && img.src.includes('_next/image')) {
            try {
                const urlObj = new URL(img.src, window.location.origin);
                const originalUrl = urlObj.searchParams.get('url');
                if (originalUrl) {
                    const decoded = decodeURIComponent(originalUrl);
                    img.src = decoded;
                    if (img.hasAttribute('srcset')) img.removeAttribute('srcset');
                }
            } catch (e) {}
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('img').forEach(fixImage);
    });

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && (mutation.attributeName === 'src' || mutation.attributeName === 'srcset')) {
                if (mutation.target.tagName === 'IMG') fixImage(mutation.target);
            } else if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.tagName === 'IMG') fixImage(node);
                    if (node.querySelectorAll) node.querySelectorAll('img').forEach(fixImage);
                });
            }
        });
    });

    observer.observe(document.documentElement, { 
        childList: true, 
        subtree: true, 
        attributes: true, 
        attributeFilter: ['src', 'srcset'] 
    });
})();

// EXTNGO NATIVE OVERRIDES
// Elite Minimalist Injection Engine for Extengo
// Optimized Extraction Strategy

function stabilizeUseCaseSection() {
    const legacyWrapper = document.querySelector('.LargeComposite_wrapper__y9NAa');
    if (!legacyWrapper) return;

    let stableSection = document.getElementById('extngo-usecase-stable');
    if (!stableSection) {
        console.log('[EXTNGO] Creating stable Use Case section...');
        stableSection = document.createElement('section');
        stableSection.id = 'extngo-usecase-stable';
        stableSection.style.cssText = `
            background: #080808 !important;
            position: relative !important;
            width: 100% !important;
            padding: 120px 0 !important;
            z-index: 50 !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            margin-top: -1px;
        `;
        
        legacyWrapper.after(stableSection);
        
        // Neutralize buggy legacy section
        legacyWrapper.style.display = 'none';
        legacyWrapper.style.pointerEvents = 'none';
        legacyWrapper.style.opacity = '0';
        legacyWrapper.style.height = '0';
        legacyWrapper.style.overflow = 'hidden';

        const gridContainer = document.createElement('div');
        gridContainer.id = 'extngo-usecase-grid';
        stableSection.appendChild(gridContainer);

        if (!document.getElementById('extngo-grid-v3-styles')) {
            const style = document.createElement('style');
            style.id = 'extngo-grid-v3-styles';
            style.textContent = `
                #extngo-usecase-grid {
                    display: grid !important;
                    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)) !important;
                    gap: 32px !important;
                    width: 90% !important;
                    max-width: 1400px !important;
                    margin: 0 auto !important;
                    will-change: transform;
                    transform: translateZ(0);
                }
                .uc-card-v3 {
                    background: rgba(20, 20, 20, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 16px;
                    padding: 40px;
                    cursor: pointer;
                    transition: transform 0.5s cubic-bezier(0.2, 1, 0.2, 1), background 0.3s, border-color 0.3s;
                    backdrop-filter: blur(10px);
                    display: flex;
                    flex-direction: column;
                    min-height: 280px;
                    position: relative;
                    overflow: hidden;
                    will-change: transform;
                    transform: translate3d(0,0,0);
                }
                .uc-card-v3:hover {
                    background: rgba(30, 30, 30, 0.6);
                    border-color: rgba(230, 133, 74, 0.3);
                    transform: translate3d(0, -8px, 0);
                }
                .uc-card-v3::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at top right, rgba(230, 133, 74, 0.05), transparent 70%);
                    opacity: 0;
                    transition: opacity 0.5s;
                    pointer-events: none;
                }
                .uc-card-v3:hover::after {
                    opacity: 1;
                }
                body.extngo-modal-active {
                    overflow: hidden !important;
                    touch-action: none;
                }
                .modal-v3 {
                    position: fixed !important;
                    inset: 0 !important;
                    z-index: 1000000 !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    padding: 40px;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.3s ease, visibility 0.3s;
                    will-change: opacity;
                    transform: translateZ(0);
                }
                .modal-v3.active {
                    opacity: 1;
                    visibility: visible;
                }
                @media (max-width: 768px) {
                    #extngo-usecase-grid { grid-template-columns: 1fr !important; }
                    .modal-v3 { padding: 15px; }
                }
            `;
            document.head.appendChild(style);
        }

        renderGridContent(gridContainer);
    }
}

function renderGridContent(container) {
    if (container.children.length > 0) return;
    
    const data = [
        { title: "LAPTOPS WITHOUT RJ45", text: "Instantly add a reliable wired connection to modern thin-and-light laptops lacking built-in ethernet ports.", img: "./assets/brand/product_multifunctional.jpg" },
        { title: "MOBILE DEVICES", text: "Connect Android phones and tablets to high-speed, secure wired networks.", img: "./assets/brand/product_connector.jpg" },
        { title: "GAMERS & STREAMERS", text: "Never drop a frame again. Essential for gamers and streamers who need low-latency, non-dropping connections.", img: "./assets/brand/main_image_1.jpg" },
        { title: "TRADE SHOWS", text: "Deploy temporary ethernet drops rapidly during exhibitions and trade shows without taping down messy cables.", img: "./assets/brand/lifestyle_wide.jpg" },
        { title: "ROBOTICS", text: "A robust tethering solution for robotics setups, ensuring uninterrupted data flow without tangling.", img: "./assets/brand/detail_secure_connect.jpg" },
        { title: "AUTOMOTIVE & GAMING", text: "Perfect for gaming setups and car-industry tablets that require stable wired Ethernet.", img: "./assets/brand/solution_retractable.jpg" },
        { title: "INDUSTRIAL SETTINGS", text: "Built tough for wind turbines and industrial environments where rugged, reliable networking is non-negotiable.", img: "./assets/brand/rugged_truck_wheel.jpg" },
        { title: "POWER USERS", text: "Productivity/power users and YouTubers who demand rock-solid internet while traveling or working remotely.", img: "./assets/brand/lifestyle_pro.jpg" },
        { title: "STAGE PRODUCTION", text: "A godsend for music and stage production requiring rapid, temporary staging networks that won't trip performers.", img: "./assets/brand/product_cable_detail.jpg" },
        { title: "HOSPITALS & ENTERPRISE", text: "Secure, reliable, zero-trip-hazard connectivity for hospitals, clinics, and modern conference rooms.", img: "./assets/brand/lifestyle_desk.jpg" },
        { idx: 10, title: "STARLINK & RVS", text: "Ideal for Starlink / satellite internet users, campers, and RV owners who need long runs across rough terrain.", img: "./assets/brand/lifestyle_wide_truck.jpg" },
        { idx: 11, title: "EDUCATION", text: "Universities and campuses needing temporary lab or classroom setups can deploy and retract networks in minutes.", img: "./assets/brand/lifestyle_office.jpg" }
    ];

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'uc-card-v3';
        card.innerHTML = `
            <div style="font-family: AkkuratMono, monospace; font-size: 10px; color: #e6854a; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 20px;">Use Case 0${data.indexOf(item) + 1}</div>
            <h3 style="font-family: LayGrotesk-Semibold, sans-serif; font-size: 22px; color: #fff; margin-bottom: 16px; line-height: 1.1;">${item.title}</h3>
            <p style="font-family: Inter, sans-serif; font-size: 15px; color: rgba(255, 255, 255, 0.5); line-height: 1.6; margin-bottom: 30px;">${item.text}</p>
            <div style="margin-top: auto; display: flex; align-items: center; gap: 10px; font-family: AkkuratMono, monospace; font-size: 11px; color: #fff; text-transform: uppercase; opacity: 0.8;">
                Explore Details <span style="font-size: 18px; color: #e6854a;">→</span>
            </div>
        `;

        card.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            openModal(item);
        };
        container.appendChild(card);
    });
}

function openModal(item) {
    document.body.classList.add('extngo-modal-active');
    const modal = document.createElement('div');
    modal.className = 'modal-v3';
    modal.innerHTML = `
        <div class="modal-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px);"></div>
        <div class="modal-content" style="position: relative; background: #0c0c0c; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; max-width: 1000px; width: 100%; overflow: hidden; box-shadow: 0 50px 100px rgba(0,0,0,0.9); transform: translateZ(0);">
            <button class="modal-close" style="position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.05); border: none; width: 40px; height: 40px; border-radius: 50%; color: #fff; cursor: pointer; font-size: 20px; z-index: 10;">×</button>
            <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 300px; padding: 60px;">
                    <span style="font-family: AkkuratMono, monospace; font-size: 12px; color: #e6854a; text-transform: uppercase; letter-spacing: 0.2em; display: block; margin-bottom: 20px;">Detailed View</span>
                    <h2 style="font-family: LayGrotesk-Semibold, sans-serif; font-size: 32px; color: #fff; margin-bottom: 24px; line-height: 1.1;">${item.title}</h2>
                    <p style="font-family: Inter, sans-serif; font-size: 17px; color: rgba(255,255,255,0.7); line-height: 1.7; margin-bottom: 40px;">${item.text}</p>
                    <div style="background: rgba(230, 133, 74, 0.05); border-left: 2px solid #e6854a; padding: 20px 30px; border-radius: 0 12px 12px 0;">
                        <p style="font-family: AkkuratMono, monospace; font-size: 13px; color: rgba(255,255,255,0.5); margin: 0;">EXTNGO is the only solution that combines high-speed throughput with zero-tangling mechanical design.</p>
                    </div>
                </div>
                <div style="flex: 1; min-width: 300px; height: auto; position: relative; background: #111;">
                    <img src="${item.img}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
                    <div style="position: absolute; inset: 0; background: linear-gradient(to right, #0c0c0c, transparent 20%);"></div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('active'));

    const close = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.classList.remove('extngo-modal-active');
        }, 300);
    };

    modal.querySelector('.modal-close').onclick = close;
    modal.querySelector('.modal-overlay').onclick = close;
}

function runHydration() {
    // 1. NUCLEAR TEXT PURGE: Remove specific legacy strings requested by user
    const stringsToRemove = [
        "The Connectivity Revolution",
        "Explore our technology",
        "EXTNGO Orange Specs",
        "EXTNGO Green Specs",
        "50 feet / 15 meters",
        "33 feet / 10 meters",
        "1 Gbps full gigabit speed",
        "Retractable flat cable design",
        "cascadable",
        "Free patch cord",
        "3-year warranty",
        "Use Case 01",
        "LAPTOPS WITHOUT RJ45",
        "Explore Details"
    ];

    const allElements = document.querySelectorAll('h2, h3, p, span, div, a, button');
    allElements.forEach(el => {
        if (el.children.length === 0 || (el.tagName === 'A' || el.tagName === 'BUTTON')) {
            const content = el.textContent || "";
            if (stringsToRemove.some(s => content.includes(s))) {
                // If it's my own grid or shop button, don't remove it
                if (el.closest('.extngo-product-grid') || el.classList.contains('extngo-shop-btn')) return;
                
                // CRITICAL FIX: Don't remove titles or labels from the Timeline section
                if (el.closest('[class*="Timeline_card"]') || el.classList.contains('Timeline_text__paU4W') || el.classList.contains('Timeline_label__zpmgH')) {
                    el.style.visibility = 'visible';
                    el.style.opacity = '1';
                    el.style.display = 'block';
                    return;
                }

                el.style.display = 'none';
                el.style.opacity = '0';
                el.style.pointerEvents = 'none';
                // Try to hide parent if it's just a wrapper
                if (el.parentElement && el.parentElement.children.length === 1) {
                    el.parentElement.style.display = 'none';
                }
            }
        }
    });

    // 1.5 FORCE TIMELINE TITLES
    document.querySelectorAll('.Timeline_label__zpmgH, .Timeline_text__paU4W').forEach(el => {
        el.style.cssText += "visibility: visible !important; opacity: 1 !important; display: block !important; color: #fff !important; transform: none !important;";
    });

    // 2. Original Hydration Logic
    const sideBySideTexts = document.querySelectorAll('.ImageSideBySide_textContent__7LfDf');
    sideBySideTexts.forEach(el => {
        if (el.textContent.includes('How we operate.')) {
            const container = el.closest('.ImageSideBySide_wrapper__N31Fm');
            if (container) {
                const imageSection = container.querySelector('.ImageSideBySide_imageSection__6dxpf');
                if (imageSection && !imageSection.hasAttribute('data-video-injected')) {
                    imageSection.setAttribute('data-video-injected', 'true');
                    imageSection.innerHTML = `
                        <div style="width: 100%; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); background: #080808; display: flex; align-items: center; justify-content: center; box-shadow: 0 20px 40px rgba(0,0,0,0.5); transform: translate3d(0,0,0);">
                            <video autoplay loop muted playsinline style="width: 100%; height: auto; object-fit: cover; display: block; border-radius: 12px;">
                                <source src="./assets/video/extngo_ad.mp4" type="video/mp4" />
                            </video>
                        </div>
                    `;
                }
            }
        }
    });
    
    const dualCardsContainers = document.querySelectorAll('.CompositeDual_compositeItem__1k1hC');
    dualCardsContainers.forEach(container => {
        const h3 = container.querySelector('h3');
        const content = container.querySelector('.CompositeDual_content__q601M');
        if (h3 && content && !content.hasAttribute('data-img-fixed')) {
            content.setAttribute('data-img-fixed', 'true');
            const isOrange = h3.textContent.includes('Orange');
            const imgSrc = isOrange ? './assets/brand/product_orange.jpg' : './assets/brand/product_green.jpg';
            
            const existingMedia = content.querySelector('.CompositeDual_video__aUb69');
            if (existingMedia) existingMedia.remove();
            
            const img = document.createElement('img');
            img.src = imgSrc;
            img.className = "CompositeDual_video__aUb69"; 
            img.style.cssText = "object-fit: cover; width: 100%; height: 100%; position: absolute; inset: 0; padding: 20px; transform: translate3d(0,0,0);";
            content.insertBefore(img, content.firstChild);
        }
    });

    // 3. Branding Hardening (Anti-Regression)
    const brandLogos = document.querySelectorAll('.Header_brandLogo__AXo7t, .Footer_logo__x3Zdo');
    brandLogos.forEach(logo => {
        const isHeader = logo.classList.contains('Header_brandLogo__AXo7t');
        const img = logo.querySelector('img[src*="extngo_logo"]');
        
        // Ensure container is visible and has dimensions
        logo.style.cssText += `display: flex !important; visibility: visible !important; opacity: 1 !important; width: ${isHeader ? '160px' : '200px'} !important; height: ${isHeader ? '45px' : '65px'} !important; min-width: ${isHeader ? '160px' : '200px'} !important; align-items: center !important; justify-content: flex-start !important; z-index: 1000000 !important; position: relative !important; background: transparent !important;`;

        if (!img) {
            logo.innerHTML = `
                <img src="./assets/brand/extngo_logo.png?v=3" alt="EXTNGO" style="height: 100%; width: auto; display: block !important; visibility: visible !important; opacity: 1 !important; object-fit: contain; filter: none !important;" />
                <span style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;">EXTNGO</span>
            `;
            console.log('[EXTNGO] Logo injected into:', isHeader ? 'Header' : 'Footer');
        } else {
            img.style.cssText += "display: block !important; visibility: visible !important; opacity: 1 !important; height: 100% !important; width: auto !important; filter: none !important; margin: 0 !important;";
            // Prevent framework from changing src back to icromat
            if (!img.src.includes('extngo_logo')) {
                img.src = "./assets/brand/extngo_logo.png?v=3";
            }
        }
        // Remove any legacy SVGs, Canvases, or Lotties that might have been re-into the container
        logo.querySelectorAll('svg, canvas, .lottie').forEach(l => {
            l.style.display = 'none';
            l.style.opacity = '0';
        });
    });

    // 4. FOOTER HARDENING
    const legacyFooter = document.querySelector('[class*="Footer_wrapper"]');
    if (legacyFooter) {
        legacyFooter.style.display = 'none';
        legacyFooter.style.opacity = '0';
        legacyFooter.style.pointerEvents = 'none';
        legacyFooter.style.height = '0';
        legacyFooter.style.overflow = 'hidden';
    }

    const newFooter = document.getElementById('extngo-footer-v3');
    if (newFooter) {
        newFooter.style.cssText += "display: block !important; visibility: visible !important; opacity: 1 !important; position: relative !important; z-index: 1000 !important;";
        // Move to bottom of main if not already there
        const main = document.querySelector('main');
        if (main && newFooter.parentElement !== main) {
            main.appendChild(newFooter);
        }
    }

    // 5. GLOBAL LOGO COLOR CORRECTION
    document.querySelectorAll('img[src*="extngo_logo"]').forEach(img => {
        img.style.filter = 'none';
        img.style.setProperty('filter', 'none', 'important');
        img.style.visibility = 'visible';
        img.style.opacity = '1';
    });

    // 6. AMAZON CTA REPLACEMENT (User Request)
    // Replace "Deploy a reliable wired network anywhere, instantly."
    document.querySelectorAll('.CTA_ctaLabel__vB_JV').forEach(el => {
        if (el.textContent.includes('Deploy a reliable wired network anywhere, instantly')) {
            el.textContent = 'BUY ON AMAZON';
            const ctaWrapper = el.closest('a');
            if (ctaWrapper) {
                ctaWrapper.href = 'https://www.amazon.com/extngo'; // Generic link, can be refined
                ctaWrapper.target = '_blank';
            }
        }
    });

    // Replace "Never compromise your" (from CenterHeading)
    document.querySelectorAll('[class*="CenterHeading_titleHeading"]').forEach(el => {
        if (el.textContent.includes('Never compromise your')) {
            el.textContent = 'AVAILABLE ON AMAZON';
        }
    });

    // 7. FIX END-TO-END PRODUCTION CARD 4 TITLE
    // Usually these are Highlights_item or Timeline_card
    const highlightItems = document.querySelectorAll('[class*="Highlights_item"], [class*="Timeline_card"]');
    if (highlightItems.length >= 4) {
        const card4 = highlightItems[3];
        const titleEl = card4.querySelector('h3, [class*="title"], [class*="text"]');
        if (titleEl && (!titleEl.textContent || titleEl.textContent.trim() === "")) {
            titleEl.textContent = "Rigorous QC & Global Support";
            titleEl.style.visibility = "visible";
            titleEl.style.opacity = "1";
        } else if (!titleEl) {
            // If title element is missing entirely, inject one
            const newTitle = document.createElement('h3');
            newTitle.className = "Highlights_title__tG5qO"; // Using common class
            newTitle.textContent = "Rigorous QC & Global Support";
            newTitle.style.cssText = "color: #fff; font-size: 24px; margin-top: 20px; display: block !important; visibility: visible !important; opacity: 1 !important;";
            card4.appendChild(newTitle);
        }
    }
}

// 6. NUCLEAR ANTI-INVERSION OBSERVER (Definitive Fix)
function applyNuclearFilterFix(img) {
    if (img.src && img.src.includes('extngo_logo')) {
        img.style.setProperty('filter', 'none', 'important');
        img.style.setProperty('-webkit-filter', 'none', 'important');
    }
}

const antiInvertObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                if (node.tagName === 'IMG') applyNuclearFilterFix(node);
                if (node.querySelectorAll) node.querySelectorAll('img[src*="extngo_logo"]').forEach(applyNuclearFilterFix);
            });
        } else if (mutation.type === 'attributes') {
            if (mutation.target.tagName === 'IMG') applyNuclearFilterFix(mutation.target);
        }
    });
});

antiInvertObserver.observe(document.documentElement, { 
    childList: true, 
    subtree: true, 
    attributes: true, 
    attributeFilter: ['style', 'class', 'src'] 
});

let hCount = 0;
let hInt = setInterval(() => {
    runHydration();
    hCount++;
    if (hCount === 40) {
        clearInterval(hInt);
        hInt = setInterval(runHydration, 2000);
    }
    if (hCount > 100) {
        clearInterval(hInt);
        console.log('[EXTNGO] All optimizations finalized.');
    }
}, 200);

console.log('[EXTNGO] Performance Overrides Active.');
