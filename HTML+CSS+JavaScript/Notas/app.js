const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notes");
const searchInput = document.getElementById("searchInput");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function guardarNotas() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderizarNotas(filtro = "") {

  notesContainer.innerHTML = "";

  // notas fijadas arriba
  const notasOrdenadas = [...notes].sort((a, b) => b.fijada - a.fijada);

  notasOrdenadas.forEach((notaObj) => {

    // buscador
    if (!notaObj.texto.toLowerCase().includes(filtro.toLowerCase())) {
      return;
    }

    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    noteDiv.innerHTML = `
      <small>${notaObj.fecha}</small>

      <textarea>${notaObj.texto}</textarea>

      <button class="pinBtn">
        ${notaObj.fijada ? "📌 Desfijar" : "📍 Fijar"}
      </button>

      <button class="deleteBtn">Eliminar</button>
    `;

    // textarea
    const textarea = noteDiv.querySelector("textarea");

    textarea.addEventListener("input", () => {

      notaObj.texto = textarea.value;

      guardarNotas();

    });

    // eliminar
    const deleteBtn = noteDiv.querySelector(".deleteBtn");

    deleteBtn.addEventListener("click", () => {

      notes = notes.filter(n => n !== notaObj);

      guardarNotas();

      renderizarNotas(searchInput.value);

    });

    // fijar
    const pinBtn = noteDiv.querySelector(".pinBtn");

    pinBtn.addEventListener("click", () => {

      notaObj.fijada = !notaObj.fijada;

      guardarNotas();

      renderizarNotas(searchInput.value);

    });

    notesContainer.appendChild(noteDiv);

  });
}

// nueva nota
addBtn.addEventListener("click", () => {

  notes.push({
    texto: "",
    fecha: new Date().toLocaleDateString(),
    fijada: false
  });

  guardarNotas();

  renderizarNotas(searchInput.value);

});

// buscador
searchInput.addEventListener("input", () => {

  renderizarNotas(searchInput.value);

});

renderizarNotas();