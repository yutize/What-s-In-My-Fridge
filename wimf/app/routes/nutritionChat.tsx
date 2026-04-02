import { requireUserId } from "~/session.server";
import { sendNutritionChatMessage, type ChatMessage } from "~/services/chatService";
import { db } from "~/db/app.server";

export async function action({ request }: { request: Request }) {
  try {
    const userId = await requireUserId(request);
    const body = await request.json() as {
      message: string;
      history: ChatMessage[];
      currentProfile?: Record<string, unknown>;
    };

    const { message, history, currentProfile } = body;

    if (!message?.trim()) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    const isOnboardTrigger = message === "__onboard__";

    if (!isOnboardTrigger) {
      db.prepare(
        "INSERT INTO ChatHistory (user_id, role, content) VALUES (?, ?, ?)"
      ).run(userId, "user", message);
    }

    const result = await sendNutritionChatMessage(
      isOnboardTrigger ? "Hello! Please introduce yourself and ask me the onboarding questions." : message,
      isOnboardTrigger ? [] : history,
      currentProfile
    );

    db.prepare(
      "INSERT INTO ChatHistory (user_id, role, content, form_updates) VALUES (?, ?, ?, ?)"
    ).run(
      userId,
      "model",
      result.aiText,
      Object.keys(result.formUpdates).length > 0
        ? JSON.stringify(result.formUpdates)
        : null
    );

    return Response.json({
      aiText: result.aiText,
      formUpdates: result.formUpdates,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to get AI response";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function loader({ request }: { request: Request }) {
  try {
    const userId = await requireUserId(request);
    const history = db
      .prepare(
        `SELECT role, content, form_updates, created_at 
         FROM ChatHistory 
         WHERE user_id = ? 
         ORDER BY created_at DESC 
         LIMIT 50`
      )
      .all(userId) as Array<{
        role: string;
        content: string;
        form_updates: string | null;
        created_at: string;
      }>;

    return Response.json({ history: history.reverse() });
  } catch (error) {
    return Response.json({ history: [] });
  }
}
