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
        imageUrl: 'https://via.placeholder.com/200x120?text=Pièce+1',
        id:       'Carter_arrière_batterie_16A.stl',
        techno:   'FDM',
        material: 'PLA',
        finish:   'Brut',
        color:    'Noir',
        inserts:  0,
        delay:    'standard',
        control:  false,
        orient:   true,
        qty:      1,
        unit:     198.41,
        total:    198.41
      },
      {
        imageUrl: 'https://via.placeholder.com/200x120?text=Pièce+2',
        id:       'Cache_carte_distrib_v2.stl',
        techno:   'SLA',
        material: 'Résine',
        finish:   'Poli',
        color:    'Blanc',
        inserts:  2,
        delay:    'fast',
        control:  true,
        orient:   false,
        qty:      3,
        unit:     45.00,
        total:    135.00
      },
      {
        imageUrl: 'https://via.placeholder.com/200x120?text=Pièce+3',
        id:       'Support_pied_vintage.step',
        techno:   'SLS',
        material: 'Nylon',
        finish:   'Normale',
        color:    'Gris',
        inserts:  1,
        delay:    'eco',
        control:  false,
        orient:   true,
        qty:      2,
        unit:     60.50,
        total:    121.00
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
      <td>${o.configs.reduce((acc,c)=>acc+c.total,0).toFixed(2)} €</td>
      <td><span class="status-label">${o.status}</span></td>
      <td><button onclick="showDetail(${i})">Voir détail</button></td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('backToList').onclick = () => {
    document.getElementById('orders-list').classList.remove('hidden');
    document.getElementById('order-detail').classList.add('hidden');
  };

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
  document.querySelectorAll('.step').forEach(el=>{
    el.classList.toggle('completed',
      steps.indexOf(el.dataset.step) <= steps.indexOf(o.status)
    );
  });
  // Vue
  document.getElementById('orders-list').classList.add('hidden');
  document.getElementById('order-detail').classList.remove('hidden');

  // Contenu
  const ctr = document.getElementById('config-detail-container');
  ctr.innerHTML = '';
  o.configs.forEach(c => {
    const tpl = document.getElementById('config-template');
    const clone = tpl.content.cloneNode(true);

    // Col 1
    const vw = clone.querySelector('.viewer');
    vw.innerHTML = `<img src="${c.imageUrl}" alt="${c.id}" style="max-width:100%;max-height:100%;">`;
    clone.querySelector('.filename').textContent = c.id;

    // Col 2
    clone.querySelector('input[name="techno"]').value   = c.techno;
    clone.querySelector('input[name="material"]').value = c.material;
    clone.querySelector('input[name="finish"]').value   = c.finish;
    clone.querySelector('input[name="color"]').value    = c.color;

    // Col 3
    clone.querySelector('input[name="inserts"]').value  = c.inserts;
    clone.querySelector(`.opt[data-type="${c.delay}"]`).classList.add('active');
    const chk = clone.querySelectorAll('.checks input');
    chk[0].checked = c.control;
    chk[1].checked = c.orient;

    // Col 4
    clone.querySelector('.quantity').value      = c.qty;
    clone.querySelector('.unit-price').textContent  = c.unit.toFixed(2);
    clone.querySelector('.total-price').textContent = c.total.toFixed(2);

    ctr.appendChild(clone);
  });
}
