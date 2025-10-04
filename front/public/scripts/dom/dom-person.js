import personService from "../services/person.js";
import { mainElement, menuListaUsuariosElement, menuCrearUsuarioElement, menuMisTareasElement } from "./dom-main-elements.js";

menuListaUsuariosElement.addEventListener("click", () => {
  mostrarListarUsuarios();
});

menuCrearUsuarioElement.addEventListener("click", () => {
  mostrarCrearUsuarios();
});

menuMisTareasElement.addEventListener("click", () => {
  mostrarTareasUsuarios();
});

export async function mostrarListarUsuarios() {
  
}

export async function mostrarCrearUsuarios() {
  try {
    // const users = await personService.create();
    const miHtml = `
    <h2 id="form-title">Creación de un nuevo usuario</h2>
        <form id="create-user-form">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <br><br>
            <label for="roles">Roles:</label>
            <input type="text" id="roles" placeholder:"admin, normal" name="roles" required>
            <br><br>
            <button type="submit" id="submit-btn">Guardar</button>
            <button type="button" id="cancel-btn">Cancelar</button>
        </form>
        <br>
        <br>
  `;
    mainElement.innerHTML = miHtml;
  } catch (error) {
    console.error(error.message);
    mainElement.innerHTML = `
      <div id="error-login" class="error-message">${error.message}</div>
    `;
  }
}

export async function mostrarTareasUsuarios() {
  try {
    const users = await findTareaById();
    const miHtml = `
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Roles</th>
        </tr>
      </thead>
      <tbody>
        ${users
          .map(
            (user) => `
          <tr>
            <td>${user.username}</td>
            <td>${user.roles.join(", ")}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

    mainElement.innerHTML = miHtml;
  } catch (error) {
    console.error(error.message);
    mainElement.innerHTML = `
      <div id="error-login" class="error-message">${error.message}</div>
    `;
  }
}
