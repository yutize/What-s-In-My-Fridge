import { createCookieSessionStorage, redirect } from "react-router";

const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "_session",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: "lax",
        secrets: ["secret-key-change-this"],
        secure: process.env.NODE_ENV === "production",
    },
});

export async function getUserId(request: Request) {
    const session = await sessionStorage.getSession( 
        request.headers.get("Cookie")
    );
    console.log(session.get("userId"));
    return session.get("userId");
}

export async function requireUserId(request: Request) {
  const userId = await getUserId(request);
  if (!userId) {
    throw redirect("/");
  }
  return userId;
}

export async function createUserSession(user_id: number, redirectTo: string) {
  const session = await sessionStorage.getSession();
  session.set("userId", user_id);
  
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function logout(request: Request) {
  console.log("🔓 Destroying session...");
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}