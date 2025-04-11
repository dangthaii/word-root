"use client";

import { useState, useEffect } from "react";
import { shuffle } from "@/lib/utils";
import WordGame from "@/components/learn/WordGame";
import DragDropGame from "@/components/learn/DragDropGame";
import ArrangeGame from "@/components/learn/ArrangeGame";

interface Game {
  type: "word" | "drag-drop" | "arrange";
  data: any;
}

export default function LearnPage() {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lấy danh sách gốc từ từ API và tạo trò chơi
  const initializeGames = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("Fetching word roots...");
      const response = await fetch("/api/learn");
      if (!response.ok) {
        throw new Error("Failed to fetch word roots");
      }
      const data = await response.json();
      const wordRoots = data.wordRoots;

      console.log("Fetched word roots:", wordRoots);

      if (!wordRoots || wordRoots.length === 0) {
        setError("Không tìm thấy dữ liệu gốc từ");
        return;
      }

      const newGames: Game[] = [];

      for (const wordRoot of wordRoots) {
        // Trò chơi 1: Gõ lại gốc từ còn thiếu
        newGames.push({
          type: "word",
          data: {
            wordRoot,
            missingPart: wordRoot.prefix.slice(0, -1),
            correctAnswer: wordRoot.prefix.slice(-1),
          },
        });

        // Trò chơi 2: Drag and drop ghép nghĩa
        newGames.push({
          type: "drag-drop",
          data: {
            wordRoot,
            options: [
              wordRoot.meaning,
              wordRoot.origin || "",
              wordRoot.description || "",
            ],
            correctAnswer: wordRoot.meaning,
          },
        });

        // Trò chơi 3: Sắp xếp các thành phần của từ
        if (wordRoot.words && wordRoot.words.length > 0) {
          const word = wordRoot.words[0];
          newGames.push({
            type: "arrange",
            data: {
              word,
              parts: shuffle([
                { id: "prefix", text: wordRoot.prefix },
                { id: "root", text: word.term },
                { id: "suffix", text: "" },
              ]),
            },
          });
        }
      }

      console.log("Created games:", newGames);
      setGames(shuffle(newGames));
    } catch (error) {
      console.error("Error initializing games:", error);
      setError(
        error instanceof Error ? error.message : "Có lỗi xảy ra khi tải dữ liệu"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Khởi tạo trò chơi khi component mount
  useEffect(() => {
    initializeGames();
  }, []);

  const handleNextGame = () => {
    setCurrentGameIndex((prev) => (prev + 1) % games.length);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải trò chơi...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">Lỗi: {error}</p>
          <button
            onClick={initializeGames}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Không có trò chơi nào để hiển thị.</p>
          <button
            onClick={initializeGames}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Tải lại
          </button>
        </div>
      </div>
    );
  }

  const currentGame = games[currentGameIndex];
  console.log("Current game:", currentGame);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Học từ vựng</h1>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {currentGameIndex + 1}
              </div>
              <div className="text-sm text-gray-600">/ {games.length}</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            {currentGame.type === "word" && (
              <WordGame data={currentGame.data} onNext={handleNextGame} />
            )}
            {currentGame.type === "drag-drop" && (
              <DragDropGame data={currentGame.data} onNext={handleNextGame} />
            )}
            {currentGame.type === "arrange" && (
              <ArrangeGame {...currentGame.data} onNext={handleNextGame} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
