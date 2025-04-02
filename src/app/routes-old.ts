// import { deepseek } from "@ai-sdk/deepseek";
// import { convertToCoreMessages, streamText } from "ai";
// import { NextRequest } from "next/server";
// import { auth } from "@/auth";

// export const runtime = "edge";

// export const POST = auth(async function POST(req: NextRequest) {
//   const { messages } = await req.json();
//   console.log("post input ", messages);

//   const result = await streamText({
//     model: deepseek("deepseek/deepseek-chat-v3-0324:free"),
//     stream: true,
//     messages: convertToCoreMessages(messages),
//   });

//   return result.toDataStreamResponse();
// });

// import { deepseek } from "@ai-sdk/deepseek";
// import { convertToCoreMessages, streamText } from "ai";
// import { NextRequest } from "next/server";
// import { auth } from "@/auth";
// // export const runtime = "edge";

// export const POST = auth(async function POST(req: NextRequest) {
//   const { messages } = await req.json();

//   const result = await streamText({
//     model: deepseek("deepseek/deepseek-chat-v3-0324:free"),
//     messages: convertToCoreMessages(messages),
//   });

//   // console.log("DeepSeek result:", await result.toText());
//   return result.toDataStreamResponse();
// });

// import { deepseek } from "@ai-sdk/deepseek";
// import { convertToCoreMessages, streamText } from "ai";
// import { auth } from "@/auth";
// export const runtime = "edge";

// export const POST = async function POST(req: NextRequest) {
//   const { messages } = await req.json();

//   const result = await streamText({
//     model: "deepseek/deepseek-chat-v3-0324:free",
//     messages: convertToCoreMessages(messages),
//     stream: true,
//   });

//   return result.toDataStreamResponse();
// };

// import { deepseek } from "@ai-sdk/deepseek";
// import { convertToCoreMessages, streamText } from "ai";
// import { NextRequest } from "next/server";
// import { auth } from "@/auth";

// export const runtime = "edge";

// export const POST = auth(async function POST(req: NextRequest) {
//   const { messages } = await req.json();

//   const result = await streamText({
//     model: deepseek("deepseek/deepseek-chat-v3-0324:free"),
//     messages: convertToCoreMessages(messages),
//   });

//   // ✅ Directly return the result as a streaming response
//   return result.toDataStreamResponse();
// });

// import { NextRequest } from "next/server";
// import { auth } from "@/auth";

// export const runtime = "edge"; // Ensures it's optimized for streaming

// export const POST = auth(async function POST(req: NextRequest) {
//   const { messages } = await req.json();

//   // 🔹 Fetch streaming response from OpenRouter API
//   const response = await fetch(
//     "https://openrouter.ai/api/v1/chat/completions",
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use environment variable
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "deepseek/deepseek-chat-v3-0324:free", // DeepSeek model
//         messages, // Directly pass messages from request
//         stream: true, // Enable streaming
//       }),
//     },
//   );

//   // 🔹 Check if response is readable
//   const reader = response.body?.getReader();
//   if (!reader) {
//     return new Response("Stream error: Response body is not readable", {
//       status: 500,
//     });
//   }

//   const encoder = new TextEncoder();
//   const stream = new ReadableStream({
//     async start(controller) {
//       const decoder = new TextDecoder();import { NextRequest } from "next/server";
// import { auth } from "@/auth";

// export const runtime = "edge"; // Ensures it's optimized for streaming

// export const POST = auth(async function POST(req: NextRequest) {
//   const { messages } = await req.json();

//   // 🔹 Fetch streaming response from OpenRouter API
//   const response = await fetch(
//     "https://openrouter.ai/api/v1/chat/completions",
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use environment variable
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "deepseek/deepseek-chat-v3-0324:free", // DeepSeek model
//         messages, // Directly pass messages from request
//         stream: true, // Enable streaming
//       }),
//     },
//   );

//   // 🔹 Check if response is readable
//   const reader = response.body?.getReader();
//   if (!reader) {
//     return new Response("Stream error: Response body is not readable", {
//       status: 500,
//     });
//   }

//   const encoder = new TextEncoder();
//   const stream = new ReadableStream({
//     async start(controller) {
//       const decoder = new TextDecoder();
//       let buffer = "";

//       try {
//         while (true) {
//           const { done, value } = await reader.read();
//           if (done) break;

//           // Append new chunk to buffer
//           buffer += decoder.decode(value, { stream: true });

//           // Process complete lines from buffer
//           while (true) {
//             const lineEnd = buffer.indexOf("\n");
//             if (lineEnd === -1) break;

//             const line = buffer.slice(0, lineEnd).trim();
//             buffer = buffer.slice(lineEnd + 1);

//             if (line.startsWith("data: ")) {
//               const data = line.slice(6);
//               if (data === "[DONE]") break;

//               try {
//                 const parsed = JSON.parse(data);
//                 const content = parsed.choices[0]?.delta?.content;
//                 if (content) {
//                   controller.enqueue(encoder.encode(content));
//                 }
//               } catch (e) {
//                 console.error("JSON Parse Error:", e);
//               }
//             }
//           }
//         }
//       } finally {
//         reader.cancel();
//         controller.close();
//       }
//     },
//   });

//   return new Response(stream, { headers: { "Content-Type": "text/plain" } });
// });

//       let buffer = "";

//       try {
//         while (true) {
//           const { done, value } = await reader.read();
//           if (done) break;

//           // Append new chunk to buffer
//           buffer += decoder.decode(value, { the best dribbler in the nba of all time stream: true });

//           // Process complete lines from buffer
//           while (true) {
//             const lineEnd = buffer.indexOf("\n");
//             if (lineEnd === -1) break;

//             const line = buffer.slice(0, lineEnd).trim();
//             buffer = buffer.slice(lineEnd + 1);

//             if (line.startsWith("data: ")) {
//               const data = line.slice(6);
//               if (data === "[DONE]") break;

//               try {
//                 const parsed = JSON.parse(data);
//                 const content = parsed.choices[0]?.delta?.content;
//                 if (content) {
//                   controller.enqueue(encoder.encode(content));
//                 }
//               } catch (e) {
//                 console.error("JSON Parse Error:", e);
//               }
//             }
//           }
//         }
//       } finally {
//         reader.cancel();
//         controller.close();
//       }
//     },
//   });

//   return new Response(stream, { headers: { "Content-Type": "text/plain" } });
// });

// import { NextRequest } from "next/server";
// import { auth } from "@/auth";
// import { convertToCoreMessages, streamText } from "ai";

// export const runtime = "edge"; // Ensures it's optimized for streaming

// export const POST = auth(async function POST(req: NextRequest) {
//   const { messages } = await req.json();
//   const response = await fetch(
//     "https://openrouter.ai/api/v1/chat/completions",
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         "Content-Type": "application/json",
//         "HTTP-Referer": process.env.APP_URL || "http://localhost:3000", // OpenRouter requires this
//               "X-Title": "AI Chat App"
//       },
//       body: JSON.stringify({
//         model: "deepseek/deepseek-chat-v3-0324:free", // DeepSeek model
//         messages,
//         stream: true,
//       }),
//     },
//   );

//   // 🔹 Handle non-200 responses (e.g., API error)
//   if (!response.ok) {
//     return new Response(`Error from OpenRouter: ${response.statusText}`, {
//       status: response.status,
//     });
//   }

//   // 🔹 Check if response is readable
//   const reader = response.body?.getReader();
//   if (!reader) {
//     return new Response("Stream error: Response body is not readable", {
//       status: 500,
//     });
//   }

//   // 🔹 Create a streaming response
//   const encoder = new TextEncoder();
//   const stream = new ReadableStream({
//     async start(controller) {
//       const decoder = new TextDecoder();
//       let buffer = "";

//       try {
//         while (true) {
//           const { done, value } = await reader.read();

//           // console.log("valu data ", value);
//           if (done) break;

//           // Append new chunk to buffer
//           buffer += decoder.decode(value, { stream: true });

//           // Process complete lines from buffer
//           while (true) {
//             const lineEnd = buffer.indexOf("\n");
//             if (lineEnd === -1) break;

//             const line = buffer.slice(0, lineEnd).trim();
//             buffer = buffer.slice(lineEnd + 1);

//             // 🔹 Handle "[DONE]" separately
//             if (line === "data: [DONE]") {
//               console.log("Streaming complete.");
//               controller.close();
//               return;
//             }
//             if (line.startsWith("data: ")) {import { NextRequest } from "next/server";
// import { auth } from "@/auth";
// import { convertToCoreMessages, streamText } from "ai";

// export const runtime = "edge"; // Ensures it's optimized for streaming

// export const POST = auth(async function POST(req: NextRequest) {
//   const { messages } = await req.json();
//   const response = await fetch(
//     "https://openrouter.ai/api/v1/chat/completions",
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         "Content-Type": "application/json",
//         "HTTP-Referer": process.env.APP_URL || "http://localhost:3000", // OpenRouter requires this
//         "X-Title": "AI Chat App",
//       },
//       body: JSON.stringify({
//         model: "deepseek/deepseek-chat-v3-0324:free", // DeepSeek model
//         messages,
//         stream: true,
//       }),
//     },
//   );

//   // 🔹 Handle non-200 responses (e.g., API error)
//   if (!response.ok) {
//     const errorText = await response.text();
//     return new Response(
//       `Error from OpenRouter: ${response.status} ${response.statusText}\n${errorText}`,
//       {
//         status: response.status,
//       },
//     );
//   }

//   // Process the stream to match the format expected by useChat

//   const stream = new ReadableStream({
//     async start(controller) {
//       //create a decoder to decode the response body
//       const decoder = new TextDecoder();
//       const reader = response.body?.getReader();

//       if (!reader) {
//         controller.error(new Error("response body is not readable"));
//         return;
//       }

//       try {
//         while (true) {
//           const { done, value } = await reader.read();

//           if (done) {
//             break;
//           }
//           // Decode chunk
//           const chunk = decoder.decode(value, { stream: true });
//           const lines = chunk.split("\n").filter((line) => line.trim());

//           for (const line of lines) {
//             if (line.startsWith("data: ")) {
//               const data = line.slice(6);

//               if (data === "[DONE]") {
//                 break;
//               }

//               try {
//                 const parsed = JSON.parse(data);
//                 const content = parsed.choices?.[0]?.delta?.content;

//                 if (content) {
//                   // Send the token to the client
//                   controller.enqueue(new TextEncoder().encode(content));
//                 }
//               } catch (error) {
//                 console.error("Error parsing JSON:", error);
//                 // Continue processing other chunks even if one fails
//               }
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Error reading stream:", error);
//         controller.error(error);
//       } finally {
//         controller.close();
//         reader.releaseLock();
//       }
//     },
//   });

//   // Return a StreamingTextResponse which is compatible with useChat
//   return new streamText(stream);
// });

//               const data = line.slice(6);
//               if (data === "[DONE]") {
//                 controller.close();
//               }
//               console.log(" data ", data);
//               try {
//                 const parsed = JSON.parse(data);
//                 const content = parsed.choices[0]?.delta?.content;

//                 // 🔹 Skip empty content chunks
//                 if (content && content.trim() !== "") {
//                   console.log("🔹 Streaming Content:", content); // Log actual content
//                   controller.enqueue(encoder.encode(content));
//                 } else {
//                   console.warn("⚠️ Skipping empty chunk:", data);
//                 }
//               } catch (e) {
//                 console.error("JSON Parse Error:", e);
//               }
//             }
//           }
//         }
//       } finally {
//         reader.cancel();
//         // controller.close();
//       }
//     },
//   });

//   console.log(stream);
//   // ✅ Return the streaming response
//   return new Response(stream, {
//     headers: { "Content-Type": "text/plain" },
//   });
// });

import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { convertToCoreMessages, streamText } from "ai";

export const runtime = "edge"; // Ensures it's optimized for streaming

export const POST = auth(async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.APP_URL || "http://localhost:3000", // OpenRouter requires this
        "X-Title": "AI Chat App",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324:free", // DeepSeek model
        messages: convertToCoreMessages(messages),
        stream: true,
      }),
    },
  );

  // 🔹 Handle non-200 responses (e.g., API error)
  if (!response.ok) {
    const errorText = await response.text();
    return new Response(
      `Error from OpenRouter: ${response.status} ${response.statusText}\n${errorText}`,
      {
        status: response.status,
      },
    );
  }

  // Process the stream to match the format expected by useChat

  const stream = new ReadableStream({
    async start(controller) {
      //create a decoder to decode the response body
      const decoder = new TextDecoder();
      const reader = response.body?.getReader();

      if (!reader) {
        controller.error(new Error("response body is not readable"));
        return;
      }

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }
          // Decode chunk
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter((line) => line.trim());

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);

              if (data === "[DONE]") {
                break;
              }

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;

                if (content) {
                  // Send the token to the client
                  controller.enqueue(new TextEncoder().encode(content));
                }
              } catch (error) {
                console.error("Error parsing JSON:", error);
                // Continue processing other chunks even if one fails
              }
            }
          }
        }
      } catch (error) {
        console.error("Error reading stream:", error);
        controller.error(error);
      } finally {
        controller.close();
        reader.releaseLock();
      }
    },
  });

  // Return a StreamingTextResponse which is compatible with useChat

  // const result = await streamText(stream);
  // console.log(results);
  // return result.toDataStreamResponse();

  const result = await streamText({
    model: {
      provider: "openrouter",
      // These parameters are required by the streamText function but won't actually be used
      // as we're handling the API call to OpenRouter manually
      id: "deepseek/deepseek-chat-v3-0324:free",
      name: "DeepSeek Chat",
    },
    messages: convertToCoreMessages(messages),
    // Pass our custom stream
    textStream: stream,
  });

  return result.toDataStreamResponse();
});

// Let's implement a solution using the Vercel AI SDK's `streamText` function correctly:

// ```typescript
// import { NextRequest } from "next/server";
// import { auth } from "@/auth";
// import { convertToCoreMessages, streamText } from "ai";

// export const runtime = "edge";

// export const POST = auth(async function POST(req: NextRequest) {
//   const { messages } = await req.json();
//   console.log("post input ", messages);

//   // Create a custom stream handler for OpenRouter
//   const customStream = async function*() {
//     // Make request to OpenRouter
//     const response = await fetch(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//           "Content-Type": "application/json",
//           "HTTP-Referer": process.env.APP_URL || "http://localhost:3000",
//           "X-Title": "AI Chat App"
//         },
//         body: JSON.stringify({
//           model: "deepseek/deepseek-chat-v3-0324:free",
//           messages,
//           stream: true,
//         }),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}\n${errorText}`);
//     }

//     if (!response.body) {
//       throw new Error("Response body is not available");
//     }

//     const reader = response.body.getReader();
//     const decoder = new TextDecoder();

//     try {
//       while (true) {
//         const { done, value } = await reader.read();

//         if (done) {
//           break;
//         }

//         const chunk = decoder.decode(value, { stream: true });
//         const lines = chunk.split('\n').filter(line => line.trim() !== '');

//         for (const line of lines) {
//           if (line.startsWith('data: ')) {
//             const data = line.slice(6);

//             if (data === '[DONE]') {
//               continue;
//             }

//             try {
//               const parsed = JSON.parse(data);
//               const content = parsed.choices?.[0]?.delta?.content || '';

//               if (content) {
//                 // Yield each content piece to streamText
//                 yield content;
//               }
//             } catch (error) {
//               console.error('Error parsing JSON:', error);
//               // Continue with other chunks even if one fails
//             }
//           }
//         }
//       }
//     } finally {
//       reader.releaseLock();
//     }
//   };

//   // Use streamText from Vercel AI SDK
//   const result = await streamText({
//     model: {
//       provider: "openrouter",
//       // These parameters are required by the streamText function but won't actually be used
//       // as we're handling the API call to OpenRouter manually
//       id: "deepseek-chat-v3-0324",
//       name: "DeepSeek Chat",
//     },
//     messages: convertToCoreMessages(messages),
//     // Pass our custom stream
//     textStream: customStream(),
//   });

//   return result.toDataStreamResponse();
// });

// ```

// This implementation:

// 1. Uses the Vercel AI SDK's `streamText` function as requested
// 2. Creates a custom generator function that:
//    - Makes the API call to OpenRouter
//    - Parses the SSE response from OpenRouter
//    - Yields the content tokens one by one
// 3. Converts the response to a format that the `useChat` hook will understand with `toDataStreamResponse()`

// The key insight here is that `streamText` allows us to provide our own `textStream` generator function, which we use to connect OpenRouter's response format to Vercel's expected format.

// This solution should work with your existing React components using the `useChat` hook, allowing you to see the streaming text as it's generated, while making proper use of the Vercel AI SDK's functions.
