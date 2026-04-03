import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface GalleryProps {
  images: string[]
  title: string
}

export function Gallery({ images, title }: GalleryProps) {
  const [selected, setSelected] = useState(0)
  const [open, setOpen] = useState(false)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [lightboxRef, lightboxApi] = useEmblaCarousel({ loop: true, align: 'start' })

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  // Autoplay
  useEffect(() => {
    if (!emblaApi) return
    const timer = setInterval(() => emblaApi.scrollNext(), 3500)
    return () => clearInterval(timer)
  }, [emblaApi])

  // keep lightbox in sync
  useEffect(() => {
    if (open && lightboxApi) lightboxApi.scrollTo(selected)
  }, [open, selected, lightboxApi])

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex">
            {images.map((src, i) => (
              <div key={src} className="relative min-w-0 flex-[0_0_100%]">
                <img
                  src={src}
                  alt={`${title} ${i + 1}`}
                  className={`h-72 w-full object-cover select-none transition duration-700 ease-out
                    ${i === selected ? 'scale-[1.01] opacity-100' : 'opacity-90'}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
                <button
                  onClick={() => setOpen(true)}
                  className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur hover:bg-black/60"
                >
                  <Maximize2 className="h-3.5 w-3.5" /> Expand
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Prev/Next */}
        <button
          aria-label="Previous image"
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next image"
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all ${i === selected ? 'w-6 bg-orange-600' : 'w-3 bg-gray-300'}`}
          />
        ))}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pt-1">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg ring-2 transition ${i === selected ? 'ring-orange-600' : 'ring-transparent'}`}
          >
            <img src={src} alt={`${title} thumbnail ${i + 1}`} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden">
          <div className="relative">
            <div ref={lightboxRef} className="overflow-hidden">
              <div className="flex">
                {images.map((src) => (
                  <div key={src} className="min-w-0 flex-[0_0_100%] bg-black">
                    <img src={src} alt={title} className="mx-auto max-h-[80vh] w-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => lightboxApi?.scrollPrev()} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => lightboxApi?.scrollNext()} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
