import { products as productsEn, getStepImage } from "./productData";

const selectOneStepsEs = [
  ["Prepara tu cabello", "Lava el cabello 2 o 3 veces solo con champú—sin acondicionador. Esto elimina los residuos y abre la cutícula para que el tratamiento actúe. Consejo profesional: termina con agua filtrada, porque los minerales del agua del grifo pueden interferir con la fijación del tratamiento."],
  ["Secado parcial—50%", "Divide el cabello en secciones y sécalo con secador hasta que esté aproximadamente 50% seco. Debe quedar ligeramente húmedo."],
  ["Aplica el tratamiento", "Vierte una pequeña cantidad en un bol de plástico—nunca de metal. Divide el cabello en cuatro secciones iguales y sujeta tres con pinzas. Con una brocha de tinte, trabaja sección por sección, comenzando a 1 cm del cuero cabelludo y las raíces. Peina para distribuir de manera uniforme, cubriendo cada mechón de medios a puntas."],
  ["Deja que haga su magia", "Cubre el cabello con un gorro de ducha y deja actuar el tratamiento de 60 a 90 minutos. El cabello grueso o muy rizado necesita los 90 minutos completos para obtener el mejor resultado."],
  ["Enjuaga a fondo", "Enjuaga muy bien con agua fría y buena presión. Asegúrate de eliminar todo el producto y de que el cabello quede completamente limpio."],
  ["Seca por completo", "Seca el cabello por completo—hasta la última gota. Para un acabado liso, estira el cabello con un cepillo mientras lo secas. Las zonas húmedas pueden afectar el resultado final. Consejo de oro: si vas a invertir en herramientas, Taiff es la marca recomendada."],
  ["El momento de la verdad—el sellado", "Trabaja en secciones finas y ajusta según el resultado deseado. Cabello liso extremo: cabello fino 375–400°F con 10–12 pasadas suaves; cabello normal 450°F con 15–20 pasadas; cabello grueso 450–460°F con 20–25 pasadas. Rizos definidos sin frizz: solo 1–2 pasadas ligeras a calor medio. Textura natural sin frizz: omite la plancha y simplemente seca con secador."],
  ["Equilibrio de pH y acondicionamiento final", "Enjuaga a fondo con agua fría. Aplica Prohall Equalizer Mask de medios a puntas para equilibrar el pH. Espera 10 minutos, enjuaga por completo y seca como prefieras."]
];

const burixOneStepsEs = [
  ["Prepara el cabello", "Lava 2–3 veces solo con champú—todavía sin acondicionador. Esto elimina cualquier residuo y abre la cutícula para que el tratamiento se fije correctamente. Consejo profesional: termina con un enjuague de agua filtrada. Los minerales del agua del grifo pueden interferir con la fijación, y este pequeño paso marca una diferencia real."],
  ["Seca al 50%", "Divide el cabello en secciones y sécalo hasta que esté a la mitad. Debe sentirse ligeramente húmedo al tacto."],
  ["Aplica el tratamiento", "Vierte una pequeña cantidad en un bol de plástico—nunca de metal. Divide el cabello en 4 secciones y aparta 3 con pinzas. Con una brocha aplicadora, trabaja una sección a la vez, manteniéndote a 1 cm del cuero cabelludo y las raíces. Peina para que cada mechón quede cubierto de manera uniforme de medios a puntas. Empieza con poco—siempre puedes añadir más."],
  ["Déjalo actuar", "Cubre el cabello con un gorro de ducha y espera 60–90 minutos. El cabello grueso o muy rizado necesita los 90 minutos completos."],
  ["Enjuaga por completo", "Enjuaga con agua fría y buena presión hasta que el cabello se sienta completamente limpio. No te apresures—cualquier resto de producto se notará en el resultado final."],
  ["Seca al 100%", "Seca el cabello por completo, hasta las puntas. Para un acabado más liso, estira el cabello con un cepillo mientras lo secas. Una sola zona húmeda puede cambiar tu resultado."],
  ["Sella con la plancha", "Trabaja en secciones finas y ajusta según el resultado que buscas. Cabello fino: 375–400°F, 10–12 pasadas suaves. Cabello normal: 450°F, 15–20 pasadas. Cabello grueso: 450–460°F, 20–25 pasadas. Rizos definidos: 1–2 pasadas ligeras a calor medio. Textura natural: omite la plancha por completo—solo secador."],
  ["Equilibra el pH y termina", "Enjuaga a fondo con agua fría y aplica Prohall Equalize Mask de medios a puntas. Déjala 10 minutos, enjuaga por completo y peina a tu gusto. Este paso final es lo que hace que tu resultado dure."]
];

const selectOnePreparationNoteEs =
  "El cabello muy fino, decolorado, rubio o frágil requiere cuidado adicional durante el planchado. Usa calor reducido cuando sea necesario, realiza primero una prueba de mechón y sigue las instrucciones con atención. Las altas temperaturas pueden dañar el cabello que no las tolera.";

const selectOneCautionEs =
  "Atención rubias: como el cabello rubio o decolorado es más poroso y frágil, Select One puede alisarlo hasta aproximadamente un 70% y puede no producir el mismo nivel de alisado que en otros tipos de cabello. Realiza primero una prueba de parche y de mechón, nunca apliques el producto directamente sobre el cuero cabelludo y reduce el calor en cabello fino, rubio, decolorado o frágil. Se recomienda asistencia profesional.";

const burixOneCautionEs =
  "Atención rubias: como el cabello rubio o decolorado es más poroso y frágil, Burix One puede alisarlo hasta aproximadamente un 70% y puede no producir el mismo nivel de alisado que en otros tipos de cabello. Realiza primero una prueba de parche y de mechón, nunca apliques el producto directamente sobre el cuero cabelludo y reduce el calor en cabello fino, rubio, decolorado o frágil. Se recomienda asistencia profesional.";

const keratinToolsEs = ["Champú", "Guantes", "Peine de dientes finos", "Pinzas para seccionar", "Secador", "Plancha con temperatura regulable", "Equalize Mask (opcional)"];

const translations = {
  "select-one": {
    type: "Tratamiento de queratina brasileña",
    note: "Sin formaldehído",
    description: "Una crema alisadora profesional impulsada por tecnología nanoplastia que ayuda a reducir el frizz, alisar la fibra capilar y devolver un brillo radiante.",
    benefits: ["Cabello más liso y manejable", "Ayuda a reducir el frizz y las puntas abiertas", "Aporta suavidad y brillo luminoso", "Apto para todo tipo de cabello"],
    ingredients: "Colágeno, aceite de coco, Lumini System y ácido láctico",
    features: ["Sin formaldehído", "Libre de crueldad", "Aroma a coco"],
    duration: "Aproximadamente 2–3 horas",
    tools: keratinToolsEs,
    preparationNote: selectOnePreparationNoteEs,
    steps: selectOneStepsEs,
    caution: selectOneCautionEs
  },
  "select-one-travel": {
    type: "Tratamiento de queratina brasileña",
    note: "Sin formaldehído",
    description: "El formato de viaje del tratamiento alisador profesional Select One.",
    duration: "Aproximadamente 2–3 horas",
    tools: keratinToolsEs,
    preparationNote: selectOnePreparationNoteEs,
    steps: selectOneStepsEs,
    caution: selectOneCautionEs
  },
  "burix-one": {
    videoUrl: null,
    type: "Mascarilla capilar antifrizz",
    note: "Aplicación en un solo paso",
    description: "Una mascarilla antifrizz de un solo paso con proteína de colágeno brasileño que reconstruye, repone nutrientes y aporta un brillo intenso.",
    benefits: ["Reconstruye y fortalece la fibra capilar", "Repone los nutrientes perdidos", "Ayuda a controlar el frizz", "Aporta un brillo intenso"],
    ingredients: "Lumini System, aceite de buriti, biotina y ácido tánico",
    features: ["Fácil aplicación", "Un solo paso", "Uso profesional"],
    duration: "Aproximadamente 2–3 horas",
    tools: keratinToolsEs,
    preparationNote: selectOnePreparationNoteEs,
    steps: burixOneStepsEs,
    caution: burixOneCautionEs
  },
  "force-hair": {
    type: "Sistema fortalecedor",
    note: "Ritual de 3 pasos",
    description: "Un ritual coordinado de limpieza, tratamiento y acondicionamiento para cabello débil, seco o dañado.",
    duration: "Añade 10–15 minutos a tu día de lavado",
    tools: ["Toalla", "Peine de dientes anchos"],
    steps: [
      ["Lava con el Champú Fortificante", "Lava el cabello con Force Hair Champú Fortificante, masajeando el cuero cabelludo hasta hacer espuma. Enjuaga a fondo."],
      ["Aplica la Mascarilla Fortificante", "Aplica la Mascarilla Fortificante Force Hair sobre el cabello húmedo, distribuyéndola bien a lo largo. Déjala actuar de 5 a 10 minutos y enjuaga."],
      ["Termina con el Tónico Fortificante", "Aplica el Tónico Fortificante Force Hair directamente sobre el cuero cabelludo limpio y seco. Masajea suavemente y no enjuagues."]
    ],
    caution: "Evita el contacto con los ojos y suspende el uso si aparece irritación. Sigue los tiempos impresos en tu envase."
  },
  "equalize": {
    type: "Mascarilla equilibrante de pH",
    note: "Reparación + brillo",
    description: "Una mascarilla acondicionadora que equilibra el pH, creada para cabello poroso, procesado y posterior a tratamientos químicos.",
    duration: "5–10 minutos",
    tools: ["Champú", "Toalla", "Peine de dientes anchos"],
    steps: [
      ["Prepara", "Lava bien con champú, enjuaga y seca con toalla para eliminar el exceso de agua."],
      ["Aplica", "Distribuye una cantidad generosa de manera uniforme sobre el cabello húmedo, concentrándote en las zonas dañadas o procesadas."],
      ["Déjala actuar", "Deja la mascarilla de 5 a 10 minutos para que acondicione y ayude a reequilibrar el cabello."],
      ["Enjuaga y termina", "Enjuaga a fondo con agua fría, luego seca y peina como prefieras."]
    ],
    caution: "Evita la zona de la raíz si tu cabello se engrasa con facilidad. Sigue la etiqueta del producto si su tiempo difiere."
  },
  "pro-r-shot": {
    type: "Ampolla de reconstrucción",
    note: "Reparación en 5 minutos",
    description: "Una ampolla de reconstrucción concentrada para un refuerzo rápido y específico durante una rutina de reparación.",
    duration: "Alrededor de 5 minutos",
    tools: ["Recipiente pequeño no metálico", "Agua", "Brocha aplicadora"],
    steps: [
      ["Mezcla la ampolla", "En un recipiente no metálico, mezcla el contenido de la ampolla con agua hasta formar una emulsión homogénea."],
      ["Aplica sobre cabello húmedo", "Aplica sobre el cabello limpio y húmedo, distribuyendo de manera uniforme y cubriendo cada mechón."],
      ["Déjalo actuar", "Deja actuar de 5 a 10 minutos."],
      ["Enjuaga y peina", "Enjuaga a fondo y peina como prefieras."]
    ],
    caution: "Solo para uso externo. Evita el cuero cabelludo y los ojos, y sigue las indicaciones del envase de la ampolla."
  },
  "hair-ampoules-kit": {
    type: "Sistema de cronograma capilar",
    note: "Ritual semanal",
    description: "Un sistema semanal de ampollas diseñado para alternar hidratación, nutrición y reconstrucción específicas.",
    duration: "Un tratamiento por día de lavado",
    tools: ["Recipiente pequeño no metálico", "Agua", "Brocha aplicadora"],
    steps: [
      ["Prepara la mezcla", "En un recipiente no metálico, mezcla partes iguales de agua y el contenido de la ampolla elegida hasta formar una emulsión homogénea."],
      ["Aplica sobre el cabello", "Con el cabello limpio y húmedo, distribuye la mezcla mechón por mechón, cubriendo bien cada uno."],
      ["Tiempo de acción", "Deja actuar durante 5 minutos."],
      ["Enjuaga", "Retira el producto por completo con agua y peina como prefieras."]
    ],
    caution: "Usa solo una ampolla programada a la vez, salvo que el envase indique específicamente lo contrario."
  },
  "absolut-one": {
    type: "Spray protector de calor",
    note: "Protección diaria",
    description: "Un spray de acabado ligero que ayuda a preparar y proteger el cabello antes del secado o del peinado con calor.",
    duration: "Sin enjuague",
    tools: ["Peine de dientes anchos", "Secador o herramienta de peinado"],
    stepGroups: [
      { heading: "Cabello húmedo", size: 3 },
      { heading: "Cabello seco", size: 3 }
    ],
    steps: [
      ["Rocía por todo el cabello", "Rocía la Máscara en Spray Absolut One por todo el cabello desde una distancia de 20 cm."],
      ["Desenreda", "Con un peine, desenreda el cabello y realza el efecto alisador."],
      ["Peina", "¡Peina a tu gusto!"],
      ["Rocía en las palmas", "Rocía la Máscara en Spray Absolut One en las palmas de tus manos."],
      ["Distribuye por el cabello", "Con movimientos suaves, distribuye el producto por el cabello, de medios a puntas."],
      ["Peina", "Peina a tu gusto."]
    ],
    caution: "Evita rociar hacia la cara, los ojos o directamente sobre el cuero cabelludo."
  },
  "absolut-oil": {
    type: "Aceite capilar nutritivo",
    note: "Suavidad + brillo",
    description: "Un aceite de acabado para largos más suaves, puntas pulidas y brillo luminoso.",
    duration: "Sin enjuague",
    tools: ["Manos limpias"],
    steps: [
      ["Limpia y seca con toalla", "Lava tu cabello y elimina el exceso de agua con una toalla."],
      ["Aplica en tu palma", "Con el cabello ligeramente húmedo o seco, aplica una pequeña cantidad de Absolut Oil Serum en la palma de tu mano."],
      ["Distribuye por el cabello", "Distribúyelo suavemente por el cabello, evitando siempre las raíces. Ten cuidado de no aplicar demasiado en un solo punto—es importante que todas las zonas reciban la misma cantidad."],
      ["Peina", "Peina a tu gusto."]
    ],
    caution: "Comienza con una cantidad mínima, especialmente en cabello fino, para no apelmazarlo."
  },
  "toning-masks": {
    type: "Mascarillas correctoras de color",
    note: "4 tonos personalizados",
    description: "Mascarillas acondicionadoras con depósito de color que ayudan a refrescar el tono dejando el cabello suave y pulido.",
    duration: "Sigue la etiqueta del tono",
    tools: ["Guantes", "Toalla", "Peine de dientes anchos"],
    steps: [
      ["Prepara", "Ponte guantes. Lava el cabello con champú, enjuaga y seca con toalla hasta que quede uniformemente húmedo."],
      ["Prueba de mechón", "Prueba la mascarilla en un mechón discreto para comprobar el tono y el tiempo de acción."],
      ["Aplica de manera uniforme", "Distribuye el tono elegido por las zonas que necesitan matizar, peinando con cuidado para una cobertura uniforme."],
      ["Procesa y enjuaga", "Deja actuar el tiempo impreso en la etiqueta del tono y enjuaga a fondo hasta que el agua salga limpia."]
    ],
    caution: "Los resultados de color varían según la porosidad y el tono de partida. Se recomiendan encarecidamente guantes y una prueba de mechón."
  }
};

export const products = productsEn.map((product) => ({
  ...product,
  ...(translations[product.slug] || {})
}));

export function getProduct(slug) {
  return products.find((product) => product.slug === slug);
}

export { getStepImage };
