// SVGデータを格納
const svgImages = {
    eye: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60"><ellipse cx="50" cy="30" rx="45" ry="25" fill="none" stroke="%23f1c40f" stroke-width="2" /><circle cx="50" cy="30" r="10" fill="%23f1c40f" /></svg>',
    pentagram: `<svg viewBox="0 0 100 100">
        <polygon points="50,0 61,35 97,35 68,57 79,91 50,70 21,91 32,57 3,35 39,35" fill="none" stroke="#9b59b6" stroke-width="1" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#9b59b6" stroke-width="1" />
    </svg>`,
    loadingPentagram: `<svg viewBox="0 0 100 100">
        <polygon points="50,0 61,35 97,35 68,57 79,91 50,70 21,91 32,57 3,35 39,35" fill="none" stroke="#9b59b6" stroke-width="2" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#9b59b6" stroke-width="2" />
    </svg>`,
    symbolChars: {
        'moon': '☽',
        'star': '★',
        'sun': '☀',
        'eye': '👁',
        'key': '🔑',
        'heart': '♥',
        'tree': '🌳',
        'bird': '🕊',
        'mountain': '⛰',
        'water': '~'
    },
    tarotCards: {
        'fool': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 200"><rect width="120" height="200" fill="%233a1c71" /><text x="60" y="100" font-family="serif" font-size="20" fill="gold" text-anchor="middle">愚者</text><circle cx="60" cy="50" r="20" fill="none" stroke="gold" stroke-width="2" /><polyline points="40,140 60,160 80,140" fill="none" stroke="gold" stroke-width="2" /></svg>',
        'magician': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 200"><rect width="120" height="200" fill="%23d76d77" /><text x="60" y="100" font-family="serif" font-size="20" fill="gold" text-anchor="middle">魔術師</text><polygon points="60,40 70,60 90,65 70,80 65,100 60,80 40,75 55,60" fill="none" stroke="gold" stroke-width="2" /><line x1="40" y1="140" x2="80" y2="140" stroke="gold" stroke-width="2" /></svg>',
        'high-priestess': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 200"><rect width="120" height="200" fill="%23ffaf7b" /><text x="60" y="100" font-family="serif" font-size="20" fill="gold" text-anchor="middle">女教皇</text><circle cx="60" cy="50" r="20" fill="none" stroke="gold" stroke-width="2" /><rect x="45" y="120" width="30" height="40" fill="none" stroke="gold" stroke-width="2" /></svg>',
        'empress': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 200"><rect width="120" height="200" fill="%233a1c71" /><text x="60" y="100" font-family="serif" font-size="20" fill="gold" text-anchor="middle">女帝</text><polygon points="60,40 80,70 60,100 40,70" fill="none" stroke="gold" stroke-width="2" /><circle cx="60" cy="150" r="10" fill="none" stroke="gold" stroke-width="2" /></svg>',
        'tower': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 200"><rect width="120" height="200" fill="%23d76d77" /><text x="60" y="100" font-family="serif" font-size="20" fill="gold" text-anchor="middle">塔</text><polygon points="50,40 70,40 65,120 55,120" fill="none" stroke="gold" stroke-width="2" /><line x1="40" y1="140" x2="80" y2="140" stroke="gold" stroke-width="2" /></svg>'
    },
    socialIcons: {
        twitter: `<svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
        </svg>`,
        facebook: `<svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M20.007 3H3.993C3.445 3 3 3.445 3 3.993v16.014c0 .548.445.993.993.993h8.621v-6.971h-2.346v-2.717h2.346V9.31c0-2.325 1.42-3.591 3.494-3.591.993 0 1.847.074 2.096.107v2.43h-1.438c-1.128 0-1.346.537-1.346 1.324v1.734h2.69l-.35 2.717h-2.34V21h4.587c.548 0 .993-.445.993-.993V3.993c0-.548-.445-.993-.993-.993z"></path>
        </svg>`,
        line: `<svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M21.727 10.909c0-4.495-4.505-8.152-10.045-8.152-5.541 0-10.045 3.657-10.045 8.152 0 4.027 3.572 7.397 8.399 8.035.327.070.773.215.886.494.101.255.066.651.032.908 0 0-.118.708-.144.858-.044.258-.203 1.008.881.549 1.085-.458 5.856-3.451 7.986-5.909h-.001c1.472-1.617 2.051-3.259 2.051-4.935zm-13.984 2.717h-1.634c-.238 0-.432-.193-.432-.432v-4.027c0-.238.194-.432.432-.432.239 0 .432.194.432.432v3.595h1.202c.239 0 .432.194.432.432 0 .238-.193.432-.432.432zm1.337.432c-.238 0-.432-.194-.432-.432v-4.027c0-.238.194-.432.432-.432.239 0 .432.194.432.432v4.027c0 .238-.193.432-.432.432zm3.939 0c-.238 0-.432-.194-.432-.432v-2.392l-1.338 1.805c-.04.056-.103.093-.171.108-.068.015-.139 0-.197-.04l-.015-.01-.015-.011c-.059-.046-.095-.111-.105-.184-.011-.072.006-.145.049-.201l1.663-2.24c.083-.112.199-.176.324-.176.235 0 .431.193.431.432v2.909c0 .238-.195.432-.432.432h-.001zm3.037-2.149c.239 0 .432.194.432.432 0 .238-.193.432-.432.432h-1.201v.853c0 .238-.194.432-.432.432-.239 0-.432-.194-.432-.432v-4.027c0-.238.193-.432.432-.432h1.633c.239 0 .432.194.432.432s-.193.432-.432.432h-1.201v.858h1.201z"></path>
        </svg>`
    }
};

// エクスポート
export { svgImages };