export default async ({ topic, partition, message }) => {
  console.log(`${message.key} - ${message.value}`);
};
