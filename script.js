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
        imageUrl:      'https://via.placeholder.com/120x80',
        id:            'Carter arrière batterie 16A.stl',
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
      }
    ]
  }
];
const steps = ['validated','preparation','production','shipped','delivered'];

window.addEventListener('DOMContentLoaded', () => {
  // on simule qu'on affiche directement la première commande
  showDetail(0);
  document.getElementById('backToList').addEventListener('click', e => {
    e.preventDefault();
    // ici vous pourriez revenir à la liste
  });
});

function showDetail(i) {
  const o = orders[i];
  // méta
  document.getElementById('detailOrderNumber').textContent  = o.number;
  document.getElementById('detailOrderDate').textContent    = o.date;
  document.getElementById('detailDeliveryDate').textContent = o.deliveryDate;
  document.getElementById('invoiceLink').href               = o.invoiceUrl;
  document.getElementById('trackingLink').href              = o.trackingUrl;
  // statut
  document.querySelectorAll('.step').forEach(el => {
    el.classList.toggle('completed',
      steps.indexOf(el.dataset.step) <= steps.indexOf(o.status)
    );
  });
  // contenu
  const container = document.getElementById('config-detail-container');
  container.innerHTML = '';
  o.configs.forEach(c => {
    const tpl   = document.getElementById('config-template');
    const clone = tpl.content.cloneNode(true);

    // aperçu
    const viewer = clone.querySelector('.viewer');
    const img    = document.createElement('img');
    img.src      = c.imageUrl;
    img.alt      = c.id;
    img.style.maxWidth = '100%';
    viewer.appendChild(img);

    // ref + dims
    clone.querySelector('.filename').textContent = c.id;
    clone.querySelector('.dims').innerHTML = `
      Dimensions :<br>
      ${c.dimX.toFixed(2)} × ${c.dimY.toFixed(2)} × ${c.dimZ.toFixed(2)} mm<br>
      Volume : ${c.volume.toFixed(2)} cm³
    `;

    // sélections
    clone.querySelector('select[name="techno"]').value   = c.techno;
    clone.querySelector('select[name="material"]').value = c.material;
    clone.querySelector('select[name="finish"]').value   = c.finish;
    clone.querySelector('select[name="color"]').value    = c.color;

    // inserts
    clone.querySelector('.inserts-range').value       = c.insertsCount;
    clone.querySelector('.inserts-count').textContent = c.insertsCount;

    // cases
    const checks = clone.querySelectorAll('.checks input');
    checks[0].checked = c.controlFile;
    checks[1].checked = c.keepOrientation;

    // délai
    clone.querySelector(`.opt[data-type="${c.delay.toLowerCase()}"]`).classList.add('active');

    // quantités & prix
    clone.querySelector('.quantity').value           = c.qty;
    clone.querySelector('.unit-price').textContent   = c.unitPrice.toFixed(2);
    clone.querySelector('.total-price').textContent  = c.totalPrice.toFixed(2);

    // — suppressions demandées —
    clone.querySelector('.toolbar')?.remove();             // pas de barre grise
    clone.querySelector('.summary table')?.remove();       // pas de mini-tableau

    // — figer les champs —
    clone.querySelectorAll('select, input, .inserts-range, .opt').forEach(el => {
      el.setAttribute('disabled','');
      el.style.pointerEvents = 'none';
      el.style.opacity       = '0.6';
    });

    container.appendChild(clone);
  });
}
