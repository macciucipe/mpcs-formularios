/* ============================================================
   MPC Soluciones · Portal de Formularios
   style.css
   ============================================================ */

:root {
  --navy:        #1B2B5E;
  --navy-dark:   #132044;
  --navy-light:  #EEF2FB;
  --accent:      #2E4DB0;
  --text:        #1a1a2e;
  --text-muted:  #6b7280;
  --border:      rgba(0,0,0,0.10);
  --border-md:   rgba(0,0,0,0.18);
  --bg:          #f5f6fa;
  --white:       #ffffff;
  --success:     #0F6E56;
  --success-bg:  #E1F5EE;
  --error:       #A32D2D;
  --error-bg:    #FCEBEB;
  --radius-sm:   6px;
  --radius-md:   8px;
  --radius-lg:   12px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  font-size: 15px;
  color: var(--text);
  background: var(--bg);
  line-height: 1.6;
  min-height: 100vh;
}

/* ── LOGIN ── */
.page-login {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  background: var(--bg);
}

.login-container { width: 100%; max-width: 380px; }

.login-header { text-align: center; margin-bottom: 2rem; }
.logo { display: inline-flex; align-items: baseline; gap: 6px; margin-bottom: 8px; }
.logo-mpc { font-size: 32px; font-weight: 800; color: var(--navy); letter-spacing: -1.5px; }
.logo-sol { font-size: 15px; font-weight: 500; color: var(--navy); opacity: 0.65; }
.login-subtitle { font-size: 14px; color: var(--text-muted); }

.login-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.login-card h2 { font-size: 17px; font-weight: 600; margin-bottom: 4px; }
.login-card > p { font-size: 13px; color: var(--text-muted); margin-bottom: 1.5rem; }

.login-footer { text-align: center; margin-top: 1rem; font-size: 13px; color: var(--text-muted); }

/* ── FIELDS ── */
.field { margin-bottom: 1rem; }
.field label { display: block; font-size: 13px; font-weight: 500; color: var(--text); margin-bottom: 5px; }
.field input, .field select, .field textarea {
  width: 100%; font-size: 14px; padding: 9px 12px;
  border: 1px solid var(--border-md); border-radius: var(--radius-md);
  background: var(--white); color: var(--text); outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  appearance: auto;
}
.field input:focus, .field select:focus, .field textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(46,77,176,0.1);
}
.field textarea { resize: vertical; min-height: 100px; line-height: 1.6; }
.field-hint { font-size: 12px; color: var(--text-muted); margin-top: 5px; }
.field-opt { font-size: 12px; font-weight: 400; color: var(--text-muted); }
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.req { color: var(--error); }

.other-input { display: none; margin-top: 8px; }
.other-input.visible { display: block; }

.radio-group, .check-group { display: flex; flex-direction: column; gap: 9px; margin-top: 6px; }
.radio-group label, .check-group label {
  display: flex; align-items: center; gap: 9px;
  font-size: 14px; font-weight: 400; cursor: pointer;
}
.radio-group input, .check-group input { accent-color: var(--navy); width: 16px; height: 16px; flex-shrink: 0; cursor: pointer; }

.error-msg { font-size: 12px; color: var(--error); margin-top: 4px; display: none; }
.field.invalid input, .field.invalid select, .field.invalid textarea { border-color: var(--error); }
.field.invalid .error-msg { display: block; }

/* ── INPUT PASSWORD ── */
.input-password { position: relative; }
.input-password input { padding-right: 40px; }
.toggle-pass {
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  background: none; border: none; cursor: pointer; color: var(--text-muted);
  display: flex; align-items: center; padding: 0;
}

/* ── BUTTONS ── */
.btn {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 14px; font-weight: 500; padding: 9px 18px;
  border-radius: var(--radius-md); cursor: pointer;
  border: 1px solid var(--border-md); background: var(--white); color: var(--text);
  transition: background 0.15s, transform 0.1s;
  text-decoration: none;
}
.btn:hover { background: var(--bg); }
.btn:active { transform: scale(0.98); }
.btn-primary { background: var(--navy); color: #fff; border-color: var(--navy); }
.btn-primary:hover { background: var(--navy-dark); border-color: var(--navy-dark); }
.btn-ghost { border-color: transparent; color: var(--text-muted); }
.btn-ghost:hover { background: var(--bg); }
.btn-full { width: 100%; justify-content: center; margin-top: 1rem; padding: 11px; }

/* ── ALERTS ── */
.alert { font-size: 13px; padding: 10px 14px; border-radius: var(--radius-md); margin-bottom: 1rem; }
.alert-error { background: var(--error-bg); color: var(--error); border: 1px solid rgba(163,45,45,0.2); }
.alert-success { background: var(--success-bg); color: var(--success); border: 1px solid rgba(15,110,86,0.2); }

/* ── PORTAL HEADER ── */
.portal-header {
  background: var(--navy);
  padding: 0 2rem;
  height: 56px;
  display: flex; align-items: center; justify-content: space-between;
  position: sticky; top: 0; z-index: 100;
}
.portal-logo { display: flex; align-items: baseline; gap: 6px; }
.logo-mpc-sm { font-size: 18px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
.logo-divider { color: rgba(255,255,255,0.3); font-size: 14px; }
.logo-section { font-size: 13px; color: rgba(255,255,255,0.65); font-weight: 400; }
.portal-user { display: flex; align-items: center; gap: 10px; }
.avatar {
  width: 30px; height: 30px; border-radius: 50%;
  background: rgba(255,255,255,0.15);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 600; color: #fff;
}
.user-name { font-size: 13px; color: rgba(255,255,255,0.8); }
.btn-logout {
  background: none; border: none; cursor: pointer;
  color: rgba(255,255,255,0.5); display: flex; align-items: center;
  padding: 4px; border-radius: var(--radius-sm);
  transition: color 0.15s;
}
.btn-logout:hover { color: #fff; }

/* ── PORTAL MAIN ── */
.portal-main { max-width: 720px; margin: 0 auto; padding: 2rem 1.5rem 4rem; }

.welcome-block { margin-bottom: 1.75rem; }
.welcome-block h1 { font-size: 22px; font-weight: 600; }
.welcome-block p { font-size: 14px; color: var(--text-muted); margin-top: 3px; }

/* ── FORMS GRID ── */
.forms-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

.form-card {
  background: var(--white); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 1.25rem;
  display: flex; flex-direction: column; gap: 10px;
  transition: box-shadow 0.15s, border-color 0.15s;
  text-decoration: none; color: inherit;
}
.form-card--active { border-left: 3px solid var(--navy); cursor: pointer; }
.form-card--active:hover { box-shadow: 0 4px 12px rgba(27,43,94,0.1); border-color: var(--accent); }
.form-card--coming { opacity: 0.5; cursor: default; }

.form-card-icon {
  width: 36px; height: 36px; border-radius: var(--radius-md);
  background: var(--navy-light); display: flex; align-items: center; justify-content: center;
  color: var(--navy);
}
.form-card--coming .form-card-icon { background: var(--bg); color: var(--text-muted); }

.form-card-body h3 { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.form-card-body p  { font-size: 13px; color: var(--text-muted); line-height: 1.5; }

.form-card-footer {
  display: flex; align-items: center; gap: 8px;
  padding-top: 10px; border-top: 1px solid var(--border);
  margin-top: auto;
}
.form-card-footer svg { margin-left: auto; color: var(--navy); }
.form-code { font-size: 11px; color: var(--text-muted); margin-left: auto; margin-right: 4px; }

/* ── BADGES ── */
.badge { font-size: 11px; font-weight: 500; padding: 3px 9px; border-radius: 20px; }
.badge-rrhh    { background: var(--navy-light); color: var(--navy); }
.badge-compras { background: #FEF3C7; color: #92400E; }
.badge-general { background: #F3F4F6; color: #374151; }
.badge-soon    { background: #F3F4F6; color: #9CA3AF; }

/* ── PORTAL FOOTER ── */
.portal-footer { text-align: center; padding: 2rem; font-size: 12px; color: var(--text-muted); }

/* ── FORM TOPBAR ── */
.form-topbar {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 1.5rem; flex-wrap: wrap;
}
.back-link {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 13px; color: var(--text-muted); text-decoration: none;
  transition: color 0.15s;
}
.back-link:hover { color: var(--navy); }
.form-topbar-title { font-size: 15px; font-weight: 600; }

/* ── FORM WRAP ── */
.form-wrap { max-width: 620px; }

.form-header-block {
  background: var(--navy-light); border-left: 3px solid var(--navy);
  padding: 12px 16px; border-radius: 0 var(--radius-md) var(--radius-md) 0;
  margin-bottom: 1.5rem;
}
.form-header-block p { font-size: 13px; color: var(--navy); line-height: 1.6; }

/* ── PROGRESS ── */
.progress-bar { display: flex; align-items: center; gap: 8px; margin-bottom: 2rem; }
.progress-steps { display: flex; gap: 5px; flex: 1; }
.progress-steps .step { height: 4px; flex: 1; border-radius: 2px; background: var(--border); transition: background 0.3s; }
.progress-steps .step.done   { background: var(--navy); }
.progress-steps .step.active { background: var(--accent); }
.progress-label { font-size: 12px; color: var(--text-muted); white-space: nowrap; }

/* ── FORM SECTIONS ── */
.form-section { display: none; }
.form-section.active { display: block; }
.section-title {
  font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--accent); margin-bottom: 1.25rem;
}

/* ── FORM NAV ── */
.form-nav {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 1.75rem; padding-top: 1.25rem; border-top: 1px solid var(--border);
}

/* ── AI BUTTON ── */
.btn-ai {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; padding: 5px 12px; margin-top: 8px;
  border-radius: var(--radius-md); border: 1px solid #AFA9EC;
  background: #EEEDFE; color: #3C3489; cursor: pointer;
  transition: background 0.15s;
}
.btn-ai:hover { background: #CECBF6; }
.ai-loading { font-size: 12px; color: var(--accent); margin-top: 6px; display: none; }

/* ── FILE DROP ── */
.file-drop {
  border: 1px dashed var(--border-md); border-radius: var(--radius-md);
  padding: 1.5rem; text-align: center; cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}
.file-drop:hover { border-color: var(--navy); background: var(--navy-light); }
.file-drop svg { color: var(--text-muted); margin-bottom: 8px; }
.file-drop p { font-size: 13px; color: var(--text-muted); }
.file-drop-sub { font-size: 11px; margin-top: 4px; }
.file-drop input[type=file] { display: none; }

.file-list { margin-top: 10px; display: flex; flex-direction: column; gap: 6px; }
.file-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 7px 12px; background: var(--bg); border-radius: var(--radius-md);
  font-size: 13px;
}
.file-item button { background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 16px; line-height: 1; }
.file-item button:hover { color: var(--error); }

/* ── DECLARATION ── */
.declaration-box {
  background: var(--bg); border-left: 3px solid var(--navy);
  padding: 1rem 1.25rem; border-radius: 0 var(--radius-md) var(--radius-md) 0;
  margin-bottom: 1.25rem;
}
.declaration-box strong { display: block; font-size: 13px; margin-bottom: 6px; }
.declaration-box p { font-size: 13px; color: var(--text-muted); line-height: 1.7; }

.confirm-row { display: flex; align-items: flex-start; gap: 10px; }
.confirm-row input { margin-top: 3px; accent-color: var(--navy); width: 16px; height: 16px; flex-shrink: 0; cursor: pointer; }
.confirm-row label { font-size: 13px; color: var(--text-muted); line-height: 1.6; cursor: pointer; }

/* ── SUCCESS ── */
.success-screen { text-align: center; padding: 3rem 1rem; }
.success-icon { color: var(--success); margin-bottom: 1rem; }
.success-screen h2 { font-size: 20px; font-weight: 600; margin-bottom: 8px; }
.success-screen p { font-size: 14px; color: var(--text-muted); }
.success-actions { display: flex; gap: 10px; justify-content: center; margin-top: 1.75rem; }

/* ── RESPONSIVE ── */
@media (max-width: 580px) {
  .forms-grid { grid-template-columns: 1fr; }
  .field-row  { grid-template-columns: 1fr; }
  .portal-header { padding: 0 1rem; }
  .portal-main { padding: 1.25rem 1rem 3rem; }
  .user-name { display: none; }
}
