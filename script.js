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
      { id:'CFG-001', qty:16, techno:'Multi Jet Fusion', material:'TPU 90A-01', finish:'Normale', delay:'Standard', unitPrice:8.36, totalPrice:133.76 },
      { id:'CFG-002', qty:5,  techno:'FDM', material:'PLA', finish:'Brut',    delay:'Eco',      unitPrice:12.00, totalPrice:60.00   },
      { id:'CFG-003', qty:2,  techno:'SLA', material:'Résine', finish:'Poli',   delay:'Fast',     unitPrice:45.00, totalPrice:90.00   }
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
      { id:'CFG-004', qty:2, techno:'FDM', material:'PLA', finish:'Brut', delay:'Fast', unitPrice:33.00, totalPrice:66.00 }
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

  // Retour à la liste
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

  // Lignes de config
  const cfgBody = document.getElementById('configLinesBody');
  cfgBody.innerHTML = '';
  o.configs.forEach(c => {
    cfgBody.insertAdjacentHTML('beforeend', `
      <tr>
        <td>${c.id}</td>
        <td>${c.qty}</td>
        <td>${c.techno}</td>
        <td>${c.material}</td>
        <td>${c.finish}</td>
        <td>${c.delay}</td>
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
