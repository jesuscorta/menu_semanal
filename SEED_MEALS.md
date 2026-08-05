# SEED_MEALS.md
## Biblioteca inicial de platos

## Convenciones

- Las cantidades aparecen como `Laura / Jesús`.
- Cuando solo hay una cantidad común, se indica.
- Conservar literalmente “al gusto”, “libre”, “opcional” y otras notas.
- `original_menu` identifica platos extraídos de los documentos.
- Los platos de sábado también pueden entrar en la biblioteca, aunque el generador solo planifique lunes a viernes.
- El desarrollador debe convertir esta especificación en `seed.sql` o en un script idempotente tipado.
- No fusionar platos parecidos si tienen cantidades o composición diferente.

---

# A. ALMUERZOS ORIGINALES

## L01 — Solomillo con verduras y patata

- Tipo funcional: `protein_carb_vegetables`
- Proteína: ternera o cerdo.
- Solomillo: 150 g / 200 g.
- Verduras cocidas: al gusto.
- Patata al horno: 100 g / 180 g.
- Fruta.
- Fuente: enero 2022, menú 1.

## L02 — Huevo, lomo y patata o boniato

- Tipo funcional: `protein_carb_vegetables`
- Huevo a la plancha: 1 ud / 2 ud.
- Patata o boniato con piel al horno: 100 g / 160 g.
- Lomo de cerdo: 120 g / 160 g.
- Gazpacho o ensalada de hortalizas crudas.
- Fruta.
- Fuente: enero 2022, menú 1.

## L03 — Puchero de garbanzos con patata y verdura

- Tipo funcional: `traditional_legume`
- Garbanzos: cantidad no especificada.
- Patata: cantidad no especificada.
- Verdura: cantidad no especificada.
- Fruta.
- Fuente: enero 2022, menú 1.

## L04 — Arroz con conserva de pescado y verdura

- Tipo funcional: `protein_carb_vegetables`
- Arroz cocido: 80 g / 125 g.
- Verdura al gusto.
- Conserva de pescado: 120 g o un par de latas.
- Fruta.
- Fuente: enero 2022, menú 1.

## L05 — Habas con jamón y pollo

- Tipo funcional: `reinforced_legume`
- Habas salteadas con cebolla.
- Jamón serrano: 30 g / 40 g.
- Pollo troceado: 140 g / 200 g.
- Especias al gusto.
- Fruta.
- Fuente: enero 2022, menú 1.

## L06 — Pasta con carne picada, tomate y queso

- Tipo funcional: `protein_carb_vegetables`
- Pasta cocida: 80 g / 120 g.
- Carne picada: 100 g / 120 g.
- Tomate.
- Albahaca.
- Queso rallado: 20 g / 30 g.
- Verdura al gusto.
- Fruta.
- Fuente: enero 2022, menú 1.

## L07 — Dorada o rosada con verduras

- Tipo funcional: `protein_vegetables`
- Dorada o rosada: 150 g / 200 g.
- Salteado de verduras.
- Plancha u horno.
- Fruta.
- Fuente: enero 2022, menú 2.

## L08 — Lomo con patata o boniato y verdura

- Tipo funcional: `protein_carb_vegetables`
- Patata o boniato al horno: 150 g / 200 g.
- Lomo de cerdo a la plancha: 150 g / 200 g.
- Verdura al gusto.
- Fruta.
- Fuente: enero 2022, menú 2.

## L09 — Ensalada de jamón, mozzarella, fruta y pistachos

- Tipo funcional: `complete_salad`
- Brotes verdes.
- Aguacate.
- Manzana.
- Uvas.
- Mozzarella: 1/2 bola / 1 bola.
- Jamón serrano: 50 g / 70 g.
- Pistachos: 30 g / 40 g.
- Tomate.
- Fruta de postre.
- Fuente: enero 2022, menú 2.

## L10 — Puchero de garbanzos con patata y verdura

- Tipo funcional: `traditional_legume`
- Mismo nombre general que L03.
- Mantener como variante o relacionar como procedencia adicional sin duplicar físicamente si los ingredientes son idénticos.
- Fuente: enero 2022, menú 2.

## L11 — Carne picada con queso y verdura

- Tipo funcional: `protein_vegetables`
- Carne picada magra: 120 g / 180 g.
- Queso favorito: 30 g / 50 g.
- Verdura al gusto.
- Fruta.
- Fuente: enero 2022, menú 2.

## L12 — Ñoquis o pasta con caballa, mozzarella y pesto

- Tipo funcional: `protein_carb_vegetables`
- Ñoquis o pasta cocidos: 100 g / 120 g.
- Salteado de verduras.
- Caballa: 1 conserva / 2 conservas.
- Mozzarella: 50 g / 80 g.
- Pesto: 1 cucharada común.
- Fruta.
- Fuente: enero 2022, menú 2.

## L13 — Ternera con queso y verdura

- Tipo funcional: `protein_vegetables`
- Ternera a la plancha: 150 g / 200 g.
- Queso favorito: 30 g / 40 g.
- Verdura al gusto.
- Fruta.
- Fuente: febrero 2022.

## L14 — Puchero de garbanzos, patatas, verduras y pollo

- Tipo funcional: `traditional_legume`
- Cantidad: `LIBRE` según documento.
- Garbanzos.
- Patatas.
- Verduras.
- Pollo.
- Fruta.
- No reinterpretar “LIBRE”.
- Fuente: febrero 2022.

## L15 — Pescado azul, calamar o sepia con verdura

- Tipo funcional: `protein_vegetables`
- Pescado azul o calamar/sepia: 160 g / 200 g.
- Posibles pescados: salmón, atún, caballa, melva, bonito o pez espada.
- Verdura al gusto.
- Fruta.
- Familia proteica: `mixed`, porque el registro admite pescado azul o cefalópodo.
- Fuente: febrero 2022.

## L16 — Pasta de lenteja roja con gambas y verdura

- Tipo funcional: `reinforced_legume`
- Pasta de legumbre en seco: 50 g / 60 g.
- Gambas: 80 g / 100 g.
- Verdura al gusto.
- Fruta.
- Fuente: febrero 2022.

## L17 — Huevos con jamón y verdura

- Tipo funcional: `protein_vegetables`
- Huevo a la plancha: 2 ud / 3 ud.
- Jamón serrano: 40 g / 70 g.
- Verdura al gusto.
- Fruta.
- Fuente: febrero 2022.

## L18 — Arroz con lomo y verdura

- Tipo funcional: `flexible_meal`
- Arroz: 80 g / 120 g. El documento no aclara aquí el estado.
- Lomo de cerdo: 160 g / 200 g.
- Pimienta, perejil y limón.
- Ingrediente extra al gusto.
- Verdura al gusto.
- Fruta.
- Fuente: febrero 2022.

## L19 — Pasta con carne picada de pollo y pavo

- Tipo funcional: `protein_carb_vegetables`
- Pasta cocida: 80 g / 120 g.
- Carne picada de pollo y pavo: 100 g / 120 g.
- Tomate triturado.
- Verduras al gusto.
- Fruta.
- Fuente: abril 2022.

## L20 — Ensalada de lentejas, atún y huevo

- Tipo funcional: `reinforced_legume`
- Lentejas cocidas: 60–80 g / 120 g.
- Atún al natural: 1 lata / 2 latas.
- Huevo cocido: 1 ud / 2 ud.
- Tomate.
- Maíz.
- Cebolla.
- Fruta.
- Fuente: abril 2022.

## L21 — Wok de noodles con ternera y huevo

- Tipo funcional: `protein_carb_vegetables`
- Noodles de arroz en seco: 40 g / 50 g.
- Ternera troceada: 150 g / 200 g.
- Verduras al gusto.
- Huevo: 1 ud / 2 ud.
- Un chorrito de salsa de soja.
- Fruta.
- Fuente: abril 2022.

## L22 — Berenjena rellena de soja texturizada

- Tipo funcional: `reinforced_legume`
- Gazpacho.
- Berenjena.
- Soja texturizada en seco: 40 g / 60 g.
- Cebolla.
- Zanahoria.
- Tomate triturado.
- Queso rallado: 20 g / 30 g.
- Fruta.
- Fuente: abril 2022.

## L23 — Hamburguesa con queso y patata al horno

- Tipo funcional: `protein_carb_vegetables`
- Hamburguesa de calidad: 120 g / 180 g.
- Queso: 30 g / 40 g.
- Patata troceada al horno: 1 mediana para cada persona, salvo ajuste manual.
- Especias.
- Verduras al gusto.
- Fruta.
- Fuente: abril 2022.

## L24 — Arroz con pescado blanco y verdura al horno

- Tipo funcional: `protein_carb_vegetables`
- Arroz cocido: 80 g / 120 g.
- Pescado blanco: 160 g / 220 g.
- Verdura al horno.
- Fruta.
- Fuente: abril 2022.

## L25 — Lentejas con verduras y cerdo

- Tipo funcional: `traditional_legume`
- Lentejas cocidas: 80 g / 120 g.
- Verduras.
- Carne de cerdo: 80 g / 120 g.
- Fruta.
- Fuente: octubre 2022.

## L26 — Pavo con crema o verdura a la plancha

- Tipo funcional: `protein_vegetables`
- Pavo a la plancha: 180 g / 220 g.
- Crema de verdura o verdura favorita a la plancha.
- Fruta.
- Fuente: octubre 2022.

## L27 — Lenguado con pisto

- Tipo funcional: `protein_vegetables`
- Lenguado: 200 g / 240 g.
- Pisto de verduras.
- Fruta.
- Fuente: octubre 2022.

## L28 — Curry de garbanzos, arroz y ternera

- Tipo funcional: `reinforced_legume`
- Garbanzos cocidos: 80 g / 120 g.
- Verduras.
- Arroz cocido: 30 g / 50 g.
- Ternera: 60 g / 90 g.
- Fruta.
- Fuente: octubre 2022.

## L29 — Patata o boniato con pescado blanco

- Tipo funcional: `protein_carb_vegetables`
- Patata o boniato al horno: 150 g / 200 g.
- Verduras.
- Pescado blanco: 180 g / 240 g.
- Fruta.
- Fuente: octubre 2022.

## L30 — Wok de verduras con pollo

- Tipo funcional: `flexible_meal`
- Wok de verduras.
- Pollo: 180 g / 220 g.
- Ingrediente extra al gusto.
- Fruta.
- Fuente: octubre 2022.

---

# B. CENAS ORIGINALES

## D01 — Pescado blanco con verduras y mozzarella

- Tipo funcional: `protein_vegetables`
- Pescado blanco al horno: 160 g / 220 g.
- Champiñones.
- Cebolla.
- Calabacín.
- Mozzarella: el documento indica `1 o 1/2 bola` de forma ambigua.
- Conservar como nota sin reasignar cantidades.
- Fruta.
- Fuente: enero 2022, menú 1.

## D02 — Pavo a la plancha con verdura

- Tipo funcional: `protein_vegetables`
- Pechuga de pavo: 160 g / 220 g.
- Perejil.
- Verdura al gusto.
- Fruta.
- Fuente: enero 2022, menú 1.

## D03 — Pescado azul con crema de verduras

- Tipo funcional: `protein_vegetables`
- Pescado azul: 160 g / 220 g.
- Opciones: salmón, atún o pez espada.
- Crema de verduras.
- Fruta.
- Fuente: enero 2022, menú 1.

## D04 — Tortilla con queso y ensalada de atún

- Tipo funcional: `eggs_with_sides`
- Tortilla francesa: 1 huevo / 2 huevos.
- Queso favorito: 30 g / 40 g.
- Ensalada mixta.
- Atún: 1 lata común, salvo interpretación manual.
- Aceitunas.
- Fruta.
- Fuente: enero 2022, menú 1.

## D05 — Hamburguesa con queso y verdura

- Tipo funcional: `controlled_informal`
- Hamburguesa de calidad: 120 g / 180 g.
- Pan: opcional.
- Queso cheddar o gouda: 30 g / 50 g.
- Tomate.
- Verdura al gusto.
- Fruta.
- Fuente: enero 2022, menú 1.

## D06 — Ensalada campera

- Tipo funcional: `complete_protein_salad`
- Aceitunas.
- Atún o similar: 1 conserva / 2 conservas.
- Cebolleta.
- Huevo duro: 1 ud / 2 ud.
- Tomate.
- Perejil.
- Ingrediente extra al gusto.
- Fruta.
- Fuente: enero 2022, menú 1.

## D07 — Ensalada de huevo, atún y cottage

- Tipo funcional: `complete_protein_salad`
- Huevo duro: 1 ud / 2 ud.
- Calabacín.
- Atún: 1 conserva / 2 conservas.
- Tomate.
- Queso fresco o cottage: 100 g para ambos.
- Cebolla.
- Fruta.
- Fuente: enero 2022, menú 2.

## D08 — Tortilla con feta y zanahoria

- Tipo funcional: `eggs_with_sides`
- Tortilla francesa: 2 huevos / 3 huevos.
- Queso feta: 30 g / 40 g.
- Zanahorias troceadas o baby salteadas.
- Fruta.
- Fuente: enero 2022, menú 2.

## D09 — Hamburguesa sin pan con verdura

- Tipo funcional: `controlled_informal`
- Hamburguesa de calidad: 120 g / 180 g.
- Sin pan.
- Verdura al gusto.
- Fruta.
- Fuente: enero 2022, menú 2.

## D10 — Ternera con bimi o brócoli

- Tipo funcional: `protein_vegetables`
- Bimi o brócoli a la plancha.
- Ternera troceada: 150 g / 200 g.
- Fruta.
- Fuente: enero 2022, menú 2.

## D11 — Pescado azul con setas

- Tipo funcional: `protein_vegetables`
- Atún o pescado azul: 160 g / 220 g.
- Horno o plancha.
- Setas o champiñones salteados.
- Fruta.
- Fuente: enero 2022, menú 2.

## D12 — Pavo al curry con ensalada

- Tipo funcional: `protein_vegetables`
- Pavo: 160 g / 220 g.
- Plancha.
- Curry.
- Ensalada mixta.
- Fruta.
- Fuente: enero 2022, menú 2.

## D13 — Pescado blanco con verduras al horno

- Tipo funcional: `protein_vegetables`
- Bacalao, merluza o pescado blanco: 180 g / 220 g.
- Verdura al horno.
- Fruta.
- Fuente: febrero 2022.

## D14 — Pavo con limón, perejil y verdura

- Tipo funcional: `protein_vegetables`
- Pavo a la plancha: 160 g / 200 g.
- Limón.
- Perejil.
- Verdura al gusto.
- Fruta.
- Fuente: febrero 2022.

## D15 — Tortilla con atún y queso

- Tipo funcional: `eggs_with_sides`
- Tortilla francesa: 2 huevos / 3 huevos.
- Atún: 1 conserva común.
- Queso: 30 g / 45 g.
- Verdura al gusto.
- Fruta.
- Fuente: febrero 2022.

## D16 — Pollo al horno con queso y verdura

- Tipo funcional: `protein_vegetables`
- Pollo al horno: 160 g / 200 g.
- Queso favorito: 40 g / 60 g.
- Verdura al gusto.
- Fruta.
- Fuente: febrero 2022.

## D17 — Ensalada de salmón ahumado, cottage y frutos secos

- Tipo funcional: `complete_protein_salad`
- Brotes verdes.
- Tomate.
- Cebolla.
- Salmón ahumado: 60 g / 100 g.
- Cottage: 100 g para ambos.
- Frutos secos: 20 g / 30 g.
- Ingrediente extra al gusto.
- Fruta.
- Fuente: febrero 2022.

## D18 — Hamburguesa con queso y crema

- Tipo funcional: `controlled_informal`
- Hamburguesa de calidad: 120 g / 180 g.
- Queso: 30 g / 40 g.
- Crema de verduras o salmorejo.
- Fruta.
- Fuente: febrero 2022.

## D19 — Revuelto con jamón y salmón

- Tipo funcional: `double_protein`
- Revuelto de champiñones con jamón serrano.
- El documento no indica cantidades del revuelto ni del jamón.
- Salmón a la plancha: 160 g / 200 g.
- Limón.
- Perejil.
- Fruta.
- Fuente: abril 2022.

## D20 — Ensalada con queso, nueces y pescado blanco

- Tipo funcional: `double_protein`
- Brotes verdes.
- Queso fresco.
- Nueces: 20 g / 30 g.
- Pescado blanco: 160 g / 220 g.
- Horno o plancha.
- Fruta.
- Fuente: abril 2022.

## D21 — Puré de calabacín con pollo

- Tipo funcional: `protein_vegetables`
- Puré: patata, calabacín, cebolla y zanahoria.
- Pechuga de pollo: 160 g / 200 g.
- Fruta.
- Fuente: abril 2022.

## D22 — Fajitas de pollo y verduras

- Tipo funcional: `controlled_informal`
- Tortillas de trigo: 1–2 ud / 2–3 ud.
- Pechuga de pollo: 160 g / 200 g.
- Verduras al gusto.
- Fruta.
- Fuente: abril 2022.

## D23 — Pavo con verduras

- Tipo funcional: `protein_vegetables`
- Pechuga de pavo: 160 g / 220 g.
- Verduras al gusto.
- Fruta.
- Fuente: abril 2022.

## D24 — Tortilla con jamón cocido y verdura

- Tipo funcional: `eggs_with_sides`
- Tortilla francesa: 1 huevo / 2 huevos.
- Jamón cocido: 40 g / 60 g.
- Verduras al gusto.
- Fruta.
- Fuente: abril 2022.

## D25 — Ensalada de atún y queso

- Tipo funcional: `complete_protein_salad`
- Brotes.
- Queso tierno o semicurado: 25 g / 40 g.
- Atún al natural: 2 latas. El documento no diferencia persona.
- Verduras al gusto.
- Fruta.
- Fuente: octubre 2022.

## D26 — Tortilla de verduras con queso de cabra

- Tipo funcional: `eggs_with_sides`
- Tortilla francesa: 2 huevos / 3 huevos.
- Verduras.
- Queso de cabra: 15 g / 30 g.
- Fruta.
- Fuente: octubre 2022.

## D27 — Calamar con ensalada y salsa de yogur

- Tipo funcional: `protein_vegetables`
- Lechuga y verduras al gusto.
- Calamar a la plancha: 180 g / 220 g.
- Salsa de yogur, cantidad no indicada.
- Fruta.
- Fuente: octubre 2022.

## D28 — Fajita integral con huevo, mozzarella y ave

- Tipo funcional: `controlled_informal`
- Tortilla integral: 40 g / 80 g.
- Huevo: 1 ud para ambos.
- Mozzarella: 20 g / 30 g.
- Pavo o pollo: 100 g / 150 g.
- Espinacas.
- Cebolla.
- Tomate.
- Fruta.
- Fuente: octubre 2022.

## D29 — Tomate, burrata, mango y langostinos

- Tipo funcional: `complete_protein_salad`
- Tomate aliñado.
- Burrata: 75 g para ambos.
- Mango.
- Albahaca.
- Langostinos: 80–100 g / 120 g.
- Fruta.
- Fuente: octubre 2022.

## D30 — Crema de verduras con huevos cocidos

- Tipo funcional: `eggs_with_sides`
- Crema de verduras.
- Huevos cocidos: 2 ud / 3 ud.
- Fruta.
- Fuente: octubre 2022.

---

# C. PLATOS DERIVADOS OPCIONALES

Estos platos no proceden literalmente de los documentos. Se derivan combinando equivalencias ya utilizadas. Deben marcarse `source_type = derived_pattern`.

No son obligatorios para la primera importación. Es preferible lanzar el MVP con los originales bien estructurados antes que introducir datos derivados deficientes.

## Almuerzos derivados propuestos

### LA01 — Pollo con arroz y verduras

- Pollo: 160 g / 200 g.
- Arroz cocido: 80 g / 120 g.
- Verduras al gusto.
- Fruta.

### LA02 — Pavo con patata al horno y ensalada

- Pavo: 160 g / 220 g.
- Patata al horno: 150 g / 200 g.
- Ensalada.
- Fruta.

### LA03 — Merluza con arroz y verduras

- Merluza: 180 g / 220 g.
- Arroz cocido: 80 g / 120 g.
- Verduras.
- Fruta.

### LA04 — Ternera con boniato y pisto

- Ternera: 150 g / 200 g.
- Boniato al horno: 150 g / 200 g.
- Pisto.
- Fruta.

### LA05 — Pasta con atún y tomate

- Pasta cocida: 80 g / 120 g.
- Atún al natural: 1 lata / 2 latas.
- Tomate triturado.
- Verduras.
- Fruta.

### LA06 — Garbanzos con pollo y verduras

- Garbanzos cocidos: 80 g / 120 g.
- Pollo: 100 g / 150 g.
- Verduras.
- Fruta.

### LA07 — Ensalada de arroz, huevo y atún

- Arroz cocido: 80 g / 120 g.
- Huevo: 1 ud / 2 ud.
- Atún: 1 lata / 2 latas.
- Tomate, cebolla y verduras.
- Fruta.

### LA08 — Berenjena rellena de carne magra

- Carne picada magra: 120 g / 180 g.
- Berenjena.
- Cebolla.
- Tomate triturado.
- Queso: 20 g / 30 g.
- Fruta.

### LA09 — Wok de pavo con noodles

- Noodles de arroz en seco: 40 g / 50 g.
- Pavo: 160 g / 200 g.
- Verduras.
- Soja en pequeña cantidad.
- Fruta.

### LA10 — Salmón con patata y verduras

- Salmón: 160 g / 200 g.
- Patata al horno: 150 g / 200 g.
- Verduras.
- Fruta.

## Cenas derivadas propuestas

### DA01 — Merluza con pisto

- Merluza: 180 g / 220 g.
- Pisto.
- Fruta.

### DA02 — Pollo con crema de verduras

- Pollo: 160 g / 200 g.
- Crema de verduras.
- Fruta.

### DA03 — Tortilla con atún y tomate

- Huevos: 2 ud / 3 ud.
- Atún: 1 conserva común.
- Tomate aliñado.
- Fruta.

### DA04 — Langostinos con ensalada y salsa de yogur

- Langostinos: 100 g / 120 g.
- Ensalada abundante.
- Salsa de yogur medida manualmente.
- Fruta.

### DA05 — Pavo con champiñones

- Pavo: 160 g / 220 g.
- Champiñones y cebolla salteados.
- Fruta.

---

# D. RECOMENDACIÓN DE IMPORTACIÓN

Primera versión recomendada:

- 29 almuerzos únicos originales, porque L03 y L10 pueden ser el mismo plato con dos referencias.
- 30 cenas originales.
- Importar los derivados en una migración opcional posterior.

Si se necesitan exactamente 40 almuerzos y 35 cenas desde el primer día:

- Importar los originales.
- Importar LA01–LA10.
- Importar DA01–DA05.
- Mantener claramente `source_type`.
