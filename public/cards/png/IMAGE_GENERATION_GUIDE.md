# Guía de generación de imágenes · Las 78 cartas del tarot

La web funciona sin imágenes: cada carta sin archivo muestra un placeholder
tipográfico elegante. Cuando generes una imagen, solo tienes que guardarla en
la carpeta correcta dentro de `/public/cards/` con el nombre correcto y
aparecerá automáticamente.

## Especificaciones técnicas

| Parámetro | Valor |
|---|---|
| Formato | JPG (calidad 80 a 90) |
| Proporción | **7:12** (vertical, proporción de carta de tarot) |
| Resolución recomendada | **840 × 1440 px** (mínimo 560 × 960 px) |
| Carpeta | `/public/cards/<categoría>/` (ver más abajo) |
| Nombre de archivo | exactamente el slug de la carta + `.jpg` (ver tabla) |
| Peso objetivo | < 250 KB por carta (optimiza con [squoosh.app](https://squoosh.app)) |

## Carpetas por categoría

Las imágenes del mazo principal se organizan por categoría dentro de
`/public/cards/`:

| Categoría | Carpeta |
|---|---|
| Arcanos Mayores | `/public/cards/arcanos-mayores/` |
| Bastos | `/public/cards/bastos/` |
| Copas | `/public/cards/copas/` |
| Espadas | `/public/cards/espadas/` |
| Oros | `/public/cards/oros/` |

Por ejemplo, `el-loco.jpg` va en `/public/cards/arcanos-mayores/el-loco.jpg`,
y `as-de-copas.jpg` va en `/public/cards/copas/as-de-copas.jpg`.

### Mazos adicionales (futuro)

Para añadir un mazo ilustrado alternativo, créale su propia carpeta dentro de
`/public/cards/<id-del-mazo>/` con las mismas cinco subcarpetas de arriba
(`arcanos-mayores`, `bastos`, `copas`, `espadas`, `oros`) y registra el mazo
en `lib/decks.ts` (id, nombre y descripción). El componente `CardImage`
acepta una prop `deck` con ese id para mostrar las cartas de ese mazo en
lugar del mazo por defecto.

## Estilo visual (común a todo el mazo)

Para que el mazo sea coherente, **añade este bloque de estilo a todos los
prompts**:

> Elegant dark tarot card illustration, vertical composition, deep ink-black
> background (#0E0D11), refined antique gold linework and accents (#C9A968),
> minimalist symbolist style, fine engraving-like detail, subtle parchment
> texture, thin double border frame in gold, muted warm off-white highlights,
> art deco meets medieval manuscript, no text, no letters, no caption,
> centered subject, dramatic chiaroscuro lighting, premium and professional,
> not kitsch.

Recomendaciones:

- Genera todas las cartas en la **misma sesión o con la misma semilla/modelo**
  para mantener la consistencia.
- Pide siempre **sin texto**: el nombre y el numeral ya los pone la web.
- Si el resultado sale recargado, añade `minimal composition, generous negative space`.

## Prompts por carta · Arcanos Mayores

| Archivo | Prompt del sujeto (añadir el bloque de estilo común) |
|---|---|
| `el-loco.jpg` | A young wanderer stepping toward a cliff edge under a golden sun, knapsack on a stick, small white dog at his heels, mountains behind |
| `el-mago.jpg` | A robed magician at an altar, one arm raised holding a golden wand, infinity symbol glowing above his head, cup sword pentacle and wand on the table |
| `la-sacerdotisa.jpg` | A serene priestess seated between two columns, crescent moon at her feet, veil decorated with pomegranates, scroll half hidden in her robe |
| `la-emperatriz.jpg` | An empress on a cushioned throne in a wheat field, crown of twelve stars, shield with venus symbol resting beside her, lush garden |
| `el-emperador.jpg` | A stern emperor on a stone throne carved with ram heads, golden armor under red robes, ankh scepter, barren mountains behind |
| `el-hierofante.jpg` | A hierophant in ceremonial robes raising a blessing hand, triple crown, two crossed golden keys at his feet, two tonsured acolytes |
| `los-enamorados.jpg` | A man and a woman beneath a radiant winged figure, tree of flames and tree of fruit with a serpent, sun above a distant mountain |
| `el-carro.jpg` | A crowned charioteer in a stone chariot drawn by two sphinxes, one pale one dark, starry canopy, walled city behind |
| `la-fuerza.jpg` | A calm woman gently closing the jaws of a golden lion, infinity symbol above her head, garland of flowers, quiet strength |
| `el-ermitano.jpg` | A hooded hermit on a snowy peak holding a lantern with a six pointed star inside, long staff, vast dark night around him |
| `la-rueda-de-la-fortuna.jpg` | A great golden wheel inscribed with alchemical symbols floating among clouds, sphinx on top, mythic creatures at the corners |
| `la-justicia.jpg` | An enthroned figure holding upright sword and balanced golden scales, purple veil between two columns, severe symmetry |
| `el-colgado.jpg` | A serene man hanging upside down by one foot from a living tau cross, halo of light around his head, hands behind his back |
| `la-muerte.jpg` | A skeletal knight in dark armor riding a pale horse, black banner with a white five petal rose, sun rising between two towers |
| `la-templanza.jpg` | A winged angel pouring water between two golden cups, one foot on land one in a pool, iris flowers, path toward a glowing crown of light |
| `el-diablo.jpg` | A horned figure perched on a dark pedestal, inverted pentagram above his head, two chained figures below with loose chains, torch held downward |
| `la-torre.jpg` | A tall tower struck by a golden lightning bolt, crown blown off its top, flames at the windows, two figures falling, dark storm sky |
| `la-estrella.jpg` | A kneeling woman pouring water onto land and pool under one great eight pointed golden star and seven smaller stars, ibis in a tree |
| `la-luna.jpg` | A full moon with a calm face dripping golden dew, a dog and a wolf howling, a crayfish emerging from a pool, path between two towers |
| `el-sol.jpg` | A radiant sun with a serene face above a child riding a white horse, red banner, sunflowers over a garden wall |
| `el-juicio.jpg` | A golden angel blowing a trumpet with a white banner and red cross, figures rising from open tombs with raised arms, mountain horizon |
| `el-mundo.jpg` | A dancing figure wrapped in a violet sash inside a great laurel wreath, holding two wands, four creatures in the corners: angel eagle bull lion |

## Prompts por carta · Arcanos Menores

Mismo bloque de estilo común. Para reforzar la identidad de cada palo, añade
también su acento:

| Palo | Acento de estilo a añadir |
|---|---|
| Bastos | `warm ember-orange undertone glow, sprouting wooden wands with small leaves, fire element symbolism` |
| Copas | `cool moonlit blue-silver undertone, ornate golden chalices, water element symbolism, gentle waves` |
| Espadas | `cold steel-grey undertone, slender upright swords, air element symbolism, wind-swept clouds` |
| Oros | `deep earthy green undertone, engraved golden coins with pentacle, earth element symbolism, vines` |

### Bastos

| Archivo | Prompt del sujeto |
|---|---|
| `as-de-bastos.jpg` | A radiant hand emerging from a cloud holding a single sprouting wand, distant castle on a hill |
| `dos-de-bastos.jpg` | A man on a castle battlement holding a small globe, one wand in hand and one fixed to the wall |
| `tres-de-bastos.jpg` | A figure seen from behind on a cliff watching three ships sail away, three wands planted beside him |
| `cuatro-de-bastos.jpg` | Four tall wands forming a flower garland canopy, two celebrating figures beneath, festive walled town |
| `cinco-de-bastos.jpg` | Five youths playfully clashing their wands in mock battle under an open sky |
| `seis-de-bastos.jpg` | A laurel-crowned rider on a white horse entering a crowd, wand raised with a victory wreath |
| `siete-de-bastos.jpg` | A man on high ground defending himself with a wand against six wands rising from below |
| `ocho-de-bastos.jpg` | Eight wands flying in parallel across an open sky over a calm river landscape |
| `nueve-de-bastos.jpg` | A bandaged weary man leaning on his wand, eight upright wands forming a fence behind him |
| `diez-de-bastos.jpg` | A bent figure carrying ten heavy wands toward a distant town |
| `sota-de-bastos.jpg` | A young page in ornate clothes contemplating his sprouting wand in a desert with three pyramids |
| `caballero-de-bastos.jpg` | An armored knight on a rearing horse with flame-like plume, wand raised, desert landscape |
| `reina-de-bastos.jpg` | A queen on a throne with lion carvings holding a wand and a sunflower, black cat at her feet |
| `rey-de-bastos.jpg` | A king on a throne decorated with salamanders holding a sprouting wand, small lizard beside him |

### Copas

| Archivo | Prompt del sujeto |
|---|---|
| `as-de-copas.jpg` | A hand from a cloud holding an overflowing chalice, dove descending with a wafer, five streams of water |
| `dos-de-copas.jpg` | A man and a woman exchanging cups beneath a winged lion head over a caduceus |
| `tres-de-copas.jpg` | Three women dancing in a circle raising their cups, fruits and harvest at their feet |
| `cuatro-de-copas.jpg` | A young man seated under a tree with arms crossed before three cups, a fourth cup offered from a small cloud |
| `cinco-de-copas.jpg` | A cloaked mourning figure before three spilled cups, two standing cups behind, river and distant bridge |
| `seis-de-copas.jpg` | A child handing a cup filled with white flowers to a smaller child in an old village courtyard |
| `siete-de-copas.jpg` | A silhouetted figure before seven cups floating in clouds, each holding a vision: castle, jewels, laurel, dragon |
| `ocho-de-copas.jpg` | A traveler with a staff walking away from eight stacked cups toward mountains under an eclipsed moon |
| `nueve-de-copas.jpg` | A satisfied seated man with crossed arms, nine golden cups displayed in an arc behind him |
| `diez-de-copas.jpg` | A couple with raised arms under a rainbow of ten cups, two children dancing, cottage and river |
| `sota-de-copas.jpg` | A young page in a flowered tunic looking at a fish emerging from his cup, sea behind |
| `caballero-de-copas.jpg` | A calm knight on a slow white horse holding a cup forward, winged helmet, river crossing |
| `reina-de-copas.jpg` | A queen on a shell-shaped seaside throne gazing at an ornate closed chalice |
| `rey-de-copas.jpg` | A king on a stone throne floating amid waves, holding cup and scepter, ship and leaping fish behind |

### Espadas

| Archivo | Prompt del sujeto |
|---|---|
| `as-de-espadas.jpg` | A hand from a cloud gripping an upright sword crowned with a golden crown and laurel, barren peaks |
| `dos-de-espadas.jpg` | A blindfolded seated woman balancing two crossed swords, crescent moon over a calm sea with rocks |
| `tres-de-espadas.jpg` | A red heart pierced by three swords under storm clouds and rain |
| `cuatro-de-espadas.jpg` | A knight lying in repose on a tomb inside a chapel, three swords on the wall, one beneath him, stained glass |
| `cinco-de-espadas.jpg` | A smirking man gathering swords while two defeated figures walk away under a torn windy sky |
| `seis-de-espadas.jpg` | A ferryman poling a boat with a cloaked woman and child, six swords standing in the bow, calm far shore |
| `siete-de-espadas.jpg` | A man tiptoeing away from a military camp carrying five swords, two left planted behind |
| `ocho-de-espadas.jpg` | A bound blindfolded woman standing among eight swords planted in marshy ground, castle on a cliff |
| `nueve-de-espadas.jpg` | A figure sitting up in bed with face in hands at night, nine horizontal swords on the dark wall |
| `diez-de-espadas.jpg` | A fallen figure face down with ten swords in his back, black sky breaking into golden dawn at the horizon |
| `sota-de-espadas.jpg` | A vigilant youth on a windswept hill holding a sword with both hands, clouds and birds rushing |
| `caballero-de-espadas.jpg` | A charging knight at full gallop with raised sword against a stormy wind-torn sky |
| `reina-de-espadas.jpg` | A stern queen on a carved throne, upright sword in right hand, left hand extended, clouds gathering below |
| `rey-de-espadas.jpg` | A frontal king on a stone throne holding a slightly tilted upright sword, butterflies carved, two birds |

### Oros

| Archivo | Prompt del sujeto |
|---|---|
| `as-de-oros.jpg` | A hand from a cloud offering a large engraved golden coin over a garden with an arched hedge gate |
| `dos-de-oros.jpg` | A dancing youth juggling two coins joined by an infinity ribbon, ships on high waves behind |
| `tres-de-oros.jpg` | A sculptor on a bench carving a cathedral arch while a monk and an architect review plans |
| `cuatro-de-oros.jpg` | A crowned man clutching a coin to his chest, one coin on his head, two under his feet, city skyline |
| `cinco-de-oros.jpg` | Two ragged figures walking through snow past a glowing stained-glass window with five coins |
| `seis-de-oros.jpg` | A merchant weighing coins in a scale while giving alms to two kneeling beggars |
| `siete-de-oros.jpg` | A farmer resting on his hoe contemplating a bush heavy with seven coins |
| `ocho-de-oros.jpg` | A craftsman at a bench chiseling a coin, six finished coins displayed on a post, town in the distance |
| `nueve-de-oros.jpg` | An elegant woman in a vineyard with a hooded falcon on her gloved hand, nine coins among the vines |
| `diez-de-oros.jpg` | An old man with dogs under an archway watching a young couple and child, ten coins arranged as a tree of life |
| `sota-de-oros.jpg` | A young page in a green field holding up a single coin with both hands, plowed land behind |
| `caballero-de-oros.jpg` | A steady knight on a heavy black workhorse holding a coin, plowed fields stretching behind |
| `reina-de-oros.jpg` | A queen on a throne carved with fruit and goats contemplating a coin in her lap, roses above, a rabbit |
| `rey-de-oros.jpg` | A richly robed king on a bull-carved throne, hand on a large coin, grapevines covering his garments, castle behind |

## Verificación

Tras añadir imágenes:

```bash
npm run dev
```

Abre `http://localhost:3000` y comprueba que las cartas con archivo muestran
su ilustración y el resto mantienen el placeholder. No hace falta tocar
código ni reiniciar nada más.
