import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Word Roots
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              href="/word-roots"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Gốc từ
            </Link>
            <Link
              href="/learn"
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <BookOpen className="w-4 h-4 mr-1" />
              Học từ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
