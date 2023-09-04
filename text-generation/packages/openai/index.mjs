"use strict";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("Missing JWT_SECRET environment variable");
}

import { streamOpenAIResponse } from "./streamOpenAIResponse.mjs";

const corsHeaders = {
  // "Access-Control-Allow-Origin": "*", // Replace * with your allowed origin(s) //commented out because was adding value twice
  "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
  "Access-Control-Allow-Headers": "Content-Type,Authorization,authorization",
};

export const handler = awslambda.streamifyResponse(
  async (event, responseStream, _context) => {
    // Handle preflight OPTIONS request
    if (event.httpMethod === "OPTIONS") {
      const optionsResponse = {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify("Preflight request successful"),
      };

      return optionsResponse;
    }

    function sendUnauthorizedResponse(msg = "Unauthorized Request") {
      const unauthorizedResponse = {
        statusCode: 401,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify("Unauthorized"),
      };

      responseStream.write(msg);

      // End response stream
      responseStream.end();

      return unauthorizedResponse;
    }

    if (!event.headers["authorization"]) {
      return sendUnauthorizedResponse("Token not found");
    }

    const token = event.headers["authorization"].replace("Bearer ", "");

    try {
      jwt.verify(token, jwtSecret);
    } catch (err) {
      return sendUnauthorizedResponse(
        "Unable to verify token\n" + token + "\n\n" + JSON.stringify(err)
      );
    }

    // Start response stream
    const metadata = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    };
    responseStream = awslambda.HttpResponseStream.from(
      responseStream,
      metadata
    );

    const body = JSON.parse(event.body);

    const functions = [
      {
        name: "get_current_weather",
        description: "Get the current weather",
        parameters: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "The city and state, e.g. San Francisco, CA",
            },
            format: {
              type: "string",
              enum: ["celsius", "fahrenheit"],
              description:
                "The temperature unit to use. Infer this from the users location.",
            },
          },
          required: ["location", "format"],
        },
      },
    ];

    // Stream OpenAI response
    await streamOpenAIResponse(responseStream, {
      model: "gpt-3.5-turbo-0613",
      temperature: 0.5,
      max_tokens: 1515,
      frequency_penalty: 0,
      presence_penalty: 0,
      functions,
      ...body,
    });

    // End response stream
    responseStream.end();
  }
);
