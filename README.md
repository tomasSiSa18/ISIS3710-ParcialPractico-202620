# ISIS3710-ParcialPractico-202620

## Nombre: 
Tomas Sierra Sanchez

## Código:
202221567

## 1. Revision de accesibilidad y usabilidad

| # | Ubicación (Archivo y linea) | Herramienta que lo detectó | Regla o principio incumplido | Porqué es un problema o caso especifico | Corrección |
|-------------|-------------|-------------|-------------|-------------|-------------|
| 1 | src/app/[locale]/auth/login/page.tsx Linea 69 | Lighthouse | WEB ARIA | Cuando las personas que utilizan la pagina de manera no visual con lectores de texto el lector les va a leer la etiqueta del html mas no el texto contenido sin un ARIA label | Incluir un ARIA Label en el botón | 
| 2 | src/app/[locale]/auth/login/page.tsx Linea 39 y 53 | Lighthouse | WEB ARIA y htmlFor | Cuando las personas que utilizan la pagina de manera no visual con lectores de texto el lector les va a leer la etiqueta del html por lo tanto no van a saber que están en un punto del formulario o a que zona de texto esa etiqueta está haciendo referencia por lo tanto se pueden perder | Incluir un htmlFor y ARIA label en el html de los formularios | 