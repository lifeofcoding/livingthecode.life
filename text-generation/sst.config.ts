import { SSTConfig } from "sst";
// import { HuggingFace } from "./stacks/HuggingFace";
import { OpenAI } from "./stacks/OpenAI";

export default {
  config(_input) {
    return {
      name: "text-generation",
      region: "us-east-2",
    };
  },
  stacks(app) {
    app.stack(OpenAI);
  },
} satisfies SSTConfig;
