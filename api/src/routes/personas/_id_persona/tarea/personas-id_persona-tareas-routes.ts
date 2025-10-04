import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from '@fastify/type-provider-typebox'
import { Tarea } from "../../../../model/tarea_model.ts";
import { createTarea, deleteTareaById, findTareaById } from "../../../../services/tareas.ts";
import fastify from "fastify";

const personasRoutes: FastifyPluginAsyncTypebox = async function (fastify) {
  fastify.get('/', {
    schema:{
      tags: ['Tareas'],
      params: Type.Pick(Tarea, ["id_persona"]),
      response: {
        200: Tarea,
      },
    },
    preHandler: fastify.verifyParamsId
  },
  async function (req, rep) {
    return findTareaById(req.params.id_persona);
  })
  fastify.post('/', {
    schema:{
      tags:["Tareas"],
      body: Type.Pick(Tarea, ["id_persona", "titulo"]),
      response:{
        201: Tarea
      },
    },
    preHandler: fastify.verifyParamsId
  },
  async function (req, rep) {
    const {id_persona, titulo} = req.body;
    const tareaPost = createTarea(id_persona, titulo)
    return tareaPost;
  })
};

export default personasRoutes;
