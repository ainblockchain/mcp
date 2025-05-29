import { z } from 'zod';

import { ToolContext, ToolType } from '../types';

const parameters = z.object({
  topic: z.string().min(1),
  instruction: z.any()
});

export const publishInstruction: ToolType<typeof parameters> = {
    name: 'publish-instruction',
    description: 
`Publish an instruction to the AI Network DAG via gRPC. 
Sample instruction to run "mnist-train" container would be { topic: 'mnist-train' instruction: { command: "train", container_id: "mnist-train", container_args: { worker_pk: "workerpk1", data: "cid1" }}.`,
    parameters,
    handler: async (params: z.infer<typeof parameters>, context: ToolContext) => {
        const { dagClient } = context;
        try {
            let instruction = params.instruction;
            // instruction이 객체면 string으로 변환
            if (typeof instruction !== 'string') {
                instruction = JSON.stringify(instruction);
            }
            const result = await dagClient.publish(params.topic, instruction);
            if (result.success) {
                return {
                    content: [{ type: 'text', text: 'Publish succeeded' }],
                    isError: false
                };
            } else {
                return {
                    content: [{ type: 'text', text: 'Publish failed' }],
                    isError: true
                };
            }
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }
};