import { db } from "@/lib/db";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const revalidate = 3600; // Revalidate every hour

export default async function WordRootsPage() {
  const wordRoots = await db.wordRoot.findMany({
    include: {
      _count: {
        select: { words: true },
      },
    },
    orderBy: {
      prefix: "asc",
    },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">
        Học từ vựng qua gốc từ
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wordRoots.map((root) => (
          <Link
            href={`/word-roots/${root.id}`}
            key={root.id}
            className="group block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-blue-600 group-hover:text-blue-800">
                  {root.prefix}
                </h2>
                <p className="text-gray-600 mt-1">{root.meaning}</p>
              </div>
              <Badge variant="outline" className="bg-blue-50">
                {root._count.words} từ
              </Badge>
            </div>
            <p className="mt-4 text-gray-700">{root.description}</p>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span className="font-medium">Gốc: </span>
              <span className="ml-1">{root.origin}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
