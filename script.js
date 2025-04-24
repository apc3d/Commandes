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
        keepOrientation:false,
        qty:           16,
        unitPrice:     8.36,
        totalPrice:    133.76,
        dimX:          120.00,
        dimY:          65.00,
        dimZ:          10.00,
        volume:        45.22
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
        keepOrientation:true,
        qty:           5,
        unitPrice:     12.00,
        totalPrice:    60.00,
        dimX:          120.00,
        dimY:          65.00,
        dimZ:          10.00,
        volume:        45.22
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
        keepOrientation:true,
        qty:           2,
        unitPrice:     45.00,
        totalPrice:    90.00,
        dimX:          120.00,
        dimY:          65.00,
        dimZ:          10.00,
        volume:        45.22
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
        keepOrientation:false,
        qty:           2,
        unitPrice:     33.00,
        totalPrice:    66.00,
        dimX:          120.00,
        dimY:          65.00,
        dimZ:          10.00,
        volume:        45.22
      }
    ]
  }
];
const steps = ['validated','preparation','production','shipped','delivered'];

// ========== Initialisation de la liste ==========
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

// ========== Affichage du détail ==========
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

  // Conteneur de configs
  const detailContainer = document.getElementById('config-detail-container');
  detailContainer.innerHTML = '';

  o.configs.forEach(c => {
    // on clone le template de configuration (depuis la page de config initiale)
    const tpl = document.getElementById('config-template');
    const clone = tpl.content.cloneNode(true);

    // on remplit les valeurs
    clone.querySelector('.viewer img')?.setAttribute('src', c.imageUrl);
    clone.querySelector('.filename').textContent        = c.id;
    clone.querySelector('.dims').innerHTML = `
      Dimensions :<br>
      ${c.dimX.toFixed(2)} × ${c.dimY.toFixed(2)} × ${c.dimZ.toFixed(2)} mm<br>
      Volume : ${c.volume.toFixed(2)} cm³
    `;
    clone.querySelector('select[name="techno"]').value      = c.techno;
    clone.querySelector('select[name="material"]').value    = c.material;
    clone.querySelector('select[name="finish"]').value      = c.finish;
    clone.querySelector('select[name="color"]').value       = c.color;
    clone.querySelector('.inserts-range').value            = c.insertsCount;
    clone.querySelector('.inserts-count').textContent      = c.insertsCount;
    clone.querySelector(`.opt[data-type="${c.delay.toLowerCase()}"]`).classList.add('active');
    clone.querySelector('.quantity').value                 = c.qty;
    clone.querySelector('.unit-price').textContent         = c.unitPrice.toFixed(2);
    clone.querySelector('.total-price').textContent        = c.totalPrice.toFixed(2);
    clone.querySelectorAll('.checks input')[0].checked     = c.controlFile;
    clone.querySelectorAll('.checks input')[1].checked     = c.keepOrientation;

    // 1) on supprime la barre grise du bas
    const toolbar = clone.querySelector('.toolbar');
    toolbar && toolbar.remove();

    // 2) on supprime le mini‐tableau des prix
    const priceTable = clone.querySelector('.summary table');
    priceTable && priceTable.remove();

    // 3) on fige tous les champs
    clone.querySelectorAll('select, input, .inserts-range, .opt').forEach(el => {
      el.setAttribute('disabled','');
      el.style.pointerEvents = 'none';
      el.style.opacity = '0.6';
    });

    detailContainer.appendChild(clone);
  });
}

// bascule liste / détail
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
