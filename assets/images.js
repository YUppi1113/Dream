// SVG画像リソース
export const svgImages = {
    // 神秘の目
    eye: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
            <radialGradient id="eyeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="#F1C40F" />
                <stop offset="100%" stop-color="#8E44AD" />
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#eyeGradient)" stroke="#F1C40F" stroke-width="2" />
        <circle cx="50" cy="50" r="20" fill="#1A0D25" />
        <circle cx="40" cy="40" r="5" fill="white" opacity="0.8" />
        <circle cx="50" cy="50" r="15" stroke="#F1C40F" stroke-width="1" fill="none" />
        <path d="M10,50 C30,80 70,80 90,50 C70,20 30,20 10,50 Z" fill="none" stroke="#F1C40F" stroke-width="2" />
    </svg>`,
    
    // ペンタグラム
    pentagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feFlood flood-color="#9B59B6" flood-opacity="0.5" result="colorGlow" />
                <feComposite in="colorGlow" in2="blur" operator="in" result="softGlow" />
                <feComposite in="softGlow" in2="SourceGraphic" operator="over" />
            </filter>
        </defs>
        <path d="M50,10 L61,40 L94,40 L67,60 L77,90 L50,75 L23,90 L33,60 L6,40 L39,40 Z" 
            fill="none" stroke="#9B59B6" stroke-width="1.5" filter="url(#glow)" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#9B59B6" stroke-width="1" stroke-dasharray="3,3" />
    </svg>`,
    
    // ローディングペンタグラム
    loadingPentagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
            <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#9B59B6" stop-opacity="1" />
                <stop offset="50%" stop-color="#F1C40F" stop-opacity="1" />
                <stop offset="100%" stop-color="#9B59B6" stop-opacity="1" />
            </linearGradient>
            <filter id="loaderGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood flood-color="#9B59B6" flood-opacity="0.7" result="colorGlow" />
                <feComposite in="colorGlow" in2="blur" operator="in" result="softGlow" />
                <feComposite in="softGlow" in2="SourceGraphic" operator="over" />
            </filter>
        </defs>
        <path d="M50,10 L61,40 L94,40 L67,60 L77,90 L50,75 L23,90 L33,60 L6,40 L39,40 Z" 
            fill="none" stroke="url(#loaderGradient)" stroke-width="3" filter="url(#loaderGlow)" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="url(#loaderGradient)" stroke-width="1.5" stroke-dasharray="5,5">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 50 50" to="360 50 50" dur="10s" repeatCount="indefinite" />
        </circle>
    </svg>`,
    
    // シンボル文字
    symbolChars: {
        moon: '☽',
        star: '★',
        sun: '☀',
        eye: '👁',
        key: '🔑',
        heart: '♥',
        tree: '🌳',
        bird: '🕊',
        mountain: '⛰',
        water: '≈',
        crystal: '✧',
        spirit: '✦',
        crown: '♛',
        infinity: '∞',
        cosmos: '✴'
    },
    
    // タロットカードSVG生成関数
    generateTarotSVG: function(name, symbol, color, subtitle) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 200">
            <rect width="120" height="200" rx="10" fill="#2C1A3B" />
            <defs>
                <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#3A1C5B" />
                    <stop offset="100%" stop-color="#1A0D25" />
                </linearGradient>
                <filter id="cardGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feFlood flood-color="${color}" flood-opacity="0.5" result="colorGlow" />
                    <feComposite in="colorGlow" in2="blur" operator="in" result="softGlow" />
                    <feComposite in="softGlow" in2="SourceGraphic" operator="over" />
                </filter>
            </defs>
            <rect width="110" height="190" x="5" y="5" rx="8" fill="url(#cardGradient)" filter="url(#cardGlow)" />
            <text x="60" y="90" font-size="40" fill="${color}" text-anchor="middle" filter="url(#cardGlow)">${symbol}</text>
            <text x="60" y="170" font-family="Arial" font-size="12" fill="white" text-anchor="middle">${name}</text>
            <text x="60" y="185" font-family="Arial" font-size="8" fill="#9B59B6" text-anchor="middle">${subtitle || ''}</text>
        </svg>`;
    },
    
    // タロットカード画像
    tarotCards: {},
    
    // SNSアイコン
    socialIcons: {
        twitter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="white" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>`,
        
        facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="white" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>`,
        
        line: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="white" d="M19.365 9.89c.50 0 .906.41.906.91s-.406.91-.906.91H17.47v1.306h1.895c.5 0 .906.41.906.91s-.406.91-.906.91H16.56c-.5 0-.91-.41-.91-.91V9.89c0-.5.41-.91.91-.91h2.806zm-5.934 0c.5 0 .906.41.906.91v4.046c0 .5-.406.91-.906.91s-.906-.41-.906-.91V10.8c0-.5.406-.91.906-.91zm-3.88 0c.5 0 .91.41.91.91v4.046c0 .5-.41.91-.91.91-.494 0-.91-.41-.91-.91v-2.66H7.47v2.66c0 .5-.407.91-.907.91-.493 0-.903-.41-.903-.91V9.89c0-.5.41-.91.903-.91h2.903c.5 0 .907.41.907.91v.777h1.082V9.89zm9.934-6.39C21.284 3.5 22.5 4.716 22.5 6.514v10.972c0 1.798-1.216 3.014-3.016 3.014H4.516C2.716 20.5 1.5 19.284 1.5 17.486V6.514C1.5 4.716 2.716 3.5 4.516 3.5h10.954z"/>
        </svg>`,

        instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="white" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>`
    }
};

// タロットカードデータ
const tarotData = [
    { id: "fool", name: "愚者", symbol: "☄", color: "#F1C40F", subtitle: "新たな旅立ち" },
    { id: "magician", name: "魔術師", symbol: "∞", color: "#9B59B6", subtitle: "創造と実現" },
    { id: "high-priestess", name: "女教皇", symbol: "☽", color: "#3498DB", subtitle: "直感と秘密" },
    { id: "empress", name: "女帝", symbol: "♀", color: "#E74C3C", subtitle: "豊かさと創造" },
    { id: "emperor", name: "皇帝", symbol: "♂", color: "#E67E22", subtitle: "権威と安定" },
    { id: "hierophant", name: "教皇", symbol: "✝", color: "#F1C40F", subtitle: "伝統と教え" },
    { id: "lovers", name: "恋人", symbol: "♥", color: "#E74C3C", subtitle: "選択と愛" },
    { id: "chariot", name: "戦車", symbol: "☯", color: "#3498DB", subtitle: "勝利と前進" },
    { id: "strength", name: "力", symbol: "∞", color: "#E67E22", subtitle: "内なる強さ" },
    { id: "hermit", name: "隠者", symbol: "☀", color: "#95A5A6", subtitle: "内省と知恵" },
    { id: "wheel-of-fortune", name: "運命の輪", symbol: "⚙", color: "#F1C40F", subtitle: "変化と機会" },
    { id: "justice", name: "正義", symbol: "⚖", color: "#3498DB", subtitle: "バランスと真実" },
    { id: "hanged-man", name: "吊るされた男", symbol: "⇅", color: "#9B59B6", subtitle: "新たな視点" },
    { id: "death", name: "死神", symbol: "☠", color: "#34495E", subtitle: "変容と再生" },
    { id: "temperance", name: "節制", symbol: "⇆", color: "#F1C40F", subtitle: "調和と癒し" },
    { id: "devil", name: "悪魔", symbol: "👹", color: "#E74C3C", subtitle: "束縛と解放" },
    { id: "tower", name: "塔", symbol: "⚡", color: "#E74C3C", subtitle: "崩壊と啓示" },
    { id: "star", name: "星", symbol: "★", color: "#F1C40F", subtitle: "希望と導き" },
    { id: "moon", name: "月", symbol: "☽", color: "#3498DB", subtitle: "幻想と直感" },
    { id: "sun", name: "太陽", symbol: "☀", color: "#F1C40F", subtitle: "成功と活力" },
    { id: "judgement", name: "審判", symbol: "🎺", color: "#9B59B6", subtitle: "復活と覚醒" },
    { id: "world", name: "世界", symbol: "⊕", color: "#2ECC71", subtitle: "完成と達成" }
];

// タロットカードSVGを生成
tarotData.forEach(card => {
    svgImages.tarotCards[card.id] = svgImages.generateTarotSVG(card.name, card.symbol, card.color, card.subtitle);
});

// SVGイメージの初期化処理
export function initSVGImages() {
    try {
        console.log("SVGイメージを初期化中...");
        
        // 神秘の目
        const mysticeye = document.getElementById('mysticeye');
        if (mysticeye) {
            mysticeye.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgImages.eye)));
        } else {
            console.warn("'mysticeye'要素が見つかりません");
        }
        
        // ペンタグラム
        const pentagram = document.getElementById('pentagram');
        if (pentagram) {
            pentagram.innerHTML = svgImages.pentagram;
        } else {
            console.warn("'pentagram'要素が見つかりません");
        }
        
        // ローディングペンタグラム
        const loadingPentagram = document.getElementById('loadingPentagram');
        if (loadingPentagram) {
            loadingPentagram.innerHTML = svgImages.loadingPentagram;
        } else {
            console.warn("'loadingPentagram'要素が見つかりません");
        }
        
        // ペイメント用ペンタグラム
        const paymentLoadingPentagram = document.getElementById('paymentLoadingPentagram');
        if (paymentLoadingPentagram) {
            paymentLoadingPentagram.innerHTML = svgImages.loadingPentagram;
        }
        
        // タロットカードの生成
        generateTarotCards();
        
        // シェアボタンの生成
        generateShareButtons();
        
        // スピリットパーティクルの生成
        generateSpiritParticles();
        
        console.log("SVGイメージの初期化が完了しました");
    } catch (error) {
        console.error("SVGイメージの初期化エラー:", error);
    }
}

// タロットカードの生成
function generateTarotCards() {
    console.log("タロットカード生成を開始...");
    const tarotCards = document.getElementById('tarotCards');
    if (!tarotCards) {
        console.error("tarotCards要素が見つかりません");
        return;
    }
    
    tarotCards.innerHTML = '';
    console.log(`${Object.keys(svgImages.tarotCards).length}枚のタロットカードを生成します`);
    
    // タロットカードのシャッフル処理
    const cardIds = Object.keys(svgImages.tarotCards);
    for (let i = cardIds.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardIds[i], cardIds[j]] = [cardIds[j], cardIds[i]];
    }
    
    // カードを生成
    cardIds.forEach((cardId) => {
        try {
            const cardData = tarotData.find(card => card.id === cardId) || { name: cardId, subtitle: "" };
            const cardImage = svgImages.tarotCards[cardId];
            if (!cardImage) {
                console.error(`カード画像が見つかりません: ${cardId}`);
                return;
            }
            
            // カード要素の作成
            const cardElement = document.createElement('div');
            cardElement.className = 'tarot-card';
            cardElement.setAttribute('data-id', cardId);
            
            // b64エンコードしたSVGをbackground-imageとして使用
            const b64CardImage = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(cardImage)));
            
            // カード内容の作成
            cardElement.innerHTML = `
                <div class="tarot-card-content">
                    <div class="tarot-card-back">
                        <div class="card-back-symbol">✦</div>
                    </div>
                    <div class="tarot-card-front" style="background-image: url('${b64CardImage}')">
                        <div class="tarot-card-glow"></div>
                    </div>
                </div>
            `;
            
            // アニメーション遅延を設定
            const delay = Math.random() * 0.5;
            cardElement.style.animationDelay = `${delay}s`;
            
            tarotCards.appendChild(cardElement);
        } catch (error) {
            console.error(`カード生成エラー (${cardId}):`, error);
        }
    });
    
    console.log("タロットカードの生成が完了しました");
    
    // カード選択エフェクトをアップグレード
    enhanceTarotCardSelection();
}

// タロットカード選択エフェクトの強化
function enhanceTarotCardSelection() {
    const cards = document.querySelectorAll('.tarot-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('selected')) {
                card.querySelector('.tarot-card-content').style.transform = 'translateY(-10px)';
                // 神秘的な音を再生
                playMysticSound('hover');
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('selected')) {
                card.querySelector('.tarot-card-content').style.transform = '';
            }
        });
    });
}

// 神秘的な音の再生
function playMysticSound(type) {
    // 実際のアプリケーションでは音声ファイルを再生
    // ここではモック実装
    console.log(`神秘的な音を再生: ${type}`);
}

// シェアボタンの生成
function generateShareButtons() {
    const shareButtons = document.getElementById('shareButtons');
    if (!shareButtons) {
        console.warn("shareButtons要素が見つかりません");
        return;
    }
    
    shareButtons.innerHTML = '';
    
    for (const [network, icon] of Object.entries(svgImages.socialIcons)) {
        const buttonElement = document.createElement('div');
        buttonElement.className = `share-button ${network}`;
        buttonElement.innerHTML = icon;
        buttonElement.setAttribute('data-network', network);
        
        // ホバーエフェクトを追加
        buttonElement.addEventListener('mouseenter', () => {
            buttonElement.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        buttonElement.addEventListener('mouseleave', () => {
            buttonElement.style.transform = '';
        });
        
        shareButtons.appendChild(buttonElement);
    }
}

// スピリットパーティクルの生成
function generateSpiritParticles() {
    const particlesContainers = document.querySelectorAll('.spirit-particles');
    if (particlesContainers.length === 0) {
        console.warn("spirit-particles要素が見つかりません");
        return;
    }
    
    particlesContainers.forEach(container => {
        container.innerHTML = '';
        
        // パーティクル数を増やす
        const particleCount = 30;
        
        // パーティクルを生成
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'spirit-particle';
            
            // ランダムな位置と大きさ
            const size = 3 + Math.random() * 6;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // ランダムなアニメーション
            const duration = 5 + Math.random() * 15;
            const delay = Math.random() * 5;
            particle.style.animation = `float-particle ${duration}s ease-in-out ${delay}s infinite`;
            
            // より多様な色の範囲
            const hue = Math.random() > 0.7 ? 
                        (270 + Math.random() * 60) : // 紫色の範囲
                        (Math.random() > 0.5 ? 
                            (40 + Math.random() * 20) : // 金色の範囲
                            (180 + Math.random() * 40)); // 青色の範囲
            
            const saturation = 70 + Math.random() * 30;
            const lightness = 50 + Math.random() * 20;
            particle.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            
            // 光るエフェクト
            particle.style.boxShadow = `0 0 ${Math.random() * 5 + 2}px hsl(${hue}, ${saturation}%, ${lightness}%)`;
            
            container.appendChild(particle);
        }
    });
}