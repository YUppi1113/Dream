// ChatGPT APIを使用した夢霊視アプリケーションのサーバーサイド
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const stripe = require('stripe');

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

// Stripe初期化
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
let stripeClient;

if (!stripeSecretKey || stripeSecretKey.trim() === '') {
  console.warn('警告: STRIPE_SECRET_KEYが設定されていません。決済機能は無効化されます。');
} else {
  stripeClient = stripe(stripeSecretKey);
  console.log('Stripe決済機能が有効化されました');
}

// ミドルウェア
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));

// Stripeウェブフックのためのrawボディを取得
app.use('/api/webhook', express.raw({type: 'application/json'}));

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

// Stripe決済関連のエンドポイント
// 公開キーを取得するエンドポイント
app.get('/api/payment/config', (req, res) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    premiumPrice: 500  // 価格は円単位で
  });
});

// 決済セッションを作成するエンドポイント
app.post('/api/payment/create-checkout-session', async (req, res) => {
  try {
    if (!stripeClient) {
      return res.status(500).json({ error: 'Stripe決済機能が無効です' });
    }

    const priceId = process.env.STRIPE_PREMIUM_PRICE_ID;
    if (!priceId) {
      return res.status(500).json({ error: '商品価格IDが設定されていません' });
    }

    // セッションの作成
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.protocol}://${req.get('host')}?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${req.protocol}://${req.get('host')}?canceled=true`,
      metadata: {
        type: 'premium_psychic_reading',
      },
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Stripeセッション作成エラー:', error);
    res.status(500).json({ error: '決済セッションの作成に失敗しました' });
  }
});

// 決済セッションの状態を確認するエンドポイント
app.get('/api/payment/checkout-session/:sessionId', async (req, res) => {
  try {
    if (!stripeClient) {
      return res.status(500).json({ error: 'Stripe決済機能が無効です' });
    }

    const { sessionId } = req.params;
    const session = await stripeClient.checkout.sessions.retrieve(sessionId);
    
    res.json({ status: session.payment_status, session });
  } catch (error) {
    console.error('セッション取得エラー:', error);
    res.status(500).json({ error: '決済セッションの取得に失敗しました' });
  }
});

// 決済完了ウェブフックエンドポイント
app.post('/api/webhook', async (req, res) => {
  try {
    if (!stripeClient) {
      return res.status(500).json({ error: 'Stripe決済機能が無効です' });
    }

    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('Webhookシークレットが設定されていません');
      return res.status(500).json({ error: 'Webhookシークレットが設定されていません' });
    }

    let event;
    try {
      event = stripeClient.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error(`Webhook署名検証エラー: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // イベント処理
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log(`決済成功: ${session.id}`);
      
      // ここに決済成功時の処理を実装
      // 例: ユーザー情報の更新、特典の付与など
    }

    res.json({received: true});
  } catch (error) {
    console.error('Webhookエラー:', error);
    res.status(500).json({ error: 'Webhookの処理に失敗しました' });
  }
});

// サーバーの起動
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});