// données factices avec plusieurs configs
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
        imageUrl:      'https://via.placeholder.com/200x120?text=1',
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
      {
        imageUrl:      'https://via.placeholder.com/200x120?text=2',
        id:            'Cache_carte_distrib_v2.stl',
        techno:        'SLA',
        material:      'Résine',
        finish:        'Poli',
        color:         'Blanc',
        insertsCount:  2,
        delay:         'Fast',
        controlFile:   true,
        keepOrientation:false,
        qty:           3,
        unitPrice:     45.00,
        totalPrice:    135.00,
        dimX:          80.00,
        dimY:          80.00,
        dimZ:          15.00,
        volume:        60.00
      },
      {
        imageUrl:      'https://via.placeholder.com/200x120?text=3',
        id:            'Support_pied_vintage.step',
        techno:        'SLS',
        material:      'Nylon',
        finish:        'Normale',
        color:         'Gris',
        insertsCount:  1,
        delay:         'Eco',
        controlFile:   false,
        keepOrientation:true,
        qty:           2,
        unitPrice:     60.50,
        totalPrice:    121.00,
        dimX:          50.00,
        dimY:          100.00,
        dimZ:          20.00,
        volume:        80.00
      }
    ]
  }
];
const steps = ['validated','preparation','production','shipped','delivered'];

window.addEventListener('DOMContentLoaded', () => {
  showDetail(0);
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

  const container = document.getElementById('config-detail-container');
  container.innerHTML = '';
  o.configs.forEach(c => {
    const tpl   = document.getElementById('config-template');
    const clone = tpl.content.cloneNode(true);

    // Col 1 : aperçu & ref
    const viewer = clone.querySelector('.viewer');
    viewer.innerHTML = `<img src="${c.imageUrl}" alt="" style="max-width:100%;max-height:100%;" />`;
    clone.querySelector('.filename').textContent = c.id;
    clone.querySelector('.dims')?.remove();

    // Col 2 : encadré noir, sans titres, un peu d'espace
    const settings = clone.querySelector('.settings');
    settings.innerHTML = `
      <p class="setting-value">${c.techno}</p>
      <p class="setting-value">${c.material}</p>
      <p class="setting-value">${c.finish}</p>
      <p class="setting-value">${c.color}</p>
    `;

    // Col 3 : inserts / délai / checks (juste remettre les valeurs)
    clone.querySelector('.inserts-range').value       = c.insertsCount;
    clone.querySelector('.inserts-count').textContent = c.insertsCount;
    const checks = clone.querySelectorAll('.checks input');
    checks[0].checked = c.controlFile;
    checks[1].checked = c.keepOrientation;
    clone.querySelector(`.opt[data-type="${c.delay.toLowerCase()}"]`)
         .classList.add('active');

    // Col 4 : empilement vertical, espacement uniforme
    clone.querySelector('.quantity').value          = c.qty;
    clone.querySelector('.unit-price').textContent  = c.unitPrice.toFixed(2);
    clone.querySelector('.total-price').textContent = c.totalPrice.toFixed(2);

    // figer tout
    clone.querySelectorAll('select, input, .inserts-range, .opt').forEach(el => {
      el.setAttribute('disabled','');
    });

    container.appendChild(clone);
  });
}
