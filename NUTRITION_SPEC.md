# NUTRITION_SPEC.md
## Especificación funcional y nutricional para el generador de menús

## 1. Alcance y autoridad del documento

Este documento traduce a reglas estructuradas cinco menús semanales elaborados para Jesús y Laura durante 2022.

La aplicación no debe interpretar estas reglas como un sistema médico ni recalcular cantidades. Debe limitarse a reproducir el patrón de planificación y los pesos proporcionados.

La biblioteca original contiene 30 almuerzos y 30 cenas, distribuidos de lunes a sábado en cinco documentos. El MVP utilizará únicamente lunes a viernes para las semanas generadas, aunque todos los platos originales pueden formar parte de la biblioteca.

---

## 2. Personas y orden de cantidades

Los documentos muestran cantidades dobles con este formato:

```text
cantidad 1 / cantidad 2
```

Interpretación operativa:

- Primera cantidad: Laura.
- Segunda cantidad: Jesús.

Ejemplos:

- Pollo `160/200 g`: Laura 160 g, Jesús 200 g.
- Huevos `2/3`: Laura 2 unidades, Jesús 3 unidades.
- Arroz `80/120 g`: Laura 80 g, Jesús 120 g.

La aplicación no debe aplicar un multiplicador genérico. Cada ingrediente conserva sus cantidades explícitas.

---

## 3. Patrón general

La estructura observada en las comidas principales es:

### Almuerzo

Normalmente:

```text
proteína + verduras + hidrato opcional o legumbre + fruta
```

### Cena

Normalmente:

```text
proteína + verduras + fruta
```

Las cenas tienden a contener menos hidrato concentrado, pero no existe una prohibición absoluta.

La fruta figura como postre habitual.

La verdura es abundante y flexible. Se utiliza repetidamente la expresión “verdura al gusto”.

---

## 4. Proteína

Prácticamente todos los almuerzos y cenas contienen una fuente proteica clara.

Rangos observados, no prescripciones nuevas:

| Grupo | Laura | Jesús |
|---|---:|---:|
| Pollo o pavo | 140–180 g | 200–220 g |
| Ternera o cerdo | 120–160 g | 180–200 g |
| Pescado blanco | 150–200 g | 200–240 g |
| Pescado azul | 150–160 g | 200–220 g |
| Hamburguesa | 120 g | 180 g |
| Huevos | 1–2 ud | 2–3 ud |
| Conservas | 1 conserva | 2 conservas |
| Gambas/langostinos | 80–100 g | 100–120 g |

Estos rangos sirven para reconocer equivalencias, no para sobrescribir los datos de los platos.

Cuando una fuente principal es pequeña, suele complementarse:

- Huevo + atún.
- Huevo + jamón.
- Carne + queso.
- Ensalada + atún + queso.
- Legumbre + carne.
- Legumbre + huevo y conserva.

---

## 5. Familias proteicas

### Aves

- Pollo.
- Pavo.
- Carne picada de pollo y pavo.

Pollo y pavo se consideran la misma familia a efectos de variedad diaria.

### Cerdo

- Lomo.
- Solomillo.
- Carne de cerdo.
- Jamón serrano.
- Jamón cocido.
- Lomo embuchado.

Jamón y embutidos suelen ser complementos, no siempre proteína principal.

### Ternera

- Ternera a la plancha.
- Solomillo.
- Ternera troceada.
- Carne picada magra.
- Hamburguesa de calidad cuando no se especifica otro origen.

### Pescado blanco

- Bacalao.
- Merluza.
- Dorada.
- Rosada.
- Lenguado.
- Pescado blanco genérico.

### Pescado azul

- Salmón.
- Atún.
- Caballa.
- Melva.
- Bonito.
- Pez espada.
- Conservas de pescado.
- Salmón ahumado.

### Marisco y cefalópodos

- Gambas.
- Langostinos.
- Calamar.
- Sepia.

### Huevos

- Plancha.
- Cocidos.
- Tortilla.
- Revuelto.

### Vegetales y legumbres

- Garbanzos.
- Lentejas.
- Habas.
- Pasta de lenteja roja.
- Soja texturizada.

---

## 6. Hidratos

Los hidratos concentrados aparecen sobre todo en los almuerzos.

### Cereales y derivados

- Arroz.
- Pasta.
- Ñoquis.
- Noodles de arroz.
- Pan.
- Tortillas de trigo o integrales.

### Tubérculos

- Patata.
- Boniato.

### Legumbres

Las legumbres se clasifican simultáneamente como:

- Fuente de hidratos.
- Fuente de fibra.
- Fuente parcial de proteína.

No deben tratarse como una verdura ordinaria.

### Estados del peso

Respetar siempre:

- `cooked`: cocido.
- `dry`: en seco.
- `raw`: crudo, solo cuando esté expresamente indicado.
- `unspecified`: el menú no lo aclara.

No convertir pesos.

Ejemplos:

- Noodles: 40/50 g en seco.
- Pasta de legumbre: 50/60 g en seco.
- Arroz o pasta: con frecuencia 80/120 g cocidos.
- Patata: peso indicado sin aclarar siempre el estado.

---

## 7. Verduras

La verdura debe estar presente en todas las comidas generadas mediante:

- Ingredientes concretos; o
- La indicación “verdura al gusto”.

Opciones equivalentes citadas:

- Gazpacho.
- Salmorejo.
- Salteado de verduras.
- Verdura de bolsa.
- Verdura de microondas.
- Crema de verduras.
- Ensalada mixta.
- Verdura al horno.
- Verdura a la plancha.
- Pisto.

Verduras específicas utilizadas:

- Tomate.
- Cebolla.
- Calabacín.
- Berenjena.
- Zanahoria.
- Champiñones.
- Setas.
- Brócoli.
- Bimi.
- Espinacas.
- Brotes verdes.
- Lechuga.
- Habas.

No es necesario imponer un peso cuando el documento no lo proporciona.

---

## 8. Grasas y complementos densos

Deben conservar cantidad cuando se especifica:

| Ingrediente | Cantidades observadas |
|---|---|
| Queso | 15–60 g según tipo y plato |
| Mozzarella | 20–80 g o fracción de bola |
| Burrata | 75 g |
| Cottage | 100 g |
| Frutos secos | 20–40 g |
| Pesto | 1 cucharada |
| Aguacate | sin cantidad explícita |
| Aceitunas | sin cantidad explícita |

No añadir automáticamente aceite ni calcularlo, porque los documentos no lo cuantifican.

No convertir “queso favorito” en un tipo concreto si el plato no lo especifica.

---

## 9. Técnicas culinarias

Priorizar las técnicas observadas:

- Plancha.
- Horno.
- Cocción.
- Salteado.
- Wok.
- Crema o puré.
- Ensalada.
- Revuelto.

No forman parte del patrón principal:

- Fritura.
- Rebozado.
- Salsas densas en cantidad libre.
- Preparaciones con nata.
- Postres azucarados.

Complementos de sabor válidos:

- Limón.
- Perejil.
- Pimienta.
- Curry.
- Albahaca.
- Especias.
- Pequeño chorro de soja.
- Salsa de yogur.
- Pesto medido.

---

## 10. Tipos funcionales de almuerzo

### `protein_vegetables`

Proteína principal + verdura + fruta.

Ejemplos:

- Pavo con crema de verduras.
- Lenguado con pisto.
- Ternera con queso y verduras.

### `protein_carb_vegetables`

Proteína + hidrato medido + verdura + fruta.

Ejemplos:

- Solomillo con patata.
- Arroz con pescado.
- Pasta con carne.
- Noodles con ternera.
- Hamburguesa con patata.

### `traditional_legume`

Preparación tradicional de legumbres, verduras y posibles complementos.

Ejemplos:

- Puchero de garbanzos.
- Lentejas con verduras y cerdo.

### `reinforced_legume`

Legumbre o proteína vegetal reforzada con proteína animal o cereal.

Ejemplos:

- Ensalada de lentejas con atún y huevo.
- Curry de garbanzos con arroz y ternera.
- Pasta de lenteja con gambas.
- Berenjena con soja texturizada y queso.
- Habas con pollo y jamón.

### `complete_salad`

Ensalada que incluye proteína suficiente y complementos medidos.

### `flexible_meal`

Wok, arroz u otra preparación con componente extra permitido pero estructura controlada.

---

## 11. Tipos funcionales de cena

### `protein_vegetables`

Proteína + verdura + fruta.

Es el patrón dominante.

### `eggs_with_sides`

Huevos + verdura + queso, conserva o jamón.

### `complete_protein_salad`

Ensalada + una o varias proteínas + complementos medidos.

### `controlled_informal`

Hamburguesa, fajita u opción informal con porciones controladas.

### `double_protein`

Dos preparaciones proteicas en la misma cena.

Debe usarse con poca frecuencia.

---

## 12. Reglas semanales

La aplicación genera cinco almuerzos y cinco cenas.

### Distribución orientativa de almuerzos

Intentar cubrir:

1. Una comida de legumbres.
2. Una comida de ave.
3. Una comida de pescado.
4. Una comida de ternera o cerdo.
5. Una comida flexible.

Entre tres y cuatro almuerzos pueden contener hidrato concentrado o legumbre.

### Distribución orientativa de cenas

Intentar cubrir:

1. Una cena de pescado blanco.
2. Una cena de pescado azul, marisco o cefalópodo.
3. Una cena de ave o carne.
4. Una cena de huevos.
5. Una cena flexible.

Máximo predeterminado: dos cenas con hidrato concentrado.

Estas distribuciones son objetivos de puntuación, no condiciones que deban bloquear completamente la generación si la biblioteca activa no lo permite.

---

## 13. Reglas del día completo

Almuerzo y cena deben evaluarse conjuntamente.

Prioridades:

- Evitar misma familia proteica en ambas comidas.
- Evitar pollo y pavo el mismo día.
- Evitar pescado en ambas comidas.
- Si el almuerzo lleva arroz, pasta, patata, boniato o noodles, priorizar cena sin hidrato concentrado.
- Si el almuerzo es informal, cena sencilla.
- Si el almuerzo incluye queso y otros complementos densos, priorizar cena simple.
- No poner hamburguesa y fajita el mismo día.
- No poner dos ensaladas completas densas el mismo día salvo falta de alternativas.

Estas reglas admiten relajación. Es preferible generar un menú razonable a fallar por una incompatibilidad menor.

---

## 14. Repetición

Los menús originales permiten expresamente:

- Cambiar verduras.
- Cambiar comidas.
- Repetir platos si quedan sobras.

La repetición es válida.

El generador debe evitar:

- Repetición exacta excesiva.
- Misma receta varios días seguidos sin motivo.
- Familias proteicas monótonas.

No debe evitar:

- Reutilizar pisto, crema o verduras.
- Repetir un plato después de varias semanas.
- Utilizar platos favoritos con frecuencia razonable.
- Repetir por batch cooking en modo práctico.

---

## 15. Sustitución individual

Al cambiar una comida:

- Mantener el tipo de slot.
- Mantener todas las cantidades del plato alternativo.
- No intentar igualar gramo a gramo el plato anterior.
- Evaluar el resto del día.
- Evaluar la variedad semanal.
- Excluir el plato actual.
- No tocar las otras nueve comidas.
- Ofrecer varias alternativas.

---

## 16. Datos ausentes que no deben inventarse

No se dispone de:

- Cantidad de aceite.
- Tamaño exacto de la fruta.
- Peso de todas las verduras.
- Composición exacta de una “hamburguesa de calidad”.
- Contenido exacto de algunos pucheros.
- Peso de algunos ingredientes “al gusto”.
- Estado cocido/seco de todos los alimentos.

Usar `unspecified` o texto libre. No completar estos huecos mediante conocimiento general.

---

## 17. Invariantes de datos

- Cada plato debe ser almuerzo o cena, nunca ambos salvo que existan dos registros independientes.
- Cada ingrediente mantiene cantidades independientes.
- Un valor ausente no equivale a cero.
- `al gusto` no equivale a cantidad ilimitada calculable.
- Una conserva puede tener distinta cantidad entre personas.
- El postre de fruta forma parte del plato como indicador, no como ingrediente con peso.
- No calcular calorías.
- No calcular macros.
- No cambiar pesos al generar.
