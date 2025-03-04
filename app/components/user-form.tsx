"use client";

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { ImageGeneratorState } from "../types";
import { AlertCircle, Download, Upload } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import Image from "next/image";
import { TOPICS, PLACEHOLDERS } from "../utils/constants";
import { Button } from "./ui/button";
import { ImageUploader } from "./image-uploader";

export const SUGGESTIONS = [
  "Innovation",
  "Sustainable Innovation",
  "Smart Cities",
  "Green Technology",
  "Digital Transformation",
  "Nordic Innovation",
  "Startup Ecosystem",
  "Clean Energy",
  "Healthcare Innovation",
  "Future of Work",
  "Urban Mobility",
  "Ocean Technology",
  "Circular Economy",
  "EdTech",
  "FinTech",
  "Climate Solutions",
  "Nordic Design",
  "Social Innovation",
  "Renewable Energy",
  "Smart Transportation",
  "MedTech",
  "Sustainable Architecture",
  "Digital Health",
  "Impact Investing",
  "Tech for Good",
  "Innovation Policy",
  "Nordic Entrepreneurship",
  "Sustainable Fashion",
  "Smart Manufacturing",
  "Food Innovation",
  "Creative Industries",
  "Innovation Districts",
  "Research & Development",
  "Sustainable Business",
  "Digital Inclusion",
  "Future Cities",
  "Nordic Cooperation",
] as const;

interface UserFormProps {
  formData: ImageGeneratorState;
  onChange: (data: ImageGeneratorState) => void;
  onImageUpload: (file: File | null, croppedImageUrl: string | null) => void;
  onChangeBackground: () => void;
  onDownload: () => void;
  isLoadingBackgrounds?: boolean;
}

export function UserForm({
  formData,
  onChange,
  onImageUpload,
  onChangeBackground,
  onDownload,
  isLoadingBackgrounds = false,
}: UserFormProps) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof ImageGeneratorState, string>>
  >({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isDownloading, setIsDownloading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle clicks outside of suggestions dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Add new effect for initial focus
  useEffect(() => {
    // Focus the input field on component mount
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newTopics = [value];
    onChange({ ...formData, topics: newTopics });

    // Filter suggestions
    if (value.trim()) {
      const filtered = SUGGESTIONS.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    console.log("Suggestion clicked:", suggestion);
    onChange({ ...formData, topics: [suggestion] });
    setShowSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredSuggestions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev <= 0 ? filteredSuggestions.length - 1 : prev - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(filteredSuggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleDownloadWrapper = async () => {
    try {
      setIsDownloading(true);
      await onDownload();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2 sm:space-y-3">
        <div className="space-y-1">
          <h3 className="font-medium text-[#000037] text-base sm:text-lg">
            What Would You Like to Discuss?
          </h3>
          <p className="text-sm sm:text-base text-[#000037]/80">
            Add a topic you're passionate about to connect with like-minded attendees at Oslo Innovation Week.
          </p>
        </div>
        <div className="flex justify-start relative">
          <Input
            ref={inputRef}
            maxLength={150}
            placeholder={PLACEHOLDERS.topic}
            value={formData.topics[0] || ''}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={(e) => {
              e.target.placeholder = '';
              if (formData.topics[0]) {
                const filtered = SUGGESTIONS.filter(suggestion =>
                  suggestion.toLowerCase().includes(formData.topics[0].toLowerCase())
                );
                setFilteredSuggestions(filtered);
                setShowSuggestions(filtered.length > 0);
              }
            }}
            onBlur={(e) => {
              e.target.placeholder = PLACEHOLDERS.topic;
            }}
            className="bg-white border-[#000037]/20 text-[#000037] placeholder:text-[#000037]/50 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-[400px] focus:border-[#0071e1] focus:ring-2 focus:ring-[#0071e1] transition-colors"
            aria-label="Topic"
            aria-expanded={showSuggestions}
            role="combobox"
            aria-controls="suggestions-list"
            aria-activedescendant={selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined}
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              id="suggestions-list"
              role="listbox"
              className="absolute top-full left-0 right-0 sm:right-auto sm:w-[400px] mt-1 bg-white border border-[#000037]/10 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50"
            >
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedIndex === index
                    ? 'bg-[#000037]/5 text-[#000037]'
                    : 'text-[#000037] hover:bg-[#000037]/5'
                    }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <div className="space-y-1">
          <h3 className="font-medium text-[#000037] text-base sm:text-lg">
            Personalize Your Card
          </h3>
          <p className="text-sm sm:text-base text-[#000037]/80">
            Make it yours by adding your photo and choosing a background style.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-start">
          <ImageUploader
            onImageUpload={onImageUpload}
            triggerButton={
              <Button
                variant="outline"
                className="bg-white border-[#000037] border text-[#000037] hover:bg-[#000037] hover:text-white transition-colors text-sm sm:text-base h-10 sm:h-12 w-full sm:w-48"
              >
                <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Upload Image
              </Button>
            }
          />
          <Button
            variant="outline"
            onClick={onChangeBackground}
            className="bg-white border-[#000037] border text-[#000037] hover:bg-[#000037] hover:text-white transition-colors text-sm sm:text-base h-10 sm:h-12 w-full sm:w-48"
            disabled={isLoadingBackgrounds}
          >
            {isLoadingBackgrounds ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-[#000037] border-t-transparent rounded-full animate-spin mr-2" />
                Loading...
              </div>
            ) : (
              "Change Background"
            )}
          </Button>
        </div>
      </div>

      <div className="pt-2 sm:pt-4 flex justify-start">
        <Button
          onClick={handleDownloadWrapper}
          className="bg-[#000037] text-white hover:bg-white hover:text-[#000037] hover:border-[#000037] hover:border text-sm sm:text-base h-10 sm:h-12 w-full sm:w-[400px]"
          disabled={isLoadingBackgrounds || isDownloading}
        >
          {isDownloading ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Generating...
            </div>
          ) : (
            <>
              <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Download Social Card
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
