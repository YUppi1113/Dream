// 夢霊視アプリケーション メインスクリプト
import { svgImages, initSVGImages } from '../assets/images.js';
import { tarotInterpretations, generateTarotReading, generateDreamDeepInterpretation, generateSymbolMap } from './tarot.js';

// 全体的な定数と設定
const APP_CONFIG = {
    // 無料/プレミアム機能
    premium: {
        price: 500, // 円
        features: [
            "タロットカードによる深層解釈",
            "シンボルマップの詳細な分析",
            "潜在意識からのメッセージ解読",
            "未来への詳細なガイダンス",
            "AI搭載の高度な霊視"
        ]
    },
    // アニメーション設定
    animation: {
        typingSpeed: 25,  // ミリ秒
        loadingDuration: 3000, // ミリ秒
        fadeInSpeed: 500, // ミリ秒
    },
    // ChatGPT API設定
    api: {
        psychicReadingEndpoint: '/api/psychic-reading',
        dreamInterpretationEndpoint: '/api/dream-interpretation',
    }
};

// DOM読み込み完了時の処理
document.addEventListener('DOMContentLoaded', () => {
    console.log('夢霊視アプリケーションを初期化中...');
    
    // SVG画像の初期化
    initSVGImages();
    
    // アプリケーションの初期化
    initApp();
    
    // サウンドの事前ロード
    preloadMysticSounds();
});

/**
 * サウンドファイルのプリロード
 */
function preloadMysticSounds() {
    // 実際の実装ではサウンドファイルをプリロード
    console.log('神秘的なサウンドを準備中...');
}

/**
 * タイプライター効果を実現する関数
 * @param {string} text - 表示するテキスト
 * @param {HTMLElement} element - テキストを表示する要素
 * @param {number} speed - 表示速度（ミリ秒）
 * @returns {Promise} - 表示完了後に解決されるPromise
 */
function typeWriter(text, element, speed = APP_CONFIG.animation.typingSpeed) {
    return new Promise((resolve) => {
        // HTMLパーサーでテキストを解析（タグを維持するため）
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const formattedText = doc.body.innerHTML;
        
        // 元のHTMLを保存
        element.innerHTML = '';
        
        // テキストをタグごとに分割
        const tagRegex = /(<[^>]+>)|([^<]+)/g;
        const parts = formattedText.match(tagRegex) || [];
        let index = 0;

        function renderNextPart() {
            if (index < parts.length) {
                const part = parts[index++];
                
                // タグの場合はそのまま追加
                if (part.startsWith('<') && part.endsWith('>')) {
                    element.innerHTML += part;
                    setTimeout(renderNextPart, 0); // タグはすぐに追加
                } 
                // テキストの場合は一文字ずつ追加
                else {
                    let charIndex = 0;
                    function addNextChar() {
                        if (charIndex < part.length) {
                            element.innerHTML += part.charAt(charIndex++);
                            setTimeout(addNextChar, speed);
                        } else {
                            setTimeout(renderNextPart, 0);
                        }
                    }
                    addNextChar();
                }
            } else {
                resolve(); // 完了時にPromiseを解決
            }
        }
        
        renderNextPart();
    });
}

/**
 * ChatGPT APIを使用した霊視結果の生成
 * @param {string} dream - 夢の内容
 * @param {boolean} isPremium - プレミアムリクエストかどうか
 * @returns {Promise<string>} - 生成された霊視結果
 */
async function generatePsychicReading(dream, isPremium = false) {
    try {
        console.log(`霊視を生成中... (プレミアム: ${isPremium})`);
        
        // ローディングアニメーションを開始（待機時間を確保）
        await new Promise(resolve => setTimeout(resolve, APP_CONFIG.animation.loadingDuration));
        
        // サーバーサイドAPIエンドポイントを使用
        try {
            // 神秘的な演出のために少し遅延を入れる
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const response = await fetch(APP_CONFIG.api.psychicReadingEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    dream, 
                    isPremium,
                    timestamp: new Date().toISOString()
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('霊視結果を受信しました');
                return data.reading || generateLocalPsychicReading(dream, isPremium);
            }
        } catch (apiError) {
            console.error('API接続エラー:', apiError);
            // エラー時はローカル生成にフォールバック
        }
        
        // APIが失敗した場合はローカル生成にフォールバック
        return generateLocalPsychicReading(dream, isPremium);
    } catch (error) {
        console.error('霊視生成エラー:', error);
        return `【霊視エラー】\n\n申し訳ありません。霊界との接続に問題が発生しました。静かな心で再度お試しください。`;
    }
}

/**
 * ローカルで霊視結果を生成するフォールバック関数
 * @param {string} dream - 夢の内容
 * @param {boolean} isPremium - プレミアムリクエストかどうか
 * @returns {string} - 生成された霊視結果
 */
function generateLocalPsychicReading(dream, isPremium = false) {
    console.log('ローカル霊視生成を使用します');
    
    // 夢のキーワードを抽出
    const keywords = dream.split(/[\s,。、！？!?]+/).filter(word => word.length > 1);
    const randomKeywords = keywords.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // シンボルのランダム選択
    const symbols = [
        "月", "星", "水", "炎", "風", "道", "光", "影", "扉", "鏡", 
        "花", "鳥", "魚", "山", "空", "海", "木", "石", "目", "手"
    ];
    const randomSymbols = symbols.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // 星空の区切り線
    const starDivider = "✧･ﾟ: *✧･ﾟ:* *:･ﾟ✧*:･ﾟ✧";
    
    // 基本霊視結果
    let result = `✨ 【霊視結果】 ✨\n\nあなたの夢には<span class="highlight">${randomSymbols[0]}と${randomSymbols[1]}</span>のエネルギーが強く現れています。これは<span class="highlight">内なる変化と目覚め</span>の兆候です。\n\n`;
    
    result += `${starDivider}\n\n`;
    
    result += `🔮 【夢のメッセージ】 🔮\n\nあなたの夢に現れた<span class="highlight">${randomKeywords[0] || "象徴"}</span>は、あなたの潜在意識からの重要なメッセージを運んでいます。特に<span class="highlight">${randomKeywords[1] || "要素"}</span>は、あなたの精神的な成長と関連しており、より深い意味を持っています。\n\n`;
    
    result += `${starDivider}\n\n`;
    
    result += `💫 【未来への指針】 💫\n\n近い将来、<span class="highlight">${randomKeywords[2] || "状況"}</span>に関連した重要な出来事があなたを待っています。この機会を活かすことで、人生の新たな扉が開くでしょう。\n\n`;
    
    result += `${starDivider}\n\n`;
    
    // 基本アドバイス
    result += `💎 【霊からのアドバイス】 💎\n\n内なる声に耳を傾け、直感を信じてください。あなたの魂は正しい道を知っています。日常の喧騒から離れ、静かな瞑想の時間を持つことで、より明確な導きを受け取れるでしょう。`;
    
    // プレミアム機能の場合は追加コンテンツ
    if (isPremium) {
        result += `\n\n${starDivider}\n\n`;
        result += `✨ 【深層解析】 ✨\n\n`;
        result += `あなたの夢は<span class="highlight">過去生</span>との繋がりを示しています。${randomSymbols[2]}のシンボルは、あなたが前世で習得した特別な才能や能力が、現世でも発揮される時期が近づいていることを教えています。\n\n`;
        result += `この才能は<span class="highlight">${getRandomTalent()}</span>に関連しており、今後のあなたの人生に大きな影響をもたらすでしょう。直感を研ぎ澄まし、内なる導きに従うことで、あなた本来の使命に気づくことができます。`;
    }
    
    return result;
}

/**
 * ランダムな特殊能力/才能を返す関数
 * @returns {string} - ランダムな能力/才能
 */
function getRandomTalent() {
    const talents = [
        "霊感や透視能力",
        "創造的な芸術表現",
        "癒しや共感の力",
        "直観的な問題解決能力",
        "人々を導く指導力",
        "自然界と調和する能力",
        "言葉や文章の力",
        "未来を予知する力",
        "人の心を読み取る能力",
        "宇宙の法則を理解する知恵"
    ];
    
    return talents[Math.floor(Math.random() * talents.length)];
}

/**
 * スピリットパーティクルのアニメーション効果を強化
 * @param {HTMLElement} container - パーティクルを配置するコンテナ要素
 * @param {boolean} intense - より強いエフェクトにするかどうか
 */
function enhanceSpiritParticles(container, intense = false) {
    try {
        if (!container) {
            console.warn('スピリットパーティクルコンテナが見つかりません');
            return;
        }
        
        console.log('スピリットパーティクルを生成中...');
        
        // パーティクル数を動的に決定
        const particleCount = intense ? 50 : 30;
        
        // 既存のパーティクルをクリア
        container.innerHTML = '';
        
        // パーティクルを生成
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'spirit-particle';
            
            // ランダムな位置と大きさ（インテンスモードでは大きめに）
            const size = intense ? (4 + Math.random() * 8) : (3 + Math.random() * 5);
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // ランダムなアニメーション（インテンスモードでは速く）
            const duration = intense ? (3 + Math.random() * 8) : (5 + Math.random() * 10);
            const delay = Math.random() * 5;
            particle.style.animation = `float-particle ${duration}s ease-in-out ${delay}s infinite`;
            
            // 色のランダム変化（インテンスモードでは金色も追加）
            let hue;
            if (intense && Math.random() > 0.6) {
                hue = 40 + Math.random() * 20; // 金色
            } else {
                hue = 270 + Math.random() * 60; // 紫色
            }
            
            const saturation = 70 + Math.random() * 30;
            const lightness = 50 + Math.random() * 20;
            particle.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            
            // グロー効果（インテンスモードでは強く）
            const glowSize = intense ? 8 : 4;
            particle.style.boxShadow = `0 0 ${glowSize}px hsl(${hue}, ${saturation}%, ${lightness}%)`;
            
            container.appendChild(particle);
        }
        
        console.log(`${particleCount}個のスピリットパーティクルを生成しました`);
    } catch (error) {
        console.error('スピリットパーティクル生成エラー:', error);
    }
}

/**
 * タロット解釈を表示する関数
 * @returns {Promise<void>}
 */
async function displayTarotInterpretation() {
    // プレミアムユーザーのみが使用可能
    if (localStorage.getItem('isPremiumUser') !== 'true') {
        showPremiumModal();
        return;
    }
    
    // DOM要素の取得
    const dreamInput = document.getElementById('dreamInput');
    const tarotInterpretation = document.querySelector('.tarot-interpretation');
    const tarotInterpretationText = document.getElementById('tarotInterpretationText');
    const selectedCardsContainer = document.getElementById('selectedCards');
    const symbolMap = document.getElementById('symbolMap');
    const shareSection = document.querySelector('.share-section');
    
    const dream = dreamInput.value.trim();
    
    try {
        // ローディングエフェクトの再生
        playMysticSound('insight');
        
        // タロット解釈を表示
        tarotInterpretation.style.display = 'block';
        tarotInterpretationText.innerHTML = '<div class="loading-text">タロットカードからのメッセージを受信中<span class="loading-dots">...</span></div>';
        
        // タロットカードコンテナをクリア
        selectedCardsContainer.innerHTML = '';
        
        // 選択されたカードIDを取得
        const selectedCards = Array.from(document.querySelectorAll('.tarot-card.selected')).map(card => 
            card.getAttribute('data-id')
        );
        
        if (selectedCards.length !== 2) {
            tarotInterpretationText.innerHTML = '<div class="warning">タロットカードを2枚選択してください。</div>';
            return;
        }
        
        // シンボルマップを初期化
        if (symbolMap) {
            symbolMap.style.display = 'none';
        }
        
        // 選択したカードを表示
        selectedCards.forEach((cardId, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'selected-card';
            
            // カードSVGを取得
            const cardImage = svgImages.tarotCards[cardId];
            if (!cardImage) {
                console.error(`カードイメージがありません: ${cardId}`);
                return;
            }
            
            // SVGをBase64エンコード
            const b64CardImage = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(cardImage)));
            
            // カードの背景と光るエフェクト
            cardElement.innerHTML = `
                <div class="card-glow"></div>
                <img src="${b64CardImage}" alt="${tarotInterpretations[cardId]?.name || cardId}">
                <div class="card-label">${index + 1}枚目</div>
            `;
            
            // アニメーション遅延
            cardElement.style.animationDelay = `${index * 0.3}s`;
            
            selectedCardsContainer.appendChild(cardElement);
        });
        
        // タロット解釈の生成（基本情報を表示）
        const tarotReadingBasic = generateTarotReading(selectedCards[0], selectedCards[1], dream);
        
        // 神秘的な演出のため少し待機
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 基本解釈の表示
        tarotInterpretationText.innerHTML = '';
        await typeWriter(tarotReadingBasic, tarotInterpretationText);
        
        // 深層解釈を非同期で取得
        getDeepInterpretation(selectedCards, dream, tarotInterpretationText);
        
        // シェアセクションを表示
        shareSection.style.display = 'flex';
        
        // スクロール
        tarotInterpretation.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    } catch (error) {
        console.error('タロット解釈エラー:', error);
        tarotInterpretationText.innerHTML = '<div class="error">タロット解読中にエラーが発生しました。後ほど再度お試しください。</div>';
    }
}

/**
 * 深層解釈を取得して表示する
 * @param {Array} selectedCards - 選択されたカードID
 * @param {string} dream - 夢の内容
 * @param {HTMLElement} textElement - 解釈テキストを表示する要素
 */
async function getDeepInterpretation(selectedCards, dream, textElement) {
    try {
        // シンボルマップの表示
        const symbolMap = document.getElementById('symbolMap');
        if (symbolMap) {
            const dreamText = dream || '';
            const dreamSymbols = dreamText.length > 10 ? analyzeSymbols(dreamText) : [];
            
            // 神秘的な演出のため少し待機
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // シンボルマップを生成
            generateSymbolMap(symbolMap, dreamSymbols);
            
            // フェードイン
            symbolMap.style.opacity = '0';
            symbolMap.style.display = 'block';
            setTimeout(() => {
                symbolMap.style.opacity = '1';
            }, 100);
        }
        
        // 深層解釈を生成
        const currentText = textElement.innerHTML;
        
        try {
            // 神秘的な演出のため少し待機
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // 深層解釈を生成
            const deepInterpretation = await generateDreamDeepInterpretation(
                selectedCards[0], 
                selectedCards[1], 
                dream
            );
            
            // 深層解釈部分だけを置き換え
            const newText = currentText.replace(/【さらなる夢の深層解釈】\s*深層解釈を生成中\.\.\./, 
                `【さらなる夢の深層解釈】\n\n${deepInterpretation}`);
            
            // テキストを更新（タイプライター効果付き）
            textElement.innerHTML = '';
            await typeWriter(newText, textElement);
            
            // 解釈完了時の音響効果
            playMysticSound('complete');
            
        } catch (deepError) {
            console.error('Deep interpretation error:', deepError);
            
            // エラーメッセージで置き換え
            const newText = currentText.replace(/【さらなる夢の深層解釈】\s*深層解釈を生成中\.\.\./, 
                '【さらなる夢の深層解釈】\n\n深層解釈の生成中にエラーが発生しました。後ほど再度お試しください。');
            
            textElement.innerHTML = newText;
        }
    } catch (error) {
        console.error('深層解釈表示エラー:', error);
    }
}

/**
 * 夢の内容から象徴を分析する簡易関数
 * @param {string} dreamText - 夢の内容
 * @returns {Array<string>} - 検出された象徴
 */
function analyzeSymbols(dreamText) {
    const symbolPatterns = {
        '水': ['水', '海', '川', '湖', '雨', '泳ぐ', '流れ', '波'],
        '空': ['空', '飛ぶ', '雲', '鳥', '風', 'ジャンプ', '高い'],
        '火': ['火', '炎', '燃える', '熱い', '太陽', '明るい'],
        '地': ['地面', '山', '土', '石', '洞窟', '森', '木'],
        '光': ['光', '輝く', '明るい', 'まぶしい', '太陽', '星'],
        '闇': ['闇', '暗い', '影', '夜', '黒い', '恐怖'],
        '扉': ['扉', 'ドア', '入口', '出口', '通路', '開く', '閉じる'],
        '旅': ['旅', '道', '歩く', '移動', '車', '電車', '飛行機'],
        '追跡': ['追いかける', '逃げる', '走る', '恐怖', '隠れる'],
        '変身': ['変身', '変わる', '姿', '違う', '別人'],
        '上昇': ['上がる', '昇る', '階段', '山', '高い', '空'],
        '下降': ['下がる', '落ちる', '深い', '穴', '地下'],
        '人間関係': ['友人', '恋人', '家族', '父', '母', '兄', '姉', '弟', '妹', '子供', '会話'],
        '探索': ['探す', '見つける', '迷う', '道', '地図', '謎']
    };
    
    const detectedSymbols = [];
    
    // 各象徴パターンを検索
    for (const [symbol, patterns] of Object.entries(symbolPatterns)) {
        if (patterns.some(pattern => dreamText.includes(pattern))) {
            detectedSymbols.push(symbol);
        }
    }
    
    // 象徴が見つからなかった場合のデフォルト
    if (detectedSymbols.length === 0) {
        return ['潜在意識', '内なる声', '精神的な旅'];
    }
    
    return detectedSymbols;
}

/**
 * 神秘的な音を再生する関数
 * @param {string} type - 音のタイプ
 */
function playMysticSound(type) {
    // 実際のアプリケーションでは音声ファイルを再生
    // ここではモック実装
    console.log(`神秘的な音を再生: ${type}`);
    
    // 振動効果（モバイルデバイス）
    if (navigator.vibrate && type === 'insight') {
        navigator.vibrate([100, 50, 200]);
    }
}

/**
 * シェア機能の初期化
 */
function initShareButtons() {
    const buttons = document.querySelectorAll('.share-button');
    if (buttons.length === 0) {
        console.warn('シェアボタンが見つかりません');
        return;
    }
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const network = button.getAttribute('data-network');
            // 振動効果（モバイルデバイス）
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
            
            const dreamInput = document.getElementById('dreamInput');
            const dreamText = dreamInput ? dreamInput.value.slice(0, 50) + '...' : '夢霊視';
            const title = encodeURIComponent('夢霊視 - 私の夢の解釈結果');
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent(`私の夢「${dreamText}」の霊視結果を見てみませんか？`);
            
            let shareUrl = '';
            
            switch (network) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'line':
                    shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}&text=${title}`;
                    break;
                case 'instagram':
                    // Instagramは直接シェアできないため、クリップボードにコピー
                    navigator.clipboard.writeText(`${title}\n${window.location.href}`).then(() => {
                        alert('リンクをクリップボードにコピーしました。Instagramに貼り付けてシェアできます。');
                    });
                    return;
                default:
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

/**
 * 初回訪問ガイドを表示する関数
 */
function showWelcomeGuide() {
    // 初回訪問かどうかをチェック
    if (!localStorage.getItem('hasVisitedBefore')) {
        // 初回訪問フラグを設定
        localStorage.setItem('hasVisitedBefore', 'true');
        
        // ウェルカムモーダルを表示
        const welcomeModal = document.getElementById('welcomeModal');
        if (welcomeModal) {
            welcomeModal.style.display = 'flex';
            
            // 閉じるボタンのイベント設定
            const closeButton = welcomeModal.querySelector('.close-button');
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    welcomeModal.style.display = 'none';
                });
            }
            
            // 開始ボタンのイベント設定
            const startButton = document.getElementById('startJourney');
            if (startButton) {
                startButton.addEventListener('click', () => {
                    welcomeModal.style.display = 'none';
                });
            }
        }
    }
}

/**
 * プレミアム課金モーダルを表示する関数
 */
function showPremiumModal() {
    // 既に課金済みの場合はタロット選択セクションを表示
    if (localStorage.getItem('isPremiumUser') === 'true') {
        const tarotSelection = document.querySelector('.tarot-selection');
        if (tarotSelection) {
            tarotSelection.style.display = 'block';
            tarotSelection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
    }
    
    // 未課金ユーザーの場合は課金モーダルを表示
    const premiumModal = document.getElementById('premiumModal');
    if (premiumModal) {
        // プレミアム機能リストを動的に生成
        const featuresContainer = premiumModal.querySelector('.premium-features');
        if (featuresContainer) {
            featuresContainer.innerHTML = '';
            
            APP_CONFIG.premium.features.forEach(feature => {
                const featureElement = document.createElement('div');
                featureElement.className = 'feature';
                featureElement.innerHTML = `
                    <div class="feature-icon">✧</div>
                    <div class="feature-text">${feature}</div>
                `;
                featuresContainer.appendChild(featureElement);
            });
        }
        
        // 価格表示を更新
        const priceElements = premiumModal.querySelectorAll('.price-tag');
        priceElements.forEach(element => {
            element.textContent = `¥${APP_CONFIG.premium.price}`;
        });
        
        // モーダルを表示
        premiumModal.style.display = 'flex';
        
        // 神秘的な音を再生
        playMysticSound('premium');
    }
}

/**
 * アプリケーションの初期化
 */
function initApp() {
    console.log('アプリケーションを初期化中...');
    
    // DOM要素の取得とデバッグ
    const dreamInput = document.getElementById('dreamInput');
    console.log('dreamInput:', dreamInput);
    
    const psychicButton = document.getElementById('psychicButton');
    console.log('psychicButton:', psychicButton);
    
    const premiumButton = document.getElementById('premiumButton');
    console.log('premiumButton:', premiumButton);
    
    const premiumButtonInResult = document.getElementById('premiumButtonInResult');
    console.log('premiumButtonInResult:', premiumButtonInResult);
    
    const loadingSection = document.querySelector('.loading');
    console.log('loadingSection:', loadingSection);
    
    const resultSection = document.querySelector('.result');
    console.log('resultSection:', resultSection);
    
    const resultText = document.getElementById('resultText');
    console.log('resultText:', resultText);
    
    const tarotSelection = document.querySelector('.tarot-selection');
    console.log('tarotSelection:', tarotSelection);
    
    const tarotInterpretation = document.querySelector('.tarot-interpretation');
    console.log('tarotInterpretation:', tarotInterpretation);
    
    const premiumModal = document.getElementById('premiumModal');
    console.log('premiumModal:', premiumModal);
    
    const cancelPremium = document.getElementById('cancelPremium');
    console.log('cancelPremium:', cancelPremium);
    
    const confirmPremium = document.getElementById('confirmPremium');
    console.log('confirmPremium:', confirmPremium);
    
    const closeModalButton = document.querySelector('.close-button');
    console.log('closeModalButton:', closeModalButton);
    
    const symbolMap = document.getElementById('symbolMap');
    console.log('symbolMap:', symbolMap);
    
    const cursorGlow = document.querySelector('.cursor-glow');
    console.log('cursorGlow:', cursorGlow);
    
    const pentagram = document.querySelector('.pentagram');
    console.log('pentagram:', pentagram);
    
    const shareSection = document.querySelector('.share-section');
    console.log('shareSection:', shareSection);
    
    // 初期状態の設定
    if (loadingSection) loadingSection.style.display = 'none';
    if (resultSection) resultSection.style.display = 'none';
    if (tarotSelection) tarotSelection.style.display = 'none';
    if (tarotInterpretation) tarotInterpretation.style.display = 'none';
    if (shareSection) shareSection.style.display = 'none';
    
    // スピリットパーティクルの初期化
    const spiritParticlesContainer = document.querySelector('.spirit-particles');
    if (spiritParticlesContainer) {
        enhanceSpiritParticles(spiritParticlesContainer);
    }
    
    // カーソルアニメーション
    document.addEventListener('mousemove', (e) => {
        if (cursorGlow) {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
            
            // ホバー要素の検出
            const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
            if (hoveredElement && (
                hoveredElement.classList.contains('glow-button') || 
                hoveredElement.classList.contains('premium-button') ||
                hoveredElement.classList.contains('tarot-card') ||
                hoveredElement.closest('.tarot-card')
            )) {
                cursorGlow.style.width = '60px';
                cursorGlow.style.height = '60px';
            } else {
                cursorGlow.style.width = '40px';
                cursorGlow.style.height = '40px';
            }
        }
        
        // ペンタグラムのインタラクティブな効果
        if (pentagram) {
            const dx = e.clientX - window.innerWidth / 2;
            const dy = e.clientY - window.innerHeight / 2;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // マウス位置に合わせてペンタグラムを回転
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            pentagram.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
            
            // 距離に応じて不透明度を変更
            const opacity = 0.15 + (distance / (window.innerWidth / 2)) * 0.1;
            pentagram.style.opacity = opacity.toString();
        }
    });
    
    // 霊視ボタンのクリックイベント
    if (psychicButton) {
        psychicButton.addEventListener('click', async () => {
            console.log('霊視ボタンがクリックされました');
            
            if (!dreamInput) {
                console.error('dreamInput要素が見つかりません');
                return;
            }
            
            const dream = dreamInput.value.trim();
            
            if (dream.length < 10) {
                alert('もう少し詳しく夢の内容を入力してください（10文字以上）');
                dreamInput.focus();
                return;
            }
            
            // ローディング表示
            if (loadingSection) {
                loadingSection.style.display = 'flex';
            } else {
                console.error('loadingSection要素が見つかりません');
            }
            
            if (resultSection) {
                resultSection.style.display = 'none';
            } else {
                console.error('resultSection要素が見つかりません');
            }
            
            // スピリットパーティクルを強化
            if (spiritParticlesContainer) {
                enhanceSpiritParticles(spiritParticlesContainer, true);
            }
            
            // 神秘的な音を再生
            playMysticSound('start');
            
            // ローディングまでスクロール
            if (loadingSection) {
                loadingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            try {
                // 霊視結果の生成
                const isPremium = localStorage.getItem('isPremiumUser') === 'true';
                const psychicReading = await generatePsychicReading(dream, isPremium);
                
                // ローディングを非表示、結果を表示
                if (loadingSection) {
                    loadingSection.style.display = 'none';
                }
                
                if (resultSection) {
                    resultSection.style.display = 'block';
                }
                
                // タイプライター効果で表示
                if (resultText) {
                    resultText.innerHTML = '';
                    await typeWriter(psychicReading, resultText);
                } else {
                    console.error('resultText要素が見つかりません');
                }
                
                // 神秘的な音を再生（完了）
                playMysticSound('complete');
                
                // シェアセクションを表示
                if (shareSection) {
                    shareSection.style.display = 'flex';
                }
                
                // 課金済みユーザーの場合はタロット選択も自動表示
                if (isPremium && tarotSelection) {
                    tarotSelection.style.display = 'block';
                }
                
                // 結果までスクロール
                if (resultSection) {
                    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                
                // スピリットパーティクルを通常モードに戻す
                if (spiritParticlesContainer) {
                    enhanceSpiritParticles(spiritParticlesContainer, false);
                }
            } catch (error) {
                console.error('霊視エラー:', error);
                
                if (loadingSection) {
                    loadingSection.style.display = 'none';
                }
                
                if (resultSection) {
                    resultSection.style.display = 'block';
                }
                
                if (resultText) {
                    resultText.innerHTML = '<div class="error">霊視中にエラーが発生しました。後ほど再度お試しください。</div>';
                }
                
                // 結果までスクロール
                if (resultSection) {
                    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                
                // スピリットパーティクルを通常モードに戻す
                if (spiritParticlesContainer) {
                    enhanceSpiritParticles(spiritParticlesContainer, false);
                }
            }
        });
    } else {
        console.error('psychicButton要素が見つかりません');
    }
    
    // プレミアムボタンのイベント設定
    if (premiumButton) {
        premiumButton.addEventListener('click', showPremiumModal);
    }
    
    if (premiumButtonInResult) {
        premiumButtonInResult.addEventListener('click', showPremiumModal);
    }
    
    // プレミアムモーダルの設定
    if (premiumModal) {
        // キャンセルボタン
        if (cancelPremium) {
            cancelPremium.addEventListener('click', () => {
                premiumModal.style.display = 'none';
            });
        }
        
        // 閉じるボタン
        if (closeModalButton) {
            closeModalButton.addEventListener('click', () => {
                premiumModal.style.display = 'none';
            });
        }
        
        // 課金確認ボタン
        if (confirmPremium) {
            confirmPremium.addEventListener('click', () => {
                // モーダルを非表示
                premiumModal.style.display = 'none';
                
                // 神秘的な音を再生
                playMysticSound('payment');
                
                // 支払い処理中モーダルを表示
                const paymentProcessingModal = document.getElementById('paymentProcessingModal');
                if (paymentProcessingModal) {
                    paymentProcessingModal.style.display = 'flex';
                    
                    // スピリットパーティクルを強化
                    const paymentParticles = paymentProcessingModal.querySelector('.spirit-particles');
                    if (paymentParticles) {
                        enhanceSpiritParticles(paymentParticles, true);
                    }
                }
                
                // 支払い処理のシミュレーション（実際の実装では決済APIを使用）
                setTimeout(() => {
                    // 支払い処理中モーダルを非表示
                    if (paymentProcessingModal) {
                        paymentProcessingModal.style.display = 'none';
                    }
                    
                    // 課金完了フラグを保存
                    localStorage.setItem('isPremiumUser', 'true');
                    
                    // 神秘的な音を再生（成功）
                    playMysticSound('success');
                    
                    // 支払い成功モーダルを表示
                    const paymentSuccessModal = document.getElementById('paymentSuccessModal');
                    if (paymentSuccessModal) {
                        paymentSuccessModal.style.display = 'flex';
                        
                        // 成功マークのアニメーション
                        const successMark = paymentSuccessModal.querySelector('.success-mark');
                        if (successMark) {
                            successMark.style.animation = 'pulse 1.5s ease-in-out infinite';
                        }
                    }
                }, 2500);
            });
        }
    }
    
    // 支払い成功後のタロット選択へ進むボタン
    const continueToTarot = document.getElementById('continueToTarot');
    if (continueToTarot) {
        continueToTarot.addEventListener('click', () => {
            // 支払い成功モーダルを非表示
            const paymentSuccessModal = document.getElementById('paymentSuccessModal');
            if (paymentSuccessModal) {
                paymentSuccessModal.style.display = 'none';
            }
            
            // タロットカード選択を表示
            if (tarotSelection) {
                tarotSelection.style.display = 'block';
                tarotSelection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
    
    // タロットカードの選択イベント
    document.addEventListener('click', event => {
        // クリックされた要素または親要素がタロットカードかどうかを確認
        const tarotCard = event.target.closest('.tarot-card');
        
        if (!tarotCard) return;
        
        // プレミアムユーザーチェック
        if (localStorage.getItem('isPremiumUser') !== 'true') {
            // 未課金ユーザーの場合は課金モーダルを表示して処理終了
            showPremiumModal();
            return;
        }
        
        // 神秘的な音を再生
        playMysticSound('card');
        
        // カードIDの取得
        const cardId = tarotCard.getAttribute('data-id');
        
        // 選択状態の切り替え
        const isSelected = tarotCard.classList.contains('selected');
        
        if (isSelected) {
            // 選択解除
            tarotCard.classList.remove('selected');
            tarotCard.querySelector('.tarot-card-content').style.transform = '';
        } else {
            // 最大2枚まで選択可能
            const selectedCount = document.querySelectorAll('.tarot-card.selected').length;
            if (selectedCount < 2) {
                tarotCard.classList.add('selected');
                tarotCard.querySelector('.tarot-card-content').style.transform = 'rotateY(180deg)';
                
                // 振動効果（モバイルデバイス）
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
                
                // 2枚目選択時に自動的に解釈表示
                if (selectedCount === 1) {
                    // カードが回転するアニメーションの後に解釈を表示
                    setTimeout(displayTarotInterpretation, 1000);
                }
            }
        }
    });
    
    // シェアボタンの初期化
    initShareButtons();
    
    // 初回訪問ガイドの表示
    showWelcomeGuide();
    
    console.log('アプリケーションの初期化が完了しました');
}