import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "OpenRouter API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      )
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
        "X-Title": "Karat Banking Assistant",
      },
      body: JSON.stringify({
        model: "x-ai/grok-4.1-fast",
        messages: [
          {
            role: "system",
            content: `You are a helpful banking assistant for Karat, a business banking platform for freelancers and creators.
You help users understand their accounts, bookkeeping features, credit cards, perks, and general banking questions.
Be concise, helpful, and friendly. If you don't know the answer, say so honestly.
Keep responses focused on banking, finance, and Karat's features.`,
          },
          ...messages,
        ],
        stream: true,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("OpenRouter error:", error)
      return new Response(
        JSON.stringify({ error: "Failed to get response from AI" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      )
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let buffer = ""

        if (!reader) {
          controller.close()
          return
        }

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) {
              if (buffer.trim()) {
                const lines = buffer.split("\n")
                for (const line of lines) {
                  if (line.startsWith("data: ")) {
                    const data = line.slice(6).trim()
                    if (data && data !== "[DONE]") {
                      try {
                        const parsed = JSON.parse(data)
                        const content = parsed.choices?.[0]?.delta?.content
                        if (content) {
                          controller.enqueue(
                            new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`),
                          )
                        }
                      } catch {
                        // Skip invalid JSON
                      }
                    }
                  }
                }
              }
              break
            }

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split("\n")
            buffer = lines.pop() || ""

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim()
                if (data === "[DONE]") {
                  controller.close()
                  return
                }

                if (data) {
                  try {
                    const parsed = JSON.parse(data)
                    const content = parsed.choices?.[0]?.delta?.content
                    if (content) {
                      controller.enqueue(
                        new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`),
                      )
                    }
                  } catch {
                    // Skip invalid JSON
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error("Stream error:", error)
          controller.error(error)
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("AI chat error:", error)
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
