import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 3600; // Revalidate every hour

interface WordRootPageProps {
  params: {
    id: string;
  };
}

export default async function WordRootPage({ params }: WordRootPageProps) {
  const wordRoot = await db.wordRoot.findUnique({
    where: {
      id: params.id,
    },
    include: {
      words: {
        orderBy: {
          term: "asc",
        },
      },
      examples: true,
    },
  });

  if (!wordRoot) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/word-roots"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Quay lại danh sách gốc từ
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              {wordRoot.prefix}
            </h1>
            <p className="text-xl text-gray-600 mt-1">{wordRoot.meaning}</p>
          </div>
          <div className="mt-4 md:mt-0 px-4 py-2 bg-blue-50 rounded-md text-blue-700 text-sm">
            <span>Nguồn gốc: </span>
            <span className="font-medium">{wordRoot.origin}</span>
          </div>
        </div>
        <p className="text-gray-700 mb-6">{wordRoot.description}</p>

        {wordRoot.examples.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h2 className="font-semibold text-gray-900 mb-2">Ví dụ:</h2>
            {wordRoot.examples.map((example) => (
              <div key={example.id} className="mb-2">
                <p className="italic">"{example.text}"</p>
                {example.translation && (
                  <p className="text-gray-600 text-sm mt-1">
                    {example.translation}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-6">
        Từ vựng với gốc "{wordRoot.prefix}"
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wordRoot.words.map((word) => (
          <div
            key={word.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">{word.term}</h3>
              <span className="text-xs uppercase px-2 py-1 rounded bg-gray-100 text-gray-600">
                {word.partOfSpeech || "n/a"}
              </span>
            </div>

            {word.pronunciation && (
              <p className="text-gray-500 text-sm mt-1">
                /{word.pronunciation}/
              </p>
            )}

            <p className="mt-3">{word.definition}</p>

            {word.example && (
              <p className="mt-3 text-gray-700 italic">"{word.example}"</p>
            )}

            {word.notes && (
              <p className="mt-4 text-sm text-gray-600 border-t pt-2">
                <span className="font-medium">Ghi chú: </span>
                {word.notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
