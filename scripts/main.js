// main.js — ร้านไอติมท่าเรือ (เริ่มต้นสุด)
// หน้าที่: ใส่ปีอัตโนมัติที่ฟุตเตอร์ และเตรียมพื้นที่สำหรับสคริปต์อื่น ๆ

// รอให้ DOM โหลดเสร็จก่อนค่อยทำงาน
window.addEventListener('DOMContentLoaded', () => {
  // ตั้งค่าปีในฟุตเตอร์อัตโนมัติ
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // (ตัวเลือก) ลิงก์เมนูนำทางเลื่อนนุ่มนวล ถ้าเบราว์เซอร์รองรับ
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

(function(){
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

(function(){
  const id = 'toast-container';
  let box = document.getElementById(id);
  if (!box){
    box = document.createElement('div');
    box.id = id;
    document.body.appendChild(box);
  }

  window.showToast = function(message, subtext){
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = message + (subtext ? `<span class="small">${subtext}</span>` : '');
    box.appendChild(t);
    setTimeout(()=>{ t.remove(); }, 3500);
  };
})();

(function(){
  document.addEventListener('submit', function(e){
    const form = e.target.closest('.order-form');
    if (!form) return;
    e.preventDefault();

    const item = form.getAttribute('data-item') || 'ไอศกรีม';
    const sizeEl = form.querySelector('select[name="size"]');
    const qtyEl  = form.querySelector('input[name="qty"]');

    const price = Number(sizeEl.value || 0);
    const qty   = Math.max(1, Number(qtyEl.value || 1));
    const sizeLabel = sizeEl.selectedOptions[0].dataset.label || '';

    const total = price * qty;

    showToast('สั่งสำเร็จ 🎉', `${item} — ${sizeLabel} × ${qty} = ${total}฿`);
  });
})();
