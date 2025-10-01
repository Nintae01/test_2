// Rain and lightning effect for redteam.html
(function rainAndLightning(){
  // Only run on redteam.html
  if (!/redteam\.html$/.test(window.location.pathname)) return;
  // Create rain canvas
  const rainCanvas = document.createElement('canvas');
  rainCanvas.id = 'rain';
  rainCanvas.style.position = 'fixed';
  rainCanvas.style.top = '0';
  rainCanvas.style.left = '0';
  rainCanvas.style.width = '100vw';
  rainCanvas.style.height = '100vh';
  rainCanvas.style.pointerEvents = 'none';
  rainCanvas.style.zIndex = '100';
  document.body.appendChild(rainCanvas);
  const ctx = rainCanvas.getContext('2d');
  let w = window.innerWidth, h = window.innerHeight, dpr = window.devicePixelRatio || 1;
  function resize(){
    w = window.innerWidth; h = window.innerHeight; dpr = window.devicePixelRatio || 1;
    rainCanvas.width = w * dpr; rainCanvas.height = h * dpr;
    rainCanvas.style.width = w + 'px'; rainCanvas.style.height = h + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  window.addEventListener('resize', resize);
  resize();
  // Rain drop array
  const drops = Array.from({length: Math.round(w/2)}, () => ({
    x: Math.random()*w,
    y: Math.random()*h,
    l: 12+Math.random()*18,
    v: 4+Math.random()*6
  }));
  // Lightning state
  let lightning = false, lightningAlpha = 0;
  function drawRain(){
    ctx.clearRect(0,0,w,h);
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    drops.forEach(d => {
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x, d.y+d.l);
    });
    ctx.stroke();
    // Animate drops
    drops.forEach(d => {
      d.y += d.v;
      if (d.y > h) {
        d.x = Math.random()*w;
        d.y = -d.l;
        d.l = 12+Math.random()*18;
        d.v = 4+Math.random()*6;
      }
    });
    // Lightning effect
    if (lightningAlpha > 0) {
      ctx.fillStyle = `rgba(255,255,255,${lightningAlpha})`;
      ctx.fillRect(0,0,w,h);
      lightningAlpha *= 0.85;
    }
    requestAnimationFrame(drawRain);
  }
  drawRain();
  // Random lightning
  setInterval(() => {
    if (Math.random() < 0.012) { // ~1.2% chance per 200ms
      lightningAlpha = 0.7 + Math.random()*0.3;
    }
  }, 200);
})();
