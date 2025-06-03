"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button
      onClick={() => signOut({ redirectTo: "/login" })}
      className="bg-indigo-600 text-white px-4 py-2 hover:bg-red-500 text-sm rounded-3xl"
    >
      Logout
    </button>
  );
}
