'use client'

import { useState, useEffect } from "react";
import Link from "next/link";

type Carte = {
  id: number;
  patient: string;
  visitedAt: string;
  nextVisitAt: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function CarteListPage() {
  const [cartes, setCartes] = useState<Carte[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartes = async () => {
      try {
        const res = await fetch("/api/carte");
        if (!res.ok) {
          throw new Error("データの取得に失敗しました");
        }
        const data = await res.json();
        setCartes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "エラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    fetchCartes();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">訪問記録一覧</h1>
        <Link href="/carte/new" className="px-4 py-2 bg-blue-500 text-white rounded">
          新規作成
        </Link>
      </div>

      {loading ? (
        <p className="text-center py-10">読み込み中...</p>
      ) : error ? (
        <p className="text-center py-10 text-red-500">{error}</p>
      ) : cartes.length === 0 ? (
        <p className="text-center py-10">訪問記録がありません</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border text-left">患者名</th>
                <th className="py-2 px-4 border text-left">訪問日時</th>
                <th className="py-2 px-4 border text-left">次回予定日時</th>
                <th className="py-2 px-4 border text-left">メモ</th>
                <th className="py-2 px-4 border text-left">操作</th>
              </tr>
            </thead>
            <tbody>
              {cartes.map((carte) => (
                <tr key={carte.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{carte.patient}</td>
                  <td className="py-2 px-4 border">{formatDate(carte.visitedAt)}</td>
                  <td className="py-2 px-4 border">
                    {carte.nextVisitAt ? formatDate(carte.nextVisitAt) : '-'}
                  </td>
                  <td className="py-2 px-4 border">
                    {carte.notes ? (
                      <div className="max-w-xs truncate">{carte.notes}</div>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="py-2 px-4 border">
                    <Link href={`/carte/${carte.id}`} className="text-blue-500 hover:underline">
                      詳細
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
