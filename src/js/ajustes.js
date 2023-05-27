const propiedadesOriginales = {
  topType: ["NoHair", "Eyepatch", "Hat", "Hijab", "Turban", "WinterHat1", "WinterHat2", "WinterHat3", "WinterHat4", "LongHairBigHair", "LongHairBob", "LongHairBun", "LongHairCurly", "LongHairCurvy", "LongHairDreads", "LongHairFrida", "LongHairFro", "LongHairFroBand", "LongHairNotTooLong", "LongHairShavedSides", "LongHairMiaWallace", "LongHairStraight", "LongHairStraight2", "LongHairStraightStrand", "ShortHairDreads01", "ShortHairDreads02", "ShortHairFrizzle", "ShortHairShaggyMullet", "ShortHairShortCurly", "ShortHairShortFlat", "ShortHairShortRound", "ShortHairShortWaved", "ShortHairSides", "ShortHairTheCaesar", "ShortHairTheCaesarSidePart"],
  accessoriesType: ["Blank", "Kurt", "Prescription01", "Prescription02", "Round", "Sunglasses", "Wayfarers"],
  hatColor: ["Black", "Blue01", "Blue02", "Blue03", "Gray01", "Gray02", "Heather", "PastelBlue", "PastelGreen", "PastelOrange", "PastelRed", "PastelYellow", "Pink", "Red", "White"],
  hairColor: ["Black", "Blonde", "BlondeGolden", "Brown", "Auburn", "BrownDark", "PastelPink", "Platinum", "Red", "SilverGray"],
  facialHairType: ["Blank", "BeardMedium", "BeardLight", "MoustacheFancy", "MoustacheMagnum"],
  facialHairColor: ["Black", "Blonde", "BlondeGolden", "Brown", "Auburn", "BrownDark", "Platinum", "Red"],
  clotheType: ["BlazerShirt", "BlazerSweater", "CollarSweater", "GraphicShirt", "Hoodie", "Overall", "ShirtCrewNeck", "ShirtScoopNeck", "ShirtVNeck"],
  clotheColor: ["Black", "Blue01", "Blue02", "Blue03", "Gray01", "Gray02", "Heather", "PastelBlue", "PastelGreen", "PastelOrange", "PastelRed", "PastelYellow", "Pink", "Red", "White"],
  graphicType: ["Bat", "Cumbia", "Deer", "Diamond", "Hola", "Pizza", "Resist", "Selena", "Bear", "SkullOutline", "Skull"],
  eyeType: ["Close", "Cry", "Default", "Dizzy", "EyeRoll", "Happy", "Hearts", "Side", "Squint", "Surprised", "Wink", "WinkWacky"],
  eyebrowType: ["Angry", "AngryNatural", "Default", "DefaultNatural", "FlatNatural", "RaisedExcited", "RaisedExcitedNatural", "SadConcerned", "SadConcernedNatural", "UnibrowNatural", "UpDown", "UpDownNatural"],
  mouthType: ["Concerned", "Default", "Disbelief", "Eating", "Grimace", "Sad", "ScreamOpen", "Serious", "Smile", "Tongue", "Twinkle", "Vomit"],
  skinColor: ["Tanned", "Yellow", "Pale", "Light", "Brown", "DarkBrown", "Black"]
};
const propiedadesTraducidas = {
  topType: ["👨‍🦲 Calvo", "Parche", "🤠 Sombrero", "🧕 Hijab", "👳‍♂️ Turbante", "Ushanka", "Gorro Chullo", "🎅 Gorro Navideño", "🐱 Gorro Otaku", "Largo Abultado", "Anton Chigurh", "Largo Moño", "Largo Rizado", "Largo Ondulado", "Largo Greñas", "Largo Flores", "Largo Afro", "Largo Afro Diadema", "Semilargo", "Largo Recogido", "Largo MiaWallace", "Largo Liso 1", "Largo Liso 2", "Largo Liso Espalda", "Corto Alborotado 1", "Corto Alborotado 2", "Lados Rapados", "Corto Shaggy Mullet", "Corto Rizado", "Corto Flequillo Levantado", "Corto Flequillo", "Corto Tupe", "Semicalvo", "Corto", "Corto con Raya"],
  accessoriesType: ["Nada", "Kurt", "👓 Gafapasta blancas", "👓 Gafapasta negras", "⚡ Harry Potter", "👓 Gafas de sol pequeñas", "👓 Gafas de sol grandes"],
  hatColor: ["Negro", "Azul claro", "Azul", "Azul oscuro", "Gris claro", "Gris Oscuro", "Azul Grisáceo", "Azul Pastel", "Verde Pastel", "Naranje Pastel", "Rojo Pastel", "Amarillo Pastel", "Rosa", "Rojo", "Blanco"],
  hairColor: ["Oscuro", "Rubio", "Rubio Dorado", "Castaño", "Castaño Claro", "Castaño Oscuro", "Rosa Pastel", "Platino", "Pelirrojo", "Plateado"],
  facialHairType: ["👦 Afeitado", "🧔🏻 Barba tupida", "🧔🏼 Barba corta", "👨🏻 Bigote", "👨🏻 Mostacho"],
  facialHairColor: ["👩🏻‍🦱 Oscuro", "👱🏻 Rubio", "👱🏻‍♀️ Rubio Dorado", "👩🏿‍🦱 Castaño", "👩🏻‍🦱 Castaño Claro", "👨🏾‍🦱 Castaño Oscuro", "👩‍🦳 Platino", "👩‍🦰 Pelirrojo"],
  clotheType: ["Americana con camiseta", "Americana con Suéter", "Suéter", "Camiseta serigrafiada", "Sudadera", "Peto", "Camiseta de cuello cerrado", "Camiseta de cuello abierto", "Camiseta con cuello en V"],
  clotheColor: ["Negro", "Azul claro", "Azul", "Azul oscuro", "Gris claro", "Gris oscuro", "Gris Espacial", "Azul Pastel", "Verde Pastel", "Naranja Pastel", "Rojo Pastel", "Amarillo Pastel", "Rosa", "Rojo", "Blanco"],
  graphicType: ["🦇 Murciélago", "💃 Cumbia", " 🦌 Ciervo", "💠 Diamante", "👋 Hola", "🍕 Pizza", "Resist!", "Selena", "🐻 Oso", "💀 Calavera sin Relleno", "☠️ Calavera con Relleno"],
  eyeType: ["😌 Cerrados", "😭Llorando", "🙂 Normal", "😴 Cansado", "🙄 Pensativo", "😀 Feliz", "😍 Enamorado", "🤔 Extrañado", "🙃 Raro", "😮 Sorprendido", "🤨 Ojo Guiñado 1", "😉 Ojo Guiñado 2"],
  eyebrowType: ["🤬 Enfadado", "😡 Enfadado Natural", "🙂 Normal", "Normal Natural", "Abajo", "🤗 Emocionado", "😊 Emocionado Natural", "😭 Triste", "😭 Triste Natural", "Unicejo", "🤔 Extrañado", "Extrañado Natural"],
  mouthType: ["😮 Boquiabierto", "🙂 Normal", "🙃 Raro", "🍔 Comiendo", "😂 Muy Contento", "😭 Triste", "😱 Gritando Asustado", "😐 Serio", "😀 Sonriendo", "😜 Sacando Lengua", "😁 Contento", "🤮 Vomitando"],
  skinColor: ["🧑🏾‍🦲Bronceado", "🧑🏾‍🦲Simpson", "👨🏼‍🦲Palido", "👨🏼‍🦲Clarito", "👨🏽‍🦲Latino", "👨🏾‍🦲Moreno", "👨🏿‍🦲Café"]
};
const camposTraducidos = ["Pelo/Accesorio", "Gafas", "Color Gorro", "Color Pelo", "Barba", "Color Barba", "Ropa", "Color Ropa", "Letra Ropa", "Ojos", "Cejas", "Boca", "Piel"];
const camposOriginales = ["topType", "accessoriesType", "hatColor", "hairColor", "facialHairType", "facialHairColor", "clotheType", "clotheColor", "graphicType", "eyeType", "eyebrowType", "mouthType", "skinColor"];

const avatarAleatorio = () => {
  const avatar = Object.entries(propiedadesOriginales).reduce((avatar, [prop, listaValores]) => {
    const index = Math.floor(Math.random() * listaValores.length);
    avatar[prop] = listaValores[index];
    return avatar;
  }, {});
  return { ...avatar, avatarStyle: 'Circle' };
}

export { avatarAleatorio, propiedadesOriginales, propiedadesTraducidas, camposTraducidos, camposOriginales };