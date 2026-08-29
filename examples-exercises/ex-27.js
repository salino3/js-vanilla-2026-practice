let numero = 10;

// Funzione di utilità per creare un'attesa
const attendi = () =>
  new Promise((resolve) => {
    console.log("extra 02:", numero);
    setTimeout(resolve, 0);
  });

async function cambiaValore() {
  console.log("extra:", numero);
  // IL TRAPPOLONE: JavaScript congela la funzione QUI appena vede await
  await attendi().then(() => console.log("extra 03:", numero));

  numero = numero + 5;
  console.log("A:", numero);
}

console.log("1. Inizio");

setTimeout(() => {
  numero = numero * 2;
  console.log("B:", numero);
}, 0);

cambiaValore();

console.log("2. Fine");
console.log("C:", numero);
