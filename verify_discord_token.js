const token = process.env.DISCORD_BOT_TOKEN || process.env.DISCORD_TOKEN;

if (!token) {
    console.error("❌ Missing Discord token.");
    console.error("Set DISCORD_BOT_TOKEN (preferred) or DISCORD_TOKEN.");
    process.exit(1);
}

async function verify() {
    console.log("Verifying Discord Token...");
    try {
        const res = await fetch("https://discord.com/api/v10/users/@me", {
            headers: {
                Authorization: `Bot ${token}`
            }
        });

        if (res.ok) {
            const data = await res.json();
            console.log("✅ Token is valid!");
            console.log("Bot User:", data.username + "#" + data.discriminator);
            console.log("ID:", data.id);
        } else {
            console.error("❌ Token verification failed!");
            console.error("Status:", res.status, res.statusText);
            const text = await res.text();
            console.log("Response:", text);
        }
    } catch (err) {
        console.error("❌ Network error verifying token:", err);
    }
}

verify();
