const validateBody = (body: any) => {
  const { senderId, content } = body;
  const missingFields: string[] = [];

  if (!senderId) missingFields.push('senderId');
  if (!content) missingFields.push('content');

  if (missingFields.length) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  const unknownKeys: string[] = [];

  Object.keys(body).forEach(key => {
    if (!['senderId', 'content'].includes(key)) {
      unknownKeys.push(key)
    }
  });

  if (unknownKeys.length) {
    throw new Error(`Unknown key provided: ${unknownKeys.join(', ')}`);
  }
};

export default validateBody;
