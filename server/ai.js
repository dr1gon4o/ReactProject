module.exports = async function (_, request) {
    const message = request.body?.message || "";
    console.log("Question:", message);

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) return { replyText: "Add your OpenRouter API key to .env!" };

    try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:5173",
                "X-Title": "Street Workout Hub"
            },
            body: JSON.stringify({
                model: "amazon/nova-2-lite-v1:free",
                messages: [
                    { role: "system", content: "You are a friendly, expert street workout and calisthenics coach. Always reply in 1–3 short sentences max. Be enthusiastic, use lots of emojis, stay direct and hype. Never give generic AI introductions or long explanations unless asked." },
                    { role: "user", content: message }
                ],
                max_tokens: 400,
                temperature: 0.8
            })
        });

        if (!res.ok) {
            if (res.status === 429) return { replyText: "Rate limited — wait a sec bro 💪" };
            const err = await res.json();
            console.error("API Error:", err);
            throw new Error("API error");
        }

        const data = await res.json();
        const replyText = data.choices[0].message.content.trim();

        console.log("AI:", replyText.substring(0, 80) + (replyText.length > 80 ? "…" : ""));
        return { replyText };

    } catch (err) {
        console.error("Error:", err.message);
        return { replyText: "Yo coach is ready — hit me again 🔥" };
    }
};