"use client"

export default function VideoPlayer({ video }) {
  return (
    <div className="aspect-video w-full">
      <iframe
        className="w-full h-full rounded-lg"
        src={video.youtubeUrl}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}
