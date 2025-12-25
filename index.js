const imagen = document.getElementById("nro-imagen-1");

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const slide = {
  botonDerecho: document.getElementById("flecha-uno"),
  botonIzquierdo: document.getElementById("flecha-dos"),
};

function actualizarEstado() {
  const partesId = imagen.id.split("-");

  if (partesId[2] === "1") {
    slide.botonDerecho.style.opacity = "0.5";
    slide.botonDerecho.style.pointerEvents = "none";

    slide.botonIzquierdo.style.opacity = "1";
    slide.botonIzquierdo.style.pointerEvents = "auto";
  } else {
    slide.botonIzquierdo.style.opacity = "0.5";
    slide.botonIzquierdo.style.pointerEvents = "none";

    slide.botonDerecho.style.opacity = "1";
    slide.botonDerecho.style.pointerEvents = "auto";
  }
}

actualizarEstado();

slide.botonIzquierdo.addEventListener("click", async () => {
  imagen.classList.add("ocultar");
  await delay(300);
  imagen.id = "nro-imagen-2";
  imagen.src = "./images/imagen2.jpg";
  imagen.classList.remove("ocultar");
  imagen.classList.add("mostrar");
  await delay(300);
  imagen.classList.remove("mostrar");
  actualizarEstado();
});

slide.botonDerecho.addEventListener("click", async () => {
  imagen.classList.add("ocultar");
  await delay(300);   
  imagen.id = "nro-imagen-1";
  imagen.src = "./images/imagen1.jpg";
  imagen.classList.remove("ocultar");
  imagen.classList.add("mostrar");
  await delay(300);
  imagen.classList.remove("mostrar");
  actualizarEstado();
});
