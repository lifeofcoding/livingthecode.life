import { SSTConfig } from "sst";
import { TextGeneration } from "./stacks/TextGeneration";

export default {
  config(_input) {
    return {
      name: "text-generation",
      region: "us-east-2",
    };
  },
  stacks(app) {
    app.stack(TextGeneration);
  },
} satisfies SSTConfig;
