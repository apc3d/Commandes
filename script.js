// ========== Données factices ==========
const orders = [
  {
    number: '5442315',
    date: '18/03/2025',
    deliveryDate: '25/03/2025',
    invoiceUrl: '#',
    trackingUrl: '#',
    status: 'delivered',
    total: 136.38,
    details: { piecesPrice:133.76, discount:-13.38, shippingCost:16.00, vat:27.28 },
    configs: [
      // Chaque objet doit contenir maintenant toutes les clés utilisées ci-dessous
      {
        imageUrl:      'https://via.placeholder.com/60', 
        id:            'CFG-001',
        techno:        'Multi Jet Fusion',
        material:      'TPU 90A-01',
        finish:        'Normale',
        color:         'Gris',
        insertsCount:  2,
        delay:         'Standard',
        controlFile:   true,
        keepOrientation: false,
        qty:           16,
        unitPrice:     8.36,
        totalPrice:    133.76
      },
      {
        imageUrl:      'https://via.placeholder.com/60',
        id:            'CFG-002',
        techno:        'FDM',
        material:      'PLA',
        finish:        'Brut',
        color:         'Blanc',
        insertsCount:  0,
        delay:         'Eco',
        controlFile:   false,
        keepOrientation: true,
        qty:           5,
        unitPrice:     12.00,
        totalPrice:    60.00
      },
      {
        imageUrl:      'https://via.placeholder.com/60',
        id:            'CFG-003',
        techno:        'SLA',
        material:      'Résine',
        finish:        'Poli',
        color:         'Noir',
        insertsCount:  1,
        delay:         'Fast',
        controlFile:   true,
        keepOrientation: true,
        qty:           2,
        unitPrice:     45.00,
        totalPrice:    90.00
      }
    ]
  },
  {
    number: '5364724',
    date: '28/11/2024',
    deliveryDate: '05/12/2024',
    invoiceUrl: '#',
    trackingUrl: '#',
    status: 'shipped',
    total: 66.00,
    details: { piecesPrice:66.00, discount:0, shippingCost:0, vat:13.20 },
    configs: [
      {
        imageUrl:      'https://via.placeholder.com/60',
        id:            'CFG-004',
        techno:        'FDM',
        material:      'PLA',
        finish:        'Brut',
        color:         'Noir',
        insertsCount:  3,
        delay:         'Fast',
        controlFile:   false,
        keepOrientation: false,
        qty:           2,
        unitPrice:     33.00,
        totalPrice:    66.00
      }
    ]
  }
];
const steps = ['validated','preparation','production','shipped','delivered'];

// ========== Initialisation ==========
window.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('ordersTableBody');
  orders.forEach((o,i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${o.number}</td>
      <td>${o.date}</td>
      <td>${o.total.toFixed(2)} €</td>
      <td><span class="status-label">${label(o.status)}</span></td>
      <td class="actions">
        <a href="#"><i class="material-icons">replay</i> Commander à nouveau</a>
        <a href="#"><i class="material-icons">feedback</i> Feedback</a>
      </td>
    `;
    tr.addEventListener('click', () => showDetail(i));
    tbody.appendChild(tr);
  });

  document.getElementById('backToList').addEventListener('click', e => {
    e.preventDefault();
    toggleView('list');
  });
});

// ========== Affichage du détail inline ==========
function showDetail(i) {
  const o = orders[i];
  toggleView('detail');

  // Méta-infos
  document.getElementById('detailOrderNumber').textContent  = o.number;
  document.getElementById('detailOrderDate').textContent    = o.date;
  document.getElementById('detailDeliveryDate').textContent = o.deliveryDate;
  document.getElementById('invoiceLink').href               = o.invoiceUrl;
  document.getElementById('trackingLink').href              = o.trackingUrl;

  // Barre de statut
  document.querySelectorAll('.step').forEach(el => {
    el.classList.toggle('completed',
      steps.indexOf(el.dataset.step) <= steps.indexOf(o.status)
    );
  });

  // Lignes de config – toutes les infos conservées
  const cfgBody = document.getElementById('configLinesBody');
  cfgBody.innerHTML = '';
  o.configs.forEach(c => {
    cfgBody.insertAdjacentHTML('beforeend', `
      <tr>
        <td>
          <img src="${c.imageUrl}"
               alt="aperçu ${c.id}"
               style="max-height:60px; object-fit:contain;" />
        </td>
        <td>${c.id}</td>
        <td>${c.techno}</td>
        <td>${c.material}</td>
        <td>${c.finish}</td>
        <td>${c.color}</td>
        <td>${c.insertsCount}</td>
        <td>${c.delay}</td>
        <td>${c.controlFile ? 'Oui' : 'Non'}</td>
        <td>${c.keepOrientation ? 'Oui' : 'Non'}</td>
        <td>${c.qty}</td>
        <td>${c.unitPrice.toFixed(2)}</td>
        <td>${c.totalPrice.toFixed(2)}</td>
      </tr>
    `);
  });
}

// Show/Hide list vs detail
function toggleView(view) {
  document.getElementById('orders-list').classList.toggle('hidden', view === 'detail');
  document.getElementById('order-detail').classList.toggle('hidden', view !== 'detail');
}

function label(s) {
  switch(s) {
    case 'validated':   return 'Validée';
    case 'preparation': return 'En préparation';
    case 'production':  return 'En fabrication';
    case 'shipped':     return 'Expédiée';
    case 'delivered':   return 'Livrée';
    default:            return s;
  }
}
