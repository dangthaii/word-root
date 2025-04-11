"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

interface DragDropGameProps {
  data: {
    wordRoot: {
      id: string;
      prefix: string;
      meaning: string;
      description: string | null;
      origin: string | null;
    };
    options: string[];
    correctAnswer: string;
  };
  onNext: () => void;
}

export default function DragDropGame({ data, onNext }: DragDropGameProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsCorrect(option === data.correctAnswer);
  };

  const handleContinue = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-800 mb-2">
          {data.wordRoot.prefix}
          <span className="text-blue-500">_</span>
        </p>
        <p className="text-gray-600">{data.wordRoot.meaning}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            disabled={selectedOption !== null}
            className={`p-4 text-xl text-center border-2 rounded-xl transition-colors ${
              selectedOption === option
                ? isCorrect
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
                : "border-gray-200 hover:border-blue-500"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {selectedOption !== null && (
        <button
          onClick={handleContinue}
          className={`w-full py-4 text-xl font-semibold text-white rounded-xl transition-colors ${
            isCorrect
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          Tiếp tục
        </button>
      )}

      {selectedOption !== null && !isCorrect && (
        <div className="text-center text-gray-600">
          Đáp án đúng là:{" "}
          <span className="font-bold text-blue-500">{data.correctAnswer}</span>
        </div>
      )}
    </div>
  );
}
