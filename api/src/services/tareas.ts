import { UcuDatosIncorrectos, UcuNoEncontrado } from "../model/errors.ts";
import type { Tarea } from "../model/tarea_model.ts";

const listaTareas: Tarea[] = [
  {
    id_tarea: 1,
    id_persona: 3,
    titulo: "Pasear perro",
  },
  {
    id_tarea: 2,
    id_persona: 3,
    titulo: "Cocinar",
  },
  {
    id_tarea: 3,
    id_persona: 4,
    titulo: "Ir al gim",
  },
  {
    id_tarea: 4,
    id_persona: 4,
    titulo: "Bañarse",
  },
];

export async function createTarea(persona: number, titulo: string){
  const tareaExiste = listaTareas.find((t) => t.titulo === titulo && t.id_persona === persona);
  if (tareaExiste) throw new UcuDatosIncorrectos("El usuario ya tiene la tarea asignada");
  const idTareaNueva = Math.max(...listaTareas.map((t) => t.id_tarea)) +1;
  listaTareas.push({ id_tarea: idTareaNueva, id_persona: persona, titulo: titulo });
  return listaTareas[idTareaNueva - 1]
}

export async function findTareaById (id_persona: number) {
  const tareasPersona: Tarea = listaTareas.find((t) => t.id_persona === id_persona);
  if (!tareasPersona) throw new UcuNoEncontrado("El usuario no tiene tareas asignadas aun.")
  return tareasPersona;
};

export async function deleteTareaById (id_tarea_borrar: number) {
  const indice = listaTareas.findIndex((t) => t.id_tarea === id_tarea_borrar);
  if (indice < 0) throw new UcuNoEncontrado("Tarea no encotrada");
  listaTareas.splice(indice, 1);
};