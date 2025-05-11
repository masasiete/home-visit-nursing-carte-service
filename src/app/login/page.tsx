'use client'

import { signIn } from "next-auth/react"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">ログインページ</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => signIn("google")}
      >
        Googleでログイン
      </button>
    </div>
  );
}
