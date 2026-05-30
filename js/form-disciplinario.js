// ============================================================
// js/form-disciplinario.js
// Lógica del formulario FO-RRHH-005
// ============================================================

let currentSection = 1;
const totalSections = 7;
const uploadedFiles = [];

// ── Progreso ──────────────────────────────────────────────
function renderProgress() {
  const container = document.getElementById('progress-steps');
  container.innerHTML = '';
  for (let i = 1; i <= totalSections; i++) {
    const el = document.createElement('div');
    el.className = 'step' + (i < currentSection ? ' done' : i === currentSection ? ' active' : '');
    container.appendChild(el);
  }
  document.getElementById('progress-label').textContent =
    `Sección ${currentSection} de ${totalSections}`;
}

// ── Validación por sección ────────────────────────────────
function validateSection(n) {
  let valid = true;
  const clear = ids => ids.forEach(id => document.getElementById(id)?.classList.remove('invalid'));
  const bad   = id  => { document.getElementById(id)?.classList.add('invalid'); valid = false; };
  const val   = id  => document.getElementById(id)?.value.trim() || '';
  const radio = name => !!document.querySelector(`input[name="${name}"]:checked`);

  if (n === 1) {
    clear(['f-nombre','f-empresa','f-local','f-cargo']);
    if (!val('nombre'))  bad('f-nombre');
    if (!val('empresa')) bad('f-empresa');
    if (!val('local'))   bad('f-local');
    if (!val('cargo'))   bad('f-cargo');
  }
  if (n === 2) {
    clear(['f-jefe','f-cargo-jefe','f-correo']);
    if (!val('jefe'))       bad('f-jefe');
    if (!val('cargo-jefe')) bad('f-cargo-jefe');
    const email = val('correo');
    if (!email || !email.includes('@')) bad('f-correo');
  }
  if (n === 3) {
    clear(['f-fecha','f-hora','f-lugar','f-detecto']);
    if (!val('fecha'))      bad('f-fecha');
    if (!val('hora'))       bad('f-hora');
    if (!val('lugar'))      bad('f-lugar');
    if (!radio('detecto'))  bad('f-detecto');
  }
  if (n === 4) {
    clear(['f-descripcion']);
    if (!val('descripcion')) bad('f-descripcion');
  }
  if (n === 5) {
    clear(['f-clasificacion','f-verbal']);
    if (!radio('clasificacion')) bad('f-clasificacion');
    if (!radio('verbal'))        bad('f-verbal');
  }
  if (n === 6) {
    clear(['f-evidencia']);
    if (!document.querySelectorAll('input[name="evidencia"]:checked').length) bad('f-evidencia');
  }
  return valid;
}

// ── Navegación ────────────────────────────────────────────
function goTo(n) {
  if (n > currentSection && !validateSection(currentSection)) return;
  document.getElementById('sec-' + currentSection).classList.remove('active');
  currentSection = n;
  document.getElementById('sec-' + n).classList.add('active');
  renderProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Eventos ───────────────────────────────────────────────
document.getElementById('empresa').addEventListener('change', function () {
  document.getElementById('empresa-otro').className =
    'other-input' + (this.value === 'otro' ? ' visible' : '');
});

document.getElementById('evidencia-otro-check').addEventListener('change', function () {
  document.getElementById('evidencia-otro').className =
    'other-input' + (this.checked ? ' visible' : '');
});

// ── Archivos ──────────────────────────────────────────────
function handleFiles(files) {
  const list = document.getElementById('file-list');
  Array.from(files).forEach(file => {
    uploadedFiles.push(file);
    const item = document.createElement('div');
    item.className = 'file-item';
    const size = (file.size / 1024 / 1024).toFixed(2);
    item.innerHTML = `
      <span>📎 ${file.name} <span style="color:#9CA3AF;font-size:12px">${size} MB</span></span>
      <button onclick="removeFile(this,'${file.name}')" title="Eliminar">✕</button>`;
    list.appendChild(item);
  });
}

function removeFile(btn, name) {
  const idx = uploadedFiles.findIndex(f => f.name === name);
  if (idx > -1) uploadedFiles.splice(idx, 1);
  btn.closest('.file-item').remove();
}

// ── IA: mejorar descripción ───────────────────────────────
async function mejorarDescripcion() {
  const texto = document.getElementById('descripcion').value.trim();
  if (!texto) { alert('Escribí primero una descripción para mejorar.'); return; }
  const loading = document.getElementById('ai-loading');
  const btn     = document.getElementById('btn-ai');
  loading.style.display = 'block';
  btn.disabled = true;
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `Sos un asistente de RRHH. Reescribí la siguiente descripción de un incidente laboral de forma objetiva, clara y formal. Solo hechos verificables, sin opiniones ni calificativos. Respondé SOLO con el texto mejorado:\n\n${texto}`
        }]
      })
    });
    const data = await res.json();
    const improved = data.content?.[0]?.text;
    if (improved) document.getElementById('descripcion').value = improved;
  } catch (e) {
    alert('No se pudo conectar con la IA. Intentá de nuevo.');
  }
  loading.style.display = 'none';
  btn.disabled = false;
}

// ── Recolectar datos del formulario ───────────────────────
function collectData() {
  const radio  = name => document.querySelector(`input[name="${name}"]:checked`)?.value || '';
  const checks = name => Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
    .map(c => c.value).filter(v => v !== 'otro').join(', ');

  const empresa = document.getElementById('empresa').value === 'otro'
    ? document.getElementById('empresa-otro').value
    : document.getElementById('empresa').value;

  const evidenciaOtro = document.getElementById('evidencia-otro-check').checked
    ? document.getElementById('evidencia-otro').value : '';
  const evidencia = [checks('evidencia'), evidenciaOtro].filter(Boolean).join(', ');

  return {
    nombre_trabajador:  document.getElementById('nombre').value,
    empresa,
    local_area:         document.getElementById('local').value,
    cargo_trabajador:   document.getElementById('cargo').value,
    nombre_jefe:        document.getElementById('jefe').value,
    cargo_jefe:         document.getElementById('cargo-jefe').value,
    correo_jefe:        document.getElementById('correo').value,
    fecha_suceso:       document.getElementById('fecha').value,
    hora_suceso:        document.getElementById('hora').value,
    lugar_suceso:       document.getElementById('lugar').value,
    deteccion:          radio('detecto'),
    descripcion:        document.getElementById('descripcion').value,
    clasificacion:      radio('clasificacion'),
    correccion_verbal:  radio('verbal'),
    evidencia,
    archivos_adjuntos:  uploadedFiles.map(f => f.name).join(', ') || null,
    estado:             'pendiente',
    fecha_envio:        new Date().toISOString()
  };
}

// ── Enviar formulario ─────────────────────────────────────
async function submitForm() {
  if (!document.getElementById('confirm').checked) {
    const errEl = document.getElementById('submit-error');
    errEl.textContent = 'Debés confirmar la declaración para enviar.';
    errEl.style.display = 'block';
    return;
  }
  document.getElementById('submit-error').style.display = 'none';

  const btn     = document.getElementById('btn-submit');
  const btnText = document.getElementById('btn-submit-text');
  const btnLoad = document.getElementById('btn-submit-loading');
  btn.disabled  = true;
  btnText.style.display = 'none';
  btnLoad.style.display = 'inline';

  try {
    const data = collectData();

    // Guardar en Supabase
    const { data: inserted, error } = await sbClient
      .from('medidas_disciplinarias')
      .insert([data])
      .select()
      .single();

    if (error) throw error;

    // Mostrar pantalla de éxito
    document.querySelectorAll('.form-section').forEach(s => s.style.display = 'none');
    document.querySelector('.progress-bar').style.display     = 'none';
    document.querySelector('.form-header-block').style.display = 'none';
    document.getElementById('success-screen').style.display   = 'block';

    const id = inserted?.id || '—';
    document.getElementById('solicitud-id').textContent = 'MD-' + String(id).padStart(5, '0');

  } catch (e) {
    const errEl = document.getElementById('submit-error');
    errEl.textContent = 'Ocurrió un error al enviar. Intentá de nuevo.';
    errEl.style.display = 'block';
    btn.disabled  = false;
    btnText.style.display = 'inline';
    btnLoad.style.display = 'none';
  }
}

// ── Reset ─────────────────────────────────────────────────
function resetForm() {
  document.querySelectorAll('input[type=text], input[type=email], input[type=date], input[type=time], textarea')
    .forEach(el => el.value = '');
  document.querySelectorAll('input[type=radio], input[type=checkbox]')
    .forEach(el => el.checked = false);
  document.querySelectorAll('select').forEach(el => el.selectedIndex = 0);
  document.getElementById('file-list').innerHTML = '';
  uploadedFiles.length = 0;

  document.getElementById('success-screen').style.display = 'none';
  document.querySelector('.progress-bar').style.display    = '';
  document.querySelector('.form-header-block').style.display = '';
  document.querySelectorAll('.form-section').forEach(s => {
    s.style.display = '';
    s.classList.remove('active');
  });

  currentSection = 1;
  document.getElementById('sec-1').classList.add('active');
  renderProgress();
  window.scrollTo({ top: 0 });
}

// ── Init ──────────────────────────────────────────────────
renderProgress();
