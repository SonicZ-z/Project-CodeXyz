/**
 * VibeCode - Free LLM Providers Hub
 * JavaScript for interactivity and functionality
 */

// ===== DOM Elements =====
const themeToggle = document.getElementById('themeToggle');
const header = document.querySelector('.header');
const backToTop = document.getElementById('backToTop');
const providersGrid = document.getElementById('providersGrid');
const categoryFilter = document.getElementById('categoryFilter');
const sortBy = document.getElementById('sortBy');
const providerSearch = document.getElementById('providerSearch');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const compareProvider1 = document.getElementById('compareProvider1');
const compareProvider2 = document.getElementById('compareProvider2');
const compareTableContainer = document.getElementById('compareTableContainer');
const newsletterForm = document.getElementById('newsletterForm');
const contactForm = document.getElementById('contactForm');

// ===== State =====
let favorites = JSON.parse(localStorage.getItem('vibecodeFavorites')) || {};
let visibleProviders = 8;

// ===== Provider Data =====
const providerData = {
    nvidia: {
        name: 'NVIDIA',
        category: ['cloud', 'hardware'],
        popularity: 100,
        freeTier: 'excellent',
        speed: 'excellent',
        features: ['$50/month credits', 'GPU Accelerated', 'Enterprise Grade'],
        website: 'https://www.nvidia.com/en-us/ai-data-science/foundation-models/',
        description: 'NVIDIA offers free access to cutting-edge LLMs through their API and playground. Includes models like Llama, Mistral, and custom NVIDIA models.'
    },
    groq: {
        name: 'Groq',
        category: ['hardware', 'api'],
        popularity: 95,
        freeTier: 'excellent',
        speed: 'exceptional',
        features: ['200K tokens/month', 'Ultra-Low Latency', 'LPU Accelerated'],
        website: 'https://groq.com/',
        description: 'Groq provides ultra-fast inference on custom LPU hardware. Free tier includes generous request limits with lightning-fast responses.'
    },
    google: {
        name: 'Google',
        category: ['cloud'],
        popularity: 90,
        freeTier: 'good',
        speed: 'good',
        features: ['$300 credits for 90 days', 'Vertex AI Integration', 'Gemma Models'],
        website: 'https://cloud.google.com/ai',
        description: 'Google Cloud offers free credits for new users and free tiers on Vertex AI. Includes Gemma and other open models.'
    },
    microsoft: {
        name: 'Microsoft Azure',
        category: ['cloud'],
        popularity: 85,
        freeTier: 'good',
        speed: 'good',
        features: ['$200 credits for 30 days', 'Phi-3 Models', 'Copilot Integration'],
        website: 'https://azure.microsoft.com/en-us/products/ai',
        description: 'Azure AI offers free credits and access to various open-source models. Includes Phi-3 models and more.'
    },
    meta: {
        name: 'Meta',
        category: ['open-source'],
        popularity: 80,
        freeTier: 'excellent',
        speed: 'good',
        features: ['Unlimited (open weights)', 'Llama 2 & 3 Models', 'Commercial Use Allowed'],
        website: 'https://ai.meta.com/',
        description: 'Meta provides completely free access to Llama models through Hugging Face and other platforms. No API keys required for many models.'
    },
    mistral: {
        name: 'Mistral AI',
        category: ['open-source', 'api'],
        popularity: 85,
        freeTier: 'excellent',
        speed: 'excellent',
        features: ['1M tokens/month', 'Mistral 7B, Mixtral 8x7B', 'Le Chat Platform'],
        website: 'https://mistral.ai/',
        description: 'Mistral offers free API access with generous limits. Open-source models available for self-hosting. Known for high-quality instruction-following.'
    },
    huggingface: {
        name: 'Hugging Face',
        category: ['open-source', 'api'],
        popularity: 90,
        freeTier: 'excellent',
        speed: 'good',
        features: ['10K requests/month', '100K+ Models', 'Self-Hosting Available'],
        website: 'https://huggingface.co/',
        description: 'The largest collection of open-source models. Free inference API with thousands of models. Community-driven platform.'
    },
    cohere: {
        name: 'Cohere',
        category: ['api', 'cloud'],
        popularity: 75,
        freeTier: 'good',
        speed: 'good',
        features: ['$5 credits', 'Command Models', 'Embeddings API'],
        website: 'https://cohere.com/',
        description: 'Cohere offers free API access to their language models. Good for production use with competitive pricing.'
    },
    anthropic: {
        name: 'Anthropic',
        category: ['api'],
        popularity: 80,
        freeTier: 'limited',
        speed: 'good',
        features: ['Limited test messages', 'Claude 3 Models', 'Long Context Support'],
        website: 'https://www.anthropic.com/',
        description: 'Anthropic offers Claude models with a free tier for testing. Known for excellent reasoning capabilities.'
    },
    openai: {
        name: 'OpenAI',
        category: ['api'],
        popularity: 100,
        freeTier: 'limited',
        speed: 'excellent',
        features: ['$5-20 initial credits', 'GPT-3.5, GPT-4', 'Function Calling'],
        website: 'https://openai.com/',
        description: 'OpenAI offers limited free credits for new users. Industry-standard models like GPT-3.5 and GPT-4.'
    },
    together: {
        name: 'Together AI',
        category: ['api', 'open-source'],
        popularity: 70,
        freeTier: 'excellent',
        speed: 'good',
        features: ['$25 credits', 'Fine-tuning Available', 'Custom Models'],
        website: 'https://www.together.ai/',
        description: 'Together AI provides free inference for open-source models. Easy deployment and scaling options.'
    },
    replicate: {
        name: 'Replicate',
        category: ['api', 'open-source'],
        popularity: 70,
        freeTier: 'good',
        speed: 'good',
        features: ['$5 credits', 'One-Click Deploy', 'GPU Accelerated'],
        website: 'https://replicate.com/',
        description: 'Replicate offers free hosting and inference for open-source models. Easy to deploy and use via API.'
    },
    fireworks: {
        name: 'Fireworks AI',
        category: ['api'],
        popularity: 65,
        freeTier: 'good',
        speed: 'excellent',
        features: ['$10 credits', 'Mixtral, Llama Models', 'High Throughput'],
        website: 'https://fireworks.ai/',
        description: 'Fireworks AI offers free API access with competitive pricing. Focus on performance and reliability.'
    }
};

// ===== Theme Toggle =====
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('vibecodeTheme', newTheme);
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('vibecodeTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== Header Scroll Effect =====
function handleScroll() {
    const scrollY = window.scrollY;
    
    // Header scroll effect
    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Back to top button
    if (scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Update active nav link
    updateActiveNavLink();
}

// ===== Navigation Active Link =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== Back to Top =====
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== Favorites =====
function toggleFavorite(provider) {
    if (favorites[provider]) {
        delete favorites[provider];
    } else {
        favorites[provider] = true;
    }
    
    localStorage.setItem('vibecodeFavorites', JSON.stringify(favorites));
    updateFavoriteButtons();
    
    // Show notification
    showNotification(favorites[provider] ? 'Added to favorites!' : 'Removed from favorites');
}

function updateFavoriteButtons() {
    document.querySelectorAll('.favorite').forEach(btn => {
        const provider = btn.dataset.provider;
        const icon = btn.querySelector('i');
        
        if (favorites[provider]) {
            btn.classList.add('active');
            icon.className = 'fas fa-star';
        } else {
            btn.classList.remove('active');
            icon.className = 'far fa-star';
        }
    });
}

// ===== Provider Filtering =====
function filterProviders() {
    const category = categoryFilter.value;
    const sort = sortBy.value;
    const search = providerSearch.value.toLowerCase();
    
    const providerCards = document.querySelectorAll('.provider-card');
    
    providerCards.forEach(card => {
        const cardCategory = card.dataset.category;
        const cardName = card.querySelector('.provider-name').textContent.toLowerCase();
        const cardDesc = card.querySelector('.provider-desc').textContent.toLowerCase();
        
        // Category filter
        let categoryMatch = true;
        if (category !== 'all') {
            categoryMatch = cardCategory.includes(category);
        }
        
        // Search filter
        const searchMatch = cardName.includes(search) || cardDesc.includes(search);
        
        // Show/hide based on filters
        if (categoryMatch && searchMatch) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Sort providers
    sortProviders(sort);
}

function sortProviders(sortByValue) {
    const container = providersGrid;
    const cards = Array.from(container.querySelectorAll('.provider-card:not([style*="display: none"])'));
    
    cards.sort((a, b) => {
        switch (sortByValue) {
            case 'popularity':
                return parseInt(b.dataset.popularity) - parseInt(a.dataset.popularity);
            case 'free-tier':
                const tierOrder = { excellent: 3, good: 2, limited: 1 };
                return tierOrder[b.dataset.freeTier] - tierOrder[a.dataset.freeTier];
            case 'speed':
                const speedOrder = { exceptional: 4, excellent: 3, good: 2, limited: 1 };
                return speedOrder[b.dataset.speed] - speedOrder[a.dataset.speed];
            case 'name':
                return a.querySelector('.provider-name').textContent.localeCompare(
                    b.querySelector('.provider-name').textContent
                );
            default:
                return 0;
        }
    });
    
    // Re-append sorted cards
    cards.forEach(card => container.appendChild(card));
}

// ===== Load More =====
function loadMoreProviders() {
    const allProviders = document.querySelectorAll('.provider-card');
    
    visibleProviders = Math.min(visibleProviders + 4, allProviders.length);
    
    allProviders.forEach((card, index) => {
        if (index < visibleProviders) {
            card.style.display = '';
        }
    });
    
    // Hide load more button if all providers are visible
    if (visibleProviders >= allProviders.length) {
        loadMoreBtn.style.display = 'none';
    }
}

function resetVisibleProviders() {
    visibleProviders = 8;
    const allProviders = document.querySelectorAll('.provider-card');
    
    allProviders.forEach((card, index) => {
        if (index < visibleProviders) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
    
    loadMoreBtn.style.display = '';
}

// ===== Compare Functionality =====
function compareProviders() {
    const provider1 = compareProvider1.value;
    const provider2 = compareProvider2.value;
    
    if (!provider1 || !provider2 || provider1 === provider2) {
        compareTableContainer.innerHTML = `
            <p class="compare-placeholder">
                <i class="fas fa-info-circle"></i> Select two different providers to compare their features.
            </p>
        `;
        return;
    }
    
    const p1 = providerData[provider1];
    const p2 = providerData[provider2];
    
    const tableHtml = `
        <table class="compare-table">
            <thead>
                <tr class="compare-header">
                    <th>Feature</th>
                    <th>${p1.name}</th>
                    <th>${p2.name}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Category</strong></td>
                    <td>${p1.category.join(', ')}</td>
                    <td>${p2.category.join(', ')}</td>
                </tr>
                <tr>
                    <td><strong>Popularity</strong></td>
                    <td>${p1.popularity}/100</td>
                    <td>${p2.popularity}/100</td>
                </tr>
                <tr>
                    <td><strong>Free Tier</strong></td>
                    <td>${p1.freeTier}</td>
                    <td>${p2.freeTier}</td>
                </tr>
                <tr>
                    <td><strong>Speed</strong></td>
                    <td>${p1.speed}</td>
                    <td>${p2.speed}</td>
                </tr>
                <tr>
                    <td><strong>Website</strong></td>
                    <td><a href="${p1.website}" target="_blank">Visit <i class="fas fa-external-link-alt"></i></a></td>
                    <td><a href="${p2.website}" target="_blank">Visit <i class="fas fa-external-link-alt"></i></a></td>
                </tr>
                <tr>
                    <td><strong>Description</strong></td>
                    <td>${p1.description}</td>
                    <td>${p2.description}</td>
                </tr>
                <tr>
                    <td><strong>Key Features</strong></td>
                    <td>
                        <ul style="margin: 0; padding-left: 20px;">
                            ${p1.features.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </td>
                    <td>
                        <ul style="margin: 0; padding-left: 20px;">
                            ${p2.features.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    `;
    
    compareTableContainer.innerHTML = tableHtml;
}

// ===== Notifications =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== Form Handling =====
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('newsletterEmail').value;
    
    // Simple validation
    if (!email || !email.includes('@')) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for subscribing!', 'success');
    e.target.reset();
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! We will get back to you soon.', 'success');
    e.target.reset();
}

// ===== Smooth Scroll =====
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Update URL hash
        history.pushState(null, null, targetId);
    }
}

// ===== Initialize =====
function init() {
    // Load theme
    loadTheme();
    
    // Add event listeners
    themeToggle.addEventListener('click', toggleTheme);
    window.addEventListener('scroll', handleScroll);
    backToTop.addEventListener('click', scrollToTop);
    
    // Provider filtering
    categoryFilter.addEventListener('change', () => {
        filterProviders();
        resetVisibleProviders();
    });
    sortBy.addEventListener('change', filterProviders);
    providerSearch.addEventListener('input', () => {
        filterProviders();
        resetVisibleProviders();
    });
    
    // Load more
    loadMoreBtn.addEventListener('click', loadMoreProviders);
    
    // Compare
    compareProvider1.addEventListener('change', compareProviders);
    compareProvider2.addEventListener('change', compareProviders);
    
    // Forms
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    contactForm.addEventListener('submit', handleContactSubmit);
    
    // Navigation smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });
    
    // Favorite buttons
    document.querySelectorAll('.favorite').forEach(btn => {
        btn.addEventListener('click', () => {
            toggleFavorite(btn.dataset.provider);
        });
    });
    
    // Initialize favorites
    updateFavoriteButtons();
    
    // Initial filter
    filterProviders();
    resetVisibleProviders();
    
    // Add animation classes
    addScrollAnimations();
}

// ===== Scroll Animations =====
function addScrollAnimations() {
    const animatedElements = document.querySelectorAll('.provider-card, .guide-card, .contact-method');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// ===== Keyboard Navigation =====
function handleKeyboardNav(e) {
    // Close dropdowns with Escape
    if (e.key === 'Escape') {
        // Close any open dropdowns
    }
}

// ===== Touch Support =====
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        // Swipe left or right
    }
}

// ===== Initialize on DOM Load =====
document.addEventListener('DOMContentLoaded', init);

// ===== Export for testing =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleTheme,
        filterProviders,
        sortProviders,
        toggleFavorite,
        compareProviders
    };
}
