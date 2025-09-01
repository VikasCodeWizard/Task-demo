import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

async function testBedrock() {
  const MODEL_IDENTIFIER = 'arn:aws:bedrock:ap-south-1:590183705420:inference-profile/apac.anthropic.claude-sonnet-4-20250514-v1:0';
  const arnParts = MODEL_IDENTIFIER.split(':');
  const arnRegion = arnParts.length > 3 ? arnParts[3] : undefined;

  const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || arnRegion || 'us-east-1';
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const sessionToken = process.env.AWS_SESSION_TOKEN;

  // If basic env credentials are not provided, skip rather than fail hard.
  if (!accessKeyId || !secretAccessKey) {
    console.log('⚠️  Skipping Bedrock test: AWS credentials not configured (AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY).');
    process.exit(0);
    return;
  }

  const client = new BedrockRuntimeClient({
    region,
    credentials: sessionToken
      ? { accessKeyId, secretAccessKey, sessionToken }
      : { accessKeyId, secretAccessKey }
  });

  const request = {
    anthropic_version: 'bedrock-2023-05-31',
    max_tokens: 256,
    messages: [
      {
        role: 'user',
        content: 'Say "Bedrock connection successful" if you can read this.'
      }
    ]
  };

  try {
    const command = new InvokeModelCommand({
      modelId: MODEL_IDENTIFIER,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(request)
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    console.log('✅ Bedrock test successful:', responseBody.content[0].text);
  } catch (error) {
    console.error('❌ Bedrock test failed:', error.message);
    process.exit(1);
  }
}

testBedrock();
