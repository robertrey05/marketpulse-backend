module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { ticker, range = '3mo', interval = '1d' } = req.query;
  if (!ticker) return res.status(400).json({ error: 'ticker requerido' });

  const safe = ticker.replace(/[^A-Za-z0-9.\-^=]/g, '').toUpperCase();

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${safe}?interval=${interval}&range=${range}&includePrePost=false`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
