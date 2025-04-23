// données factices
const orders = [
  {
    number: '5442315',
    date: '18/03/2025',
    deliveryDate: '25/03/2025',
    status: 'delivered',
    configs: [
      {
        id: 'CFG-001',
        qty: 16,
        techno: 'Multi Jet Fusion',
        material: 'Ultra TPU 90A-01',
        finish: 'Normale',
        inserts: 2,
        delay: 'Standard',
        unitPrice: 8.36,
        thumbnail: 'https://via.placeholder.com/120?text=3D',
        dims: { x:120, y:65, z:10, volume:45.22 }
      }
      // … vous pouvez ajouter d’autres configs
    ]
  }
];
const steps = ['validated','preparation','production','shipped','delivered'];

window.addEventListener('DOMContentLoaded', () => {
  showDetail(0);
});

// affiche la commande #i
function showDetail(i) {
  const o = orders[i];
  document.getElementById('detailOrderNumber').textContent = o.number;
  document.getElementById('detailOrderDate').textContent = o.date;
  document.getElementById('detailDeliveryDate').textContent = o.deliveryDate;

  // statut
  document.querySelectorAll('.step').forEach(el => {
    el.classList.toggle(
      'completed',
      steps.indexOf(el.dataset.step) <= steps.indexOf(o.status)
    );
  });

  // injecte chaque panel
  const list = document.getElementById('configItems');
  list.innerHTML = '';
  o.configs.forEach(c => {
    const panel = document.createElement('div');
    panel.className = 'panel';

    panel.innerHTML = `
      <div class="preview">
        <img src="${c.thumbnail}" alt="Aperçu pièce 3D">
        <div class="ref">Réf : ${c.id}</div>
        <p class="dims">
          ${c.dims.x} × ${c.dims.y} × ${c.dims.z} mm<br>
          Vol : ${c.dims.volume.toFixed(2)} cm³
        </p>
      </div>

      <div class="settings">
        <div class="field">
          <span class="label">Technologie</span>
          <span class="value">${c.techno}</span>
        </div>
        <div class="field">
          <span class="label">Matériaux</span>
          <span class="value">${c.material}</span>
        </div>
        <div class="field">
          <span class="label">Finition</span>
          <span class="value">${c.finish}</span>
        </div>
      </div>

      <div class="extras">
        <div class="slider-container">
          <input type="range" min="0" max="50" value="${c.inserts}" disabled>
          <span>${c.inserts}</span>
        </div>
        <div class="delay">
          <span class="label">Délai</span> ${c.delay}
        </div>
      </div>

      <div class="summary">
        <div class="current">
          <div class="field-label">Quantité</div>
          <div class="field-value">${c.qty}</div>
          <div class="field-label">Unité (EUR)</div>
          <div class="field-value">${c.unitPrice.toFixed(2)}</div>
          <div class="field-label">Total (EUR)</div>
          <div class="field-value">${(c.qty*c.unitPrice).toFixed(2)}</div>
        </div>
      </div>
    `;
    list.appendChild(panel);
  });
}
