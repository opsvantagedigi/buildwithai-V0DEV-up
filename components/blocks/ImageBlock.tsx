import React from "react"
import { Block } from "@/lib/layout/schema"

type ImageBlockType = Extract<Block, { kind: "image" }>

export function ImageBlock({ block }: { block: ImageBlockType }) {
  const roundedClass = block.rounded ? "rounded-2xl" : "rounded-lg"
  return (
    <img
      src={block.src}
      alt={block.alt}
      className={`w-full ${roundedClass} border border-white/10 bg-white/5 object-cover`}
      style={block.aspectRatio ? { aspectRatio: block.aspectRatio } : undefined}
    />
  )
}
