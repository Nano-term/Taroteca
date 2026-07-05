import { MINOR_ARCANA } from "./minor-arcana";
import { DEFAULT_DECK_ID } from "./decks";

export type Suit = "bastos" | "copas" | "espadas" | "oros";
export type Arcana = "mayor" | "menor";

/** Carpeta de imágenes de una carta: "arcanos-mayores" o el nombre del palo. */
export type CardCategory = Suit | "arcanos-mayores";

export interface TarotCard {
  /** Orden global en el mazo: 0-21 mayores, 22-77 menores. */
  id: number;
  slug: string;
  name: string;
  /** 0-21 en los Arcanos Mayores; rango 1-14 dentro del palo en los Menores. */
  number: number;
  roman: string;
  arcana: Arcana;
  suit: Suit | null;
  keywords: string[];
  meaningUpright: string;
  meaningReversed: string;
}

export const SUIT_LABELS: Record<Suit, string> = {
  bastos: "Bastos",
  copas: "Copas",
  espadas: "Espadas",
  oros: "Oros",
};

type MajorRaw = Omit<TarotCard, "id" | "arcana" | "suit">;

const MAJORS_RAW: MajorRaw[] = [
  {
    slug: "el-loco",
    name: "El Loco",
    number: 0,
    roman: "0",
    keywords: ["comienzos", "libertad", "espontaneidad"],
    meaningUpright:
      "El Loco anuncia un comienzo absoluto: un camino que se abre sin mapa y sin garantías. Invita a confiar en el impulso vital, a viajar ligero de equipaje y a dar el salto aunque el borde del precipicio esté cerca. Es la energía de quien todavía no sabe, y precisamente por eso puede aprenderlo todo.",
    meaningReversed:
      "Invertido, El Loco advierte de la imprudencia o de su opuesto exacto: la parálisis ante el cambio. Puede señalar decisiones tomadas sin medir consecuencias, o un miedo que disfraza de prudencia las ganas de no moverse. Conviene revisar si el salto es huida o si la espera es excusa.",
  },
  {
    slug: "el-mago",
    name: "El Mago",
    number: 1,
    roman: "I",
    keywords: ["voluntad", "recursos", "manifestación"],
    meaningUpright:
      "El Mago reúne sobre su mesa todos los elementos: tiene las herramientas, el talento y el momento. Habla de concentrar la voluntad para convertir una idea en algo tangible. Lo que se necesita ya está disponible; falta únicamente decidirse a usarlo.",
    meaningReversed:
      "Invertido, El Mago señala talento disperso, promesas infladas o manipulación. La energía existe pero se fuga en mil direcciones, o se emplea para aparentar más que para construir. Es momento de revisar intenciones y volver a un solo objetivo claro.",
  },
  {
    slug: "la-sacerdotisa",
    name: "La Sacerdotisa",
    number: 2,
    roman: "II",
    keywords: ["intuición", "misterio", "saber interior"],
    meaningUpright:
      "La Sacerdotisa custodia lo que aún no debe decirse en voz alta. Pide silencio, escucha interna y confianza en la intuición antes que en la lógica visible. Hay información que llegará sola si se deja de forzar la respuesta.",
    meaningReversed:
      "Invertida, sugiere desconexión de la propia voz interior: se buscan afuera respuestas que ya se conocen por dentro. También puede señalar secretos que pesan o verdades calladas demasiado tiempo. Recuperar la quietud es el primer paso.",
  },
  {
    slug: "la-emperatriz",
    name: "La Emperatriz",
    number: 3,
    roman: "III",
    keywords: ["abundancia", "creatividad", "cuidado"],
    meaningUpright:
      "La Emperatriz es tierra fértil: todo lo que se siembra cerca de ella crece. Habla de creatividad en expansión, de cuidar y ser cuidado, de proyectos que maduran a su propio ritmo. Es una invitación a nutrir lo que importa con paciencia y generosidad.",
    meaningReversed:
      "Invertida, puede indicar un bloqueo creativo, descuido de uno mismo o un cuidado que asfixia en lugar de nutrir. La abundancia se percibe lejana porque la energía está puesta en sostener a otros sin reponer la propia.",
  },
  {
    slug: "el-emperador",
    name: "El Emperador",
    number: 4,
    roman: "IV",
    keywords: ["estructura", "autoridad", "estabilidad"],
    meaningUpright:
      "El Emperador ordena el territorio: establece límites, reglas y cimientos sobre los que construir a largo plazo. Representa la autoridad serena, la disciplina que protege y la estabilidad ganada con método. Es buen momento para estructurar lo que estaba suelto.",
    meaningReversed:
      "Invertido, la estructura se vuelve jaula: rigidez, control excesivo o abuso de autoridad, propio o ajeno. También puede señalar falta total de orden, un reino sin gobierno. El equilibrio está entre la norma y la vida que la habita.",
  },
  {
    slug: "el-hierofante",
    name: "El Hierofante",
    number: 5,
    roman: "V",
    keywords: ["tradición", "enseñanza", "guía"],
    meaningUpright:
      "El Hierofante transmite un saber heredado: maestros, instituciones, linajes y caminos probados por otros. Sugiere buscar consejo en quien ya recorrió la ruta, o formalizar un aprendizaje. La tradición, bien entendida, es un atajo y no una cadena.",
    meaningReversed:
      "Invertido, cuestiona el dogma: las reglas recibidas ya no responden a las preguntas actuales. Puede anunciar una ruptura necesaria con estructuras, creencias o mentores. Conviene distinguir entre rebeldía fértil y simple rechazo por sistema.",
  },
  {
    slug: "los-enamorados",
    name: "Los Enamorados",
    number: 6,
    roman: "VI",
    keywords: ["elección", "unión", "armonía"],
    meaningUpright:
      "Los Enamorados hablan de una unión que transforma, pero sobre todo de una elección consciente. Hay un cruce de caminos donde el corazón y los valores deben ir juntos. Elegir bien aquí significa elegir con todo el ser, no solo con el deseo.",
    meaningReversed:
      "Invertida, señala desalineación: lo que se hace no coincide con lo que se siente, o una relación pierde su armonía por falta de decisión. Posponer la elección es también elegir. Es tiempo de honestidad con uno mismo.",
  },
  {
    slug: "el-carro",
    name: "El Carro",
    number: 7,
    roman: "VII",
    keywords: ["determinación", "victoria", "rumbo"],
    meaningUpright:
      "El Carro avanza porque su conductor domina fuerzas opuestas sin anularlas. Es la victoria que se obtiene con voluntad firme y dirección clara. Si el objetivo está definido, este es el momento de acelerar.",
    meaningReversed:
      "Invertido, el impulso existe pero falta el rumbo: movimiento sin dirección, prisa que atropella o un proyecto que se descontrola. Antes de seguir empujando conviene preguntarse hacia dónde, exactamente, se quiere llegar.",
  },
  {
    slug: "la-fuerza",
    name: "La Fuerza",
    number: 8,
    roman: "VIII",
    keywords: ["coraje", "compasión", "dominio interior"],
    meaningUpright:
      "La Fuerza no doma al león con violencia sino con serenidad. Representa el coraje suave, la paciencia que vence donde la imposición fracasa, y el dominio de los propios impulsos. La verdadera firmeza aquí es interior.",
    meaningReversed:
      "Invertida, revela inseguridad disfrazada de dureza, o impulsos que toman el mando. La energía se gasta en pelear contra uno mismo. Recuperar la calma no es rendirse: es la condición para volver a ser fuerte.",
  },
  {
    slug: "el-ermitano",
    name: "El Ermitaño",
    number: 9,
    roman: "IX",
    keywords: ["introspección", "búsqueda", "sabiduría"],
    meaningUpright:
      "El Ermitaño se retira para ver mejor. Su lámpara ilumina solo el siguiente paso, y con eso basta. Anuncia un periodo de introspección fértil, de búsqueda de sentido lejos del ruido. Lo que se encuentre en ese silencio valdrá el camino.",
    meaningReversed:
      "Invertido, el retiro se convierte en aislamiento: soledad no elegida, desconexión del mundo o negativa a recibir ayuda. La lámpara sigue encendida, pero nadie puede verla si la puerta permanece cerrada demasiado tiempo.",
  },
  {
    slug: "la-rueda-de-la-fortuna",
    name: "La Rueda de la Fortuna",
    number: 10,
    roman: "X",
    keywords: ["ciclos", "destino", "oportunidad"],
    meaningUpright:
      "La Rueda gira y nada permanece en el mismo punto. Anuncia un giro del destino, el cierre de un ciclo y la apertura de otro. Lo inteligente no es frenar la rueda sino aprender a moverse con ella: hay una oportunidad en el cambio que se acerca.",
    meaningReversed:
      "Invertida, señala resistencia al movimiento natural de las cosas, o una racha adversa que pide paciencia más que acción. Los ciclos bajos también terminan. Conviene soltar el control sobre lo que nunca estuvo en nuestras manos.",
  },
  {
    slug: "la-justicia",
    name: "La Justicia",
    number: 11,
    roman: "XI",
    keywords: ["equidad", "verdad", "consecuencia"],
    meaningUpright:
      "La Justicia pesa con exactitud: cada acto tiene su consecuencia y cada verdad su lugar. Habla de decisiones tomadas con claridad, de acuerdos justos y de asumir la responsabilidad propia. La balanza se equilibra cuando se actúa con rectitud.",
    meaningReversed:
      "Invertida, advierte de un desequilibrio: una injusticia recibida o cometida, verdades a medias, cuentas que no cuadran. Antes de señalar afuera, conviene revisar la propia parte. La balanza siempre termina por ajustarse.",
  },
  {
    slug: "el-colgado",
    name: "El Colgado",
    number: 12,
    roman: "XII",
    keywords: ["pausa", "perspectiva", "entrega"],
    meaningUpright:
      "El Colgado está suspendido por voluntad propia: su quietud es una forma de sabiduría. Invita a pausar, a mirar el problema desde el ángulo opuesto y a soltar la urgencia de resolver. Lo que parece detenido está, en realidad, madurando.",
    meaningReversed:
      "Invertido, la pausa se vuelve estancamiento: se sacrifica tiempo y energía sin que nada cambie. Puede señalar una espera que ya no tiene sentido o un sacrificio que nadie pidió. Es hora de bajarse del árbol y caminar.",
  },
  {
    slug: "la-muerte",
    name: "La Muerte",
    number: 13,
    roman: "XIII",
    keywords: ["transformación", "cierre", "renovación"],
    meaningUpright:
      "La Muerte rara vez habla de muerte: habla de finales necesarios. Algo termina para que algo más pueda existir. Es la carta de la transformación profunda, la poda que permite el brote. Cerrar bien es la forma más honesta de empezar.",
    meaningReversed:
      "Invertida, señala un final que se resiste: aferrarse a lo que ya cumplió su ciclo, alargar despedidas, sostener estructuras vacías. La transición está bloqueada no por el destino sino por el miedo a soltar.",
  },
  {
    slug: "la-templanza",
    name: "La Templanza",
    number: 14,
    roman: "XIV",
    keywords: ["equilibrio", "moderación", "alquimia"],
    meaningUpright:
      "La Templanza mezcla las aguas con un pulso imposible: ni una gota se derrama. Habla de encontrar la medida justa, de integrar opuestos y de avanzar con paciencia de artesano. La armonía aquí no es ausencia de tensión sino su manejo exacto.",
    meaningReversed:
      "Invertida, advierte de excesos o de oscilaciones bruscas: todo o nada, prisa o abandono. La mezcla se corta porque falta paciencia. Recuperar el ritmo propio, aunque sea más lento, devuelve la estabilidad.",
  },
  {
    slug: "el-diablo",
    name: "El Diablo",
    number: 15,
    roman: "XV",
    keywords: ["apego", "deseo", "sombra"],
    meaningUpright:
      "El Diablo muestra las cadenas que nosotros mismos elegimos: apegos, hábitos, deseos que gobiernan en silencio. No es una condena sino un espejo. Reconocer la propia sombra es el primer acto de libertad; las cadenas de esta carta están sueltas.",
    meaningReversed:
      "Invertido, anuncia liberación: una toma de conciencia que afloja el nudo, el principio del desapego. Lo que dominaba pierde fuerza. Es buen momento para romper un patrón que ya fue visto y nombrado.",
  },
  {
    slug: "la-torre",
    name: "La Torre",
    number: 16,
    roman: "XVI",
    keywords: ["ruptura", "revelación", "verdad súbita"],
    meaningUpright:
      "La Torre cae porque estaba construida sobre una base falsa. Es la ruptura súbita que nadie pide y casi todos necesitan: una verdad que derriba estructuras para dejar el terreno limpio. Duele, pero lo que sobrevive a La Torre es real.",
    meaningReversed:
      "Invertida, puede señalar una catástrofe evitada por poco, o un derrumbe que se pospone apuntalando lo que ya no se sostiene. El miedo al colapso retrasa lo inevitable. A veces es mejor desmontar con las propias manos.",
  },
  {
    slug: "la-estrella",
    name: "La Estrella",
    number: 17,
    roman: "XVII",
    keywords: ["esperanza", "inspiración", "sanación"],
    meaningUpright:
      "Después de la tormenta, La Estrella: agua limpia, cielo abierto, una guía serena en la oscuridad. Anuncia un tiempo de sanación y de fe renovada. No promete la llegada inmediata, pero sí que la dirección es correcta.",
    meaningReversed:
      "Invertida, habla de una esperanza apagada: cansancio de creer, inspiración que no llega, fe puesta en el lugar equivocado. La estrella sigue ahí; es la mirada la que está baja. Levantar la vista es el trabajo de esta etapa.",
  },
  {
    slug: "la-luna",
    name: "La Luna",
    number: 18,
    roman: "XVIII",
    keywords: ["intuición", "ilusión", "inconsciente"],
    meaningUpright:
      "La Luna ilumina un paisaje incierto donde nada es exactamente lo que parece. Habla del territorio del sueño, la intuición y los miedos antiguos. No es momento de decidir con datos, porque los datos engañan: es momento de escuchar lo que se sabe sin saber cómo.",
    meaningReversed:
      "Invertida, la niebla comienza a disiparse: una confusión se aclara, un engaño sale a la luz, un miedo pierde tamaño al ser mirado de frente. La noche termina. Conviene anotar lo aprendido antes de que el día lo borre.",
  },
  {
    slug: "el-sol",
    name: "El Sol",
    number: 19,
    roman: "XIX",
    keywords: ["éxito", "vitalidad", "claridad"],
    meaningUpright:
      "El Sol no admite dobles lecturas: es la carta de la alegría plena, la claridad y el éxito que se puede celebrar a plena luz. Lo que estaba confuso se vuelve evidente, lo que estaba frío recupera calor. Disfrutar también es parte del camino.",
    meaningReversed:
      "Invertido, el brillo se nubla apenas: un optimismo algo forzado, un logro que no se deja disfrutar, vitalidad en pausa. La luz no se ha ido, está detrás de una nube pasajera. Pedir menos perfección suele despejar el cielo.",
  },
  {
    slug: "el-juicio",
    name: "El Juicio",
    number: 20,
    roman: "XX",
    keywords: ["despertar", "balance", "llamada"],
    meaningUpright:
      "El Juicio suena como una llamada imposible de ignorar: es hora de hacer balance, perdonar lo que pese y responder a una vocación que insiste. Algo dormido despierta. Las decisiones tomadas ahora tienen el peso de un nuevo comienzo.",
    meaningReversed:
      "Invertido, la llamada se escucha pero no se responde: autocrítica que paraliza, miedo al veredicto propio, balances que se postergan. El pasado solo pesa mientras no se revisa. Nadie más puede responder esta llamada.",
  },
  {
    slug: "el-mundo",
    name: "El Mundo",
    number: 21,
    roman: "XXI",
    keywords: ["culminación", "plenitud", "integración"],
    meaningUpright:
      "El Mundo cierra el viaje de los arcanos: es la culminación, el círculo completo, la danza de quien integró todas sus etapas. Anuncia un logro redondo y la sensación de estar, por fin, en el lugar correcto. Todo final así es también una puerta.",
    meaningReversed:
      "Invertido, señala un cierre pendiente: la meta está cerca pero algo queda sin resolver, un último paso que se evita. La vuelta no estará completa hasta atender ese detalle. Terminar bien importa tanto como empezar.",
  },
];

export const MAJOR_ARCANA: TarotCard[] = MAJORS_RAW.map((card, index) => ({
  ...card,
  id: index,
  arcana: "mayor" as const,
  suit: null,
}));

export { MINOR_ARCANA };

/** Mazo completo: 22 Arcanos Mayores + 56 Menores (bastos, copas, espadas, oros). */
export const ALL_CARDS: TarotCard[] = [...MAJOR_ARCANA, ...MINOR_ARCANA];

export function getCardBySlug(slug: string): TarotCard | undefined {
  return ALL_CARDS.find((card) => card.slug === slug);
}

/** Grupo de navegación de una carta: los Mayores entre sí, cada palo entre sí. */
function getCardGroup(card: TarotCard): TarotCard[] {
  return ALL_CARDS.filter(
    (item) => item.arcana === card.arcana && item.suit === card.suit
  );
}

export function getAdjacentCards(slug: string): {
  prev: TarotCard | null;
  next: TarotCard | null;
} {
  const card = getCardBySlug(slug);
  if (!card) return { prev: null, next: null };
  const group = getCardGroup(card);
  const index = group.findIndex((item) => item.slug === slug);
  return {
    prev: index > 0 ? group[index - 1] : null,
    next: index < group.length - 1 ? group[index + 1] : null,
  };
}

/** Etiqueta corta bajo la miniatura: "XVII" o "III · Copas". */
export function getTileLabel(card: TarotCard): string {
  return card.suit ? `${card.roman} · ${SUIT_LABELS[card.suit]}` : card.roman;
}

/** Antefirma de la página de detalle: "ARCANO XVII" o "COPAS · III". */
export function getCardEyebrow(card: TarotCard): string {
  return card.suit
    ? `${SUIT_LABELS[card.suit].toUpperCase()} · ${card.roman}`
    : `ARCANO ${card.roman}`;
}

/** Carpeta de imágenes de una carta: "arcanos-mayores" o su palo. */
export function getCardCategory(card: TarotCard): CardCategory {
  return card.suit ?? "arcanos-mayores";
}

/**
 * Ruta pública de la imagen de una carta. El mazo por defecto vive en
 * `/cards/<categoria>/<slug>.jpg`; cualquier otro mazo (futuro) en
 * `/cards/<deckId>/<categoria>/<slug>.jpg`.
 */
export function buildCardImagePath(
  category: CardCategory,
  slug: string,
  deckId: string = DEFAULT_DECK_ID
): string {
  const base = deckId === DEFAULT_DECK_ID ? "/cards" : `/cards/${deckId}`;
  return `${base}/${category}/${slug}.jpg`;
}

export function getCardImagePath(card: TarotCard, deckId?: string): string {
  return buildCardImagePath(getCardCategory(card), card.slug, deckId);
}
