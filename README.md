# Market Pulse — Backend

Backend gratuito en Vercel que actúa de proxy para Yahoo Finance, eliminando las restricciones CORS.

## Despliegue en 3 pasos (≈5 minutos)

### 1. Sube el código a GitHub

1. Ve a [github.com](https://github.com) → New repository
2. Nombre: `marketpulse-backend`  
3. Visibilidad: **Public** (necesario para Vercel gratis)
4. Click **Create repository**
5. Sube estos archivos (arrastra y suelta, o usa la interfaz web de GitHub):
   - `api/stock.js`
   - `vercel.json`
   - `package.json`
   - `.gitignore`

### 2. Despliega en Vercel

1. Ve a [vercel.com](https://vercel.com) → **Sign up** con tu cuenta de GitHub (gratis)
2. Click **Add New → Project**
3. Selecciona el repo `marketpulse-backend`
4. Deja todo por defecto → click **Deploy**
5. Espera ~1 minuto. Vercel te dará una URL como:
   ```
   https://marketpulse-backend-xxxx.vercel.app
   ```
6. **Copia esa URL** — la necesitarás en el paso 3.

### 3. Configura Market Pulse

En la aplicación Market Pulse, haz click en el botón **"⚙ Configurar backend"** (arriba a la derecha) y pega tu URL de Vercel.

¡Listo! A partir de ahora todos los precios serán reales en tiempo real.

## ¿Cómo funciona?

```
Tu navegador → tu Vercel (sin CORS) → Yahoo Finance → datos reales
```

El backend es solo un proxy: no guarda ningún dato, no requiere autenticación, 
y Vercel ofrece 100.000 peticiones/mes gratis (más que suficiente).

## Endpoint

```
GET /api/stock?ticker=AAPL
GET /api/stock?ticker=AAPL&range=6mo&interval=1d
```

Rangos válidos: `1d`, `5d`, `1mo`, `3mo`, `6mo`, `1y`, `2y`, `5y`
Intervalos válidos: `1m`, `5m`, `15m`, `30m`, `60m`, `1d`, `1wk`, `1mo`
