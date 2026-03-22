import { videoDatabase } from '../data/videoDatabase.js';

export const AdScopeApp = {
            state: {
                isGenerating: false,
                currentCredit: 75,
                currentCountry: '🇺🇸 United States',
                currentCategory: '🧴 Skincare',
                selectedVideos: []
            },
            
            config: {
                creditCost: 15,
                toastDuration: 3000,
                typewriterSpeed: 25
            },


            videoDatabase,

            // ========================================
            // UTILITY FUNCTIONS
            // ========================================
            utils: {
                getElement(id) {
                    const element = document.getElementById(id);
                    if (!element) {
                        console.warn(`Element with id "${id}" not found`);
                    }
                    return element;
                },

                escapeHtml(text) {
                    const div = document.createElement('div');
                    div.textContent = text;
                    return div.innerHTML;
                }
            },

            // ========================================
            // TOAST NOTIFICATION SYSTEM
            // ========================================
            toast: {
                show(message, type = 'info', duration = 3000) {
                    const container = AdScopeApp.utils.getElement('toast-container');
                    if (!container) return;

                    const toast = document.createElement('div');
                    const id = Date.now();
                    
                    const icons = {
                        success: 'fa-check-circle',
                        error: 'fa-exclamation-circle',
                        info: 'fa-info-circle'
                    };
                    
                    toast.className = `toast toast-${type}`;
                    toast.innerHTML = `
                        <i class="fa-solid ${icons[type]} text-xl"></i>
                        <div class="flex-1">
                            <p class="text-white text-sm font-medium">${AdScopeApp.utils.escapeHtml(message)}</p>
                        </div>
                        <button data-toast-close="${id}" class="text-white/80 hover:text-white transition">
                            <i class="fa-solid fa-times"></i>
                        </button>
                    `;
                    toast.id = `toast-${id}`;
                    
                    container.appendChild(toast);

                    // Add close button listener
                    const closeBtn = toast.querySelector(`[data-toast-close="${id}"]`);
                    if (closeBtn) {
                        closeBtn.addEventListener('click', () => AdScopeApp.toast.remove(id));
                    }
                    
                    if (duration > 0) {
                        setTimeout(() => AdScopeApp.toast.remove(id), duration);
                    }

                    return id;
                },
                
                remove(id) {
                    const toast = document.getElementById(`toast-${id}`);
                    if (toast) {
                        toast.classList.add('removing');
                        setTimeout(() => toast.remove(), 300);
                    }
                }
            },

            // ========================================
            // RIPPLE EFFECT
            // ========================================
            ripple: {
                init() {
                    document.addEventListener('click', function(e) {
                        const target = e.target.closest('.ripple-container');
                        if (!target) return;
                        
                        const ripple = document.createElement('div');
                        ripple.className = 'ripple-effect';
                        
                        const rect = target.getBoundingClientRect();
                        const size = Math.max(rect.width, rect.height);
                        const x = e.clientX - rect.left - size / 2;
                        const y = e.clientY - rect.top - size / 2;
                        
                        ripple.style.width = ripple.style.height = size + 'px';
                        ripple.style.left = x + 'px';
                        ripple.style.top = y + 'px';
                        
                        target.appendChild(ripple);
                        
                        setTimeout(() => ripple.remove(), 600);
                    });
                }
            },

            // ========================================
            // VİDEO MANAGEMENT
            // ========================================
            video: {
                getCurrentVideos() {
                    const country = AdScopeApp.state.currentCountry;
                    const category = AdScopeApp.state.currentCategory;
                    
                    if (AdScopeApp.videoDatabase[country] && AdScopeApp.videoDatabase[country][category]) {
                        return AdScopeApp.videoDatabase[country][category];
                    }
                    return [];
                },

                renderVideos() {
                    const grid = AdScopeApp.utils.getElement('videos-grid');
                    const resultsCount = AdScopeApp.utils.getElement('results-count');
                    
                    if (!grid) return;

                    const videos = AdScopeApp.video.getCurrentVideos();
                    
                    if (videos.length === 0) {
                        grid.innerHTML = `
                            <div class="col-span-2 text-center py-12">
                                <i class="fa-solid fa-video-slash text-6xl text-slate-600 mb-4"></i>
                                <p class="text-slate-400 text-lg">Bu pazar ve kategoride henüz video bulunamadı</p>
                                <p class="text-slate-500 text-sm mt-2">Başka bir kombinasyon deneyin</p>
                            </div>
                        `;
                        if (resultsCount) resultsCount.textContent = '0 video bulundu';
                        return;
                    }

                    if (resultsCount) resultsCount.textContent = `${videos.length} viral içerik bulundu`;

                    grid.innerHTML = videos.map(video => `
                        <div class="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer video-card" data-video-id="${video.id}">
                            <div class="relative aspect-video group overflow-hidden">
                                <img src="${video.image}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="${video.title}">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div class="absolute top-2 right-2 flex gap-2">
                                    <span class="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold animate-pulse">VİRAL</span>
                                    <span class="bg-indigo-600 text-white text-xs px-2 py-1 rounded font-bold">${video.score}/10</span>
                                </div>
                                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                                        <i class="fa-solid fa-magnifying-glass text-2xl text-white"></i>
                                    </div>
                                </div>
                                <div class="absolute bottom-2 left-2">
                                    <input type="checkbox" class="video-checkbox w-5 h-5 rounded border-2 border-white/50 bg-black/30 checked:bg-indigo-600 cursor-pointer" data-video-id="${video.id}" onclick="event.stopPropagation()">
                                </div>
                            </div>
                            <div class="p-4">
                                <h4 class="text-white font-bold text-sm mb-2 line-clamp-2">${video.title}</h4>
                                <div class="flex items-center gap-3 text-xs text-slate-400 mb-3">
                                    <span class="flex items-center gap-1"><i class="fa-solid fa-eye"></i> ${video.views}</span>
                                    <span class="flex items-center gap-1"><i class="fa-solid fa-heart"></i> ${video.likes}</span>
                                    <span class="flex items-center gap-1"><i class="fa-solid fa-share"></i> ${video.shares}</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-xs text-slate-500">${video.daysAgo} gün önce</span>
                                    <span class="text-xs text-emerald-400 font-bold">+${video.engagement}% Engagement</span>
                                </div>
                            </div>
                        </div>
                    `).join('');

                    // Add click listeners to video cards
                    document.querySelectorAll('.video-card').forEach(card => {
                        card.addEventListener('click', function() {
                            const videoId = parseInt(this.getAttribute('data-video-id'));
                            AdScopeApp.video.showDetail(videoId);
                        });
                    });

                    // Add checkbox listeners
                    document.querySelectorAll('.video-checkbox').forEach(checkbox => {
                        checkbox.addEventListener('change', function() {
                            const videoId = parseInt(this.getAttribute('data-video-id'));
                            if (this.checked) {
                                if (!AdScopeApp.state.selectedVideos.includes(videoId)) {
                                    AdScopeApp.state.selectedVideos.push(videoId);
                                }
                            } else {
                                AdScopeApp.state.selectedVideos = AdScopeApp.state.selectedVideos.filter(id => id !== videoId);
                            }
                            AdScopeApp.video.updateBulkReportButton();
                        });
                    });
                },

                showDetail(videoId) {
                    const videos = AdScopeApp.video.getCurrentVideos();
                    const video = videos.find(v => v.id === videoId);
                    
                    if (!video) return;

                    const modal = AdScopeApp.utils.getElement('video-modal');
                    const modalContent = AdScopeApp.utils.getElement('modal-content');
                    
                    if (!modal || !modalContent) return;

                    modalContent.innerHTML = `
                        <div class="flex flex-col lg:flex-row gap-6">
                            <div class="lg:w-1/3">
                                <div class="relative aspect-[9/16] bg-black rounded-lg overflow-hidden">
                                    <img src="${video.image}" class="w-full h-full object-cover" alt="${video.title}">
                                    <div class="absolute inset-0 flex items-center justify-center">
                                        <button class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:scale-110 transition-all">
                                            <i class="fa-solid fa-play text-3xl text-white ml-1"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-2xl font-bold text-white mb-4">${video.title}</h3>
                                <div class="flex items-center gap-3 mb-6 flex-wrap">
                                    <span class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm px-4 py-2 rounded-full font-bold">
                                        <i class="fa-solid fa-fire text-yellow-300 mr-1"></i>
                                        Viral Score: ${video.score}/10
                                    </span>
                                    <span class="text-slate-400 text-sm">
                                        <i class="fa-solid fa-clock mr-1"></i>
                                        ${video.daysAgo} gün önce
                                    </span>
                                    <span class="bg-emerald-500/20 text-emerald-400 text-sm px-3 py-1 rounded border border-emerald-500/30">
                                        <i class="fa-solid fa-arrow-trend-up mr-1"></i>
                                        +${video.engagement}% Engagement
                                    </span>
                                </div>

                                <div class="grid grid-cols-3 gap-4 mb-6">
                                    <div class="bg-slate-800 p-4 rounded-lg text-center">
                                        <i class="fa-solid fa-eye text-blue-400 mb-2 text-xl"></i>
                                        <div class="text-2xl font-bold text-white">${video.views}</div>
                                        <div class="text-xs text-slate-400">Görüntülenme</div>
                                    </div>
                                    <div class="bg-slate-800 p-4 rounded-lg text-center">
                                        <i class="fa-solid fa-heart text-pink-400 mb-2 text-xl"></i>
                                        <div class="text-2xl font-bold text-white">${video.likes}</div>
                                        <div class="text-xs text-slate-400">Beğeni</div>
                                    </div>
                                    <div class="bg-slate-800 p-4 rounded-lg text-center">
                                        <i class="fa-solid fa-share text-purple-400 mb-2 text-xl"></i>
                                        <div class="text-2xl font-bold text-white">${video.shares}</div>
                                        <div class="text-xs text-slate-400">Paylaşım</div>
                                    </div>
                                </div>

                                <div class="space-y-4 mb-6">
                                    <div class="bg-slate-800 p-4 rounded-lg border-l-4 border-pink-500">
                                        <p class="text-sm text-pink-400 font-bold mb-2">🎯 HOOK (İLK 3 SN)</p>
                                        <p class="text-slate-300">"${video.hook}" - İlk 3 saniyede dikkat çekerek izleyiciyi tutuyor.</p>
                                    </div>

                                    <div class="bg-slate-800 p-4 rounded-lg border-l-4 border-blue-500">
                                        <p class="text-sm text-blue-400 font-bold mb-2">📝 SENARYO YAPISI</p>
                                        <ul class="text-slate-300 space-y-2 text-sm">
                                            <li>• 0-3sn: Problem Tanımı (Negatif Hook)</li>
                                            <li>• 3-15sn: Hatalı Uygulama Örneği</li>
                                            <li>• 15-30sn: Ürün Çözümü & Kanıt</li>
                                        </ul>
                                    </div>

                                    <div class="bg-slate-800 p-4 rounded-lg border-l-4 border-emerald-500">
                                        <p class="text-sm text-emerald-400 font-bold mb-2">🎨 GÖRSELLİK & KURGU</p>
                                        <p class="text-slate-300 text-sm">Hızlı kesim, yakın çekim kullanımı, parlak ışıklandırma ile profesyonel görünüm.</p>
                                    </div>
                                </div>

                                <div class="flex gap-3">
                                    <button class="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:from-indigo-700 hover:to-purple-700 transition-all" onclick="AdScopeApp.ai.generate()">
                                        <i class="fa-solid fa-wand-magic-sparkles mr-2"></i>
                                        AI Script Oluştur
                                    </button>
                                    <button class="px-6 py-3 border border-slate-600 rounded-lg text-slate-300 hover:text-white hover:border-indigo-500 hover:bg-indigo-500/10 transition-all">
                                        <i class="fa-solid fa-download"></i>
                                    </button>
                                    <button class="px-6 py-3 border border-slate-600 rounded-lg text-slate-300 hover:text-white hover:border-pink-500 hover:bg-pink-500/10 transition-all">
                                        <i class="fa-solid fa-bookmark"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;

                    modal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                },

                closeModal() {
                    const modal = AdScopeApp.utils.getElement('video-modal');
                    if (modal) {
                        modal.classList.add('hidden');
                        document.body.style.overflow = 'auto';
                    }
                },

                updateBulkReportButton() {
                    const btn = AdScopeApp.utils.getElement('bulk-report-btn');
                    if (!btn) return;

                    const count = AdScopeApp.state.selectedVideos.length;
                    if (count > 0) {
                        btn.disabled = false;
                        btn.innerHTML = `<i class="fa-solid fa-file-export mr-2"></i>Toplu Rapor (${count})`;
                    } else {
                        btn.disabled = true;
                        btn.innerHTML = `<i class="fa-solid fa-file-export mr-2"></i>Toplu Rapor`;
                    }
                },

                generateBulkReport() {
                    if (AdScopeApp.state.selectedVideos.length === 0) {
                        AdScopeApp.toast.show('Lütfen en az bir video seçin', 'error', 2000);
                        return;
                    }

                    const videos = AdScopeApp.video.getCurrentVideos();
                    const selectedVideos = videos.filter(v => AdScopeApp.state.selectedVideos.includes(v.id));
                    
                    AdScopeApp.toast.show(`${selectedVideos.length} video için rapor oluşturuluyor...`, 'info', 2000);
                    
                    setTimeout(() => {
                        AdScopeApp.toast.show('Toplu rapor başarıyla oluşturuldu!', 'success', 3000);
                    }, 2000);
                }
            },

            // ========================================
            // COUNTRY FILTER
            // ========================================
            country: {
                toggleMenu() {
                    const menu = AdScopeApp.utils.getElement('country-menu');
                    const arrow = AdScopeApp.utils.getElement('country-arrow');
                    const searchInput = AdScopeApp.utils.getElement('country-search');
                    
                    if (!menu || !arrow) return;
                    
            menu.classList.toggle('hidden');
            arrow.style.transform = menu.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
                    
                    if (!menu.classList.contains('hidden') && searchInput) {
                        setTimeout(() => searchInput.focus(), 100);
                        searchInput.value = '';
                        AdScopeApp.country.filter();
                    }
                },

                filter() {
                    const searchInput = AdScopeApp.utils.getElement('country-search');
                    if (!searchInput) return;

                    const searchTerm = searchInput.value.toLowerCase();
                    const countries = document.querySelectorAll('.country-item');
                    let visibleCount = 0;
                    
                    countries.forEach(country => {
                        const countryName = country.getAttribute('data-country')?.toLowerCase() || '';
                        if (countryName.includes(searchTerm)) {
                            country.style.display = 'block';
                            visibleCount++;
                        } else {
                            country.style.display = 'none';
                        }
                    });
                    
                    if (visibleCount === 0) {
                        console.log('Ülke bulunamadı');
                    }
                },

                select(countryName) {
                    const currentCountryEl = AdScopeApp.utils.getElement('current-country');
                    if (!currentCountryEl) return;

                    const currentCountry = currentCountryEl.innerText;
                    
                    if (currentCountry === countryName) {
                        AdScopeApp.toast.show('Bu ülke zaten seçili', 'info', 2000);
                        AdScopeApp.country.toggleMenu();
                        return;
                    }
                    
            // Menüyü kapat
                    AdScopeApp.country.toggleMenu();
            
            // Seçilen ülkeyi güncelle
                    currentCountryEl.innerText = countryName;
                    AdScopeApp.state.currentCountry = countryName;
                    AdScopeApp.state.selectedVideos = []; // Reset selections
            
                    // Yükleme ekranını göster
                    const overlay = AdScopeApp.utils.getElement('loading-overlay');
                    if (overlay) {
            overlay.classList.remove('hidden');
            overlay.classList.add('flex');
                    }
            
                    AdScopeApp.toast.show(`${countryName} pazar verileri yükleniyor...`, 'info', 2000);
                    
                    // Simüle edilmiş yükleme ve videoları yeniden render et
            setTimeout(() => {
                        if (overlay) {
                overlay.classList.add('hidden');
                overlay.classList.remove('flex');
                        }
                        
                        AdScopeApp.video.renderVideos();
                        AdScopeApp.toast.show(`${countryName} verileri başarıyla yüklendi!`, 'success', 3000);
                    }, 1200);
                },

                initOutsideClickHandler() {
        document.addEventListener('click', function(event) {
                        const trigger = AdScopeApp.utils.getElement('country-trigger');
                        const menu = AdScopeApp.utils.getElement('country-menu');
                        const arrow = AdScopeApp.utils.getElement('country-arrow');
                        
                        if (trigger && menu && !trigger.contains(event.target) && !menu.contains(event.target)) {
                menu.classList.add('hidden');
                            if (arrow) {
                                arrow.style.transform = 'rotate(0deg)';
                            }
                        }
                        
                        // Category menu
                        const categoryTrigger = AdScopeApp.utils.getElement('category-trigger');
                        const categoryMenu = AdScopeApp.utils.getElement('category-menu');
                        const categoryArrow = AdScopeApp.utils.getElement('category-arrow');
                        
                        if (categoryTrigger && categoryMenu && !categoryTrigger.contains(event.target) && !categoryMenu.contains(event.target)) {
                            categoryMenu.classList.add('hidden');
                            if (categoryArrow) {
                                categoryArrow.style.transform = 'rotate(0deg)';
                            }
                        }
                    });
                }
            },

            // ========================================
            // CATEGORY FILTER
            // ========================================
            category: {
                toggleMenu() {
                    const menu = AdScopeApp.utils.getElement('category-menu');
                    const arrow = AdScopeApp.utils.getElement('category-arrow');
                    
                    if (!menu || !arrow) return;
                    
                    menu.classList.toggle('hidden');
                    arrow.style.transform = menu.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
                },

                select(categoryName) {
                    const currentCategoryEl = AdScopeApp.utils.getElement('current-category');
                    if (!currentCategoryEl) return;

                    const currentCategory = currentCategoryEl.innerText;
                    
                    if (currentCategory === categoryName) {
                        AdScopeApp.toast.show('Bu kategori zaten seçili', 'info', 2000);
                        AdScopeApp.category.toggleMenu();
                        return;
                    }
                    
                    // Menüyü kapat
                    AdScopeApp.category.toggleMenu();
                    
                    // Seçilen kategoriyi güncelle
                    currentCategoryEl.innerText = categoryName;
                    AdScopeApp.state.currentCategory = categoryName;
                    AdScopeApp.state.selectedVideos = []; // Reset selections
                    
                    // Yükleme ekranını göster
                    const overlay = AdScopeApp.utils.getElement('loading-overlay');
                    if (overlay) {
                        overlay.classList.remove('hidden');
                        overlay.classList.add('flex');
                    }
                    
                    AdScopeApp.toast.show(`${categoryName} kategorisi yükleniyor...`, 'info', 2000);
                    
                    // Simüle edilmiş yükleme ve videoları yeniden render et
                    setTimeout(() => {
                        if (overlay) {
                            overlay.classList.add('hidden');
                            overlay.classList.remove('flex');
                        }
                        
                        AdScopeApp.video.renderVideos();
                        AdScopeApp.toast.show(`${categoryName} verileri başarıyla yüklendi!`, 'success', 3000);
                    }, 1200);
                }
            },

            // ========================================
            // AI SCRIPT GENERATOR
            // ========================================
            ai: {
                generate() {
                    if (AdScopeApp.state.isGenerating) {
                        AdScopeApp.toast.show('Bir script zaten oluşturuluyor...', 'info', 2000);
                        return;
                    }
                    
                    AdScopeApp.state.isGenerating = true;
                    const btn = AdScopeApp.utils.getElement('generate-btn');
                    const resultArea = AdScopeApp.utils.getElement('ai-result-area');
                    const textElement = AdScopeApp.utils.getElement('typewriter-text');
                    const creditBar = AdScopeApp.utils.getElement('credit-bar');
                    const creditText = AdScopeApp.utils.getElement('credit-text');

                    if (!btn || !resultArea || !textElement || !creditBar || !creditText) {
                        AdScopeApp.state.isGenerating = false;
                        AdScopeApp.toast.show('Gerekli elementler bulunamadı', 'error', 2000);
                        return;
                    }

            // Buton Loading Modu
            const originalBtnContent = btn.innerHTML;
            btn.disabled = true;
                    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>AI Analiz Ediyor...</span>';
                    btn.style.opacity = '0.7';

                    // Krediyi düşür
                    const newCredit = Math.max(AdScopeApp.state.currentCredit - AdScopeApp.config.creditCost, 0);
                    AdScopeApp.state.currentCredit = newCredit;
                    creditBar.style.width = newCredit + '%';
                    creditText.innerText = newCredit + '%';
                    
                    if (newCredit < 30) {
                        creditBar.className = 'bg-gradient-to-r from-red-500 to-orange-500 h-full transition-all duration-1000 relative overflow-hidden';
                        AdScopeApp.toast.show('Kredi seviyeniz düşük!', 'error', 3000);
                    } else if (newCredit < 50) {
                        creditBar.className = 'bg-gradient-to-r from-orange-500 to-yellow-500 h-full transition-all duration-1000 relative overflow-hidden';
                    }

                    AdScopeApp.toast.show('AI script oluşturuluyor...', 'info', 2000);

                    // AI düşünme süresi simülasyonu
            setTimeout(() => {
                resultArea.classList.remove('hidden');
                        textElement.innerText = '';
                        textElement.classList.add('typing-cursor');
                
                        btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Oluşturuldu!</span>';
                        btn.style.opacity = '1';
                        
                setTimeout(() => {
                    btn.disabled = false;
                    btn.innerHTML = originalBtnContent;
                }, 2000);

                // Typewriter Efekti
                const textToType = "HOOK: \"Yüzünüzü havluyla kurulamayı hemen bırakın!\"\n\nGÖVDE: Çoğu havlu bakteri yuvasıdır. Bunun yerine tek kullanımlık kağıt havlu veya [Ürün İsmi] kullanarak akne oluşumunu %40 azaltabilirsiniz.\n\nCTA: Denemek için link biyografide.";
                let i = 0;
                
                function typeWriter() {
                    if (i < textToType.length) {
                        textElement.textContent += textToType.charAt(i);
                        i++;
                                setTimeout(typeWriter, AdScopeApp.config.typewriterSpeed);
                    } else {
                                textElement.classList.remove('typing-cursor');
                                AdScopeApp.state.isGenerating = false;
                                AdScopeApp.toast.show('Script başarıyla oluşturuldu!', 'success', 3000);
                    }
                }
                typeWriter();

                    }, 1800);
                },

                close() {
                    const resultArea = AdScopeApp.utils.getElement('ai-result-area');
                    if (!resultArea) return;

                    resultArea.style.opacity = '0';
                    setTimeout(() => {
                        resultArea.classList.add('hidden');
                        resultArea.style.opacity = '1';
                    }, 200);
                },

                copyScript() {
                    const textElement = AdScopeApp.utils.getElement('typewriter-text');
                    if (!textElement) {
                        AdScopeApp.toast.show('Metin bulunamadı', 'error', 2000);
                        return;
                    }

                    const text = textElement.textContent;
                    navigator.clipboard.writeText(text).then(() => {
                        AdScopeApp.toast.show('Script panoya kopyalandı!', 'success', 2000);
                    }).catch(() => {
                        AdScopeApp.toast.show('Kopyalama başarısız oldu', 'error', 2000);
                    });
                }
            },

            // ========================================
            // UTILITY ACTIONS
            // ========================================
            actions: {
                download() {
                    AdScopeApp.toast.show('Analiz indiriliyor...', 'info', 2000);
                    setTimeout(() => {
                        AdScopeApp.toast.show('Analiz başarıyla indirildi!', 'success', 2000);
                    }, 1000);
                }
            },

            // ========================================
            // KEYBOARD SHORTCUTS
            // ========================================
            keyboard: {
                init() {
                    document.addEventListener('keydown', function(e) {
                        // Escape - Close Modal or Menus
                        if (e.key === 'Escape') {
                            // Close video modal first
                            const videoModal = AdScopeApp.utils.getElement('video-modal');
                            if (videoModal && !videoModal.classList.contains('hidden')) {
                                AdScopeApp.video.closeModal();
                                return;
                            }

                            const earlyAccessModal = document.getElementById('early-access-modal');
                            if (earlyAccessModal && !earlyAccessModal.classList.contains('hidden')) {
                                earlyAccessModal.classList.add('hidden');
                                document.body.style.overflow = 'auto';
                                return;
                            }
                            
                            // Country menu
                            const countryMenu = AdScopeApp.utils.getElement('country-menu');
                            if (countryMenu && !countryMenu.classList.contains('hidden')) {
                                AdScopeApp.country.toggleMenu();
                                return;
                            }
                            
                            // Category menu
                            const categoryMenu = AdScopeApp.utils.getElement('category-menu');
                            if (categoryMenu && !categoryMenu.classList.contains('hidden')) {
                                AdScopeApp.category.toggleMenu();
                                return;
                            }
                        }
                        
                        // Ctrl/Cmd + S - Download
                        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                            e.preventDefault();
                            AdScopeApp.actions.download();
                        }
                        
                        // Shift + C - Country Menu
                        if (e.shiftKey && e.key === 'C') {
                            e.preventDefault();
                            AdScopeApp.country.toggleMenu();
                        }
                        
                        // Shift + K - Category Menu
                        if (e.shiftKey && e.key === 'K') {
                            e.preventDefault();
                            AdScopeApp.category.toggleMenu();
                        }
                        
                        // Shift + R - Bulk Report
                        if (e.shiftKey && e.key === 'R') {
                            e.preventDefault();
                            AdScopeApp.video.generateBulkReport();
                        }
                    });
                }
            },

            // ========================================
            // MOBILE MENU
            // ========================================
            mobileMenu: {
                toggle() {
                    const menu = AdScopeApp.utils.getElement('mobile-menu');
                    const btn = AdScopeApp.utils.getElement('mobile-menu-btn');
                    
                    if (!menu || !btn) return;
                    
                    menu.classList.toggle('hidden');
                    
                    // Icon değiştir
                    const icon = btn.querySelector('i');
                    if (icon) {
                        if (menu.classList.contains('hidden')) {
                            icon.className = 'fa-solid fa-bars text-xl';
                        } else {
                            icon.className = 'fa-solid fa-times text-xl';
                        }
                    }
                }
            },

            // ========================================
            // EVENT HANDLERS
            // ========================================
            events: {
                bindAll() {
                    // Mobile menu button
                    const mobileMenuBtn = AdScopeApp.utils.getElement('mobile-menu-btn');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.addEventListener('click', () => AdScopeApp.mobileMenu.toggle());
                    }

                    // Early access button (scroll to CTA)
                    const earlyAccessBtn = AdScopeApp.utils.getElement('early-access-btn');
                    if (earlyAccessBtn) {
                        earlyAccessBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            const target = document.getElementById('early-access');
                            target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            });
                        }

                        // Early access modal open (Ücretsiz Başla CTA)
                        const openEarlyAccessModal = document.getElementById('open-early-access-modal');
                        const earlyAccessModal = document.getElementById('early-access-modal');
                        const closeEarlyAccessModal = document.getElementById('close-early-access-modal');
                        const earlyAccessForm = document.getElementById('early-access-form');

                        if (openEarlyAccessModal && earlyAccessModal) {
                            openEarlyAccessModal.addEventListener('click', () => {
                                earlyAccessModal.classList.remove('hidden');
                                document.body.style.overflow = 'hidden';
                            });
                        }

                        if (closeEarlyAccessModal && earlyAccessModal) {
                            closeEarlyAccessModal.addEventListener('click', () => {
                                earlyAccessModal.classList.add('hidden');
                                document.body.style.overflow = 'auto';
                            });
                        }

                        if (earlyAccessModal) {
                            earlyAccessModal.addEventListener('click', (e) => {
                                if (e.target === earlyAccessModal) {
                                    earlyAccessModal.classList.add('hidden');
                                    document.body.style.overflow = 'auto';
                                }
                            });
                        }

                        if (earlyAccessForm) {
                            earlyAccessForm.addEventListener('submit', (e) => {
                                e.preventDefault();
                                const emailInput = document.getElementById('ea-email');
                                const email = emailInput?.value.trim();

                                if (!email) {
                                    AdScopeApp.toast.show('Lütfen geçerli bir e-posta adresi girin.', 'error', 2500);
                                    return;
                                }

                                // Burada daha sonra Supabase entegrasyonu yapılabilir.
                                AdScopeApp.toast.show('Erken erişim talebin alındı. Teşekkürler!', 'success', 3000);

                                // Basit reset & modal kapatma
                                earlyAccessForm.reset();
                                if (earlyAccessModal) {
                                    earlyAccessModal.classList.add('hidden');
                                    document.body.style.overflow = 'auto';
                                }
                        });
                    }

                    const copyScriptBtn = document.getElementById('copy-script-btn');
                    const aiResultClose = document.getElementById('ai-result-close');
                    if (copyScriptBtn) {
                        copyScriptBtn.addEventListener('click', () => AdScopeApp.ai.copyScript());
                    }
                    if (aiResultClose) {
                        aiResultClose.addEventListener('click', () => AdScopeApp.ai.close());
                    }

                    // Country trigger
                    const countryTrigger = AdScopeApp.utils.getElement('country-trigger');
                    if (countryTrigger) {
                        countryTrigger.addEventListener('click', () => AdScopeApp.country.toggleMenu());
                    }

                    // Country search
                    const countrySearch = AdScopeApp.utils.getElement('country-search');
                    if (countrySearch) {
                        countrySearch.addEventListener('keyup', () => AdScopeApp.country.filter());
                    }

                    // Country items
                    const countryItems = document.querySelectorAll('.country-item');
                    countryItems.forEach(item => {
                        item.addEventListener('click', function() {
                            const countryName = this.textContent.trim();
                            AdScopeApp.country.select(countryName);
                        });
                    });

                    // Category trigger
                    const categoryTrigger = AdScopeApp.utils.getElement('category-trigger');
                    if (categoryTrigger) {
                        categoryTrigger.addEventListener('click', () => AdScopeApp.category.toggleMenu());
                    }

                    // Category items
                    const categoryItems = document.querySelectorAll('.category-item');
                    categoryItems.forEach(item => {
                        item.addEventListener('click', function() {
                            const categoryName = this.textContent.trim();
                            AdScopeApp.category.select(categoryName);
                        });
                    });

                    // Bulk report button
                    const bulkReportBtn = AdScopeApp.utils.getElement('bulk-report-btn');
                    if (bulkReportBtn) {
                        bulkReportBtn.addEventListener('click', () => AdScopeApp.video.generateBulkReport());
                    }

                    // Modal close button
                    const closeModal = AdScopeApp.utils.getElement('close-modal');
                    if (closeModal) {
                        closeModal.addEventListener('click', () => AdScopeApp.video.closeModal());
                    }

                    // Modal backdrop click
                    const videoModal = AdScopeApp.utils.getElement('video-modal');
                    if (videoModal) {
                        videoModal.addEventListener('click', (e) => {
                            if (e.target === videoModal) {
                                AdScopeApp.video.closeModal();
                            }
                        });
                    }
                }
            },

            // ========================================
            // ACCESSIBILITY
            // ========================================
            accessibility: {
                init() {
                    const buttons = document.querySelectorAll('button');
                    buttons.forEach(btn => {
                        if (!btn.getAttribute('aria-label') && btn.querySelector('i')) {
                            btn.setAttribute('aria-label', btn.textContent.trim() || 'Button');
                        }
                    });
                    
                    console.log('⌨️ Klavye Kısayolları:');
                    console.log('Escape - Modal/Menüleri Kapat');
                    console.log('Ctrl+S - İndir');
                    console.log('Shift+C - Ülke Menüsü');
                    console.log('Shift+K - Kategori Menüsü');
                    console.log('Shift+R - Toplu Rapor');
                }
            },

            // ========================================
            // SCROLL ANIMATIONS & NAVBAR
            // ========================================
            scrollAnimations: {
                init() {
                    const observerOptions = {
                        root: null,
                        rootMargin: '0px',
                        threshold: 0.1
                    };

                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                entry.target.classList.add('animate-fade-in');
                                // Unobserve after animation
                                observer.unobserve(entry.target);
                            }
                        });
                    }, observerOptions);

                    // Observe all sections
                    const sections = document.querySelectorAll('section');
                    sections.forEach(section => {
                        section.style.opacity = '0';
                        observer.observe(section);
                    });

                    // Stagger animation for items
                    const staggerItems = document.querySelectorAll('.stagger-item');
                    staggerItems.forEach((item, index) => {
                        item.style.animationDelay = `${index * 0.1}s`;
                    });

                    // Navbar scroll effect
                    window.addEventListener('scroll', () => {
                        const nav = document.querySelector('nav');
                        if (window.scrollY > 50) {
                            nav?.classList.add('scrolled');
                        } else {
                            nav?.classList.remove('scrolled');
                        }
                    });
                }
            },

            // ========================================
            // INITIALIZATION
            // ========================================
            init() {
                // Initialize all modules
                AdScopeApp.ripple.init();
                AdScopeApp.keyboard.init();
                AdScopeApp.country.initOutsideClickHandler();
                AdScopeApp.accessibility.init();
                AdScopeApp.events.bindAll();
                AdScopeApp.scrollAnimations.init();

                // Render initial videos
                AdScopeApp.video.renderVideos();

                // Show welcome toast
                setTimeout(() => {
                    AdScopeApp.toast.show('AdScope AI\'ya hoş geldiniz! 🚀', 'success', 3000);
                }, 500);
            }
        };