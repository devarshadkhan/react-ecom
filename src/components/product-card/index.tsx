"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CategoryCard() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <Card
        className={`w-80 cursor-pointer overflow-hidden border-0 shadow-xl transition-all duration-500 ${
          isHovered ? "scale-105 shadow-2xl" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0 relative group">
          {/* Background Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-90 transition-opacity duration-500 z-10" />

          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=400&text=Smart+TV"
              alt="Smart TV"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Item Count Badge */}
            <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900 hover:bg-white transition-all duration-300 z-20">
              245 items
            </Badge>
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              {/* Category Name */}
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  TV
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                Smart TVs & Entertainment
              </h3>

              {/* Description */}
              <p className="text-white/90 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                Discover the latest in home entertainment with 4K, OLED, and Smart TV technology
              </p>

              {/* Shop Now Button */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-400">
                <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          {/* Default Content (visible when not hovered) */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-500 z-15">
            <h3 className="text-xl font-bold text-white mb-1">Smart TVs & Entertainment</h3>
            <p className="text-white/80 text-sm">245 products available</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
