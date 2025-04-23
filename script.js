// script.js: données factices + bascule liste ↔ détail

const orders = [
  {
    number: '5442315',
    date: '18/03/2025',
    deliveryDate: '25/03/2025',
    invoiceUrl: '#',
    trackingUrl: '#',
    status: 'delivered',
    total: 136.38,
    configs: [
      {
        id: 'CFG-001',
        qty: 16,
        techno: 'Multi Jet Fusion',
        material: 'Ultrastint TPU 90A-01',
        finish: 'Normale',
        delay: 'Standard',
        unitPrice: 8.36,
        totalPrice: 133.76
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
    configs: [
      {
        id: 'CFG-002',
        qty: 2,
        techno: 'FDM',
        material: 'PLA',
        finish: 'Brut',
        delay: 'Fast',
        unitPrice: 33.00,
        totalPrice: 66.00
      }
    ]
  }
];

const steps = ['validated','preparation','production','shipped','delivered'];

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
        <a href="#"><i class="material-icons">replay</i>Commander de nouveau</a>
        <a href="#"><i class="material-icons">feedback</i>Feedback</a>
      </td>
    `;
    tr.addEventListener('click', () => showDetail(i));
    tbody.appendChild(tr);
  });

  document.getElementById('backToList').addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('order-detail').classList.add('hidden');
    document.getElementById('orders-list').classList.remove('hidden');
    document.querySelector('.all-orders-btn').classList.remove('hidden');
  });
});

function showDetail(i) {
  const o = orders[i];
  document.getElementById('orders-list').classList.add('hidden');
  document.querySelector('.all-orders-btn').classList.add('hidden');
  const d = document.getElementById('order-detail');
  d.classList.remove('hidden');

  document.getElementById('detailOrderNumber').textContent = o.number;
  document.getElementById('detailOrderDate').textContent   = o.date;
  document.getElementById('detailDeliveryDate').textContent= o.deliveryDate;
  document.getElementById('invoiceLink').href              = o.invoiceUrl;
  document.getElementById('trackingLink').href             = o.trackingUrl;

  document.querySelectorAll('.step').forEach(el => {
    el.classList.remove('completed');
    if (steps.indexOf(el.dataset.step) <= steps.indexOf(o.status)) {
      el.classList.add('completed');
    }
  });

  const body = document.getElementById('configLinesBody');
  body.innerHTML = '';
  o.configs.forEach(cfg => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${cfg.id}</td><td>${cfg.qty}</td>
      <td>${cfg.techno}</td><td>${cfg.material}</td>
      <td>${cfg.finish}</td><td>${cfg.delay}</td>
      <td>${cfg.unitPrice.toFixed(2)}</td>
      <td>${cfg.totalPrice.toFixed(2)}</td>
    `;
    body.appendChild(tr);
  });
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
