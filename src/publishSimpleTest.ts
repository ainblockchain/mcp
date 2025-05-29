// ts-node로 실행 가능 (또는 컴파일 후 node로 실행)
const AINetworkDAGClient = require('ai-network-dag-client');

async function main() {
  const dagClient = new AINetworkDAGClient('101.202.37.10:50051');
  const topic = 'TRAIN_MNIST';
  const instruction = {
    command: "train",
    container_id: "mnist-train",
    container_args: { worker_pk: "workerpk1", data: "cid1" }
  };

  try {
    const result = await dagClient.publish(topic, JSON.stringify(instruction));
    console.log('Publish result:', result);
  } catch (err) {
    console.error('Publish error:', err);
  } finally {
    dagClient.close?.();
  }
}

main();