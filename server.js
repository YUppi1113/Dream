// ChatGPT APIを使用した夢霊視アプリケーションのサーバーサイド
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const OpenAI = require('openai');

// 環境変数の読み込み
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// APIキーの設定
const apiKey = process.env.OPENAI_API_KEY;
let openai;

if (!apiKey || apiKey.trim() === '') {
  console.warn('警告: OPENAI_API_KEYが設定されていません。ローカルフォールバックを使用します。');
} else {
  openai = new OpenAI({
    apiKey: apiKey
  });
}

// ミドルウェア
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));

// メインページのルート
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 霊視APIエンドポイント
app.post('/api/psychic-reading', async (req, res) => {
  try {
    const { dream, isPremium } = req.body;
    
    if (!dream || dream.length < 10) {
      return res.status(400).json({ error: '夢の内容が短すぎます' });
    }
    
    // APIキーが設定されていない場合はすぐにエラーを返す
    if (!openai) {
      console.warn('OpenAI APIキーが設定されていないため、クライアント側でローカル生成を使用します');
      return res.status(500).json({ error: 'APIキーが設定されていません。クライアント側のフォールバックを使用します。' });
    }
    
    // ChatGPT APIに送信するプロンプト
    const prompt = isPremium ? 
      `あなたは神秘的な霊視者です。クライアントの夢を分析し、神秘的で霊的な視点から解釈してください。
      以下の夢の内容を深く分析し、象徴性、潜在意識からのメッセージ、スピリチュアルな意味、未来への暗示などを含む詳細な霊視結果を提供してください。
      結果には必ず「霊視結果」「夢のメッセージ」「未来への指針」「霊からのアドバイス」「深層解析」のセクションを含めてください。
      神秘的で詩的な言葉遣いを使用し、星や宇宙、精神世界などのイメージを取り入れてください。

      夢の内容: ${dream}` 
      : 
      `あなたは神秘的な霊視者です。クライアントの夢を分析し、神秘的で霊的な視点から解釈してください。
      以下の夢の内容を分析し、象徴性、潜在意識からのメッセージ、スピリチュアルな意味、未来への暗示を含む霊視結果を提供してください。
      結果には「霊視結果」「夢のメッセージ」「未来への指針」「霊からのアドバイス」のセクションを含めてください。
      神秘的で詩的な言葉遣いを使用してください。

      夢の内容: ${dream}`;

    try {
      // ChatGPT APIを呼び出す
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "あなたは古代の知恵に精通した神秘的な霊視者です。夢の解釈と霊的なメッセージを伝える能力を持っています。"
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 1500
      });

      // レスポンスを整形して返す
      const reading = completion.choices[0].message.content;
      res.json({ reading });
    } catch (apiError) {
      console.error('OpenAI API Error:', apiError);
      res.status(500).json({ error: 'OpenAI APIエラー。クライアント側のフォールバックを使用します。' });
    }
  } catch (error) {
    console.error('API処理エラー:', error);
    res.status(500).json({ error: '霊視中にエラーが発生しました' });
  }
});

// タロット解釈APIエンドポイント
app.post('/api/dream-interpretation', async (req, res) => {
  try {
    const { card1, card2, card1Meaning, card2Meaning, dream } = req.body;
    
    if (!dream || dream.length < 10) {
      return res.status(400).json({ error: '夢の内容が短すぎます' });
    }
    
    // APIキーが設定されていない場合はすぐにエラーを返す
    if (!openai) {
      console.warn('OpenAI APIキーが設定されていないため、クライアント側でローカル生成を使用します');
      return res.status(500).json({ error: 'APIキーが設定されていません。クライアント側のフォールバックを使用します。' });
    }
    
    // ChatGPT APIに送信するプロンプト
    const prompt = `あなたは古代のタロット読者であり夢の解読者です。以下のタロットカードと夢の組み合わせを元に、詳細な深層解釈を提供してください。

    選ばれた2枚のカード:
    1枚目: ${card1} - ${card1Meaning}
    2枚目: ${card2} - ${card2Meaning}
    
    夢の内容: "${dream}"
    
    これらのカードと夢の内容の関連性、隠されたシンボル、潜在意識からのメッセージ、将来への道標などを詳しく解読してください。
    神秘的で詩的な言葉遣いを使い、以下の4つのセクションに分けて解釈を提供してください：
    
    1. 霊視者からの特別メッセージ（全体の解釈）
    2. 夢の象徴の解読（夢に現れる重要なシンボルの意味）
    3. カードと夢の共鳴（タロットカードがどのように夢と関連しているか）
    4. 未来へのガイダンス（実践的なアドバイスと未来の展望）
    
    各セクションを2~3段落で説明し、読者に深い洞察と気づきを与えるような解釈にしてください。`;

    try {
      // ChatGPT APIを呼び出す
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "あなたは古代の知恵に精通したタロット読者であり、夢の解読者です。神秘的で詩的な言葉で深い洞察を提供します。"
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 1500
      });

      // レスポンスを整形して返す
      const interpretation = completion.choices[0].message.content;
      res.json({ interpretation });
    } catch (apiError) {
      console.error('OpenAI API Error:', apiError);
      res.status(500).json({ error: 'OpenAI APIエラー。クライアント側のフォールバックを使用します。' });
    }
  } catch (error) {
    console.error('API処理エラー:', error);
    res.status(500).json({ error: 'タロット解釈中にエラーが発生しました' });
  }
});

// サーバーの起動
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});