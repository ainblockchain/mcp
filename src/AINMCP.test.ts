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

    // 실제 서버의 getToolContext()를 사용
    const result = await publishInstruction.handler(params, (server as any).getToolContext());
    expect(result).toBeDefined();
  }, 60000);

  it('should add content using addContent handler', async () => {
    const params = {
      message: 'test message',
      // data: Buffer.from('test data'),
      children: []
    };

    const result = await addContent.handler(params, (server as any).getToolContext());
    expect(result).toBeDefined();
    // getContent 테스트를 위해 addContent 결과에서 cid 추출
    if (result && result.content && result.content[0].text) {
      const cidMatch = result.content[0].text.match(/([a-zA-Z0-9]{46,})/); // CID 추출 (예시)
      const cid = cidMatch ? cidMatch[1] : null;
      if (cid) {
        const getResult = await getContent.handler({ cid }, (server as any).getToolContext());
        console.log('getContent result:', getResult); // 결과 출력
        expect(getResult).toBeDefined();
      }
    }
  }, 60000);
});