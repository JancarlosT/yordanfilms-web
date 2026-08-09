"""
comprimir_imagenes.py
----------------------
Recorre la carpeta de imagenes, y reduce el tamaño de cada foto
para que sea razonable en peso para un sitio web, sin perder
calidad visible a simple vista.

Reglas:
- Redimensiona cualquier foto mas ancha de 1920px (nadie necesita
  mas resolucion que esa para verse bien en una pantalla)
- Guarda como JPEG con 80% de calidad (buen balance entre peso y calidad)
- Los PNG con transparencia (como el logo) se dejan como PNG, sin tocar
"""

import os
from PIL import Image

CARPETA = "frontend/public/imagenes"
ANCHO_MAXIMO = 1920
CALIDAD_JPEG = 80

# Extensiones que vamos a procesar
EXTENSIONES = (".jpg", ".jpeg", ".png", ".webp")

# Archivos que NO tocamos (por ejemplo el logo, que necesita transparencia)
EXCLUIR = ["logo.png"]

total_antes = 0
total_despues = 0

for nombre_archivo in os.listdir(CARPETA):
    ruta = os.path.join(CARPETA, nombre_archivo)

    if not nombre_archivo.lower().endswith(EXTENSIONES):
        continue
    if nombre_archivo in EXCLUIR:
        print(f"Saltando (excluido): {nombre_archivo}")
        continue

    peso_antes = os.path.getsize(ruta)
    total_antes += peso_antes

    try:
        img = Image.open(ruta)

        # Si tiene transparencia real (canal alpha usado), la mantenemos como PNG
        tiene_transparencia = img.mode in ("RGBA", "LA") and img.getchannel("A").getextrema()[0] < 255

        # Redimensiona si es mas ancha de lo necesario
        if img.width > ANCHO_MAXIMO:
            proporcion = ANCHO_MAXIMO / img.width
            nuevo_alto = int(img.height * proporcion)
            img = img.resize((ANCHO_MAXIMO, nuevo_alto), Image.LANCZOS)

        if tiene_transparencia:
            img.save(ruta, optimize=True)
            nueva_ruta = ruta
        else:
            # Convertimos a RGB (sin canal alpha) para guardar como JPEG,
            # incluso si el archivo original era .PNG
            img = img.convert("RGB")
            nueva_ruta = os.path.splitext(ruta)[0] + ".jpg"
            img.save(nueva_ruta, "JPEG", quality=CALIDAD_JPEG, optimize=True)

            # Si el nombre cambio (era .PNG y ahora es .jpg), borra el original
            if nueva_ruta != ruta:
                os.remove(ruta)

        peso_despues = os.path.getsize(nueva_ruta)
        total_despues += peso_despues

        print(f"{nombre_archivo}: {peso_antes/1024/1024:.1f}MB -> {peso_despues/1024/1024:.1f}MB")

    except Exception as e:
        print(f"Error con {nombre_archivo}: {e}")

print("\n--- RESUMEN ---")
print(f"Antes:   {total_antes/1024/1024:.1f} MB")
print(f"Despues: {total_despues/1024/1024:.1f} MB")
print(f"Ahorro:  {(1 - total_despues/total_antes)*100:.1f}%")