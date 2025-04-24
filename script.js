// Données factices
const orders = [
  {
    number: '5442315',
    date: '18/03/2025',
    deliveryDate: '25/03/2025',
    invoiceUrl: '#',
    trackingUrl: '#',
    status: 'production',
    configs: [
      {
        imageUrl: 'https://via.placeholder.com/300x150',
        id:       'Carter_arrière_batterie_16A.stl',
        techno:   'FDM',
        material: 'PLA',
        finish:   'Brut',
        color:    'Noir',
        inserts:  0,
        dimX:     120.00,
        dimY:     65.00,
        dimZ:     10.00,
        vol:      45.22,
        delay:    'standard',
        dates: {
          fast:     'Mardi 29 Avril',
          standard: 'Mardi 29 Avril',
          eco:      'Mardi 29 Avril'
        },
        control:  false,
        orient:   true,
        qty:      1,
        unit:     198.41,
        total:    198.41
      },
      {
        imageUrl: 'https://via.placeholder.com/300x150',
        id:       'Cache_carte_distrib_v2.stl',
        techno:   'SLA',
        material: 'Résine',
        finish:   'Poli',
        color:    'Blanc',
        inserts:  2,
        dimX:     80.00,
        dimY:     80.00,
        dimZ:     15.00,
        vol:      60.00,
        delay:    'fast',
        dates: {
          fast:     'Mardi 29 Avril',
          standard: 'Mardi 29 Avril',
          eco:      'Mardi 29 Avril'
        },
        control:  true,
        orient:   false,
        qty:      3,
        unit:     45.00,
        total:    135.00
      }
    ]
  }
];
const steps = ['validated','preparation','production','shipped','delivered'];

window.addEventListener('DOMContentLoaded', () => {
  // Listing
  const tbody = document.getElementById('ordersTableBody');
  orders.forEach((o,i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${o.number}</td>
      <td>${o.date}</td>
      <td>${o.configs.reduce((sum,c)=>sum+c.total,0).toFixed(2)} €</td>
      <td><span class="status-label">${o.status}</span></td>
      <td><button onclick="showDetail(${i})">Voir détail</button></td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('backToList').onclick = () => {
    document.getElementById('orders-list').classList.remove('hidden');
    document.getElementById('order-detail').classList.add('hidden');
  };

  // Affiche par défaut
  showDetail(0);
});

function showDetail(idx) {
  const o = orders[idx];
  // Méta
  document.getElementById('detailOrderNumber').textContent  = o.number;
  document.getElementById('detailOrderDate').textContent    = o.date;
  document.getElementById('detailDeliveryDate').textContent = o.deliveryDate;
  document.getElementById('invoiceLink').href               = o.invoiceUrl;
  document.getElementById('trackingLink').href              = o.trackingUrl;
  // Statut
  document.querySelectorAll('.step').forEach(el => {
    el.classList.toggle(
      'completed',
      steps.indexOf(el.dataset.step) <= steps.indexOf(o.status)
    );
  });
  // Switch view
  document.getElementById('orders-list').classList.add('hidden');
  document.getElementById('order-detail').classList.remove('hidden');

  // Contenu
  const container = document.getElementById('config-detail-container');
  container.innerHTML = '';
  o.configs.forEach(c => {
    const tpl = document.getElementById('config-template');
    const clone = tpl.content.cloneNode(true
