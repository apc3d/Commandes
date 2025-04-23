// Quantité / prix
const qtyInput   = document.getElementById('quantity'),
      unitPriceEl  = document.getElementById('unit-price'),
      totalPriceEl = document.getElementById('total-price');

function updatePrices() {
  let q = parseInt(qtyInput.value) || 1;
  qtyInput.value = q;
  const up = parseFloat(unitPriceEl.textContent);
  const total = (q * up).toFixed(2);
  totalPriceEl.textContent = total + ' €';
}
qtyInput.addEventListener('change', updatePrices);

// Inserts
const slider = document.getElementById('insertsRange'),
      count  = document.getElementById('insertsCount');
slider.addEventListener('input', e => {
  count.textContent = e.target.value;
});

// Délai
document.querySelectorAll('.opt').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.opt').forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
  });
});

// Initialisation prix
updatePrices();
