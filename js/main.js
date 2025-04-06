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
 * @returns {Promise<string>} - 生成された霊視結果
 */
async function generatePsychicReading(dream) {
    try {
        console.log(`霊視を生成中...`);
        
        // ローディングアニメーションを開始（待機時間を確保）
        await new Promise(resolve => setTimeout(resolve, APP_CONFIG.animation.loadingDuration));
        
        // オフラインモード用のダミーレスポンス
        const generateOfflineReading = () => {
            console.log('オフラインモードで霊視結果を生成します');
            
            // 夢の内容から単語を抽出して、それに基づいたランダムな霊視結果を生成
            const keywords = dream.split(/\s+/).filter(word => word.length > 2);
            let selectedSymbols = [];
            
            // キーワードに関連する象徴を選択
            if (keywords.length > 0) {
                const commonSymbols = ['星', '月', '太陽', '水', '道', '森', '光', '闇', '扉', '空', '鏡'];
                selectedSymbols = keywords.slice(0, 3).map(() => 
                    commonSymbols[Math.floor(Math.random() * commonSymbols.length)]
                );
                // 重複を排除
                selectedSymbols = [...new Set(selectedSymbols)];
            }
            
            // シンボルが足りない場合は追加
            while (selectedSymbols.length < 3) {
                const additionalSymbols = ['星', '月', '太陽', '水', '道', '森', '光'];
                selectedSymbols.push(additionalSymbols[Math.floor(Math.random() * additionalSymbols.length)]);
                // 重複を排除
                selectedSymbols = [...new Set(selectedSymbols)];
            }
            
            // 霊視結果のテンプレート
            return `【霊視結果】
夢の中に現れた${selectedSymbols[0]}と${selectedSymbols[1]}の象徴が、あなたの潜在意識からの重要なメッセージを運んでいます。宇宙のエネルギーがあなたの内面を照らし、未来への道を示しています。

【夢のメッセージ】
${selectedSymbols[0]}は、あなたの内なる知恵と精神的な成長を表しています。一方、${selectedSymbols[1]}は変化と新たな可能性を象徴しています。これらが共鳴することで、あなたの潜在意識は人生の重要な転機を告げています。

【未来への指針】
今は内なる声に耳を傾け、直感を信じるときです。${selectedSymbols[2]}のエネルギーを取り入れることで、あなたの道はより明確になるでしょう。恐れずに前に進むことで、新たな扉が開かれます。

【霊からのアドバイス】
過去の執着や不安を手放し、今この瞬間に意識を集中させましょう。あなたの魂は既に答えを知っています。静かな瞑想を通じて、その声を聴く時間を作ってください。宇宙の流れに身を任せることで、人生の神秘が明らかになるでしょう。`;
        };
        
        // サーバーサイドAPIエンドポイントを使用
        try {
            // 神秘的な演出のために少し遅延を入れる
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log('霊視APIリクエスト送信中...');
            
            // タイムアウト付きのfetchを実装
            const fetchWithTimeout = async (url, options, timeout = 10000) => {
                const controller = new AbortController();
                const id = setTimeout(() => controller.abort(), timeout);
                
                try {
                    const response = await fetch(url, {
                        ...options,
                        signal: controller.signal
                    });
                    clearTimeout(id);
                    return response;
                } catch (error) {
                    clearTimeout(id);
                    throw error;
                }
            };
            
            // 夢の内容が長いためPOSTメソッドで送信
            const response = await fetchWithTimeout(APP_CONFIG.api.psychicReadingEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    dream,
                    timestamp: new Date().toISOString()
                })
            }, 8000); // 8秒でタイムアウト
            
            console.log('霊視APIレスポンス受信:', response.status);
            
            // レスポンスがJSONでなくてもエラーにしない
            const responseText = await response.text();
            let data;
            
            try {
                // 空の場合やNOT_FOUNDを含む場合はオフラインモードを使用
                if (!responseText || responseText.includes('NOT_FOUND') || responseText.includes('could not be found')) {
                    console.error('API接続エラー: エンドポイントが見つかりません', responseText);
                    console.log('オフラインモードにフォールバックします');
                    return generateOfflineReading();
                }
                
                data = JSON.parse(responseText);
            } catch (jsonError) {
                console.error('JSONパースエラー:', jsonError, 'レスポンステキスト:', responseText);
                console.log('JSONパースエラーのためオフラインモードにフォールバックします');
                return generateOfflineReading();
            }
            
            if (data.reading) {
                console.log('霊視結果を受信しました');
                return data.reading;
            }
            
            console.log('APIからの応答に霊視結果が含まれていないため、オフラインモードにフォールバックします');
            return generateOfflineReading();
        } catch (apiError) {
            console.error('API接続エラー:', apiError);
            console.log('API接続エラーのためオフラインモードにフォールバックします');
            return generateOfflineReading();
        }
    } catch (error) {
        console.error('霊視生成エラー:', error);
        return `【霊視エラー】\n\n申し訳ありません。霊界との接続に問題が発生しました。静かな心で再度お試しください。`;
    }
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
    // タロット解釈表示処理開始
    
    // 霊視結果が表示されていない場合、保存されたものがあれば復元
    const resultSection = document.querySelector('.result');
    const resultText = document.getElementById('resultText');
    
    if ((!resultText || !resultText.innerHTML.trim()) && sessionStorage.getItem('savedPsychicReading')) {
        console.log('タロット解釈前に保存されていた霊視結果を復元します');
        if (resultText) {
            resultText.innerHTML = sessionStorage.getItem('savedPsychicReading');
        }
        if (resultSection && resultSection.style.display === 'none') {
            resultSection.style.display = 'block';
        }
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
        
        // タロット解釈を表示（霊視結果も保持）
        tarotInterpretation.style.display = 'block';
        tarotInterpretationText.innerHTML = '<div class="loading-text">タロットカードからのメッセージを受信中<span class="loading-dots">...</span></div>';
        
        // 霊視結果を表示したまま
        if (resultSection && resultSection.style.display === 'none') {
            resultSection.style.display = 'block';
        }
        
        // すべてのボタンを非表示にする（解釈完了後に表示）
        const premiumButtonInResult = document.getElementById('premiumButtonInResult');
        const resetButtonInResult = document.getElementById('resetButtonInResult');
        const bottomResetButton = document.querySelector('.bottom-reset-button');
        
        if (premiumButtonInResult) {
            premiumButtonInResult.style.display = 'none';
        }
        
        if (resetButtonInResult) {
            resetButtonInResult.style.display = 'none';
        }
        
        if (bottomResetButton) {
            bottomResetButton.style.display = 'none';
        }
        
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
        
        // エラー時にもリセットボタンを表示する
        const resetButtonInResult = document.getElementById('resetButtonInResult');
        if (resetButtonInResult) {
            resetButtonInResult.style.display = 'block';
        }
        
        // 最下部の「別の夢を霊視する」ボタンも表示
        const bottomResetButton = document.querySelector('.bottom-reset-button');
        if (bottomResetButton) {
            bottomResetButton.style.display = 'flex';
        }
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
            
            // タロット解釈表示後に「別の夢を霊視する」ボタンを表示
            const resetButtonInResult = document.getElementById('resetButtonInResult');
            if (resetButtonInResult) {
                resetButtonInResult.style.display = 'block';
            }
            
            // 最下部の「別の夢を霊視する」ボタンも表示
            const bottomResetButton = document.querySelector('.bottom-reset-button');
            if (bottomResetButton) {
                bottomResetButton.style.display = 'flex';
            }
            
        } catch (deepError) {
            console.error('Deep interpretation error:', deepError);
            
            // エラーメッセージで置き換え
            const newText = currentText.replace(/【さらなる夢の深層解釈】\s*深層解釈を生成中\.\.\./, 
                '【さらなる夢の深層解釈】\n\n深層解釈の生成中にエラーが発生しました。後ほど再度お試しください。');
            
            textElement.innerHTML = newText;
            
            // エラー時にもリセットボタンを表示する
            const resetButtonInResult = document.getElementById('resetButtonInResult');
            if (resetButtonInResult) {
                resetButtonInResult.style.display = 'block';
            }
            
            // 最下部の「別の夢を霊視する」ボタンも表示
            const bottomResetButton = document.querySelector('.bottom-reset-button');
            if (bottomResetButton) {
                bottomResetButton.style.display = 'flex';
            }
        }
    } catch (error) {
        console.error('深層解釈表示エラー:', error);
    }
}

/**
 * 夢の内容から象徴を分析する簡易関数
 * 注意: この関数はtarot.jsのanalyzeSymbolsを使用するように変更されました
 * @param {string} dreamText - 夢の内容
 * @returns {Array<string>} - 検出された象徴
 */
function analyzeSymbols(dreamText) {
    // tarot.jsで定義された関数を使用
    return ['潜在意識', '内なる声', '精神的な旅'];
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
    // 課金済みの場合は表示しない
    if (sessionStorage.getItem('currentSessionPaid') === 'true') {
        return;
    }
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
    return;
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
    
    // 追加のDOM要素の取得
    const tarotSelection = document.querySelector('.tarot-selection');
    console.log('tarotSelection:', tarotSelection);
    
    const tarotInterpretation = document.querySelector('.tarot-interpretation');
    console.log('tarotInterpretation:', tarotInterpretation);
    
    const shareSection = document.querySelector('.share-section');
    console.log('shareSection:', shareSection);
    
    const bottomResetButton = document.querySelector('.bottom-reset-button');
    console.log('bottomResetButton:', bottomResetButton);
    
    // ページリロード時に課金状態をリセット
    if (window.performance && window.performance.navigation && 
        window.performance.navigation.type === 1) { // 1はリロードを表す
        console.log('ページがリロードされました。課金状態をリセットします。');
        sessionStorage.removeItem('currentSessionPaid');
        sessionStorage.removeItem('paymentSessionId');
    } else {
        // 近代的なブラウザ用の代替方法（Navigation Timing API v2）
        try {
            const navEntries = performance.getEntriesByType('navigation');
            if (navEntries.length > 0 && navEntries[0].type === 'reload') {
                console.log('ページがリロードされました (Navigation Timing API v2)。課金状態をリセットします。');
                sessionStorage.removeItem('currentSessionPaid');
                sessionStorage.removeItem('paymentSessionId');
            }
        } catch (e) {
            console.log('Navigation API使用中にエラーが発生しました:', e);
        }
    }
    
    // URLパラメータで決済完了のチェック
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const success = urlParams.get('success');
    
    if (sessionId && success === 'true') {
        console.log('決済完了後のリダイレクトを検出しました');
        
        // 課金状態を設定
        sessionStorage.setItem('currentSessionPaid', 'true');
        sessionStorage.setItem('paymentSessionId', sessionId);
        
        // 保存された夢の内容を復元
        const savedDream = sessionStorage.getItem('savedDream');
        if (savedDream && dreamInput) {
            console.log('保存されていた夢の内容を復元します');
            dreamInput.value = savedDream;
            
            // 夢入力欄を読み取り専用にして編集できないようにする
            dreamInput.setAttribute('readonly', 'readonly');
            dreamInput.style.opacity = '0.8';
            dreamInput.style.cursor = 'not-allowed';
            dreamInput.style.borderColor = 'rgba(180, 140, 230, 0.4)';
            
            // 課金済みの場合は「夢を編集する」ボタンを表示しない
            if (sessionStorage.getItem('currentSessionPaid') !== 'true') {
                const editDreamButton = document.getElementById('editDreamButton');
                if (editDreamButton) {
                    editDreamButton.style.display = 'block';
                }
            }
            
            const psychicButton = document.getElementById('psychicButton');
            if (psychicButton) {
                psychicButton.style.display = 'none';
            }
        }
        
        // 保存された霊視結果を復元
        const savedReading = sessionStorage.getItem('savedPsychicReading');
        if (savedReading) {
            console.log('保存されていた霊視結果を復元します');
            if (resultText) {
                resultText.innerHTML = savedReading;
            }
        }
        
        // 霊視ボタンを非表示にする
        if (psychicButton) {
            psychicButton.style.display = 'none';
        }
        
        // 結果セクションとpaidコンテナが表示されていない場合は表示
        if (resultSection && resultSection.style.display === 'none') {
            resultSection.style.display = 'block';
        }
        
        // シェアセクションの表示状態を復元
        if (shareSection && sessionStorage.getItem('shareSectionVisible') === 'true') {
            shareSection.style.display = 'flex';
        }
        
        // 「別の夢を霊視する」ボタンの表示状態を復元
        if (bottomResetButton && sessionStorage.getItem('bottomResetButtonVisible') === 'true') {
            bottomResetButton.style.display = 'flex';
        }
        
        // タロット選択セクションを表示
        if (tarotSelection) {
            tarotSelection.style.display = 'block';
        }
        
        // 「より深い霊視」ボタンを非表示
        if (premiumButtonInResult) {
            premiumButtonInResult.style.display = 'none';
        }
        
        // 課金後コンテンツのコンテナも確認
        const paidContentContainer = document.querySelector('.paid-content-container');
        if (paidContentContainer) {
            paidContentContainer.style.display = 'flex';
        }
        
        // 霊視結果全文表示後のボタン表示状態を保持
        // 上部で既に定義されているので再定義しない
        // const premiumButtonInResult = document.getElementById('premiumButtonInResult');
        const resetButtonInResult = document.getElementById('resetButtonInResult');
        
        // 課金済みの場合は「より深い霊視」ボタンを非表示にする
        if (premiumButtonInResult) {
            premiumButtonInResult.style.display = 'none';
        }
        
        // 「別の夢を霊視する」ボタンは表示
        if (resetButtonInResult) {
            resetButtonInResult.style.display = 'block';
        }
    }
    
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
    
    // 初期状態の設定
    if (loadingSection) loadingSection.style.display = 'none';
    if (resultSection) resultSection.style.display = 'none';
    if (tarotSelection) tarotSelection.style.display = 'none';
    if (tarotInterpretation) tarotInterpretation.style.display = 'none';
    if (shareSection) shareSection.style.display = 'none';
    
    // 課金後コンテンツのコンテナも初期化
    const paidContentContainer = document.querySelector('.paid-content-container');
    if (paidContentContainer) paidContentContainer.style.display = 'none';
    
    // 別の夢を霊視するボタンの非表示（初期状態）
    if (bottomResetButton) bottomResetButton.style.display = 'none';
    
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
            
            // 霊視ボタンを非表示にする
            if (psychicButton) {
                psychicButton.style.display = 'none';
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
            
            // 霊視ボタンを押した瞬間に夢入力欄を読み取り専用にする
            if (dreamInput) {
                dreamInput.setAttribute('readonly', 'readonly');
                dreamInput.style.opacity = '0.8';
                dreamInput.style.cursor = 'not-allowed';
                dreamInput.style.borderColor = 'rgba(180, 140, 230, 0.4)';
                
                // 夢を保存しておく（セッションストレージ）
                sessionStorage.setItem('savedDream', dreamInput.value);
                
                // 霊視ボタンを非表示、課金済みでない場合は編集ボタンを表示
                if (psychicButton) {
                    psychicButton.style.display = 'none';
                }
                
                // 課金済みの場合は「夢を編集する」ボタンを表示しない
                if (sessionStorage.getItem('currentSessionPaid') !== 'true') {
                    const editDreamButton = document.getElementById('editDreamButton');
                    if (editDreamButton) {
                        editDreamButton.style.display = 'block';
                    }
                }
            }
            
            try {
                // 霊視結果の生成
                const psychicReading = await generatePsychicReading(dream);
                
                // ローディングを非表示
                if (loadingSection) {
                    loadingSection.style.display = 'none';
                }
                
                // 結果セクションを表示するが、ボタンは非表示のまま
                if (resultSection) {
                    resultSection.style.display = 'block';
                    
                    // 念のため、ボタンが非表示になっていることを確認
                    const premiumButtonInResult = document.getElementById('premiumButtonInResult');
                    const resetButtonInResult = document.getElementById('resetButtonInResult');
                    if (premiumButtonInResult) premiumButtonInResult.style.display = 'none';
                    if (resetButtonInResult) resetButtonInResult.style.display = 'none';
                }
                
                // タイプライター効果で表示
                if (resultText) {
                    resultText.innerHTML = '';
                    await typeWriter(psychicReading, resultText);
                    
                    // テキスト表示完了後に神秘的な音を再生（完了）
                    playMysticSound('complete');
                    
                    // シェアセクションを表示
                    if (shareSection) {
                        shareSection.style.display = 'flex';
                    }
                    
                    // 霊視結果全文表示後に「より深い霊視」ボタンを表示
                    const premiumButtonInResult = document.getElementById('premiumButtonInResult');
                    if (premiumButtonInResult) {
                        premiumButtonInResult.style.display = 'block';
                    }
                    
                    // 霊視結果全文表示後に「別の夢を霊視する」ボタンも表示
                    const resetButtonInResult = document.getElementById('resetButtonInResult');
                    if (resetButtonInResult) {
                        resetButtonInResult.style.display = 'block';
                    }
                    
                    // 最下部の「別の夢を霊視する」ボタンを表示
                    const bottomResetButton = document.querySelector('.bottom-reset-button');
                    if (bottomResetButton) {
                        bottomResetButton.style.display = 'flex';
                    }
                    
                    // タロット選択を自動表示（結果セクションも表示したまま）
                    if (tarotSelection) {
                        tarotSelection.style.display = 'block';
                    }
                    
                    // 結果セクションが既に表示されていることを確認
                    if (resultSection && resultSection.style.display === 'none') {
                        resultSection.style.display = 'block';
                    }
                } else {
                    console.error('resultText要素が見つかりません');
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
    
    // 別の夢を霊視するボタンの機能を実装する関数
    function resetDreamReading() {
        console.log('別の夢を霊視するボタンがクリックされました');
        
        // 課金状態をリセット - 新しい夢の霊視では再度課金が必要
        sessionStorage.removeItem('currentSessionPaid');
        sessionStorage.removeItem('paymentSessionId');
        console.log('課金状態をリセットしました');
        
        // 夢入力欄のreadonly属性を解除して再度編集可能にする
        const dreamInput = document.getElementById('dreamInput');
        if (dreamInput) {
            dreamInput.removeAttribute('readonly');
            dreamInput.style.opacity = '1';
            dreamInput.style.cursor = 'text';
            dreamInput.style.borderColor = ''; // 元のスタイルに戻す
            dreamInput.value = ''; // 入力内容をクリア
            dreamInput.focus(); // フォーカスを移動
        }
        
        // 霊視結果と関連セクションを非表示にする
        const resultSection = document.querySelector('.result');
        if (resultSection) {
            resultSection.style.display = 'none';
        }
        
        const tarotSelection = document.querySelector('.tarot-selection');
        if (tarotSelection) {
            tarotSelection.style.display = 'none';
        }
        
        const tarotInterpretation = document.querySelector('.tarot-interpretation');
        if (tarotInterpretation) {
            tarotInterpretation.style.display = 'none';
        }
        
        const shareSection = document.querySelector('.share-section');
        if (shareSection) {
            shareSection.style.display = 'none';
        }
        
        const bottomResetButton = document.querySelector('.bottom-reset-button');
        if (bottomResetButton) {
            bottomResetButton.style.display = 'none';
        }
        
        // 課金後コンテンツを非表示
        const paidContentContainer = document.querySelector('.paid-content-container');
        if (paidContentContainer) {
            paidContentContainer.style.display = 'none';
        }
        
        // 「夢を編集する」ボタンを非表示にし、「霊視を開始する」ボタンを表示
        const editDreamButton = document.getElementById('editDreamButton');
        if (editDreamButton) {
            editDreamButton.style.display = 'none';
        }
        
        const psychicButton = document.getElementById('psychicButton');
        if (psychicButton) {
            psychicButton.style.display = 'block';
        }
        
        // タロットカードの選択状態をリセット
        const selectedCards = document.querySelectorAll('.tarot-card.selected');
        selectedCards.forEach(card => {
            card.classList.remove('selected');
            const cardContent = card.querySelector('.tarot-card-content');
            if (cardContent) {
                cardContent.style.transform = '';
            }
        });
        
        // ページの先頭にスクロール
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // 「夢を編集する」ボタンの機能を実装する関数
    function editDream() {
        console.log('夢を編集するボタンがクリックされました');
        
        // 夢入力欄の読み取り専用属性を解除して編集可能にする
        const dreamInput = document.getElementById('dreamInput');
        if (dreamInput) {
            dreamInput.removeAttribute('readonly');
            dreamInput.style.opacity = '1';
            dreamInput.style.cursor = 'text';
            dreamInput.style.borderColor = ''; // 元のスタイルに戻す
            dreamInput.focus(); // フォーカスを移動
            
            // 入力欄にスクロール
            dreamInput.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // タロット関連のUIを非表示に
        const tarotSelection = document.querySelector('.tarot-selection');
        if (tarotSelection) {
            tarotSelection.style.display = 'none';
        }
        
        const tarotInterpretation = document.querySelector('.tarot-interpretation');
        if (tarotInterpretation) {
            tarotInterpretation.style.display = 'none';
        }
        
        // 霊視結果セクションを非表示に
        const resultSection = document.querySelector('.result');
        if (resultSection) {
            resultSection.style.display = 'none';
        }
        
        // 「夢を編集する」ボタンを非表示にし、「霊視を開始する」ボタンを表示
        const editDreamButton = document.getElementById('editDreamButton');
        if (editDreamButton) {
            editDreamButton.style.display = 'none';
        }
        
        const psychicButton = document.getElementById('psychicButton');
        if (psychicButton) {
            psychicButton.style.display = 'block';
        }
    }
    
    // 「別の夢を霊視する」ボタンのイベントリスナーを設定
    const resetButtonInResult = document.getElementById('resetButtonInResult');
    if (resetButtonInResult) {
        resetButtonInResult.addEventListener('click', resetDreamReading);
    }
    
    const resetButtonBottom = document.getElementById('resetButtonBottom');
    if (resetButtonBottom) {
        resetButtonBottom.addEventListener('click', resetDreamReading);
    }
    
    // 「夢を編集する」ボタンのイベントリスナーを設定
    const editDreamButton = document.getElementById('editDreamButton');
    if (editDreamButton) {
        editDreamButton.addEventListener('click', editDream);
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
        
        // Stripe決済関連の変数
        let stripePromise = null;
        let stripeElements = null;
        let stripePaymentElement = null;
        
        // Stripeオブジェクトの初期化
        async function initializeStripe() {
            try {
                console.log('Stripe設定取得中...');
                
                // APIのベースURLを決定（環境に合わせて変更可能）
                // 開発環境では相対パスの代わりに絶対URLを使用（ngrok対応）
                // ブラウザのURLから現在のURLを取得
                let apiBaseUrl = '';
                
                // 現在のURLからAPIベースURLを構築
                const currentUrl = window.location.href;
                console.log('現在のURL:', currentUrl);
                
                // URLがngrokを含む場合は、そのドメインをAPIベースURLとして使用
                if (currentUrl.includes('ngrok')) {
                    // URLオブジェクトを作成してドメイン部分を抽出
                    const url = new URL(currentUrl);
                    apiBaseUrl = `${url.protocol}//${url.host}`;
                    console.log('ngrokドメインを検出:', apiBaseUrl);
                }
                
                // 公開キーをサーバーから取得
                const configUrl = `${apiBaseUrl}/api/payment/config`;
                console.log('configリクエスト先URL:', configUrl);
                const response = await fetch(configUrl);
                console.log('Stripe設定レスポンスステータス:', response.status, response.statusText);
                
                if (!response.ok) {
                    throw new Error(`決済システムの設定取得に失敗しました: ${response.status} ${response.statusText}`);
                }
                
                // レスポンスの詳細情報を取得
                const responseData = await response.text();
                console.log('Stripe設定レスポンス詳細:', responseData);
                
                // JSONとしてパース
                const jsonData = JSON.parse(responseData);
                const { publishableKey } = jsonData;
                
                if (!publishableKey) {
                    throw new Error('Stripe公開キーが見つかりません。サーバー環境変数の設定を確認してください。');
                }
                
                console.log('Stripe公開キー取得成功:', publishableKey.substring(0, 10) + '...');
                
                // グローバルStripeオブジェクトが存在するか確認
                if (typeof Stripe === 'undefined') {
                    throw new Error('Stripeライブラリが読み込まれていません。HTML内のStripe.jsスクリプトを確認してください。');
                }
                
                // Stripeオブジェクトを初期化
                try {
                    stripePromise = Stripe(publishableKey);
                    console.log('Stripeを初期化しました');
                    return true;
                } catch (stripeInitError) {
                    console.error('Stripe初期化エラー:', stripeInitError);
                    throw new Error(`Stripe初期化エラー: ${stripeInitError.message}`);
                }
            } catch (error) {
                console.error('Stripe初期化エラー:', error);
                // スタックトレースも出力
                if (error.stack) {
                    console.error('エラースタックトレース:', error.stack);
                }
                
                // プレミアムモーダルを表示状態に
                const premiumModal = document.getElementById('premiumModal');
                if (premiumModal) {
                    premiumModal.style.display = 'flex';
                }
                
                // エラーメッセージを表示
                const paymentError = document.getElementById('payment-error');
                if (paymentError) {
                    paymentError.textContent = `決済システムの初期化に失敗しました: ${error.message}`;
                    paymentError.style.display = 'block';
                }
                return false;
            }
        }
        
        // 決済セッションを作成
        async function createCheckoutSession() {
            try {
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
                
                console.log('Stripeセッションを作成中...');
                
                // ブラウザの接続診断
                try {
                    const testResponse = await fetch('/api/payment/config');
                    console.log('接続テスト結果:', testResponse.status, testResponse.statusText);
                    if (!testResponse.ok) {
                        console.warn('API基本接続に問題があります');
                    }
                } catch (testError) {
                    console.error('API基本接続テストエラー:', testError);
                }
                
                // APIのベースURLを決定（環境に合わせて変更可能）
                // 現在のURLからAPIベースURLを構築
                let apiBaseUrl = '';
                const currentUrl = window.location.href;
                
                // URLがngrokを含む場合は、そのドメインをAPIベースURLとして使用
                if (currentUrl.includes('ngrok')) {
                    // URLオブジェクトを作成してドメイン部分を抽出
                    const url = new URL(currentUrl);
                    apiBaseUrl = `${url.protocol}//${url.host}`;
                    console.log('ngrokドメインを検出:', apiBaseUrl);
                }
                
                // APIからセッションURLを取得
                console.log('APIリクエスト開始...');
                const response = await fetch(`${apiBaseUrl}/api/payment/create-checkout-session`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        timestamp: new Date().toISOString()
                    })
                });
                
                // レスポンスのステータスとテキストを記録
                console.log('APIレスポンスステータス:', response.status, response.statusText);
                console.log('レスポンスヘッダー:', JSON.stringify([...response.headers.entries()]));
                
                // レスポンスの詳細情報を取得
                let responseData;
                try {
                    responseData = await response.text();
                    console.log('APIレスポンス詳細:', responseData);
                } catch (textError) {
                    console.error('レスポンステキスト取得エラー:', textError);
                    responseData = '(テキスト取得エラー)';
                }
                
                if (!response.ok) {
                    throw new Error(`決済セッションの作成に失敗しました: ${response.status} ${response.statusText} - ${responseData}`);
                }
                
                // JSONとしてパース
                let jsonData;
                try {
                    jsonData = JSON.parse(responseData);
                } catch (jsonError) {
                    console.error('JSONパースエラー:', jsonError);
                    throw new Error(`レスポンスのJSON解析に失敗しました: ${jsonError.message}`);
                }
                
                const { url } = jsonData;
                
                if (!url) {
                    throw new Error('セッションURLが見つかりません');
                }
                
                console.log('セッションURL取得成功、リダイレクト先:', url);
                
                // URLのバリデーション
                try {
                    new URL(url);
                } catch (urlError) {
                    console.error('不正なURL形式:', url);
                    throw new Error(`不正なURL形式: ${url}`);
                }
                
                // Stripeのチェックアウトページにリダイレクト
                console.log('リダイレクト実行...');
                // 支払い処理中モーダルを非表示にしてからStripeページにリダイレクト
                if (paymentProcessingModal) {
                    paymentProcessingModal.style.display = 'none';
                }
                window.location.href = url;
            } catch (error) {
                console.error('決済セッション作成エラー:', error);
                // スタックトレースも出力
                if (error.stack) {
                    console.error('エラースタックトレース:', error.stack);
                }
                
                // 支払い処理中モーダルを非表示
                const paymentProcessingModal = document.getElementById('paymentProcessingModal');
                if (paymentProcessingModal) {
                    paymentProcessingModal.style.display = 'none';
                }
                
                // プレミアムモーダルを再表示
                const premiumModal = document.getElementById('premiumModal');
                if (premiumModal) {
                    premiumModal.style.display = 'flex';
                }
                
                // エラーメッセージを表示
                const paymentError = document.getElementById('payment-error');
                if (paymentError) {
                    paymentError.textContent = `決済処理中にエラーが発生しました: ${error.message}`;
                    paymentError.style.display = 'block';
                }
                
                // エラーを上位に伝播させる
                throw error;
            }
        }
        
        // 決済成功処理
        function handlePaymentSuccess(sessionId) {
            // 一時的に利用可能としてセッションフラグを設定
            sessionStorage.setItem('currentSessionPaid', 'true');
            sessionStorage.setItem('paymentSessionId', sessionId);
            
            // 神秘的な音を再生（成功）
            playMysticSound('success');
            
            // より深い霊視ボタンを非表示にする
            const premiumButtonInResult = document.getElementById('premiumButtonInResult');
            const resetButtonInResult = document.getElementById('resetButtonInResult');
            
            if (premiumButtonInResult) {
                premiumButtonInResult.style.display = 'none';
            }
            
            // 「別の夢を霊視する」ボタンは表示
            if (resetButtonInResult) {
                resetButtonInResult.style.display = 'block';
            }
            
            // 霊視ボタンも非表示にする
            const psychicButton = document.getElementById('psychicButton');
            if (psychicButton) {
                psychicButton.style.display = 'none';
            }
            
            // 保存された霊視結果と状態を復元
            const savedReading = sessionStorage.getItem('savedPsychicReading');
            const dreamInput = document.getElementById('dreamInput');
            const savedDream = sessionStorage.getItem('savedDream');
            
            // 課金前に入力された夢の内容を復元
            if (savedDream && dreamInput) {
                console.log('保存された夢の内容を復元します');
                dreamInput.value = savedDream;
                
                // 夢入力欄を読み取り専用にして編集できないようにする
                dreamInput.setAttribute('readonly', 'readonly');
                dreamInput.style.opacity = '0.8';
                dreamInput.style.cursor = 'not-allowed';
                dreamInput.style.borderColor = 'rgba(180, 140, 230, 0.4)';
                
                // 課金済みの場合は「夢を編集する」ボタンを表示しない
                if (sessionStorage.getItem('currentSessionPaid') !== 'true') {
                    const editDreamButton = document.getElementById('editDreamButton');
                    if (editDreamButton) {
                        editDreamButton.style.display = 'block';
                    }
                }
                
                const psychicButton = document.getElementById('psychicButton');
                if (psychicButton) {
                    psychicButton.style.display = 'none';
                }
            }
            
            // 保存された霊視結果を復元
            if (savedReading) {
                console.log('保存された霊視結果を復元します');
                const resultText = document.getElementById('resultText');
                const resultSection = document.querySelector('.result');
                
                if (resultText) {
                    resultText.innerHTML = savedReading;
                }
                
                if (resultSection) {
                    resultSection.style.display = 'block';
                }
                
                // 課金後コンテンツのコンテナを表示
                const paidContentContainer = document.querySelector('.paid-content-container');
                if (paidContentContainer) {
                    paidContentContainer.style.display = 'flex';
                }
            }
            
            // タロットカード選択を自動表示
            if (tarotSelection) {
                tarotSelection.style.display = 'block';
            }
            
            // 霊視結果を保持するため、結果セクションの表示を確認
            if (resultSection && resultSection.style.display === 'none') {
                resultSection.style.display = 'block';
            }
            
            // シェアセクションの表示
            const shareSection = document.querySelector('.share-section');
            if (shareSection && sessionStorage.getItem('shareSectionVisible') === 'true') {
                shareSection.style.display = 'flex';
            }
            
            // 「別の夢を霊視する」ボタンの表示状態を復元
            const bottomResetButton = document.querySelector('.bottom-reset-button');
            if (bottomResetButton && sessionStorage.getItem('bottomResetButtonVisible') === 'true') {
                bottomResetButton.style.display = 'flex';
            }
            
            // タロットカードセクションにスクロール
            if (tarotSelection) {
                tarotSelection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
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
        }
        
        // リダイレクト後のセッションID（URLパラメータ）をチェック
        function checkSessionFromUrl() {
            const urlParams = new URLSearchParams(window.location.search);
            const sessionId = urlParams.get('session_id');
            const success = urlParams.get('success');
            
            if (sessionId && success === 'true') {
                // URLからパラメータを削除（履歴に残さない）
                window.history.replaceState({}, document.title, window.location.pathname);
                
                // 決済セッションの状態を確認
                verifyPaymentSession(sessionId);
            }
        }
        
        // 決済セッションの状態を確認
        async function verifyPaymentSession(sessionId) {
            try {
                // APIのベースURLを決定
                let apiBaseUrl = '';
                const currentUrl = window.location.href;
                
                // URLがngrokを含む場合は、そのドメインをAPIベースURLとして使用
                if (currentUrl.includes('ngrok')) {
                    const url = new URL(currentUrl);
                    apiBaseUrl = `${url.protocol}//${url.host}`;
                    console.log('ngrokドメインを検出:', apiBaseUrl);
                }
                
                // セッション検証APIを呼び出し
                const response = await fetch(`${apiBaseUrl}/api/payment/checkout-session/${sessionId}`);
                console.log('セッション検証レスポンスステータス:', response.status);
                
                if (!response.ok) {
                    throw new Error('決済セッションの検証に失敗しました');
                }
                
                const { status } = await response.json();
                console.log(`決済ステータス: ${status}`);
                
                if (status === 'paid' || status === 'complete') {
                    // 決済成功処理
                    handlePaymentSuccess(sessionId);
                    
                    // 結果セクションが表示されていない場合は表示
                    if (resultSection && resultSection.style.display === 'none') {
                        resultSection.style.display = 'block';
                    }
                }
            } catch (error) {
                console.error('決済検証エラー:', error);
            }
        }
        
        // 課金確認ボタン
        if (confirmPremium) {
            confirmPremium.addEventListener('click', async () => {
                // モーダルを非表示
                premiumModal.style.display = 'none';
                
                // 神秘的な音を再生
                playMysticSound('payment');
                
                // 霊視結果を保存（決済後に使用するため）
                const resultText = document.getElementById('resultText');
                if (resultText && resultText.innerHTML) {
                    sessionStorage.setItem('savedPsychicReading', resultText.innerHTML);
                    console.log('霊視結果を保存しました:', resultText.innerHTML.substring(0, 50) + '...');
                }
                
                // 夢の内容を保存
                const dreamInput = document.getElementById('dreamInput');
                if (dreamInput && dreamInput.value) {
                    sessionStorage.setItem('savedDream', dreamInput.value);
                    console.log('夢の内容を保存しました:', dreamInput.value.substring(0, 50) + '...');
                }
                
                // UI状態を保存
                const shareSection = document.querySelector('.share-section');
                if (shareSection) {
                    sessionStorage.setItem('shareSectionVisible', shareSection.style.display === 'flex' ? 'true' : 'false');
                }
                
                const bottomResetButton = document.querySelector('.bottom-reset-button');
                if (bottomResetButton) {
                    sessionStorage.setItem('bottomResetButtonVisible', bottomResetButton.style.display === 'flex' ? 'true' : 'false');
                }
                
                // エラーメッセージをクリア
                const paymentError = document.getElementById('payment-error');
                if (paymentError) {
                    paymentError.style.display = 'none';
                }
                
                // Stripe初期化（初回のみ）
                if (!stripePromise) {
                    const initialized = await initializeStripe();
                    if (!initialized) {
                        return;
                    }
                }
                
                // Checkoutセッションを作成
                try {
                    await createCheckoutSession();
                } catch (error) {
                    console.error('決済セッション作成エラー (UI層):', error);
                    
                    // 支払い処理中モーダルを非表示
                    const paymentProcessingModal = document.getElementById('paymentProcessingModal');
                    if (paymentProcessingModal) {
                        paymentProcessingModal.style.display = 'none';
                    }
                    
                    // プレミアムモーダルを再表示
                    const premiumModal = document.getElementById('premiumModal');
                    if (premiumModal) {
                        premiumModal.style.display = 'flex';
                    }
                    
                    // エラーメッセージを表示
                    const paymentError = document.getElementById('payment-error');
                    if (paymentError) {
                        paymentError.textContent = `決済処理中にエラーが発生しました: ${error.message || 'エラーの詳細不明'}`;
                        paymentError.style.display = 'block';
                    }
                }
            });
        }
        
        // ページロード時にURLパラメータをチェック
        checkSessionFromUrl();
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
            
            // 結果セクションが表示されていることを確認（霊視結果を保持）
            if (resultSection && resultSection.style.display === 'none') {
                resultSection.style.display = 'block';
            }
            
            // タロットカード選択にフォーカス
            if (tarotSelection) {
                tarotSelection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
    
    // タロットカードの選択イベント
    document.addEventListener('click', event => {
        // クリックされた要素または親要素がタロットカードかどうかを確認
        const tarotCard = event.target.closest('.tarot-card');
        
        if (!tarotCard) return;
        
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