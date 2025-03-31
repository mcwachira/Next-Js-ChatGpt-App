import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const config = {
  matcher: ["/chats/:path*"],
};

// export default auth((req) => {
//   if (!req.auth) {
//     return NextResponse.redirect(new URL("/api/auth/signin", req.url));
//   }
// });

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/api/auth/signin") {
    const newUrl = new URL("/api/auth/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
