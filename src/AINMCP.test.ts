import AINMCP from './AINMCP';
import { publishInstruction } from './tools/publishInstruction';
import { addContent } from './tools/addContent';
import { getContent } from './tools/getContent';

describe('AINMCP integration', () => {
  let server: AINMCP;

  beforeAll(() => {
    server = new AINMCP();
    server.registerTools();
  });

  it('should publish instruction using publishInstruction directly', async () => {
    const params = {
      topic: 'TRAIN_MNIST',
      instruction: JSON.stringify({
        command: "train",
        container_id: "mnist-train",
        container_args: { worker_pk: "workerpk1", data: "cid1" }
      })
    };

    const result = await publishInstruction.handler(params, (server as any).getToolContext());
    expect(result).toBeDefined();
  }, 60000);

  it('should add content using addContent handler', async () => {
    const params = {
      message: 'test message',
      children: []
    };

    const result = await addContent.handler(params, (server as any).getToolContext());
    expect(result).toBeDefined();
    if (result && result.content && result.content[0].text) {
      const cidMatch = result.content[0].text.match(/([a-zA-Z0-9]{46,})/); // CID
      const cid = cidMatch ? cidMatch[1] : null;
      if (cid) {
        const getResult = await getContent.handler({ cid }, (server as any).getToolContext());
        console.log('getContent result:', getResult);
        expect(getResult).toBeDefined();
      }
    }
  }, 60000);
});