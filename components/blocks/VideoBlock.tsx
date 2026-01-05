import React from "react"
import { Block } from "@/lib/layout/schema"

type VideoBlockType = Extract<Block, { kind: "video" }>

export function VideoBlock({ block }: { block: VideoBlockType }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
      <video
        className="w-full h-full"
        src={block.src}
        poster={block.poster}
        controls={!block.autoplay}
        autoPlay={block.autoplay}
        muted={block.muted ?? true}
        loop={block.loop ?? true}
        playsInline
      />
    </div>
  )
}
