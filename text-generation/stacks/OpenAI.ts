import { StackContext } from "sst/constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as signer from "aws-cdk-lib/aws-signer";
import { Duration } from "aws-cdk-lib";

export function OpenAI({ stack }: StackContext) {
  // const functionUrlOutput = lambdaFunction.addFunctionUrl({
  //   authType: lambda.FunctionUrlAuthType.AWS_IAM,
  //   cors: {
  //     allowedOrigins: ["*"],
  //     allowedMethods: [lambda.HttpMethod.POST],
  //   },
  //   invokeMode: lambda.InvokeMode.RESPONSE_STREAM,
  // });
  // lambdaFunction.addEnvironment("FUNCTION_DIR", "gpt2");

  // const func = new Function(stack, "openai-generation", {
  //   handler: "src/lambda.handler",
  //   timeout: 30,
  //   // environment: {
  //   //   TABLE_NAME: "notes",
  //   // },
  //   url: true,
  // });

  const signingProfile = new signer.SigningProfile(this, "SigningProfile", {
    platform: signer.Platform.AWS_LAMBDA_SHA384_ECDSA,
  });

  const codeSigningConfig = new lambda.CodeSigningConfig(
    this,
    "CodeSigningConfig",
    {
      signingProfiles: [signingProfile],
    }
  );

  const fn = new lambda.Function(stack, "openai-generation", {
    codeSigningConfig,
    runtime: lambda.Runtime.NODEJS_18_X,
    handler: "index.handler",
    code: lambda.Code.fromAsset("./packages/openai"),
    memorySize: 512,
    timeout: Duration.seconds(30),
    environment: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
      JWT_SECRET: process.env.JWT_SECRET!,
    },
  });

  //   fn.addEnvironment("OPENAI_API_KEY", process.env.OPENAI_API_KEY!);

  const fnaddUrl = fn.addFunctionUrl({
    authType: lambda.FunctionUrlAuthType.NONE,
    cors: {
      allowedOrigins: ["*"],
      allowedMethods: [lambda.HttpMethod.ALL],
      allowedHeaders: ["Content-Type", "Authorization", "authorization"],
    },
    invokeMode: lambda.InvokeMode.RESPONSE_STREAM,
  });

  stack.addOutputs({
    LambdaName: fn.functionName,
    LambdaUrl: fnaddUrl.url,
  });
}
