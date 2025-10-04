import fastifyPlugin from "fastify-plugin";
import { UcuDatosIncorrectos } from "../model/errors.ts";
import type { FastifyReplyType, FastifyRequestType } from "fastify/types/type-provider.js";

export default fastifyPlugin(async function(fastify){
    fastify.decorate("verifyParamsId", async (req: FastifyRequestType, rep: FastifyReplyType) => {
            const paramId = req.params.id_usuario;
            const bodyId = req.body?.id_usuario;

            if (bodyId !== undefined && paramId !== bodyId) {
                throw new UcuDatosIncorrectos("Los ids pasados como parámetro y en el body no coinciden");
    }})
})

declare module 'fastify'{
    interface FastifyInstance {
        verifyParamsId(req: FastifyRequestType, rep: FastifyReplyType): Promise<void>
    }
}