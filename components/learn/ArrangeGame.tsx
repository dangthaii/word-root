"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Check, X } from "lucide-react";

interface ArrangeGameProps {
  data: {
    word: {
      id: string;
      term: string;
      meaning: string;
      pronunciation: string | null;
      partOfSpeech: string | null;
      example: string | null;
      notes: string | null;
    };
    parts: { id: string; text: string }[];
  };
}

export default function ArrangeGame({ data }: ArrangeGameProps) {
  const [items, setItems] = useState(data.parts);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    setItems(newItems);

    // Kiểm tra xem thứ tự có đúng không
    const isOrderCorrect = newItems.every((item, index) => {
      if (index === 0) return item.id === "prefix";
      if (index === 1) return item.id === "root";
      if (index === 2) return item.id === "suffix";
      return true;
    });

    setIsCorrect(isOrderCorrect);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-800 mb-2">
          {data.word.term}
        </p>
        <p className="text-gray-600">{data.word.meaning}</p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex space-x-3"
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-4 rounded-xl border-2 transition-colors ${
                        isCorrect === true
                          ? "border-green-500 bg-green-50"
                          : isCorrect === false
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{item.text}</span>
                        {isCorrect !== null && (
                          <div className="w-6 h-6">
                            {isCorrect ? (
                              <Check className="w-6 h-6 text-green-500" />
                            ) : (
                              <X className="w-6 h-6 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {isCorrect !== null && (
        <button
          className={`w-full py-4 text-xl font-semibold text-white rounded-xl transition-colors ${
            isCorrect
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {isCorrect ? "Tiếp tục" : "Thử lại"}
        </button>
      )}
    </div>
  );
}
