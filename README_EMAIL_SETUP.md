# Configuración del Servicio de Emails (EmailJS) 🚀

Para activar el envío real de correos a `info@mueblesgacela.com.ar`, el MVP utiliza **EmailJS**, un servicio confiable que permite enviar emails directamente desde React sin backend.

Sigue estos pasos para obtener las credenciales y cargarlas en tu proyecto.

---

## Paso 1: Crear una cuenta en EmailJS
1. Registrate gratis en [emailjs.com](https://www.emailjs.com/).
2. En el panel principal, ve a **Email Services** y haz clic en **Add New Service**.
3. Conecta una cuenta de Gmail o SMTP que se encargará de "enviar" los correos (ej: el mismo `info@mueblesgacela.com.ar` o uno auxiliar).
4. Copia el **Service ID** (ej: `service_xyz123`).

---

## Paso 2: Crear una Plantilla (Email Template)
1. Ve a **Email Templates** -> **Create New Template**.
2. En la solapa **Content**, configura el cuerpo del correo usando estas variables exactas:
   - **To Email**: `info@mueblesgacela.com.ar` (o déjalo dinámico)
   - **Subject**: `{{subject}}`
   - **Body (Mensaje)**:
     ```text
     Hola Equipo,
     Has recibido un nuevo envío desde el sitio web de Muebles Gacela.
     
     De: {{from_name}} ({{from_email}})
     
     Detalles del mensaje:
     --------------------------------------------------
     {{message}}
     --------------------------------------------------
     
     ¡Que tengan un buen día!
     Sitio Web Autogenerado
     ```
3. Haz clic en **Save**.
4. Copia el **Template ID** que se generó (ej: `template_abc456`).

---

## Paso 3: Obtener la Clave Pública (Public Key)
1. Ve a la sección **Account** (abajo a la izquierda).
2. En la pestaña **API Keys**, copia la **Public Key** (ej: `user_J82kSL...`).

---

## Paso 4: Cargar las variables en el Proyecto

### 💻 Localmente (Tu computadora)
Crea (o edita si ya existe) un archivo llamado `.env.local` en la raíz de la carpeta `Muebles gacela MVP` y agrega estas tres líneas reemplazando por tus datos reales:

```env
VITE_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
VITE_EMAILJS_SERVICE_ID=tu_service_id_aqui
VITE_EMAILJS_TEMPLATE_ID=tu_template_id_aqui
```

*(Reinicia el servidor de desarrollo con `npm run dev` para que cargue el archivo).*

### 🌐 En Producción (Vercel / Hosting)
1. Ve a tu proyecto en el panel de **Vercel**.
2. Ve a la solapa **Settings** -> **Environment Variables**.
3. Agrega las mismas tres variables (`VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`).
4. Despliega la rama nuevamente para aplicar los cambios.

---

## ✅ ¡Listo!
Una vez configuradas estas variables, el código detectará automáticamente las claves y comenzará a enviar los correos reales. Mientras no estén configuradas, el sitio mostrará advertencias amigables en la consola web simulando el envío exitoso (ideal para probar local sin gastar cuota mensual).
