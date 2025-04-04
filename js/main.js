import { svgImages } from '../assets/images.js';
import { tarotInterpretations, generateTarotReading, generateDreamDeepInterpretation, generateSymbolMap } from './tarot.js';

// タイプライター効果
function typeWriter(text, element, speed = 30) {
    let i = 0;
    element.textContent = '';
    
    return new Promise((resolve) => {
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        
        type();
    });
}

// ChatGPT APIを使用した霊視結果の生成
async function generatePsychicReading(dream) {
    try {
        // APIキー（実際の運用では、バックエンドで安全に管理すべき）
        const apiKey = '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';
        
        // OpenAI APIへのリクエスト
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `あなたはオカルトの専門家で、霊感を持つ霊視者です。これから入力される夢を分析して、神秘的で不思議な霊視結果を提供してください。
                        結果は以下のフォーマットで提供してください：
                        1. 霊視者としての第一印象（1〜2文）
                        2. 夢に含まれるシンボルの解釈（2〜3文）
                        3. 【未来への指針】というタイトルで未来予測（1〜2文）
                        4. 【霊からのアドバイス】というタイトルでアドバイス（1〜2文）
                        
                        神秘的な言い回しを使い、具体的かつ深遠な解釈を心がけてください。占いやスピリチュアルの専門用語を適切に使用し、神秘的で不思議な雰囲気を醸し出してください。`
                    },
                    {
                        role: 'user',
                        content: `私が見た夢の内容：${dream}`
                    }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });
        
        const data = await response.json();
        
        // APIレスポンスからコンテンツを抽出
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content;
        } else {
            console.error('API response format error:', data);
            return '霊視中にエラーが発生しました。後ほど再度お試しください。';
        }
    } catch (error) {
        console.error('API Error:', error);
        return '霊視中にエラーが発生しました。後ほど再度お試しください。';
    }
}

// イベントハンドラを設定
function initApp() {
    // DOM要素の取得
    const dreamInput = document.getElementById('dreamInput');
    const psychicButton = document.getElementById('psychicButton');
    const premiumButton = document.getElementById('premiumButton');
    const premiumButtonInResult = document.getElementById('premiumButtonInResult');
    const loadingSection = document.querySelector('.loading');
    const resultSection = document.querySelector('.result');
    const resultText = document.getElementById('resultText');
    const tarotSelection = document.querySelector('.tarot-selection');
    const tarotCards = document.querySelectorAll('.tarot-card');
    const tarotInterpretation = document.querySelector('.tarot-interpretation');
    const tarotInterpretationText = document.getElementById('tarotInterpretationText');
    const selectedCardsContainer = document.getElementById('selectedCards');
    const premiumModal = document.getElementById('premiumModal');
    const cancelPremium = document.getElementById('cancelPremium');
    const confirmPremium = document.getElementById('confirmPremium');
    const closeModalButton = document.querySelector('.close-button');
    const symbolMap = document.getElementById('symbolMap');
    const cursorGlow = document.querySelector('.cursor-glow');
    const pentagram = document.querySelector('.pentagram');
    
    // 選択されたカードを追跡
    let selectedCards = [];
    
    // カーソルアニメーション
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        
        // ペンタグラムの回転調整
        const dx = e.clientX - window.innerWidth / 2;
        const dy = e.clientY - window.innerHeight / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        
        pentagram.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        pentagram.style.opacity = 0.2 + (distance / (window.innerWidth / 2)) * 0.1;
    });
    
    // 霊視ボタンのクリックイベント
    psychicButton.addEventListener('click', async () => {
        const dream = dreamInput.value.trim();
        
        if (dream === '') {
            alert('夢の内容を入力してください。');
            return;
        }
        
        // ローディング表示
        loadingSection.style.display = 'block';
        resultSection.style.display = 'none';
        
        try {
            // 結果の生成
            const psychicReading = await generatePsychicReading(dream);
            
            loadingSection.style.display = 'none';
            resultSection.style.display = 'block';
            
            // タイプライター効果で表示
            await typeWriter(psychicReading, resultText);
            
            // 結果の表示後にプレミアムボタンを表示
            premiumButton.style.display = 'block';
            
            // クラスを追加して表示アニメーション
            resultSection.classList.add('visible');
        } catch (error) {
            console.error('Error during psychic reading:', error);
            loadingSection.style.display = 'none';
            resultSection.style.display = 'block';
            resultText.textContent = '霊視中にエラーが発生しました。後ほど再度お試しください。';
            
            // 結果の表示後にプレミアムボタンを表示
            premiumButton.style.display = 'block';
            
            // クラスを追加して表示アニメーション
            resultSection.classList.add('visible');
        }
    });
    
    // プレミアムボタンのクリックイベント
    function showPremiumModal() {
        premiumModal.style.display = 'flex';
    }
    
    premiumButton.addEventListener('click', showPremiumModal);
    premiumButtonInResult.addEventListener('click', showPremiumModal);
    
    // モーダルの操作
    cancelPremium.addEventListener('click', () => {
        premiumModal.style.display = 'none';
    });
    
    closeModalButton.addEventListener('click', () => {
        premiumModal.style.display = 'none';
    });
    
    confirmPremium.addEventListener('click', () => {
        // 実際のサイトでは決済処理を行う
        premiumModal.style.display = 'none';
        
        // タロットカード選択を表示
        tarotSelection.style.display = 'block';
        
        // スクロール
        tarotSelection.scrollIntoView({ behavior: 'smooth' });
        
        // 選択済みカードをリセット
        selectedCards = [];
        tarotCards.forEach(card => {
            card.classList.remove('selected');
        });
        tarotInterpretation.style.display = 'none';
    });
    
    // タロットカードの選択イベント
    tarotCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardId = card.getAttribute('data-id');
            
            // 選択済みかどうかの確認
            const isSelected = card.classList.contains('selected');
            
            if (isSelected) {
                // 選択解除
                card.classList.remove('selected');
                selectedCards = selectedCards.filter(id => id !== cardId);
            } else {
                // 最大2枚まで選択可能
                if (selectedCards.length < 2) {
                    card.classList.add('selected');
                    selectedCards.push(cardId);
                }
            }
            
            // 2枚選択されたらタロット解釈を表示
            if (selectedCards.length === 2) {
                setTimeout(displayTarotInterpretation, 1000);
            }
        });
    });
    


// タロット解釈の表示
async function displayTarotInterpretation() {
    const dream = dreamInput.value.trim();
    
    try {
        // ローディングテキストの表示
        tarotInterpretation.style.display = 'block';
        tarotInterpretationText.textContent = 'タロットカードからのメッセージを受信中...';
        
        // 選択したカードの表示
        selectedCardsContainer.innerHTML = '';
        selectedCards.forEach(cardId => {
            const cardElement = document.createElement('div');
            cardElement.className = 'selected-card';
            
            // カードを表にする（裏面から表面への変更）
            const cardContent = document.querySelector(`.tarot-card[data-id="${cardId}"] .tarot-card-content`);
            cardElement.style.backgroundImage = cardContent.style.backgroundImage;
            
            selectedCardsContainer.appendChild(cardElement);
        });
        
        // タロット解釈の生成（基本情報を表示）
        const tarotReadingBasic = generateTarotReading(selectedCards[0], selectedCards[1], dream);
        
        // 基本解釈の表示
        tarotInterpretationText.textContent = '';
        await typeWriter(tarotReadingBasic, tarotInterpretationText);
        
        // シンボルマップは表示しない
        symbolMap.style.display = 'none';
        
        // スクロール
        tarotInterpretation.scrollIntoView({ behavior: 'smooth' });
        
        // 深層解釈を生成してロード中のテキストを置き換え
        try {
            // 共通関数を使用（すでにimport済み）
            const deepInterpretation = await generateDreamDeepInterpretation(selectedCards[0], selectedCards[1], dream);
            
            // 深層解釈部分だけを置き換え
            const currentText = tarotInterpretationText.textContent;
            const newText = currentText.replace('深層解釈を生成中...', deepInterpretation);
            
            // テキストを更新
            tarotInterpretationText.textContent = '';
            await typeWriter(newText, tarotInterpretationText);
        } catch (deepError) {
            console.error('Deep interpretation error:', deepError);
            
            // エラーメッセージで置き換え
            const currentText = tarotInterpretationText.textContent;
            const newText = currentText.replace('深層解釈を生成中...', '深層解釈の生成中にエラーが発生しました。後ほど再度お試しください。');
            
            tarotInterpretationText.textContent = newText;
        }
    } catch (error) {
        console.error('Error during tarot interpretation:', error);
        tarotInterpretationText.textContent = 'タロット解読中にエラーが発生しました。後ほど再度お試しください。';
    }
}
    
    // 共有ボタンのイベント
    document.querySelectorAll('.share-button').forEach(button => {
        button.addEventListener('click', () => {
            // 実際のサイトでは各SNSの共有APIを使用
            alert('霊視結果を共有しようとしています。実際のサイトでは、各SNSの共有機能が連携されます。');
        });
    });
}

// DOMが読み込まれたらアプリを初期化
document.addEventListener('DOMContentLoaded', initApp);