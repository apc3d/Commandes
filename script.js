// ... vos données factices orders[] et tableau steps[] ...

window.addEventListener('DOMContentLoaded', () => {
  // directement afficher le détail de la première commande pour le test
  showDetail(0);
});

function showDetail(i) {
  const o = orders[i];
  document.getElementById('detailOrderNumber').textContent  = o.number;
  document.getElementById('detailOrderDate').textContent    = o.date;
  document.getElementById('detailDeliveryDate').textContent = o.deliveryDate;
  document.getElementById('invoiceLink').href               = o.invoiceUrl;
  document.getElementById('trackingLink').href              = o.trackingUrl;

  // met à jour les pastilles
  document.querySelectorAll('.step').forEach(el => {
    el.classList.toggle(
      'completed',
      steps.indexOf(el.dataset.step) <= steps.indexOf(o.status)
    );
  });

  // injecte les lignes de configuration
  const cfgBody = document.getElementById('configLinesBody');
  cfgBody.innerHTML = '';
  o.configs.forEach(c => {
    cfgBody.insertAdjacentHTML('beforeend', `
      <tr>
        <td>${c.id}</td><td>${c.qty}</td><td>${c.techno}</td>
        <td>${c.material}</td><td>${c.finish}</td><td>${c.delay}</td>
        <td>${c.unitPrice.toFixed(2)}</td><td>${c.totalPrice.toFixed(2)}</td>
      </tr>`);
  });
}

// helper
function label(s){
  switch(s){
    case 'validated':   return 'Validée';
    case 'preparation': return 'En préparation';
    case 'production':  return 'En fabrication';
    case 'shipped':     return 'Expédiée';
    case 'delivered':   return 'Livrée';
    default:            return s;
  }
}
