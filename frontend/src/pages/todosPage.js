export const todosPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gray-100"
  );

  const btnHome = document.createElement("button");

  btnHome.classList.add(
    "bg-[#4b1c71]",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-[#7f4ca5]",
    "mb-4"
  );

  btnHome.textContent = "Home";

  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const btnAddTodo = document.createElement("button");
  btnAddTodo.classList.add(
    "bg-[#4b1c71]",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-[#7f4ca5]",
    "mb-4"
  );
  btnAddTodo.textContent = "Agregar nueva tarea";

  btnAddTodo.addEventListener("click", () => {
    // Redirigir a una página para agregar una nueva tarea
    window.location.pathname = "/add-todo";
  });

  const title = document.createElement("h1");

  title.classList.add("text-4xl", "font-bold", "mb-4", "text-[#4b1c71]");
  title.textContent = "Lista de Tareas";

  const table = document.createElement("table");

  table.classList.add(
    "w-3/4",
    "bg-white",
    "shadow-md",
    "rounded",
    "overflow-y-scroll"
  );

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  
  const th1 = document.createElement("th");
  th1.classList.add("border", "px-4", "py-2", "text-[#4b1c71]");
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add("border", "px-4", "py-2", "text-[#4b1c71]");
  th2.textContent = "Título";

  const th3 = document.createElement("th");
  th3.classList.add("border", "px-4", "py-2", "text-[#4b1c71]");
  th3.textContent = "Completado";

  const th4 = document.createElement("th");
  th4.classList.add("border", "px-4", "py-2", "text-[#4b1c71]");
  th4.textContent = "Owner Id";

  const th5 = document.createElement("th");
  th5.classList.add("border", "px-4", "py-2", "text-[#4b1c71]");
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
  container.appendChild(btnAddTodo);

  fetch("http://localhost:4000/todos", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      data.todos.forEach((todo) => {
        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.classList.add("border", "px-4", "py-2", "text-[#7f4ca5]");
        td1.textContent = todo.id;

        const td2 = document.createElement("td");
        td2.classList.add("border", "px-4", "py-2", "text-[#7f4ca5]");
        td2.textContent = todo.title;

        const td3 = document.createElement("td");
        td3.classList.add("border", "px-4", "py-2", "text-[#7f4ca5]");
        td3.textContent = todo.completed ? "Sí" : "No";

        const td4 = document.createElement("td");
        td4.classList.add("border", "px-4", "py-2", "text-[#7f4ca5]");
        td4.textContent = todo.owner;

        // Botones para editar, eliminar y marcar como completado
        const td5 = document.createElement("td");
        td5.classList.add("border", "px-4", "py-2");

        const btnEdit = document.createElement("button");
        btnEdit.classList.add(
          "bg-[#4b1c71]",
          "text-white",
          "p-1",
          "rounded",
          "hover:bg-[#7f4ca5]",
          "mr-2"
        );
        btnEdit.textContent = "Editar";
        btnEdit.addEventListener("click", () => {
          window.location.pathname = `/edit-todo/${todo.id}`;
        });

        const btnDelete = document.createElement("button");
        btnDelete.classList.add(
          "bg-[#4b1c71]",
          "text-white",
          "p-1",
          "rounded",
          "hover:bg-[#7f4ca5]",
          "mr-2"
        );
        btnDelete.textContent = "Eliminar";
        btnDelete.addEventListener("click", () => {
          fetch(`http://localhost:4000/todos/${todo.id}`, {
            method: "DELETE",
            credentials: "include",
          }).then(() => {
            window.location.reload();
          });
        });

        const btnToggleCompleted = document.createElement("button");
        btnToggleCompleted.classList.add(
          "bg-[#4b1c71]",
          "text-white",
          "p-1",
          "rounded",
          "hover:bg-[#7f4ca5]"
        );
        btnToggleCompleted.textContent = todo.completed
          ? "Marcar como incompleto"
          : "Marcar como completado";
        btnToggleCompleted.addEventListener("click", () => {
          fetch(`http://localhost:4000/todos/${todo.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed: !todo.completed }),
            credentials: "include",
          }).then(() => {
            window.location.reload();
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
