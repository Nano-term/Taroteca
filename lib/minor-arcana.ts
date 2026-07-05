import type { Suit, TarotCard } from "./cards";

/**
 * Arcanos Menores (56 cartas). Misma estructura TarotCard que los Mayores:
 * el componente de carta, la galería y la página de detalle se reutilizan
 * sin cambios. Significados coherentes con el tarot Rider-Waite.
 */

interface RankDef {
  number: number;
  rank: string;
  rankSlug: string;
  roman: string;
}

const RANKS: RankDef[] = [
  { number: 1, rank: "As", rankSlug: "as", roman: "I" },
  { number: 2, rank: "Dos", rankSlug: "dos", roman: "II" },
  { number: 3, rank: "Tres", rankSlug: "tres", roman: "III" },
  { number: 4, rank: "Cuatro", rankSlug: "cuatro", roman: "IV" },
  { number: 5, rank: "Cinco", rankSlug: "cinco", roman: "V" },
  { number: 6, rank: "Seis", rankSlug: "seis", roman: "VI" },
  { number: 7, rank: "Siete", rankSlug: "siete", roman: "VII" },
  { number: 8, rank: "Ocho", rankSlug: "ocho", roman: "VIII" },
  { number: 9, rank: "Nueve", rankSlug: "nueve", roman: "IX" },
  { number: 10, rank: "Diez", rankSlug: "diez", roman: "X" },
  { number: 11, rank: "Sota", rankSlug: "sota", roman: "XI" },
  { number: 12, rank: "Caballero", rankSlug: "caballero", roman: "XII" },
  { number: 13, rank: "Reina", rankSlug: "reina", roman: "XIII" },
  { number: 14, rank: "Rey", rankSlug: "rey", roman: "XIV" },
];

interface MinorMeaning {
  keywords: string[];
  up: string;
  rev: string;
}

interface SuitDef {
  suit: Suit;
  label: string;
  meanings: MinorMeaning[]; // 14 entradas, en el orden de RANKS
}

const SUITS: SuitDef[] = [
  {
    suit: "bastos",
    label: "Bastos",
    meanings: [
      {
        keywords: ["inspiración", "impulso", "comienzo creativo"],
        up: "El As de Bastos es la chispa original: una idea que enciende, un impulso creativo que pide cuerpo de inmediato. Es energía pura buscando dirección; el mejor momento para empezar es ahora, aunque el plan no esté completo.",
        rev: "Invertido, la chispa no prende: proyectos que se posponen, entusiasmo que se enfría, falta de dirección. La energía existe pero está retenida. Conviene descubrir qué la está apagando antes de forzar el arranque.",
      },
      {
        keywords: ["planificación", "horizonte", "decisión"],
        up: "El Dos de Bastos contempla el mundo desde la muralla con el globo en la mano: el primer logro ya llegó y ahora toca decidir hasta dónde llegar. Habla de planificar la expansión y de elegir entre lo seguro y lo posible.",
        rev: "Invertido, señala miedo a salir del territorio conocido: planes que se quedan en el papel, ambición frenada por la prudencia. El mundo no vendrá a buscarte a la muralla.",
      },
      {
        keywords: ["expansión", "resultados", "previsión"],
        up: "El Tres de Bastos mira los barcos que ya zarparon: lo sembrado empieza a moverse y el horizonte se ensancha. Anuncia primeros resultados, intercambios en marcha y la confirmación de que la dirección era buena.",
        rev: "Invertido, advierte de retrasos en lo esperado, falta de previsión o miras demasiado cortas. Los barcos tardan; revisa si el puerto elegido sigue siendo el correcto.",
      },
      {
        keywords: ["celebración", "hogar", "estabilidad"],
        up: "El Cuatro de Bastos levanta un arco de flores: celebración, hogar, una etapa que se consolida y merece fiesta. Habla de estabilidad alegre, reencuentros y logros compartidos.",
        rev: "Invertido, la celebración se pospone o la base tiembla: tensiones en casa, transiciones incómodas, una alegría que no termina de asentarse. La fiesta llegará, pero antes hay que reparar el arco.",
      },
      {
        keywords: ["competencia", "fricción", "reto"],
        up: "El Cinco de Bastos es el choque de los bastos en alto: competencia, fricción, ideas que pelean por imponerse. No es una batalla grave sino un entrenamiento; del roce puede salir la mejor versión de cada parte.",
        rev: "Invertido, el conflicto se evita a toda costa o escala más de lo que merece. La tensión no resuelta se vuelve interna. Nombrar el desacuerdo suele costar menos que sostenerlo en silencio.",
      },
      {
        keywords: ["victoria", "reconocimiento", "éxito"],
        up: "El Seis de Bastos entra en la ciudad con la corona de laurel: victoria pública, reconocimiento, el esfuerzo por fin visto. Es permiso para celebrar y para dejarse celebrar.",
        rev: "Invertido, advierte del pedestal: éxito sin reconocimiento, vanidad que necesita aplauso o miedo a la caída. La victoria que depende del público dura lo que dura el desfile.",
      },
      {
        keywords: ["defensa", "perseverancia", "posición"],
        up: "El Siete de Bastos defiende lo alto de la colina: la posición ganada será disputada y toca sostenerla. Habla de coraje, perseverancia y de la ventaja de quien sabe exactamente qué defiende.",
        rev: "Invertido, señala sentirse abrumado, ceder terreno por cansancio o defender algo que ya no vale la pena. Antes de seguir resistiendo, pregúntate si la colina sigue siendo tuya.",
      },
      {
        keywords: ["velocidad", "noticias", "movimiento"],
        up: "El Ocho de Bastos cruza el cielo: velocidad, noticias en camino, acontecimientos que se aceleran de golpe. Lo que estaba detenido se mueve; conviene tener las manos libres para recibirlo.",
        rev: "Invertido, los mensajes se retrasan o llegan demasiados a la vez: prisas mal dirigidas, energía dispersa, frenazos imprevistos. Bajar el ritmo no es perder el impulso.",
      },
      {
        keywords: ["resistencia", "cautela", "resiliencia"],
        up: "El Nueve de Bastos resiste vendado pero en pie: es la última prueba antes del final. Habla de resiliencia, de proteger lo construido y de no soltar justo antes de la meta.",
        rev: "Invertido, la guardia constante se vuelve agotamiento y desconfianza: ver enemigos donde hay aliados, rendirse a un paso del final. Descansar también es defender la posición.",
      },
      {
        keywords: ["carga", "responsabilidad", "esfuerzo"],
        up: "El Diez de Bastos carga los diez palos a la vez: éxito que pesa, responsabilidad asumida hasta el límite. La meta está cerca, pero conviene revisar qué cargas son realmente tuyas.",
        rev: "Invertido, anuncia la liberación de un peso o la urgencia de delegarlo: cargar con todo no es mérito sino costumbre. Soltar algunas varas no es abandonar el camino.",
      },
      {
        keywords: ["entusiasmo", "mensaje", "exploración"],
        up: "La Sota de Bastos trae un mensaje encendido: una propuesta, una idea nueva, un entusiasmo joven que quiere ser explorado. Invita a decir sí a lo que despierta curiosidad.",
        rev: "Invertida, el entusiasmo se dispersa antes de concretarse: proyectos que se anuncian y no empiezan, noticias que tardan. La chispa necesita un mínimo de disciplina para volverse fuego.",
      },
      {
        keywords: ["aventura", "pasión", "audacia"],
        up: "El Caballero de Bastos galopa hacia la aventura: pasión, audacia, energía que no espera permiso. Es excelente para arrancar; conviene que alguien recuerde el mapa.",
        rev: "Invertido, la pasión se vuelve precipitación: decisiones impulsivas, ira pronta, proyectos abandonados a medio galope. Frenar no es rendirse; es elegir mejor la dirección del salto.",
      },
      {
        keywords: ["carisma", "calidez", "confianza"],
        up: "La Reina de Bastos preside con un girasol en la mano: calidez magnética, confianza, una energía que anima todo lo que toca. Habla de liderar desde el carisma y la generosidad.",
        rev: "Invertida, la confianza flaquea y aparecen los celos o la exigencia: querer brillar apagando otras luces. Su fuego no necesita competir; necesita volver a su propio centro.",
      },
      {
        keywords: ["liderazgo", "visión", "emprendimiento"],
        up: "El Rey de Bastos gobierna el fuego con visión: es el emprendedor maduro, el líder que convierte la inspiración en estrategia. Anuncia decisiones audaces tomadas con experiencia.",
        rev: "Invertido, el visionario se vuelve autoritario: expectativas imposibles, impaciencia con los ritmos ajenos, liderazgo que no escucha. La visión sin equipo es solo un monólogo.",
      },
    ],
  },
  {
    suit: "copas",
    label: "Copas",
    meanings: [
      {
        keywords: ["amor", "intuición", "apertura"],
        up: "El As de Copas desborda agua viva: un comienzo emocional, amor que se ofrece, intuición y creatividad que fluyen sin esfuerzo. Es una invitación a recibir con el corazón abierto.",
        rev: "Invertido, la copa está tapada o vacía: emociones contenidas, amor que no encuentra cauce, desconexión de lo que se siente. Antes de llenar la copa hay que destaparla.",
      },
      {
        keywords: ["unión", "reciprocidad", "alianza"],
        up: "El Dos de Copas brinda en reciprocidad: una unión equilibrada, romántica o no, donde ambas partes dan y reciben. Anuncia alianzas sinceras y reconciliaciones.",
        rev: "Invertido, el brindis se desequilibra: malentendidos, una parte que da más de lo que recibe, vínculos que piden conversación. La balanza emocional también se calibra hablando.",
      },
      {
        keywords: ["amistad", "celebración", "comunidad"],
        up: "El Tres de Copas alza las copas entre amigas: celebración compartida, comunidad, la alegría que se multiplica al dividirse. Habla de apoyos que sostienen y de festejar los logros ajenos como propios.",
        rev: "Invertido, advierte de excesos en la fiesta, de grupos que asfixian o de terceras personas en discordia. La comunidad nutre cuando deja espacio para cada voz.",
      },
      {
        keywords: ["apatía", "introspección", "oportunidad"],
        up: "El Cuatro de Copas medita bajo el árbol sin ver la copa que se le ofrece: apatía, desencanto, atención puesta en lo que falta. Hay una oportunidad delante; solo pide levantar la mirada.",
        rev: "Invertido, anuncia el final del ensimismamiento: nuevas motivaciones, ganas de aceptar lo que la vida ofrece. La copa sigue ahí, y esta vez se ve.",
      },
      {
        keywords: ["pérdida", "duelo", "aceptación"],
        up: "El Cinco de Copas llora las tres copas derramadas de espaldas a las dos que siguen en pie: duelo, pérdida, la mirada fija en lo que se fue. El dolor es legítimo; las copas intactas, también.",
        rev: "Invertido, comienza la aceptación: perdonar, perdonarse, girar el cuerpo hacia lo que queda. El duelo no se salta, pero sí termina.",
      },
      {
        keywords: ["nostalgia", "recuerdos", "inocencia"],
        up: "El Seis de Copas regala flores en un patio de infancia: nostalgia dulce, recuerdos, gestos inocentes que reconfortan. Puede anunciar reencuentros o regalos que llegan del pasado.",
        rev: "Invertido, la nostalgia se vuelve residencia: vivir hacia atrás, idealizar lo que fue, resistirse a crecer. El pasado es buen visitante y mal casero.",
      },
      {
        keywords: ["opciones", "fantasía", "elección"],
        up: "El Siete de Copas sueña ante siete copas llenas de espejismos: opciones, fantasías, deseos que se confunden entre sí. Imaginar es fértil; elegir es lo que vuelve real una de las copas.",
        rev: "Invertido, la niebla se despeja: fin del autoengaño, claridad para elegir, pies que vuelven al suelo. Menos opciones imaginadas, más camino andado.",
      },
      {
        keywords: ["partida", "búsqueda", "desapego"],
        up: "El Ocho de Copas se aleja de las copas apiladas bajo la luna: dejar atrás algo que funcionaba pero ya no llena. Es la búsqueda de un sentido más hondo, aunque cueste partir.",
        rev: "Invertido, señala el miedo a partir o el regreso a lo dejado: quedarse por costumbre, dudar del propio anhelo. Ni huir ni quedarse a medias: la pregunta es qué llena de verdad.",
      },
      {
        keywords: ["satisfacción", "deseo", "disfrute"],
        up: "El Nueve de Copas sonríe con sus copas en exposición: deseo cumplido, satisfacción, el famoso sí del tarot a lo que se pregunta. Es permiso para disfrutar de lo logrado.",
        rev: "Invertido, el deseo cumplido sabe a poco: complacencia, placeres que no llenan, vanidad de coleccionista. Quizá el deseo apuntaba a otra cosa; vale la pena reformularlo.",
      },
      {
        keywords: ["plenitud", "familia", "armonía"],
        up: "El Diez de Copas dibuja un arcoíris sobre la familia: plenitud emocional, armonía en casa, vínculos que sostienen. Es la copa compartida, no la individual: la alegría hecha hogar.",
        rev: "Invertido, advierte del hogar idealizado: expectativas de postal, conflictos tapados por la foto familiar. La armonía real admite días nublados.",
      },
      {
        keywords: ["sensibilidad", "mensaje", "imaginación"],
        up: "La Sota de Copas trae un pez asomado a la copa: un mensaje del corazón, una invitación creativa, sensibilidad que sorprende. Habla de dejarse sorprender por lo que se siente.",
        rev: "Invertida, la sensibilidad se desborda o se esconde: inmadurez afectiva, escapismo soñador, mensajes emocionales que no se entregan. Sentir mucho no exime de decirlo claro.",
      },
      {
        keywords: ["romanticismo", "propuesta", "encanto"],
        up: "El Caballero de Copas avanza despacio con la copa en alto: es el romántico del tarot, la propuesta, el gesto bello hecho con intención. Anuncia invitaciones y declaraciones.",
        rev: "Invertido, el encanto pierde sustancia: promesas que no se cumplen, idealización, desencanto al conocer al mensajero. La belleza del gesto se mide en su cumplimiento.",
      },
      {
        keywords: ["empatía", "intuición", "cuidado"],
        up: "La Reina de Copas sostiene su copa cerrada y escucha: empatía profunda, intuición madura, cuidado que no invade. Es el corazón que contiene sin ahogarse en lo que contiene.",
        rev: "Invertida, la empatía se desborda: cargar con emociones ajenas, dependencia afectiva, sensibilidad sin orillas. Cuidarse no es egoísmo; es lo que hace posible cuidar.",
      },
      {
        keywords: ["madurez emocional", "serenidad", "consejo"],
        up: "El Rey de Copas navega aguas agitadas sin derramar su copa: madurez emocional, calma en la tormenta, consejo sabio. Sentir hondo y actuar sereno no son contrarios.",
        rev: "Invertido, la calma es fachada: frialdad, humor cambiante o manipulación afectiva. Las aguas que no se nombran terminan moviendo el barco igual.",
      },
    ],
  },
  {
    suit: "espadas",
    label: "Espadas",
    meanings: [
      {
        keywords: ["claridad", "verdad", "decisión"],
        up: "El As de Espadas corta el aire con una verdad: claridad mental repentina, una idea decisiva, justicia que se abre paso. Es excelente para decidir, firmar o nombrar lo que estaba confuso.",
        rev: "Invertido, la mente se nubla: ideas confusas, decisiones forzadas, verdades usadas como arma. Una espada sin puntería hace daño hasta en la vaina.",
      },
      {
        keywords: ["indecisión", "tregua", "dilema"],
        up: "El Dos de Espadas cruza las armas con los ojos vendados: una tregua, una decisión aplazada, equilibrio sostenido a base de no mirar. La calma es real, pero provisional.",
        rev: "Invertido, la venda cae: llega información, y la decisión ya no admite espera. El desempate puede ser incómodo, pero la parálisis cobraba intereses.",
      },
      {
        keywords: ["dolor", "ruptura", "verdad"],
        up: "El Tres de Espadas atraviesa el corazón bajo la lluvia: dolor, ruptura, una verdad que duele precisamente porque es verdad. Nombrar la herida es el primer punto de sutura.",
        rev: "Invertido, la herida empieza a cerrar: perdón, alivio lento, o bien un dolor que se alarga por no ser atendido. La lluvia termina; conviene no quedarse a vivir en ella.",
      },
      {
        keywords: ["descanso", "recuperación", "pausa"],
        up: "El Cuatro de Espadas descansa en la capilla: pausa necesaria, recuperación, silencio que repara la mente. No es rendición: es el mantenimiento del guerrero.",
        rev: "Invertido, advierte del descanso negado o forzoso: agotamiento que se ignora hasta que obliga a parar, o un retiro que ya duró demasiado. Ni huelga de sueño ni hibernación.",
      },
      {
        keywords: ["conflicto", "derrota", "orgullo"],
        up: "El Cinco de Espadas recoge las armas de los vencidos: una victoria con coste, un conflicto donde todos pierden algo. Pregunta si ganar esta discusión vale el campo que deja detrás.",
        rev: "Invertido, abre la puerta a la reconciliación: soltar el orgullo, reparar lo dicho, retirarse de batallas que no construyen. Perder una pelea puede ser ganar la paz.",
      },
      {
        keywords: ["transición", "viaje", "alivio"],
        up: "El Seis de Espadas cruza el agua hacia la otra orilla: transición, alejarse de la turbulencia, viaje hacia aguas más calmas. El equipaje pesa, pero la dirección es buena.",
        rev: "Invertido, la travesía se complica: resistencia a partir, asuntos pendientes que tiran de la barca, regresos a la orilla vieja. Algunas despedidas hay que terminar de hacerlas.",
      },
      {
        keywords: ["estrategia", "sigilo", "astucia"],
        up: "El Siete de Espadas se lleva las armas de puntillas: estrategia, sigilo, ingenio para evitar el enfrentamiento directo. A veces es astucia legítima; otras, un engaño que pide revisión.",
        rev: "Invertido, el plan queda al descubierto: confesiones, secretos que salen a la luz, astucia que se vuelve contra su autor. La verdad tiene mejor logística que la mentira.",
      },
      {
        keywords: ["restricción", "creencias", "liberación"],
        up: "El Ocho de Espadas está atado entre espadas que no lo tocan: restricción mental, creencias que aprisionan más que los hechos. La salida existe; el primer nudo está en la mirada.",
        rev: "Invertido, los nudos ceden: perspectivas nuevas, fin del victimismo, libertad recuperada paso a paso. Nadie vuelve a atarse igual después de verse las manos libres.",
      },
      {
        keywords: ["ansiedad", "insomnio", "preocupación"],
        up: "El Nueve de Espadas despierta a medianoche con la cara entre las manos: ansiedad, insomnio, preocupaciones que crecen en la oscuridad. El miedo nocturno es mal cartógrafo: distorsiona el tamaño de todo.",
        rev: "Invertido, la noche empieza a ceder: las preocupaciones pierden volumen a la luz del día y pedir ayuda se vuelve posible. Hablado, el monstruo suele medir la mitad.",
      },
      {
        keywords: ["final", "traición", "renacer"],
        up: "El Diez de Espadas yace con las diez espadas a la espalda: un final doloroso, una traición, el fondo del pozo. Su único consuelo es literal: desde aquí, todo camino es ascenso.",
        rev: "Invertido, anuncia la recuperación lenta o el desastre evitado por poco: las heridas cierran y el amanecer del fondo de la carta gana terreno. Levantarse también es un proceso.",
      },
      {
        keywords: ["curiosidad", "vigilancia", "agilidad mental"],
        up: "La Sota de Espadas vigila con la espada en alto: curiosidad intelectual, mente despierta, alguien que observa y aprende rápido. Buen momento para preguntar, investigar y verificar.",
        rev: "Invertida, la mente despierta se vuelve inquieta de más: chismes, conclusiones precipitadas, palabras que cortan sin querer. Afilar la lengua no es lo mismo que afinar el juicio.",
      },
      {
        keywords: ["determinación", "velocidad", "ofensiva"],
        up: "El Caballero de Espadas carga a todo galope contra el viento: determinación intelectual, defensa apasionada de una idea, acción directa. Imparable, para bien y para mal.",
        rev: "Invertido, la carga pierde el control: agresividad verbal, imprudencia, choques que se podían rodear. La velocidad sin dirección solo garantiza llegar antes al lugar equivocado.",
      },
      {
        keywords: ["percepción", "independencia", "juicio"],
        up: "La Reina de Espadas señala con la mano y sostiene la espada recta: percepción aguda, independencia, juicio limpio de sentimentalismos. Dice las verdades con precisión de cirujana.",
        rev: "Invertida, la precisión se vuelve frialdad: crítica que hiere, amargura acumulada, distancia usada como armadura. La claridad no necesita crueldad para ser clara.",
      },
      {
        keywords: ["autoridad", "ética", "razón"],
        up: "El Rey de Espadas preside con la espada apenas inclinada: autoridad intelectual, ética, el consejo de quien domina su materia. Anuncia decisiones justas tomadas con la cabeza fría.",
        rev: "Invertido, el intelecto se vuelve instrumento de poder: manipulación, rigidez, juicios sin apelación. La espada de la mente también jura un código.",
      },
    ],
  },
  {
    suit: "oros",
    label: "Oros",
    meanings: [
      {
        keywords: ["oportunidad", "prosperidad", "semilla"],
        up: "El As de Oros ofrece una moneda desde la nube: una oportunidad material concreta, semilla de prosperidad, un comienzo con los pies en la tierra. Lo que se plante ahora tiene vocación de durar.",
        rev: "Invertido, la oportunidad se escapa o llega torcida: malas inversiones, planes sin base, prosperidad que se queda en promesa. Revisa el terreno antes de volver a sembrar.",
      },
      {
        keywords: ["equilibrio", "adaptación", "prioridades"],
        up: "El Dos de Oros hace malabares con dos monedas unidas por un lazo infinito: equilibrio en movimiento, adaptabilidad, varias prioridades danzando a la vez. El secreto no es parar: es el ritmo.",
        rev: "Invertido, los malabares se caen: sobrecarga, desorden financiero, compromisos que ya no caben en las manos. Soltar una bola a tiempo es mejor que perderlas todas.",
      },
      {
        keywords: ["colaboración", "maestría", "reconocimiento"],
        up: "El Tres de Oros reúne al artesano con quienes valoran su obra: trabajo en equipo, maestría reconocida, colaboración donde cada parte aporta lo suyo. La calidad se nota y se nombra.",
        rev: "Invertido, la obra se resiente: descoordinación, esfuerzo sin reconocimiento, trabajo hecho a desgana. El talento aislado rinde menos que el oficio compartido.",
      },
      {
        keywords: ["ahorro", "control", "seguridad"],
        up: "El Cuatro de Oros abraza su moneda con todo el cuerpo: ahorro, control, conservar lo ganado. La seguridad es legítima; el agarrotamiento, no tanto.",
        rev: "Invertido, la mano se abre: gastos liberados, generosidad recuperada o, en exceso, control que se pierde. Ni caja fuerte ni manirroto: la moneda existe para circular con criterio.",
      },
      {
        keywords: ["carencia", "exclusión", "ayuda"],
        up: "El Cinco de Oros camina en la nieve frente a la ventana iluminada: carencia, exclusión, la sensación de quedarse fuera. La ayuda está más cerca de lo que la nieve deja ver.",
        rev: "Invertido, la racha adversa amaina: ayuda que llega, recuperación material o anímica, puertas que vuelven a abrirse. El frío enseñó dónde están los abrigos.",
      },
      {
        keywords: ["generosidad", "equilibrio", "deuda"],
        up: "El Seis de Oros pesa las monedas antes de darlas: generosidad con balanza, dar y recibir en justa medida, deudas que se saldan. Hoy puede tocarte cualquiera de los dos lados.",
        rev: "Invertido, la balanza se inclina: generosidad con condiciones, deudas que pesan, ayuda que humilla en vez de levantar. Dar bien es un arte; recibir bien, otro.",
      },
      {
        keywords: ["paciencia", "evaluación", "cosecha"],
        up: "El Siete de Oros se apoya en la azada y contempla la mata crecida: paciencia, evaluación, la pausa del agricultor antes de la cosecha. Lo invertido está creciendo; no lo desentierres para comprobarlo.",
        rev: "Invertido, la espera impacienta: esfuerzo mal dirigido, ganas de abandonar antes del fruto. Quizá toca ajustar el cultivo, no quemarlo.",
      },
      {
        keywords: ["oficio", "dedicación", "aprendizaje"],
        up: "El Ocho de Oros talla moneda tras moneda en su banco de trabajo: oficio, dedicación, el aprendizaje que se vuelve maestría a base de repetición consciente. El trabajo bien hecho es su propia recompensa, y además paga.",
        rev: "Invertido, el cincel pierde sentido: trabajo sin alma, perfeccionismo paralizante o chapuza por desgana. El oficio se recupera volviendo a amar el detalle, no sumando horas.",
      },
      {
        keywords: ["independencia", "abundancia", "disfrute"],
        up: "El Nueve de Oros pasea por su viñedo con el halcón en la mano: independencia, abundancia ganada, el disfrute sereno de lo construido. Es el lujo de no deberle el bienestar a nadie.",
        rev: "Invertido, advierte del jardín dorado con cerradura: dependencia material, gastos para aparentar, soledad entre las vides. La abundancia que aísla es solo decorado.",
      },
      {
        keywords: ["legado", "familia", "estabilidad"],
        up: "El Diez de Oros reúne a tres generaciones bajo el arco del escudo: legado, estabilidad duradera, riqueza que trasciende a una sola vida. Habla de raíces, herencias y de construir para quienes vienen.",
        rev: "Invertido, el legado se disputa: conflictos familiares por lo material, estabilidad solo aparente, tradiciones que pesan. La verdadera herencia no siempre se guarda en el banco.",
      },
      {
        keywords: ["estudio", "aplicación", "noticias"],
        up: "La Sota de Oros contempla su moneda como quien estudia: aplicación, ganas de aprender un oficio, noticias de dinero o de estudios. Anuncia comienzos modestos con vocación de fruto.",
        rev: "Invertida, el estudio se dispersa: distracciones, resultados que tardan, planes materiales sin primer paso. La moneda no crece mirándola: se invierte en horas concretas.",
      },
      {
        keywords: ["constancia", "método", "fiabilidad"],
        up: "El Caballero de Oros avanza al paso, sin prisa y sin pausa: constancia, método, fiabilidad absoluta. No es el más veloz del tarot, pero es el único que siempre llega.",
        rev: "Invertido, el paso firme se vuelve rutina paralizante: aburrimiento, lentitud excesiva, resistencia a todo cambio. La constancia sirve a un destino, no al surco mismo.",
      },
      {
        keywords: ["abundancia práctica", "cuidado", "hogar"],
        up: "La Reina de Oros cuida su moneda en un trono entre flores: abundancia práctica, cuidado tangible, la inteligencia de hacer hogar en cualquier parte. Nutre sin descuidarse.",
        rev: "Invertida, el cuidado se desequilibra: todo para el trabajo o todo para los demás, y el autocuidado en último lugar. El jardín de la Reina también la incluye a ella.",
      },
      {
        keywords: ["prosperidad", "solidez", "generosidad"],
        up: "El Rey de Oros reposa la mano sobre el toro de su trono: prosperidad consolidada, éxito sólido, la generosidad de quien ya no tiene nada que demostrar. Es el mecenas del tarot.",
        rev: "Invertido, la solidez se endurece: materialismo, terquedad, medirlo todo en cifras. La riqueza que no se disfruta ni se comparte es solo inventario.",
      },
    ],
  },
];

export const MINOR_ARCANA: TarotCard[] = SUITS.flatMap((suitDef, suitIndex) =>
  suitDef.meanings.map((meaning, rankIndex) => {
    const rank = RANKS[rankIndex];
    return {
      id: 22 + suitIndex * 14 + rankIndex,
      slug: `${rank.rankSlug}-de-${suitDef.suit}`,
      name: `${rank.rank} de ${suitDef.label}`,
      number: rank.number,
      roman: rank.roman,
      arcana: "menor" as const,
      suit: suitDef.suit,
      keywords: meaning.keywords,
      meaningUpright: meaning.up,
      meaningReversed: meaning.rev,
    };
  })
);
