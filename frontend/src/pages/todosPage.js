export const todosPage = () => {
  const container = document.createElement("div");

  const colors = {
    background: "#ECD4EA",
    buttonPrimary: "#A987A8",
    buttonHover: "#693B69",
    buttonComplete: "#511F52",
    buttonEdit: "#FFA500", // Naranja para editar
    buttonDelete: "#DC143C", // Rojo para eliminar
    buttonToggle: "#32CD32" // Verde para completar
  };

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-screen"
  );
  container.style.backgroundColor = colors.background;

  const btnHome = document.createElement("button");
  btnHome.classList.add(
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-opacity-80",
    "mb-4"
  );
  btnHome.style.backgroundColor = colors.buttonPrimary;
  btnHome.textContent = "Home";
  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const btnAdd = document.createElement("button");
  btnAdd.classList.add(
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-opacity-80",
    "mb-4"
  );
  btnAdd.style.backgroundColor = colors.buttonComplete;
  btnAdd.textContent = "Agregar Tarea";
  btnAdd.addEventListener("click", () => {
    const title = prompt("Ingresa el título de la tarea:");
    const completed = confirm("¿Está completada?");

    fetch("http://localhost:4000/todos", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Tarea agregada");
        location.reload();
      });
  });

  const title = document.createElement("h1");
  title.classList.add("text-3xl", "font-bold", "mb-4", "text-purple-800");
  title.textContent = "List of Todos";

  const table = document.createElement("table");
  table.classList.add(
    "w-1/2",
    "bg-white",
    "shadow-md",
    "h-[700px]",
    "overflow-y-scroll"
  );

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  const th1 = document.createElement("th");
  th1.classList.add("border", "px-4", "py-2");
  th1.textContent = "ID";
  
  const th2 = document.createElement("th");
  th2.classList.add("border", "px-4", "py-2");
  th2.textContent = "Title";
  
  const th3 = document.createElement("th");
  th3.classList.add("border", "px-4", "py-2");
  th3.textContent = "Completed";
  
  const th4 = document.createElement("th");
  th4.classList.add("border", "px-4", "py-2");
  th4.textContent = "Owner Id";
  
  const th5 = document.createElement("th");
  th5.classList.add("border", "px-4", "py-2");
  th5.textContent = "Acciones";

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5);

  thead.appendChild(tr);
  
  const tbody = document.createElement("tbody");
  tbody.classList.add("text-center");
  table.appendChild(thead);
  table.appendChild(tbody);

  container.appendChild(btnHome);
  container.appendChild(btnAdd);
  
  fetch("http://localhost:4000/todos", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      data.todos.forEach((todo) => {
        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.classList.add("border", "px-4", "py-2");
        td1.textContent = todo.id;

        const td2 = document.createElement("td");
        td2.classList.add("border", "px-4", "py-2");
        td2.textContent = todo.title;

        const td3 = document.createElement("td");
        td3.classList.add("border", "px-4", "py-2");
        td3.textContent = todo.completed ? "Sí" : "No";

        const td4 = document.createElement("td");
        td4.classList.add("border", "px-4", "py-2");
        td4.textContent = todo.owner;

        const td5 = document.createElement("td");
        td5.classList.add("border", "px-4", "py-2");

        const btnEdit = document.createElement("button");
        btnEdit.classList.add("text-white", "p-1", "mr-2", "rounded");
        btnEdit.style.backgroundColor = colors.buttonEdit;
        btnEdit.textContent = "Editar";
        btnEdit.addEventListener("click", () => {
          const newTitle = prompt("Nuevo título:", todo.title);
          const newCompleted = confirm("¿Está completada?");

          fetch(`http://localhost:4000/todos/${todo.id}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTitle, completed: newCompleted }),
          })
            .then(response => response.json())
            .then(() => {
              alert("Tarea actualizada");
              location.reload();
            });
        });

        const btnDelete = document.createElement("button");
        btnDelete.classList.add("text-white", "p-1", "mr-2", "rounded");
        btnDelete.style.backgroundColor = colors.buttonDelete;
        btnDelete.textContent = "Eliminar";
        btnDelete.addEventListener("click", () => {
          if (confirm("¿Seguro que deseas eliminar esta tarea?")) {
            fetch(`http://localhost:4000/todos/${todo.id}`, {
              method: "DELETE",
              credentials: "include",
            })
              .then(() => {
                alert("Tarea eliminada");
                location.reload();
              });
          }
        });

        const btnToggleCompleted = document.createElement("button");
        btnToggleCompleted.classList.add("text-white", "p-1", "rounded");
        btnToggleCompleted.style.backgroundColor = colors.buttonToggle;
        btnToggleCompleted.textContent = todo.completed ? "Marcar como no completada" : "Marcar como completada";
        btnToggleCompleted.addEventListener("click", () => {
          const newCompleted = !todo.completed;

          fetch(`http://localhost:4000/todos/${todo.id}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: newCompleted }),
          })
            .then(response => response.json())
            .then(() => {
              alert(`Tarea marcada como ${newCompleted ? 'completada' : 'no completada'}`);
              location.reload();
            });
        });

        td5.appendChild(btnEdit);
        td5.appendChild(btnDelete);
        td5.appendChild(btnToggleCompleted);
        
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        tbody.appendChild(tr);
      });
    });

  container.appendChild(title);
  container.appendChild(table);

  return container;
};
