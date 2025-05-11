'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCartePage() {
  const [patient, setPatient] = useState("");
  const [visitedAt, setVisitedAt] = useState("");
  const [nextVisitAt, setNextVisitAt] = useState("");
  const [notes, setNotes] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/carte", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patient,
        visitedAt,
        nextVisitAt: nextVisitAt || null,
        notes,
      }),
    });

    if (res.ok) {
      alert("訪問記録を保存しました！");
      router.push("/carte");
    } else {
      alert("保存に失敗しました");
    }
  };

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-xl font-bold mb-6">訪問記録の作成</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          placeholder="患者名"
          className="w-full p-2 border rounded"
          required
        />
        <label className="block">
          訪問日：
          <input
            type="datetime-local"
            value={visitedAt}
            onChange={(e) => setVisitedAt(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </label>
        <label className="block">
          次回訪問予定日（任意）：
          <input
            type="datetime-local"
            value={nextVisitAt}
            onChange={(e) => setNextVisitAt(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="メモ（任意）"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          保存
        </button>
      </form>
    </main>
  );
}
