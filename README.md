# MPC Soluciones · Portal de Formularios

Portal interno de formularios para el Grupo Empresarial MPC.

## Estructura del proyecto

```
mpcs-formularios/
├── index.html                      ← Login (mpcs.pe/formularios)
├── css/
│   └── style.css
├── js/
│   ├── config.js                   ← Configuración Supabase (completar)
│   ├── auth.js                     ← Funciones de autenticación
│   └── form-disciplinario.js       ← Lógica del formulario RRHH
└── pages/
    ├── formularios.html            ← Dashboard de formularios
    └── medida-disciplinaria.html   ← Formulario FO-RRHH-005
```

---

## Setup paso a paso

### 1. Crear proyecto en Supabase

1. Ir a [supabase.com](https://supabase.com) y crear un proyecto
2. Ir a **Settings → API** y copiar:
   - `Project URL`
   - `anon public` key
3. Pegar esos valores en `js/config.js`

### 2. Crear tabla en Supabase

Ir a **SQL Editor** y ejecutar:

```sql
CREATE TABLE medidas_disciplinarias (
  id                  SERIAL PRIMARY KEY,
  nombre_trabajador   TEXT NOT NULL,
  empresa             TEXT NOT NULL,
  local_area          TEXT NOT NULL,
  cargo_trabajador    TEXT NOT NULL,
  nombre_jefe         TEXT NOT NULL,
  cargo_jefe          TEXT NOT NULL,
  correo_jefe         TEXT NOT NULL,
  fecha_suceso        DATE NOT NULL,
  hora_suceso         TIME NOT NULL,
  lugar_suceso        TEXT NOT NULL,
  deteccion           TEXT NOT NULL,
  descripcion         TEXT NOT NULL,
  clasificacion       TEXT NOT NULL,
  correccion_verbal   TEXT NOT NULL,
  evidencia           TEXT NOT NULL,
  archivos_adjuntos   TEXT,
  estado              TEXT DEFAULT 'pendiente',
  fecha_envio         TIMESTAMPTZ DEFAULT NOW(),
  usuario_id          UUID REFERENCES auth.users(id)
);

-- Política: solo usuarios autenticados pueden insertar
ALTER TABLE medidas_disciplinarias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios autenticados pueden insertar"
  ON medidas_disciplinarias FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Solo RRHH puede ver registros"
  ON medidas_disciplinarias FOR SELECT
  TO authenticated
  USING (true);
```

### 3. Crear usuarios en Supabase

Ir a **Authentication → Users → Invite user** e ingresar el email de cada jefe.
El usuario recibirá un mail para activar su cuenta y crear su contraseña.

### 4. Configurar notificación por email (opcional pero recomendado)

En Supabase, ir a **Database → Webhooks** o usar **Edge Functions** para enviar
un mail a `rrhh@mpcs.pe` cada vez que se inserta un registro en `medidas_disciplinarias`.

#### Alternativa rápida: Supabase Edge Function

Crear un archivo `supabase/functions/notify-rrhh/index.ts` con el contenido
del template de notificación (ver documentación de Supabase Edge Functions).

### 5. Subir a GitHub y publicar en GitHub Pages

```bash
git init
git add .
git commit -m "feat: portal de formularios MPC"
git remote add origin https://github.com/TU_USUARIO/mpcs-formularios.git
git push -u origin main
```

Luego en GitHub:
- Ir a **Settings → Pages**
- Source: `Deploy from a branch`
- Branch: `main` / `/ (root)`

### 6. Asignar dominio personalizado

En GitHub Pages → Custom domain: `mpcs.pe/formularios`
(Configurar el registro DNS en tu proveedor de dominio)

---

## Formularios disponibles

| Código | Nombre | Estado |
|--------|--------|--------|
| FO-RRHH-005 | Medida disciplinaria | ✅ Activo |
| — | Pedido de compras | 🔜 Próximamente |
| — | Solicitud de horario | 🔜 Próximamente |

---

## Soporte

rrhh@mpcs.pe
