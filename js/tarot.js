// タロット解釈のロジック
import { svgImages } from '../assets/images.js';

// タロットカードのデータ
export const tarotInterpretations = {
    "fool": {
        name: "愚者",
        meaning: "新しい旅立ち、冒険、自由、無邪気さ",
        element: "空気",
        planet: "天王星",
        symbol: "無限の可能性、純粋さ",
        interpretation: "あなたの夢は新しい始まりを告げています。恐れを捨て、未知の世界へ踏み出す勇気を持ちましょう。思い切った行動が、予想外の幸運をもたらすでしょう。"
    },
    "magician": {
        name: "魔術師",
        meaning: "創造力、意志力、熟練、コミュニケーション",
        element: "空気",
        planet: "水星",
        symbol: "無限、創造の力",
        interpretation: "あなたには目標を実現させる力があります。自分の持つ能力を信じ、積極的に行動しましょう。意図を明確にし、集中することで状況を好転させる力を持っています。"
    },
    "high-priestess": {
        name: "女教皇",
        meaning: "直感、無意識、神秘、秘密",
        element: "水",
        planet: "月",
        symbol: "知恵、霊的な洞察",
        interpretation: "内なる声に耳を傾けることで、表面には見えない真実が明らかになるでしょう。静かに内省し、直感を信じることで、隠された知恵にアクセスできます。"
    },
    "empress": {
        name: "女帝",
        meaning: "豊かさ、母性、創造性、自然との調和",
        element: "大地",
        planet: "金星",
        symbol: "豊穣、育成",
        interpretation: "創造性を発揮し、豊かな実りをもたらす時期が訪れています。周囲の環境との調和を大切にしましょう。感情の豊かさと、育む力があなたを支えています。"
    },
    "emperor": {
        name: "皇帝",
        meaning: "権威、秩序、統制、父性、安定",
        element: "火",
        planet: "火星",
        symbol: "力、安定性、秩序",
        interpretation: "人生に構造と秩序をもたらす必要があります。計画的に行動し、目標に向かって着実に進むことで成功への道が開けるでしょう。"
    },
    "hierophant": {
        name: "教皇",
        meaning: "伝統、信念、精神的な導き、道徳",
        element: "大地",
        planet: "木星",
        symbol: "信仰、教え",
        interpretation: "伝統的な価値観や信念を尊重することで、精神的な成長が促されます。良き師や導き手の存在を意識し、その知恵から学ぶ姿勢が重要です。"
    },
    "lovers": {
        name: "恋人",
        meaning: "愛、選択、調和、関係性、価値観",
        element: "空気",
        planet: "水星",
        symbol: "結合、選択",
        interpretation: "人間関係や重要な決断に関わる夢です。心の声に従い、真の価値に基づいた選択をすることで、より深い結びつきが生まれるでしょう。"
    },
    "chariot": {
        name: "戦車",
        meaning: "意志力、勝利、決意、自己主張、コントロール",
        element: "水",
        planet: "月",
        symbol: "前進、征服",
        interpretation: "困難に打ち勝つための意志力と決断力が求められています。自分自身をコントロールし、目標に向かって前進する勇気を持ちましょう。"
    },
    "strength": {
        name: "力",
        meaning: "勇気、忍耐、内なる力、情熱のコントロール",
        element: "火",
        planet: "太陽",
        symbol: "精神的な強さ、忍耐",
        interpretation: "内なる力を信じ、困難な状況にも忍耐強く対応する能力があります。感情をコントロールしながらも、優しさを失わない姿勢が大切です。"
    },
    "hermit": {
        name: "隠者",
        meaning: "内省、孤独、知恵の探求、精神的な啓発",
        element: "大地",
        planet: "水星",
        symbol: "明かり、導き",
        interpretation: "静かな時間を過ごし、自分自身と向き合うことで得られる真の知恵があります。内面的な探求を通じて、人生の新たな洞察を得るでしょう。"
    },
    "wheel-of-fortune": {
        name: "運命の輪",
        meaning: "運命、循環、転機、チャンス、カルマ",
        element: "火",
        planet: "木星",
        symbol: "循環、変化",
        interpretation: "人生の変化と循環を受け入れる時です。予期せぬ出来事も、長い目で見れば成長のための重要な転機となるでしょう。流れに身を任せながらも、チャンスを掴む準備をしておきましょう。"
    },
    "justice": {
        name: "正義",
        meaning: "公正、真実、法、バランス、因果",
        element: "空気",
        planet: "金星/天秤座",
        symbol: "天秤、剣",
        interpretation: "行動と結果のバランスを考える時期です。公平な判断と責任ある選択が、将来の調和をもたらすでしょう。真実を見つめ、正直に行動することが重要です。"
    },
    "hanged-man": {
        name: "吊るされた男",
        meaning: "犠牲、新たな視点、一時停止、放棄",
        element: "水",
        planet: "海王星",
        symbol: "逆転した視点、受容",
        interpretation: "物事を異なる角度から見ることで、新たな洞察が得られます。自分の意志を手放し、状況を受け入れることで、意外な解決策が見つかるでしょう。"
    },
    "death": {
        name: "死神",
        meaning: "変容、終わりと始まり、解放、変化",
        element: "水",
        planet: "冥王星",
        symbol: "変化、再生",
        interpretation: "人生の一つの章が終わり、新しい始まりが訪れています。古いものを手放す勇気が、新たな成長と変容をもたらすでしょう。恐れずに変化を受け入れましょう。"
    },
    "temperance": {
        name: "節制",
        meaning: "バランス、調和、穏健、調整、癒し",
        element: "火",
        planet: "木星/射手座",
        symbol: "融合、流れ",
        interpretation: "バランスと調和を大切にし、極端な行動を避けることが重要です。忍耐強く物事に取り組み、内面と外面の調和を図ることで、深い癒しが得られるでしょう。"
    },
    "devil": {
        name: "悪魔",
        meaning: "束縛、欲望、執着、幻想、誘惑",
        element: "大地",
        planet: "土星/山羊座",
        symbol: "連鎖、物質主義",
        interpretation: "自分を縛る信念や執着に気づき、それらから解放される必要があります。欲望や恐れに支配されず、真の自由を見つける旅が始まっています。"
    },
    "tower": {
        name: "塔",
        meaning: "突然の変化、崩壊、啓示、解放",
        element: "火",
        planet: "火星",
        symbol: "破壊、解放",
        interpretation: "予期せぬ変化が訪れるかもしれませんが、それは古い構造を壊し、真の自分を解放するためのものです。困難に見える状況も、長い目で見れば必要な浄化のプロセスなのです。"
    },
    "star": {
        name: "星",
        meaning: "希望、インスピレーション、精神性、癒し",
        element: "空気",
        planet: "天王星/水瓶座",
        symbol: "明るさ、導き",
        interpretation: "希望と再生の時期です。過去の困難を乗り越え、新たな可能性を信じることで、内面の平和と癒しが得られるでしょう。宇宙からの導きに心を開きましょう。"
    },
    "moon": {
        name: "月",
        meaning: "直感、幻想、不確かさ、潜在意識",
        element: "水",
        planet: "月/魚座",
        symbol: "夜、潜在意識",
        interpretation: "潜在意識からのメッセージに注意を払いましょう。表面的な現実の奥にある真実を探求することで、深い自己理解が得られます。恐れに惑わされず、内なる光に導かれてください。"
    },
    "sun": {
        name: "太陽",
        meaning: "活力、成功、喜び、明晰さ、真実",
        element: "火",
        planet: "太陽",
        symbol: "光、生命力",
        interpretation: "喜びと成功の時期が訪れています。自分の真の姿を受け入れ、自信を持って行動することで、内なる輝きが周囲を照らすでしょう。生命力と創造性に満ちた日々が続きます。"
    },
    "judgement": {
        name: "審判",
        meaning: "再生、復活、評価、覚醒、呼びかけ",
        element: "火",
        planet: "冥王星",
        symbol: "覚醒、復活",
        interpretation: "精神的な覚醒と再生の時です。過去の経験から学び、魂の呼びかけに応えることで、人生の新たな段階へと進むことができるでしょう。"
    },
    "world": {
        name: "世界",
        meaning: "完成、統合、達成、旅の完了",
        element: "大地",
        planet: "土星",
        symbol: "完成、全体性",
        interpretation: "一つの重要な人生のサイクルが完成し、新たな段階へと移行する時です。これまでの経験を統合し、達成感を味わいながら、次なる冒険への準備をしましょう。"
    }
};

// 追加の解釈パターン（より詳細な組み合わせ）
const extendedCombinations = {
    "fool+magician": {
        title: "創造の冒険者",
        meaning: "無限の可能性と創造的な力が結びついた強力な組み合わせです。",
        advice: "心の赴くままに創造的な冒険に飛び込みましょう。新しいことを恐れずに始める絶好の時期です。"
    },
    "fool+high-priestess": {
        title: "神秘への旅人",
        meaning: "直感と無邪気さの組み合わせは、霊的な探求の旅を示しています。",
        advice: "未知の領域を探求する際は、あなたの直感を最高の案内人としてください。"
    },
    "high-priestess+moon": {
        title: "潜在意識の扉",
        meaning: "強力な直感と潜在意識の力が結びつき、深遠なる知恵へのアクセスを示しています。",
        advice: "夢や直感からのメッセージに特に注意を払い、記録することでパターンを見つけることができるでしょう。"
    },
    "emperor+tower": {
        title: "秩序の再構築",
        meaning: "権威と急激な変化の組み合わせは、あなたの生活や思考の構造の劇的な再編成を示唆しています。",
        advice: "古い権力構造や自己認識が崩れた後、より強固で真正な基盤を再構築するチャンスです。"
    },
    // より多くの組み合わせパターンを追加
};

/**
 * タロットカードの基本解釈を生成
 * @param {string} card1 - 1枚目のカードID
 * @param {string} card2 - 2枚目のカードID
 * @param {string} dream - 夢の内容
 * @returns {string} - タロット基本解釈テキスト
 */
export function generateTarotReading(card1, card2, dream) {
    const tarot1 = tarotInterpretations[card1];
    const tarot2 = tarotInterpretations[card2];
    
    if (!tarot1 || !tarot2) {
        console.error('カードIDが無効です:', card1, card2);
        return '選択されたカードの情報が見つかりませんでした。';
    }
    
    // 星空の区切り線を作成
    const starDivider = "✧･ﾟ: *✧･ﾟ:* *:･ﾟ✧*:･ﾟ✧";
    
    // カードの基本情報
    const readingText = `
【選ばれたカード】
1枚目: ${tarot1.name} - ${tarot1.meaning}
2枚目: ${tarot2.name} - ${tarot2.meaning}

${starDivider}

【カードの詳細】
・${tarot1.name}
 元素: ${tarot1.element} | 惑星: ${tarot1.planet}
 象徴: ${tarot1.symbol}
 
・${tarot2.name}
 元素: ${tarot2.element} | 惑星: ${tarot2.planet}
 象徴: ${tarot2.symbol}

${starDivider}

【カードの組み合わせ】
${getCombinationMeaning(card1, card2)}

${starDivider}

【夢への基本解釈】
${tarot1.interpretation}

${tarot2.interpretation}

${starDivider}

【さらなる夢の深層解釈】
深層解釈を生成中...
`;
    
    return readingText.trim();
}

/**
 * カードの組み合わせの意味を生成
 * @param {string} card1 - 1枚目のカードID
 * @param {string} card2 - 2枚目のカードID
 * @returns {string} - 組み合わせの解釈
 */
function getCombinationMeaning(card1, card2) {
    // カードの情報を取得
    const tarot1 = tarotInterpretations[card1];
    const tarot2 = tarotInterpretations[card2];
    
    if (!tarot1 || !tarot2) return "カードの組み合わせ情報を取得できませんでした。";
    
    // 拡張解釈パターンを検索
    const combo1 = `${card1}+${card2}`;
    const combo2 = `${card2}+${card1}`;
    
    if (extendedCombinations[combo1]) {
        const pattern = extendedCombinations[combo1];
        return `✨ 【${pattern.title}】 ✨\n${pattern.meaning}\n\n🔮 アドバイス: ${pattern.advice}`;
    } else if (extendedCombinations[combo2]) {
        const pattern = extendedCombinations[combo2];
        return `✨ 【${pattern.title}】 ✨\n${pattern.meaning}\n\n🔮 アドバイス: ${pattern.advice}`;
    }
    
    // 既存の組み合わせパターン
    const combinations = {
        // 愚者の組み合わせ
        "fool+magician": "新しい始まりと創造力の組み合わせは、未知の可能性に満ちた冒険を示唆しています。あなたの持つ潜在能力を発揮する絶好の機会です。",
        "fool+high-priestess": "無邪気さと直感の組み合わせは、内なる声に導かれる冒険を意味します。従来の常識に囚われず、霊的な知恵に従うことで新たな道が開けるでしょう。",
        "fool+empress": "自由な精神と豊かな創造性が組み合わさると、独自の表現方法で豊かさを引き寄せることができます。自然な流れに身を任せることで、予想外の実りがあるでしょう。",
        "fool+tower": "大きな変化と新しい旅立ちの組み合わせは、急激な転換期を示しています。古い価値観や状況が崩れ去り、全く新しい視点で人生を再構築する時期です。",

        // 魔術師の組み合わせ
        "magician+empress": "創造力と豊かさの組み合わせは、アイデアを現実の形にする強力な力を持っています。才能を活かして物質的な豊かさを生み出す時期です。",
        "magician+star": "意図と希望の組み合わせは、夢を実現させるための精神的なパワーを示しています。ポジティブな思考と行動が、願いを現実に変える鍵となるでしょう。",
        "magician+tower": "創造力と急激な変化の組み合わせは、革新的なブレークスルーを示唆しています。従来の方法が通用しない状況で、創造的な解決策を見つける必要があります。",

        // 女教皇の組み合わせ
        "high-priestess+hermit": "内なる知恵と内省の組み合わせは、深い精神的洞察の時期を意味します。静かな瞑想と内観を通じて、重要な霊的メッセージを受け取るでしょう。",
        "high-priestess+moon": "直感と潜在意識の組み合わせは、夢やビジョンを通じて重要なメッセージを受け取ることを示しています。表面下に隠れた真実が明らかになるでしょう。",
        "high-priestess+tower": "秘密の知識と突然の啓示の組み合わせは、長い間隠されていた真実が急に露わになることを示唆しています。この知識は既存の信念体系を根本から覆すかもしれません。",

        // 塔の組み合わせ
        "tower+death": "突然の崩壊と変容の組み合わせは、完全な人生の再構築を意味します。痛みを伴う変化を通じて、真の自己への目覚めが促されるでしょう。",
        "tower+star": "崩壊と希望の組み合わせは、困難な時期の後に訪れる新たな希望を示しています。古い構造が崩れた後に、真の願いに基づいて人生を再構築する機会です。",
        "tower+sun": "破壊と成功の組み合わせは、困難を乗り越えた先にある輝かしい未来を示唆しています。障害が取り除かれ、真の自己が光り輝く時が来るでしょう。"
    };

    // カードIDの組み合わせを作成（順序を考慮）
    const cardCombo1 = `${card1}+${card2}`;
    const cardCombo2 = `${card2}+${card1}`;
    
    // 登録済みの組み合わせがあればそれを返す
    if (combinations[cardCombo1]) {
        return combinations[cardCombo1];
    } else if (combinations[cardCombo2]) {
        return combinations[cardCombo2];
    }
    
    // 登録されていない組み合わせの場合は魅力的な解釈を返す
    return `✨ 【${tarot1.name}と${tarot2.name}の神秘的な共鳴】 ✨\n\n${tarot1.name}が示す${getCardEssence(card1)}と、${tarot2.name}が表す${getCardEssence(card2)}が交わることで、あなたの潜在意識は重要なメッセージを伝えようとしています。\n\nこの珍しい組み合わせは、あなたが人生の重要な分岐点に立っていることを示唆しています。両方のカードのエネルギーを意識して受け入れることで、より高次の意識へのアクセスが可能になるでしょう。`;
}

/**
 * カードの本質的な要素を取得する補助関数
 * @param {string} cardId - カードID
 * @returns {string} - カードの本質的な要素の説明
 */
function getCardEssence(cardId) {
    const tarot = tarotInterpretations[cardId];
    if (!tarot) return "神秘的なエネルギー";
    
    const essences = {
        "fool": "新しい始まりと無限の可能性",
        "magician": "創造力と意図の実現",
        "high-priestess": "直感と潜在意識の知恵",
        "empress": "豊かさと創造的なエネルギー",
        "emperor": "秩序と安定性",
        "hierophant": "伝統と精神的な教え",
        "lovers": "選択と関係性",
        "chariot": "意志力と勝利への決意",
        "strength": "内なる強さと忍耐",
        "hermit": "内省と精神的な探求",
        "wheel-of-fortune": "変化と人生のサイクル",
        "justice": "バランスと公正さ",
        "hanged-man": "新たな視点と受容",
        "death": "変容と再生",
        "temperance": "調和と癒し",
        "devil": "執着と物質的欲望",
        "tower": "突然の変化と啓示",
        "star": "希望と精神的導き",
        "moon": "幻想と潜在意識の旅",
        "sun": "活力と成功",
        "judgement": "覚醒と再生",
        "world": "完成と達成"
    };
    
    return essences[cardId] || tarot.meaning;
}

/**
 * ChatGPTを使用した夢の深層解釈を生成する関数
 * @param {string} card1 - 1枚目のカードID
 * @param {string} card2 - 2枚目のカードID
 * @param {string} dream - 夢の内容
 * @returns {Promise<string>} - 生成された解釈
 */
export async function generateDreamDeepInterpretation(card1, card2, dream) {
    try {
        const tarot1 = tarotInterpretations[card1] || { name: card1, meaning: "神秘的なエネルギー" };
        const tarot2 = tarotInterpretations[card2] || { name: card2, meaning: "神秘的なエネルギー" };
        
        // 夢の入力が短すぎる場合
        if (dream.length < 10) {
            return `タロットカード「${tarot1.name}」と「${tarot2.name}」からの深層解釈を行うには、より詳しい夢の内容が必要です。夢の内容を詳しく入力していただくことで、より正確な霊視を提供できます。`;
        }

        // 本番環境: ChatGPT APIを使用
        try {
            const response = await fetch('/api/dream-interpretation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    card1: tarot1.name,
                    card2: tarot2.name,
                    card1Meaning: tarot1.meaning,
                    card2Meaning: tarot2.meaning,
                    dream: dream
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                return formatDeepInterpretation(data.interpretation);
            }
        } catch (apiError) {
            console.error('API呼び出しエラー:', apiError);
            // APIエラー時はローカル生成にフォールバック
        }
        
        // フォールバック: 詳細な解釈を生成（ローカル）
        return generateEnhancedLocalInterpretation(tarot1, tarot2, dream);
    } catch (error) {
        console.error('解釈生成エラー:', error);
        return '夢の深層解釈の生成中にエラーが発生しました。後ほど再度お試しください。';
    }
}

/**
 * 深層解釈をより魅力的にフォーマットする関数
 * @param {string} interpretation - 生の解釈テキスト
 * @returns {string} - フォーマットされた解釈テキスト
 */
function formatDeepInterpretation(interpretation) {
    // 星空の区切り線
    const starDivider = "✧･ﾟ: *✧･ﾟ:* *:･ﾟ✧*:･ﾟ✧";
    
    // 段落に分割
    const paragraphs = interpretation.split(/\n\n+/);
    
    // セクションを追加
    let formatted = `✨ 【霊視者からの特別メッセージ】 ✨\n\n`;
    
    if (paragraphs.length >= 1) {
        formatted += paragraphs[0] + "\n\n";
    }
    
    formatted += `${starDivider}\n\n🔮 【夢の象徴の解読】 🔮\n\n`;
    
    if (paragraphs.length >= 2) {
        formatted += paragraphs[1] + "\n\n";
    }
    
    if (paragraphs.length >= 3) {
        formatted += `${starDivider}\n\n💫 【カードと夢の共鳴】 💫\n\n${paragraphs[2]}\n\n`;
    }
    
    formatted += `${starDivider}\n\n💎 【未来へのガイダンス】 💎\n\n`;
    
    if (paragraphs.length >= 4) {
        formatted += paragraphs[3] + "\n\n";
    } else {
        formatted += "あなたの夢とタロットカードは、近い未来への重要なメッセージを含んでいます。自分の直感を信じ、カードが示す方向性を意識しながら、一歩一歩前進してください。\n\n";
    }
    
    return formatted;
}

/**
 * 強化されたローカル解釈を生成する関数（APIフォールバック）
 * @param {Object} tarot1 - 1枚目のカード情報
 * @param {Object} tarot2 - 2枚目のカード情報
 * @param {string} dream - 夢の内容
 * @returns {string} - 生成された解釈
 */
function generateEnhancedLocalInterpretation(tarot1, tarot2, dream) {
    // 夢のキーワードを抽出
    const keywords = extractKeywords(dream);
    
    // 夢の象徴性を分析
    const dreamSymbols = analyzeSymbols(dream);
    
    // 星空の区切り線
    const starDivider = "✧･ﾟ: *✧･ﾟ:* *:･ﾟ✧*:･ﾟ✧";
    
    // 解釈テキストの生成
    let interpretation = `✨ 【霊視者からの特別メッセージ】 ✨\n\n`;
    
    // 導入部
    interpretation += `あなたが選んだ「${tarot1.name}」と「${tarot2.name}」の神秘的な組み合わせは、夢の深層に秘められた重要なメッセージを示しています。これらのカードのエネルギーは、あなたの潜在意識と強く共鳴しています。\n\n`;
    
    interpretation += `${starDivider}\n\n🔮 【夢の象徴の解読】 🔮\n\n`;
    
    // 夢の象徴分析
    interpretation += `あなたの夢には${dreamSymbols.join('、')}といった象徴が現れています。これらは${keywords.slice(0, 3).join('、')}といったテーマと深く結びついており、あなたの潜在意識からの重要なメッセージです。\n\n`;
    interpretation += `特に${dreamSymbols[0] || '象徴'}は、あなたの精神世界と現実世界の境界線が薄れていることを示しています。霊的な次元からの導きに耳を傾けるべき時かもしれません。\n\n`;
    
    interpretation += `${starDivider}\n\n💫 【カードと夢の共鳴】 💫\n\n`;
    
    // カードと夢の関連性
    interpretation += `「${tarot1.name}」のエネルギーは、あなたの${getRandomInsight(tarot1.name)}を強く示唆しています。夢の中の${keywords[0] || '象徴'}は、この側面があなたの現実生活においても重要な役割を果たすことを教えています。\n\n`;
    interpretation += `一方、「${tarot2.name}」の影響は、${getRandomInsight(tarot2.name)}という側面を照らし出しています。特に、夢の中の${keywords[1] || '要素'}は、あなたの${getCardAttribute(tarot2.name)}に関連するメッセージです。\n\n`;
    interpretation += `これら二つのカードが同時に現れたことは、あなたが人生の重要な分岐点に立っていることを示しています。決断と行動の時が来ているのです。\n\n`;
    
    interpretation += `${starDivider}\n\n💎 【未来へのガイダンス】 💎\n\n`;
    
    // アドバイスと未来への指針
    interpretation += `この夢からの学びとして、${getAdvice(tarot1.name, tarot2.name)}ことを意識してみてください。\n\n`;
    interpretation += `近い将来、${dreamSymbols[0] || '象徴'}に関連した重要な出来事があなたを待っています。その時、この夢とタロットのメッセージを思い出し、直感に従って行動することで、より良い未来への道が開けるでしょう。\n\n`;
    interpretation += `日常生活の中で${dreamSymbols[1] || '象徴'}に出会ったとき、それはこの夢のメッセージを思い出すためのサインです。そのサインを見逃さないよう、常に意識を高く保ちましょう。\n\n`;
    
    // 結び
    interpretation += `このタロット霊視の結果は、あなたのより深い自己理解と成長のための一つの視点です。最終的な判断は、常にあなた自身の直感と知恵に委ねられています。内なる声に耳を傾け、自分自身の真実の道を歩んでください。`;
    
    return interpretation;
}

/**
 * 夢の内容からキーワードを抽出する関数
 * @param {string} dreamText - 夢の内容
 * @returns {Array<string>} - 抽出されたキーワード
 */
function extractKeywords(dreamText) {
    // 簡易的なキーワード抽出
    const commonWords = ['私', 'が', 'を', 'に', 'は', 'の', 'と', 'た', 'です', 'ます', 'ました', 'でした', 'ている', 'いる', 'ある', 'れる'];
    const words = dreamText.split(/[\s,。、！？!?]+/).filter(word => 
        word.length > 1 && !commonWords.includes(word) && !/^\d+$/.test(word)
    );
    
    // ユニークなキーワードを最大10個返す
    return [...new Set(words)].slice(0, 10);
}

/**
 * 夢の内容から象徴を分析する関数
 * @param {string} dreamText - 夢の内容
 * @returns {Array<string>} - 検出された象徴
 */
function analyzeSymbols(dreamText) {
    const symbolPatterns = {
        '水': ['水', '海', '川', '湖', '雨', '泳ぐ', '流れ', '波', '滝', '涙'],
        '空': ['空', '飛ぶ', '雲', '鳥', '風', 'ジャンプ', '高い', '空飛ぶ', '浮く'],
        '火': ['火', '炎', '燃える', '熱い', '太陽', '明るい', 'ろうそく', '灯り'],
        '地': ['地面', '山', '土', '石', '洞窟', '森', '木', '草原', '砂漠'],
        '光': ['光', '輝く', '明るい', 'まぶしい', '太陽', '星', '月', 'きらめく'],
        '闇': ['闇', '暗い', '影', '夜', '黒い', '恐怖', '暗闇', '霧'],
        '扉': ['扉', 'ドア', '入口', '出口', '通路', '開く', '閉じる', '窓', '鍵'],
        '旅': ['旅', '道', '歩く', '移動', '車', '電車', '飛行機', '旅行', '冒険'],
        '追跡': ['追いかける', '逃げる', '走る', '恐怖', '隠れる', '捕まる', '逃亡'],
        '変身': ['変身', '変わる', '姿', '違う', '別人', '変化', '仮面', '化ける'],
        '上昇': ['上がる', '昇る', '階段', '山', '高い', '空', '登る', '上昇'],
        '下降': ['下がる', '落ちる', '深い', '穴', '地下', '沈む', '降りる', '崖'],
        '人間関係': ['友人', '恋人', '家族', '父', '母', '兄', '姉', '弟', '妹', '子供', '会話', '結婚'],
        '探索': ['探す', '見つける', '迷う', '道', '地図', '謎', '探検', '迷路', '宝'],
        '神秘': ['神秘', '魔法', '不思議', '霊', '幽霊', '妖精', '神', '女神', '龍', '魔女'],
        '時間': ['時計', '時間', '過去', '未来', '永遠', '待つ', '繰り返す', '巻き戻す']
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
 * カードに基づいたランダムな洞察を生成
 * @param {string} cardName - カード名
 * @returns {string} - 生成された洞察
 */
function getRandomInsight(cardName) {
    const insights = {
        "愚者": [
            "無限の可能性への開かれた心",
            "新しいサイクルの始まり",
            "自由で束縛されない精神",
            "冒険への準備と期待",
            "未知の領域への一歩"
        ],
        "魔術師": [
            "創造力と意志の力",
            "自分の能力を最大限に活用する必要性",
            "思考が現実を形作る力",
            "意識的な行動の重要性",
            "潜在能力の覚醒と活用"
        ],
        "女教皇": [
            "直感的な知恵と内なる声",
            "表面下に隠れた真実",
            "静かな内省の必要性",
            "潜在意識からのメッセージ",
            "神秘的な知識への探求"
        ],
        "女帝": [
            "創造性と豊かさの源",
            "感情の豊かさと表現",
            "育み育てる力",
            "自然との調和とつながり",
            "豊穣と実りの時期"
        ],
        "皇帝": [
            "権威と責任の受容",
            "構造と秩序の重要性",
            "目標達成のための計画",
            "自己規律と意志の力",
            "現実的な視点の必要性"
        ],
        "教皇": [
            "精神的な知恵と指導",
            "伝統的な価値観の重要性",
            "信念体系の探求",
            "内なる教師との対話",
            "高次の知識への導き"
        ],
        "恋人": [
            "本質的な選択の時",
            "深い人間関係の構築",
            "自己と他者のバランス",
            "心からの愛と調和",
            "真実の価値への気づき"
        ],
        "戦車": [
            "意志力による前進",
            "相反する力のコントロール",
            "困難に打ち勝つ決意",
            "自己主張と行動力",
            "目標への揺るぎない集中"
        ],
        "力": [
            "内なる力と勇気",
            "情熱の穏やかなコントロール",
            "忍耐と持続力",
            "優しさを伴う強さ",
            "本能と理性のバランス"
        ],
        "隠者": [
            "内なる光を見つける旅",
            "孤独を通じた自己発見",
            "静かな知恵の探求",
            "内省と精神的成長",
            "真の自己との対話"
        ],
        "塔": [
            "古い構造や信念の崩壊",
            "突然の啓示や気づき",
            "予期せぬ変化への対応",
            "真の自己への目覚め",
            "解放と再生の機会"
        ]
    };
    
    // カード別の洞察がある場合はランダムに選択
    if (insights[cardName]) {
        return insights[cardName][Math.floor(Math.random() * insights[cardName].length)];
    }
    
    // 汎用的な洞察のリスト
    const genericInsights = [
        "内面的な成長と変化",
        "人生の重要な転機",
        "精神的な気づきの過程",
        "潜在意識からの重要なメッセージ",
        "過去の経験から学ぶ機会",
        "未来への新たな道筋",
        "隠された才能や可能性",
        "魂の目的への気づき",
        "宇宙からの神秘的なガイダンス",
        "精神と物質の調和"
    ];
    
    return genericInsights[Math.floor(Math.random() * genericInsights.length)];
}

/**
 * カードの属性を取得
 * @param {string} cardName - カード名
 * @returns {string} - カードの属性
 */
function getCardAttribute(cardName) {
    const attributes = {
        "愚者": "直感と冒険心",
        "魔術師": "創造力と意志",
        "女教皇": "直感と内なる知恵",
        "女帝": "感情の豊かさと創造性",
        "皇帝": "構造と秩序",
        "教皇": "精神性と信念",
        "恋人": "関係性と選択",
        "戦車": "意志力と勝利",
        "力": "内なる強さと忍耐",
        "隠者": "内省と自己探求",
        "運命の輪": "変化と運命",
        "正義": "バランスと公正",
        "吊るされた男": "視点の転換と受容",
        "死神": "変容と再生",
        "節制": "調和と癒し",
        "悪魔": "執着と制限",
        "塔": "啓示と解放",
        "星": "希望と導き",
        "月": "幻想と潜在意識",
        "太陽": "活力と成功",
        "審判": "覚醒と復活",
        "世界": "完成と達成"
    };
    
    return attributes[cardName] || "精神的な成長";
}

/**
 * カードの組み合わせに基づいたアドバイスを生成
 * @param {string} card1 - 1枚目のカード名
 * @param {string} card2 - 2枚目のカード名
 * @returns {string} - 生成されたアドバイス
 */
function getAdvice(card1, card2) {
    const specificAdvice = {
        "愚者+魔術師": "自由な発想と創造力を活かして新しいプロジェクトに取り組む",
        "愚者+女教皇": "直感を信じて、従来の常識にとらわれない新しい道を探る",
        "愚者+女帝": "感情の豊かさを大切にしながら、新たな創造的表現を探求する",
        "愚者+塔": "古い枠組みを手放し、自分らしい生き方を再定義する",
        "魔術師+星": "自分の意図と願いを明確にし、それを実現するための具体的な行動を取る",
        "女教皇+月": "夢や直感からのメッセージに耳を傾け、内なる真実を探求する",
        "塔+太陽": "困難な変化を乗り越え、新たな喜びと成功に向かって前進する",
        "戦車+力": "内なる強さと外的な決断力をバランスよく使い、障害を乗り越える",
        "隠者+世界": "内なる探求を通じて得た知恵を、より広い世界で共有し実践する",
        "死神+星": "古いパターンを手放し、新たな希望と可能性に心を開く",
        "皇帝+正義": "公正さと秩序のバランスを保ちながら、責任ある決断を下す",
        "恋人+太陽": "本当の自分を表現しながら、真の愛と喜びを追求する",
        "悪魔+審判": "自分を縛る執着や恐れに気づき、より高い意識へと目覚める"
    };
    
    // 特定の組み合わせのアドバイスがある場合
    const combo1 = `${card1}+${card2}`;
    const combo2 = `${card2}+${card1}`;
    
    if (specificAdvice[combo1]) {
        return specificAdvice[combo1];
    } else if (specificAdvice[combo2]) {
        return specificAdvice[combo2];
    }
    
    // 汎用的なアドバイス
    const genericAdvice = [
        "内なる声に耳を傾け、直感を信じて行動する",
        "変化を恐れずに受け入れ、新たな可能性に心を開く",
        "過去の経験から学びながらも、未来に向かって前進する",
        "自分の強みと弱みを理解し、バランスのとれた判断をする",
        "感情と理性のバランスを取りながら、重要な決断に臨む",
        "困難な状況でも希望を持ち続け、内なる光を信じる",
        "人間関係において、より深いレベルでの理解と共感を求める",
        "自分の真の目的と価値観に従って行動する",
        "創造性と直感を日常生活に取り入れる",
        "精神的な成長と物質的な豊かさのバランスを大切にする",
        "恐れを超えて、愛と思いやりから行動する",
        "すべてのことに意味があると信じ、人生の流れを受け入れる"
    ];
    
    return genericAdvice[Math.floor(Math.random() * genericAdvice.length)];
}

/**
 * シンボルマップを生成する関数
 * @param {HTMLElement} symbolMapElement - シンボルマップのDOM要素
 * @param {Array} dreamSymbols - 夢から抽出されたシンボル
 */
export function generateSymbolMap(symbolMapElement, dreamSymbols = []) {
    if (!symbolMapElement) return;
    
    symbolMapElement.style.display = 'block';
    symbolMapElement.innerHTML = '';
    
    // シンボルマップのタイトルを追加
    const mapTitle = document.createElement('div');
    mapTitle.className = 'symbol-map-title';
    mapTitle.textContent = '✧ 夢の象徴マップ ✧';
    symbolMapElement.appendChild(mapTitle);
    
    // 基本シンボル
    const baseSymbols = [
        'moon', 'star', 'sun', 'eye', 'key', 'heart', 
        'tree', 'bird', 'mountain', 'water', 'crystal', 
        'spirit', 'crown', 'infinity', 'cosmos'
    ];
    
    // 抽出された夢のシンボルから対応するものを追加
    let extractedDreamSymbols = [];
    if (dreamSymbols && dreamSymbols.length > 0) {
        dreamSymbols.forEach(symbol => {
            // 日本語の象徴名を英語に変換（一部のみ例示）
            const symbolMap = {
                '水': 'water',
                '空': 'bird',
                '火': 'sun',
                '地': 'mountain',
                '光': 'sun',
                '闇': 'moon',
                '扉': 'key',
                '旅': 'infinity',
                '人間関係': 'heart',
                '神秘': 'eye',
                '時間': 'infinity'
            };
            
            if (symbolMap[symbol]) {
                extractedDreamSymbols.push(symbolMap[symbol]);
            }
        });
    }
    
    // シンボルの準備（夢から抽出したものを優先）
    const allSymbols = [...new Set([...extractedDreamSymbols, ...baseSymbols])];
    
    // マップにシンボル描画用のSVG要素を追加
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.pointerEvents = 'none';
    symbolMapElement.appendChild(svg);
    
    // シンボル間の接続線グループ
    const linesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    svg.appendChild(linesGroup);
    
    // シンボル要素グループ
    const symbolsGroup = document.createElement('div');
    symbolsGroup.className = 'symbols-group';
    symbolMapElement.appendChild(symbolsGroup);
    
    // シンボルの配置（数を20に増やす）
    const symbolCount = 20;
    const placedSymbols = [];
    
    for (let i = 0; i < symbolCount; i++) {
        // シンボルの選択（抽出シンボルを優先）
        let symbolKey;
        if (extractedDreamSymbols.length > 0 && Math.random() > 0.6) {
            symbolKey = extractedDreamSymbols[Math.floor(Math.random() * extractedDreamSymbols.length)];
        } else {
            symbolKey = baseSymbols[Math.floor(Math.random() * baseSymbols.length)];
        }
        
        // シンボル要素の作成
        const symbol = document.createElement('div');
        symbol.className = 'symbol';
        symbol.setAttribute('data-symbol', symbolKey);
        
        // シンボルの位置
        const left = 5 + Math.random() * 90;
        const top = 5 + Math.random() * 85;
        symbol.style.left = `${left}%`;
        symbol.style.top = `${top}%`;
        
        // ランダムなサイズ
        const size = 20 + Math.random() * 20;
        symbol.style.width = `${size}px`;
        symbol.style.height = `${size}px`;
        
        // ランダムな色（テーマカラーに合わせる）
        const hue = Math.random() > 0.5 ? 
                    (260 + Math.random() * 80) : // 紫色系
                    (40 + Math.random() * 30);  // 金色系
        const saturation = 70 + Math.random() * 30;
        const lightness = 50 + Math.random() * 20;
        
        // シンボルと背景を設定
        const symbolChar = svgImages.symbolChars[symbolKey] || '✦';
        symbol.innerHTML = `<span>${symbolChar}</span>`;
        symbol.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.2)`;
        symbol.style.boxShadow = `0 0 8px hsla(${hue}, ${saturation}%, ${lightness}%, 0.5)`;
        
        // アニメーション設定
        const animationDuration = 5 + Math.random() * 15;
        const animationDelay = Math.random() * 5;
        symbol.style.animation = `float ${animationDuration}s ease-in-out ${animationDelay}s infinite alternate`;
        
        // ホバーエフェクト
        symbol.addEventListener('mouseenter', () => {
            symbol.style.transform = 'scale(1.2)';
            symbol.style.boxShadow = `0 0 15px hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`;
        });
        
        symbol.addEventListener('mouseleave', () => {
            symbol.style.transform = '';
            symbol.style.boxShadow = `0 0 8px hsla(${hue}, ${saturation}%, ${lightness}%, 0.5)`;
        });
        
        symbolsGroup.appendChild(symbol);
        
        // 位置情報を保存
        placedSymbols.push({
            element: symbol,
            left,
            top,
            symbolKey
        });
    }
    
    // シンボル間の接続線を生成
    setTimeout(() => {
        // 各シンボルから近いシンボルへ接続
        placedSymbols.forEach((symbol, index) => {
            // 接続数を制限（近いシンボルと優先的に接続）
            const maxConnections = 2 + Math.floor(Math.random() * 2); // 2~3本
            let connections = 0;
            
            // 距離でソートした他のシンボルリスト
            const otherSymbols = placedSymbols
                .filter((_, i) => i !== index)
                .map(other => {
                    const dx = symbol.left - other.left;
                    const dy = symbol.top - other.top;
                    return {
                        ...other,
                        distance: Math.sqrt(dx * dx + dy * dy)
                    };
                })
                .sort((a, b) => a.distance - b.distance);
            
            // 近いシンボルから接続
            for (const other of otherSymbols) {
                if (connections >= maxConnections) break;
                
                // 同じ種類のシンボル同士は優先的に接続
                if (symbol.symbolKey === other.symbolKey || Math.random() > 0.7) {
                    createConnectionLine(symbol, other, linesGroup);
                    connections++;
                }
            }
        });
    }, 100);
    
    // シンボル間の接続線を作成する関数
    function createConnectionLine(symbol1, symbol2, svg) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        
        // 線の開始位置と終了位置
        const x1 = symbol1.left;
        const y1 = symbol1.top;
        const x2 = symbol2.left;
        const y2 = symbol2.top;
        
        line.setAttribute('x1', `${x1}%`);
        line.setAttribute('y1', `${y1}%`);
        line.setAttribute('x2', `${x2}%`);
        line.setAttribute('y2', `${y2}%`);
        
        // 線のスタイル
        const isHighlighted = symbol1.symbolKey === symbol2.symbolKey; // 同じシンボル同士は強調
        
        // 色は紫とゴールドのグラデーション
        const hue = isHighlighted ? 45 : 280; // 強調は金色系、それ以外は紫色系
        const saturation = isHighlighted ? '80%' : '70%';
        const lightness = isHighlighted ? '60%' : '50%';
        const opacity = isHighlighted ? '0.6' : '0.3';
        
        line.setAttribute('stroke', `hsla(${hue}, ${saturation}, ${lightness}, ${opacity})`);
        line.setAttribute('stroke-width', isHighlighted ? '1.5' : '0.8');
        line.setAttribute('stroke-dasharray', isHighlighted ? '3,2' : '2,3');
        
        // アニメーション
        const animateStroke = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animateStroke.setAttribute('attributeName', 'stroke-dashoffset');
        animateStroke.setAttribute('from', '0');
        animateStroke.setAttribute('to', '60');
        animateStroke.setAttribute('dur', isHighlighted ? '6s' : '10s');
        animateStroke.setAttribute('repeatCount', 'indefinite');
        
        line.appendChild(animateStroke);
        svg.appendChild(line);
        
        return line;
    }
}