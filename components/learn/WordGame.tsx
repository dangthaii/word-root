"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

interface WordGameProps {
  data: {
    wordRoot: {
      id: string;
      prefix: string;
      meaning: string;
      description: string | null;
      origin: string | null;
    };
    missingPart: string;
    correctAnswer: string;
  };
  onNext: () => void;
}

export default function WordGame({ data, onNext }: WordGameProps) {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCorrect(answer.toLowerCase() === data.correctAnswer.toLowerCase());
  };

  const handleContinue = () => {
    setAnswer("");
    setIsCorrect(null);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-800 mb-2">
          {data.missingPart}
          <span className="text-blue-500">_</span>
        </p>
        <p className="text-gray-600">{data.wordRoot.meaning}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className={`w-full px-6 py-4 text-xl text-center border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              isCorrect === true
                ? "border-green-500 bg-green-50"
                : isCorrect === false
                ? "border-red-500 bg-red-50"
                : "border-gray-200"
            }`}
            placeholder="Nhập ký tự còn thiếu"
            autoFocus
          />
          {isCorrect !== null && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {isCorrect ? (
                <Check className="w-6 h-6 text-green-500" />
              ) : (
                <X className="w-6 h-6 text-red-500" />
              )}
            </div>
          )}
        </div>

        <button
          type={isCorrect === null ? "submit" : "button"}
          onClick={isCorrect !== null ? handleContinue : undefined}
          className={`w-full py-4 text-xl font-semibold text-white rounded-xl transition-colors ${
            isCorrect === true
              ? "bg-green-500 hover:bg-green-600"
              : isCorrect === false
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isCorrect === null ? "Kiểm tra" : isCorrect ? "Tiếp tục" : "Thử lại"}
        </button>
      </form>

      {isCorrect === false && (
        <div className="text-center text-gray-600">
          Đáp án đúng là:{" "}
          <span className="font-bold text-blue-500">{data.correctAnswer}</span>
        </div>
      )}
    </div>
  );
}
