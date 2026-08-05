# Menú semanal

Aplicación privada para planificar almuerzos y cenas de Jesús y Laura, de lunes a viernes.

## Requisitos

- Node.js 22+
- Un proyecto Supabase PostgreSQL
- Supabase CLI para migraciones locales o remotas

## Inicio rápido

```bash
npm install
cp .env.example .env.local
npm run dev
```

Completa las variables de `.env.local`. Para crear un hash de acceso, genera un salt aleatorio y ejecuta `scryptSync(codigo, salt, 64).toString("base64")` en un entorno seguro. Nunca subas esos valores al repositorio.

## Base de datos

1. Enlaza el proyecto: `supabase link --project-ref <ref>`.
2. Aplica las migraciones: `supabase db push`.
3. Crea un usuario Supabase Auth con `ADMIN_AUTH_EMAIL` y `ADMIN_AUTH_PASSWORD`.
4. Asigna a ese usuario `app_metadata: { "role": "admin" }` desde el panel de Supabase o una operación administrativa segura.
5. Importa la biblioteca: `npm run seed:meals`.

El importador lee `SEED_MEALS.md`, es idempotente y conserva los textos de las cantidades. L03/L10 comparten slug y no generan un plato duplicado. Los derivados no se importan.

## Comprobaciones

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

`npm run test:e2e` queda reservado para una base de datos aislada de pruebas y credenciales de prueba; no debe apuntar a producción.

## Arquitectura

- `src/domain`: generador determinista, sin React ni Supabase.
- `src/features`: acciones y casos de uso.
- `src/lib/supabase`: clientes basados en cookies.
- `supabase/migrations`: esquema, RLS y transacción de generación.
- `scripts/seed-meals.ts`: importación original idempotente.

El generador excluye inactivos y rechazados, evalúa compatibilidad diaria, limita hidratos en cena, evita repeticiones cuando hay alternativas y acepta una semilla para reproducción. La lógica de puntuación está centralizada en `SCORE`.

## Despliegue Vercel

1. Importa el repositorio en Vercel.
2. Define todas las variables de `.env.example` en Production y Preview según proceda.
3. Aplica migraciones e importa los platos antes de habilitar el acceso.
4. Verifica acceso, generación y cierre de sesión con el dominio final.

`SUPABASE_SERVICE_ROLE_KEY` solo se utiliza para el importador ejecutado fuera del navegador. No debe usarse desde componentes ni exponerse con prefijo `NEXT_PUBLIC_`.

## Lista de producción

- Ejecuta `supabase db push` y `npm run seed:meals` contra el proyecto objetivo.
- Comprueba que RLS esté activado y que solo el usuario con `app_metadata.role = admin` pueda consultar datos.
- Configura las siete variables indicadas en `.env.example` en Vercel.
- Genera el hash del código fuera del repositorio y rota el código si se expone.
- Ejecuta las cuatro comprobaciones y `npm run test:e2e` contra el entorno aislado antes de publicar.
- Tras desplegar, verifica acceso, generación, sustitución, cierre de sesión y la redirección de `/week` sin sesión.
