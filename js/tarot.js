import { svgImages } from '../assets/images.js';

// タロット解釈データ
const tarotInterpretations = {
    "fool": {
        name: "愚者",
        meaning: "新しい旅立ち、冒険、自由、無邪気さ",
        interpretation: "あなたの夢は新しい始まりを告げています。恐れを捨て、未知の世界へ踏み出す勇気を持ちましょう。"
    },
    "magician": {
        name: "魔術師",
        meaning: "創造力、意志力、熟練、コミュニケーション",
        interpretation: "あなたには目標を実現させる力があります。自分の持つ能力を信じ、積極的に行動しましょう。"
    },
    "high-priestess": {
        name: "女教皇",
        meaning: "直感、無意識、神秘、秘密",
        interpretation: "内なる声に耳を傾けることで、表面には見えない真実が明らかになるでしょう。"
    },
    "empress": {
        name: "女帝",
        meaning: "豊かさ、母性、創造性、自然との調和",
        interpretation: "創造性を発揮し、豊かな実りをもたらす時期が訪れています。周囲の環境との調和を大切にしましょう。"
    },
    "tower": {
        name: "塔",
        meaning: "突然の変化、崩壊、啓示、解放",
        interpretation: "予期せぬ変化が訪れるかもしれませんが、それは古い構造を壊し、真の自分を解放するためのものです。"
    }
};

/**
 * タロットカードの基本解釈を生成
 * @param {string} card1 - 1枚目のカードID
 * @param {string} card2 - 2枚目のカードID
 * @param {string} dream - 夢の内容
 * @returns {string} - タロット基本解釈テキスト
 */
function generateTarotReading(card1, card2, dream) {
    const tarot1 = tarotInterpretations[card1];
    const tarot2 = tarotInterpretations[card2];
    
    // プレースホルダーを返す（非同期処理の結果は別途表示する）
    return `【選ばれたカード】\n${tarot1.name}と${tarot2.name}\n\n【カードの意味】\n・${tarot1.name}: ${tarot1.meaning}\n・${tarot2.name}: ${tarot2.meaning}\n\n【さらなる夢の深層解釈】\n深層解釈を生成中...`;
}

/**
 * AI APIを使って深層解釈を生成する関数
 * @param {string|object} card1 - 1枚目のカード（IDまたはオブジェクト）
 * @param {string|object} card2 - 2枚目のカード（IDまたはオブジェクト）
 * @param {string} dream - 夢の内容
 * @returns {Promise<string>} - 深層解釈テキスト
 */
async function generateDreamDeepInterpretation(card1, card2, dream) {
    try {
        // カードIDからオブジェクトを取得（既にオブジェクトの場合はそのまま使用）
        const tarot1 = typeof card1 === 'string' ? tarotInterpretations[card1] : card1;
        const tarot2 = typeof card2 === 'string' ? tarotInterpretations[card2] : card2;
        
        // カード名のみの場合（HTML側からの呼び出し）
        if (typeof card1 === 'string' && !tarot1) {
            // カード名として扱う
            const cardName1 = card1;
            const cardName2 = card2;
            
            return await callOpenAIWithCardNames(cardName1, cardName2, dream);
        }
        
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
                        content: `あなたはタロット占いと夢占いの専門家です。以下の情報を元に、夢の深層解釈を作成してください。
                        - 1枚目のカード: ${tarot1.name}（${tarot1.meaning}）
                        - 2枚目のカード: ${tarot2.name}（${tarot2.meaning}）
                        - 夢の内容: ${dream}
                        
                        深層解釈は4〜5段落で、夢の象徴とタロットカードの関連性を詳しく説明してください。
                        心理学的な観点と神秘的な観点の両方から解釈し、具体的なアドバイスも含めてください。
                        専門的かつ神秘的な言い回しを使い、読む人に深い洞察を与えるような文章にしてください。`
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });
        
        const data = await response.json();
        
        // APIレスポンスからコンテンツを抽出
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content;
        } else {
            console.error('API response format error:', data);
            return '夢の深層解釈の生成中にエラーが発生しました。後ほど再度お試しください。';
        }
    } catch (error) {
        console.error('API Error:', error);
        return '夢の深層解釈の生成中にエラーが発生しました。後ほど再度お試しください。';
    }
}

/**
 * カード名のみを使ってOpenAI APIを呼び出す（HTML側から呼び出す用）
 * @param {string} cardName1 - 1枚目のカード名
 * @param {string} cardName2 - 2枚目のカード名
 * @param {string} dream - 夢の内容
 * @returns {Promise<string>} - 解釈テキスト
 */
async function callOpenAIWithCardNames(cardName1, cardName2, dream) {
    try {
        // APIキー
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
                        content: `あなたはタロット占いと夢占いの専門家です。以下の情報を元に、夢の深層解釈を作成してください。
                        - 1枚目のカード: ${cardName1}
                        - 2枚目のカード: ${cardName2}
                        - 夢の内容: ${dream}
                        
                        深層解釈は4〜5段落で、夢の象徴とタロットカードの関連性を詳しく説明してください。
                        心理学的な観点と神秘的な観点の両方から解釈し、具体的なアドバイスも含めてください。
                        専門的かつ神秘的な言い回しを使い、読む人に深い洞察を与えるような文章にしてください。`
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });
        
        const data = await response.json();
        
        // APIレスポンスからコンテンツを抽出
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content;
        } else {
            console.error('API response format error:', data);
            return '夢の深層解釈の生成中にエラーが発生しました。後ほど再度お試しください。';
        }
    } catch (error) {
        console.error('API Error:', error);
        return '夢の深層解釈の生成中にエラーが発生しました。後ほど再度お試しください。';
    }
}

/**
 * シンボルマップを生成
 * @param {HTMLElement} symbolMapElement - シンボルマップのDOM要素
 */
function generateSymbolMap(symbolMapElement) {
    symbolMapElement.style.display = 'block';
    symbolMapElement.innerHTML = '';
    
    const symbols = [
        'moon', 'star', 'sun', 'eye', 'key', 'heart', 'tree', 'bird', 'mountain', 'water'
    ];
    
    // ランダムな位置にシンボルを配置
    for (let i = 0; i < 15; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'symbol';
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        symbol.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><circle cx="15" cy="15" r="15" fill="%239b59b6" opacity="0.3" /><text x="15" y="21" font-size="15" fill="gold" text-anchor="middle">${svgImages.symbolChars[randomSymbol]}</text></svg>')`;
        
        symbol.style.left = `${Math.random() * 90}%`;
        symbol.style.top = `${Math.random() * 90}%`;
        
        // ランダムなアニメーション
        const animationDuration = 5 + Math.random() * 10;
        symbol.style.animation = `float ${animationDuration}s ease-in-out infinite`;
        
        symbolMapElement.appendChild(symbol);
    }
    
    // シンボルを結ぶ線を作成
    const lines = document.createElement('svg');
    lines.setAttribute('width', '100%');
    lines.setAttribute('height', '100%');
    lines.style.position = 'absolute';
    lines.style.top = '0';
    lines.style.left = '0';
    lines.style.zIndex = '-1';
    
    const symbolElements = symbolMapElement.querySelectorAll('.symbol');
    for (let i = 0; i < symbolElements.length - 1; i++) {
        const symbol1 = symbolElements[i];
        const symbol2 = symbolElements[i + 1];
        
        const rect1 = symbol1.getBoundingClientRect();
        const rect2 = symbol2.getBoundingClientRect();
        
        const x1 = rect1.left - symbolMapElement.getBoundingClientRect().left + rect1.width / 2;
        const y1 = rect1.top - symbolMapElement.getBoundingClientRect().top + rect1.height / 2;
        const x2 = rect2.left - symbolMapElement.getBoundingClientRect().left + rect2.width / 2;
        const y2 = rect2.top - symbolMapElement.getBoundingClientRect().top + rect2.height / 2;
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', '#9b59b6');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke-opacity', '0.3');
        
        lines.appendChild(line);
    }
    
    symbolMapElement.appendChild(lines);
}

export { tarotInterpretations, generateTarotReading, generateDreamDeepInterpretation, generateSymbolMap };