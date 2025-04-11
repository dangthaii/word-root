import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full max-w-4xl flex justify-between items-center">
        <h1 className="text-2xl font-bold">Word App</h1>
        <div className="flex gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <span>Xin chào, {session.user.name || session.user.email}</span>
              <form action="/api/auth/signout" method="post">
                <Button variant="outline" type="submit">
                  Đăng xuất
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href="/login">Đăng nhập</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Đăng ký</Link>
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="w-full max-w-4xl flex flex-col items-center justify-center">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-semibold">
            Chào mừng đến với ứng dụng học từ vựng
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Học từ vựng tiếng Anh thông qua việc hiểu các gốc từ sẽ giúp bạn mở
            rộng vốn từ hiệu quả hơn
          </p>

          <div className="py-8">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/word-roots">Khám phá các gốc từ</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">40+ Gốc từ</h3>
              <p>Hiểu gốc từ giúp bạn học từ mới nhanh hơn</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">100+ Từ vựng</h3>
              <p>Từ vựng phổ biến được nhóm theo gốc từ</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">Dễ học, dễ nhớ</h3>
              <p>Học hiệu quả với ví dụ và phát âm chuẩn</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Word App - Học từ vựng qua gốc từ
      </footer>
    </div>
  );
}
