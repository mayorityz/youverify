import amqplib from "amqplib";
const AMQP_URL = process.env.CLOUDAMQP_URL || "amqp://localhost:5672";

class Broker {
  /**
   * Trigger init connection method
   */
  constructor() {
    this.queues = {};
  }

  /**
   * Initialize connection to rabbitMQ
   */
  async init() {
    try {
      this.connection = await amqplib.connect(AMQP_URL);
      this.channel = await this.connection.createChannel();
      return this;
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Send message to queue
   * @param {String} queue Queue name
   * @param {Object} msg Message as Buffer
   */

  async produce(queue, msg) {
    try {
      if (!this.connection) {
        await this.init();
      }
      await this.channel.assertQueue(queue, { durable: true });
      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify([msg])));
    } catch (error) {
      console.log(error.message);
    }
  }

  async consume(queue, CB) {
    try {
      if (!this.connection) {
        await this.init();
      }
      await this.channel.assertQueue(queue, { durable: true });
      await this.channel.consume(
        queue,
        (msg) => {
          const data = JSON.parse(msg.content.toString("utf8"));
          CB(data[0]);
        },
        { noAck: true }
      );
    } catch (error) {
      console.log(error.message);
    }
  }
}

/**
 * @return {Promise<MessageBroker>}
 */
Broker.getInstance = async function () {
  if (!instance) {
    const broker = new MessageBroker();
    instance = broker.init();
  }
  return instance;
};

export default Broker;
