'use client'

import { signOut } from "next-auth/react";
import Link from "next/link";

import { Session } from "next-auth";

export default function Header({ session }: { session: Session | null }) {
  return (
    <header className="p-4 bg-gray-100 flex justify-between items-center">
      <Link href="/">ホーム</Link>
      {session ? (
        <div className="flex gap-4 items-center">
          <span>{session.user?.name} さん</span>
          <form action="/api/auth/signout" method="post">
            <button onClick={() => signOut()} className="text-blue-500">ログアウト</button>
          </form>
        </div>
      ) : (
        <Link href="/login">ログイン</Link>
      )}
  </header>
  );
}
