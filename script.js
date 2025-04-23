// données factices
const orders = [
  {
    number: '5442315',
    date: '18/03/2025',
    deliveryDate: '25/03/2025',
    invoiceUrl: '#',
    trackingUrl: '#',
    status: 'delivered',
    configs: [
      {
        id: 'CFG-001',
        qty: 16,
        techno: 'Multi Jet Fusion',
        material: 'Ultra TPU 90A-01',
        finish: 'Normale',
        delay: 'Standard',
        thumbnail: 'https://via.placeholder.com/120?text=3D',
        dims: { x:120, y:65, z:10, volume:45.22 }
      },
      {
        id: 'CFG-002',
        qty: 5,
        techno: 'FDM',
        material: 'PLA',
        finish: 'Brut',
        delay: 'Eco',
        thumbnail: 'https://via.placeholder.com/120?text=3D',
        dims: { x:60, y:40, z:20, volume:12.50 }
      }
    ]
  }
];
const steps = ['validated','preparation','production','shipped','delivered'];

// Au chargement, on affiche la première commande pour le test
window.addEventListener('DOMContentLoaded', () => {
  showDetail(0);
});

// Affiche les détails de la commande #i
function showDetail(i) {
  const o = orders[i];
  document.getElementById('detailOrderNumber').textContent  = o.number;
  document.getElementById('detailOrderDate').textContent    = o.date;
  document.getElementById('detailDeliveryDate').textContent = o.deliveryDate;
  document.getElementById('invoiceLink').href               = o.invoiceUrl;
  document.getElementById('trackingLink').href              = o.trackingUrl;

  // barre de statut
  document.querySelectorAll('.step').forEach(el => {
    el.classList.toggle(
      'completed',
      steps.indexOf(el.dataset.step) <= steps.indexOf(o.status)
    );
  });

  // on injecte chaque mini-config
  const container = document.getElementById('configItems');
  container.innerHTML = '';
  o.configs.forEach(c => {
    const div = document.createElement('div');
    div.className = 'mini-config';
    div.innerHTML = `
      <div class="preview">
        <img src="${c.thumbnail}" alt="Aperçu pièce 3D">
        <p class="dims">
          ${c.dims.x} × ${c.dims.y} × ${c.dims.z} mm<br>
          Vol : ${c.dims.volume.toFixed(2)} cm³
        </p>
      </div>
      <div class="settings">
        <div><span class="label">Réf :</span><span class="value">${c.id}</span></div>
        <div><span class="label">Technologie :</span><span class="value">${c.techno}</span></div>
        <div><span class="label">Matériau :</span><span class="value">${c.material}</span></div>
        <div><span class="label">Finition :</span><span class="value">${c.finish}</span></div>
      </div>
      <div class="extras">
        <div class="qty"><span class="label">Quantité :</span> ${c.qty}</div>
        <div class="delay"><span class="label">Délai :</span> ${c.delay}</div>
      </div>
    `;
    container.appendChild(div);
  });
}
