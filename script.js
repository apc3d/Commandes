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
        imageUrl:      'https://via.placeholder.com/200x120',
        id:            'Carter_arrière_batterie_16A.stl',
        techno:        'FDM',
        material:      'PLA',
        finish:        'Brut',
        color:         'Noir',
        insertsCount:  0,
        delay:         'Standard',
        controlFile:   false,
        keepOrientation:true,
        qty:           1,
        unitPrice:     198.41,
        totalPrice:    198.41,
        dimX:          120.00,
        dimY:          65.00,
        dimZ:          10.00,
        volume:        45.22
      },
      // … ajoutez autant de configs que vous voulez …
    ]
  }
];
const steps = ['validated','preparation','production','shipped','delivered'];

window.addEventListener('DOMContentLoaded', () => {
  showDetail(0);
  document.getElementById('backToList').addEventListener('click', e => e.preventDefault());
});

function showDetail(i) {
  const o = orders[i];
  // méta + statut (inchangés)
  document.getElementById('detailOrderNumber').textContent  = o.number;
  document.getElementById('detailOrderDate').textContent    = o.date;
  document.getElementById('detailDeliveryDate').textContent = o.deliveryDate;
  document.getElementById('invoiceLink').href               = o.invoiceUrl;
  document.getElementById('trackingLink').href              = o.trackingUrl;
  document.querySelectorAll('.step').forEach(el => {
    el.classList.toggle('completed',
      steps.indexOf(el.dataset.step) <= steps.indexOf(o.status)
    );
  });

  const container = document.getElementById('config-detail-container');
  container.innerHTML = '';
  o.configs.forEach(c => {
    const tpl   = document.getElementById('config-template');
    const clone = tpl.content.cloneNode(true);

    // Aperçu
    const viewer = clone.querySelector('.viewer');
    viewer.innerHTML = `<img src="${c.imageUrl}"
                             alt="${c.id}"
                             style="max-width:100%;max-height:100%;">`;

    // Col 1 → ref + dimensions enlevées
    clone.querySelector('.filename').textContent = c.id;
    clone.querySelector('.dims')?.remove();

    // Col 2 → on remplace tout par des <p> noirs
    const col2 = clone.querySelector('.settings');
    col2.innerHTML = `
      <p class="setting-value">${c.techno}</p>
      <p class="setting-value">${c.material}</p>
      <p class="setting-value">${c.finish}</p>
      <p class="setting-value">${c.color}</p>
    `;

    // Col 3 → insert, cases, délai (inchangé, delay en orange naturellement)

    // Inserts
    clone.querySelector('.inserts-range').value       = c.insertsCount;
    clone.querySelector('.inserts-count').textContent = c.insertsCount;

    // Cases
    const checks = clone.querySelectorAll('.checks input');
    checks[0].checked = c.controlFile;
    checks[1].checked = c.keepOrientation;

    // Délai
    clone.querySelector(`.opt[data-type="${c.delay.toLowerCase()}"]`)
         .classList.add('active');

    // Col 4 → quantité, unité, total empilés
    clone.querySelector('.quantity').value          = c.qty;
    clone.querySelector('.unit-price').textContent  = c.unitPrice.toFixed(2);
    clone.querySelector('.total-price').textContent = c.totalPrice.toFixed(2);

    // suppression toolbar (déjà absente) et mini‐tableau
    clone.querySelector('.summary table')?.remove();

    // figer tout
    clone.querySelectorAll('select, input, .inserts-range, .opt').forEach(el => {
      el.setAttribute('disabled','');
      el.style.pointerEvents = 'none';
      el.style.opacity = '0.6';
    });

    container.appendChild(clone);
  });
}
