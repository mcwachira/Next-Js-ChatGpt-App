import { NextRequest } from "next/server";
import { auth } from "@/auth"; // Adjust the import path as necessary
import { convertToCoreMessages, streamText } from "ai";
export const runtime = "edge";

export const POST = auth(async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Your fetching logic...
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324:free",
          messages: convertToCoreMessages(messages),
          stream: true,
        }),
      },
    );

    // Handle non-200 responses
    if (!response.ok) {
      return new Response(
        `Error from OpenRouter: ${response.status} ${response.statusText}`,
        { status: response.status },
      );
    }

    // Return a ReadableStream wrapped in a Response (if necessary)
    return createAIStream(response); // This should return a Response
  } catch (error) {
    console.error("API route error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});

// Function to create a stream and return a Response
async function createAIStream(response: Response) {
  const reader = response.body?.getReader();
  if (!reader) throw new Error("Response body is not readable");

  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      // Stream reading logic
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          controller.enqueue(value); // Stream the raw value from response
        }
      } catch (error) {
        console.error("Stream processing error:", error);
        controller.error(error);
      } finally {
        controller.close();
        reader.releaseLock();
      }
    },
  });

  return new Response(stream);
}
