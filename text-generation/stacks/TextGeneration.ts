import { StackContext } from "sst/constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Duration } from "aws-cdk-lib";
import * as efs from "aws-cdk-lib/aws-efs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { RemovalPolicy } from "aws-cdk-lib";

/* Inspired from 
https://github.com/aws-samples/zero-administration-inference-with-aws-lambda-for-hugging-face/tree/main 
https://www.cloudtechsimplified.com/elastic-file-system-efs-aws-lambda/
*/

export function TextGeneration({ stack }: StackContext) {
  const vpc = new ec2.Vpc(stack, "VpcLambda", {
    maxAzs: 2,
    subnetConfiguration: [
      {
        cidrMask: 24,
        name: "privatelambda",
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      {
        cidrMask: 24,
        name: "public",
        subnetType: ec2.SubnetType.PUBLIC,
      },
    ],
  });
  const elasticFileSystem = new efs.FileSystem(stack, "elasticFileSystem", {
    vpc,
    fileSystemName: "LambdaVPC",
    performanceMode: efs.PerformanceMode.GENERAL_PURPOSE, // default
    removalPolicy: RemovalPolicy.DESTROY, // used only for development
  });
  const accesspoint = elasticFileSystem.addAccessPoint("accesspointForLambda", {
    path: "/lambda",
    createAcl: {
      ownerUid: "1000",
      ownerGid: "1000",
      permissions: "750",
    },
    posixUser: {
      uid: "1000",
      gid: "1000",
    },
  });
  const lambdaFunction = new lambda.DockerImageFunction(
    stack,
    "TextGeneration",
    {
      code: lambda.DockerImageCode.fromImageAsset("./app"),
      memorySize: 2048,
      timeout: Duration.seconds(600),
      vpc: vpc,
      filesystem: lambda.FileSystem.fromEfsAccessPoint(
        accesspoint,
        "/mnt/hf_models_cache"
      ),
      environment: { TRANSFORMERS_CACHE: "/mnt/hf_models_cache" },
    }
  );
  // lambdaFunction.addEnvironment("FUNCTION_DIR", "gpt2");

  stack.addOutputs({
    LambdaName: lambdaFunction.functionName,
  });
}
