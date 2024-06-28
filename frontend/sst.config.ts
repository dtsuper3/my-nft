import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";
import * as dotenv from "dotenv";


export default {
  config(_input) {
    return {
      name: "frontend",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const { stage } = stack;
      const { parsed: environment } = dotenv.config({ path: ".env.local" })
      const site = new NextjsSite(stack, "site", {
        customDomain: {
          domainName: stage === "prod" ? "nft.ideepakthapa.com" : "dev-nft.ideepakthapa.com",
          hostedZone: "ideepakthapa.com",
        },
        environment
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
