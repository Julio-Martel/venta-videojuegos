const imagen = document.getElementById("nro-imagen-1");

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

const slide = {
  botonDerecho: document.getElementById("flecha-uno"),
  botonIzquierdo: document.getElementById("flecha-dos"),
};

actualizarEstado();

slide.botonIzquierdo.addEventListener("click", () => {
  imagen.id = "nro-imagen-2";
  imagen.src = "./images/imagen2.jpg";
  actualizarEstado();
});

slide.botonDerecho.addEventListener("click", () => {
  imagen.id = "nro-imagen-1";
  imagen.src = "./images/imagen1.jpg";
  actualizarEstado();
});
