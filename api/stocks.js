// api/stock.js — Vercel Serverless Function
// Proxy para Yahoo Finance sin restricciones CORS

export default async function handler(req, res) {
  // CORS: permite peticiones desde cualquier origen (tu artefacto de claude.ai)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { ticker, range = '3mo', interval = '1d' } = req.query;
  if (!ticker) return res.status(400).json({ error: 'ticker requerido' });

  // Sanitizar ticker
  const safe = ticker.replace(/[^A-Za-z0-9.\-^=]/g, '').toUpperCase();

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${safe}?interval=${interval}&range=${range}&includePrePost=false`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Yahoo devolvió ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    console.error('Error fetching', safe, err.message);
    return res.status(500).json({ error: err.message });
  }
}
