import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { deleteTareaById } from "../../../../../services/tareas.ts";
import { Tarea } from "../../../../../model/tarea_model.ts";
import { Type } from '@fastify/type-provider-typebox'

const personasRoutes: FastifyPluginAsyncTypebox = async function (fastify) {
    fastify.delete('', {
            schema:{
            tags:["Tareas"],
            params: Type.Pick(Tarea, ["id_tarea"]),
            response: {
                204: Type.Null(),
            },
        },
    preHandler: fastify.verifyParamsId,
    },
    async function (req, rep) {
        const idBorrar = req.params.id_tarea;
        rep.code(204);
        return deleteTareaById(idBorrar);
    })
}

export default personasRoutes;