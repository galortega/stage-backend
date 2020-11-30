export const categorias = {
  SOLO: {
    label: "Solo",
    value: "S",
    min: 1,
    max: 1,
    tiempo: 2
  },
  DUO: {
    label: "Duo",
    valie: "D",
    min: 2,
    max: 2,
    tiempo: 2
  },
  TRIO: {
    label: "Trío",
    value: "T",
    min: 3,
    max: 3,
    tiempo: 2
  },
  GRUPO_PEQUENO: {
    label: "Grupo Pequeño",
    value: "GP",
    min: 4,
    max: 9,
    tiempo: 2.5
  },
  GRUPO_GRANDE: {
    label: "Grupo Grande",
    value: "GG",
    min: 10,
    max: 19,
    tiempo: 3
  },
  GRUPO_XL: {
    label: "Grupo XL",
    value: "GXL",
    min: 20,
    max: null,
    tiempo: 4
  }
};

export const switchCategoria = (cantidad) => {
  switch (cantidad) {
    case _.inRange(cantidad, categorias.SOLO.min, categorias.SOLO.max):
      return categorias.SOLO;
    case y:
      // code block
      break;
    default:
    // code block
  }
};
