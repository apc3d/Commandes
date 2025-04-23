// données factices pour valider le visuel
const orders = [
  {
    number: '5442315',
    date: '18/03/2025',
    deliveryDate: '25/03/2025',
    shippingAddress: 'APC3D SARL, ZA Les Grèzes, 12260 Villeneuve, France',
    billingAddress: 'APC3D SARL, 12 Rue du Print, 12260 Villeneuve, France',
    paymentMethod: 'Carte Bancaire',
    invoiceUrl: '#',
    trackingUrl: '#',
    status: 'delivered',
    total: 136.38,
    details: {
      piecesPrice: 133.76,
      discount: -13.38,
      shippingCost: 16.00,
      vat: 27.28
    },
    configs: [
      { id:'CFG-001', qty:16, techno:'Multi Jet Fusion', material:'TPU 90A-01', finish:'Normale', delay:'Standard', unitPrice:8.36, totalPrice:133.76 },
      { id:'CFG-002', qty:5,  techno:'FDM',             material:'PLA',       finish:'Brut',    delay:'Eco',      unitPrice:12.00,totalPrice:60.00  },
      { id:'CFG-003', qty:2,  techno:'SLA',             material:'Résine',    finish:'Poli',    delay:'Fast',     unitPrice:45.00,totalPrice:90.00  }
    ]
  },
  {
    number: '5364724',
    date: '28/11/2024',
    deliveryDate: '05/12/2024',
    shippingAddress: 'APC3D, 1 Avenue Demo, 75000 Paris',
    billingAddress: 'APC3D, 1 Avenue Demo, 75000 Paris',
    paymentMethod: 'PayPal',
    invoiceUrl: '#',
    trackingUrl: '#',
    status: 'shipped',
    total: 66.00,
    details: {
      piecesPrice: 66.00,
      discount: 0,
      shippingCost: 0,
      vat: 13.20
    },
    configs: [
      { id:'CFG-004', qty:2, techno:'FDM', material:'PLA', finish:'Brut', delay:'Fast', unitPrice:33.00, totalPrice:66.00 }
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
});

// Affiche le détail (dans un modal JS ou nouvelle page ?)
// ici on reste en SPA : 
function showDetail(i) {
  const o = orders[i];
  // on pourrait rediriger vers detail.html?id=...
  // pour l’instant on fait un simple alert pour valider visuel
  let html = `Commande ${o.number}\n\n`;
  html += `Date : ${o.date}\n`;
  html += `Délai : ${o.deliveryDate}\n`;
  html += `Adresse livraison : ${o.shippingAddress}\n`;
  html += `Adresse facturation : ${o.billingAddress}\n`;
  html += `Paiement : ${o.paymentMethod}\n\n`;
  html += `-- Produits --\n`;
  o.configs.forEach(cfg => {
    html += `${cfg.id} • ${cfg.qty}× ${cfg.techno}/${cfg.material}/${cfg.finish} à ${cfg.unitPrice}€ → ${cfg.totalPrice}€\n`;
  });
  html += `\n-- Récap --\n`;
  html += `Prix pièces : ${o.details.piecesPrice}€\n`;
  html += `Remise en ligne : ${o.details.discount}€\n`;
  html += `Livraison : ${o.details.shippingCost}€\n`;
  html += `TVA : ${o.details.vat}€\n`;
  html += `TOTAL : ${o.total.toFixed(2)}€`;
  alert(html);
}

function label(s) {
  switch(s) {
    case 'validated': return 'Validée';
    case 'preparation': return 'En préparation';
    case 'production': return 'En fabrication';
    case 'shipped': return 'Expédiée';
    case 'delivered': return 'Livrée';
    default: return s;
  }
}
