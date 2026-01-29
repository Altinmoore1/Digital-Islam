
import React, { useState } from 'react';
import { useAppData } from '../context/DataContext';
import { Link } from 'react-router-dom';


interface MediaItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  title: string;
  category: string;
}

const GALLERY_DATA: MediaItem[] = []; // Removed dummy data

const Gallery: React.FC<{ limit?: number }> = ({ limit }) => {
  const { data, isLoading } = useAppData();
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | any | null>(null);

  const allFilteredMedia = data.gallery.filter(item =>
    filter === 'all' ? true : item.type === filter
  );

  const filteredMedia = limit ? allFilteredMedia.slice(0, limit) : allFilteredMedia;

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="serif text-4xl md:text-5xl text-green-900 mb-4">Our Visual Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Glimpses into the impact we are creating together across Sierra Leone.
          </p>

          <div className="flex justify-center gap-4 mt-8">
            {(['all', 'image', 'video'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all border-2 ${filter === t
                  ? 'bg-green-700 text-white border-green-700'
                  : 'bg-white text-green-700 border-green-700 hover:bg-green-50'
                  }`}
              >
                {t.toUpperCase()}S
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading && (
            <div className="col-span-full text-center py-20 text-gray-500">
              Loading gallery...
            </div>
          )}
          {!isLoading && filteredMedia.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-xl font-medium mb-2">No moments shared yet.</p>
              <p className="text-sm">Check back soon for updates from our community!</p>
            </div>
          )}
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl shadow-md cursor-pointer aspect-[4/3]"
              onClick={() => setSelectedMedia(item)}
            >
              {item.type === 'video' ? (
                item.url ? (
                  <video
                    src={item.url}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    muted
                    playsInline
                    preload="metadata"
                    onMouseOver={e => e.currentTarget.play()}
                    onMouseOut={e => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0; // Reset to frame 1
                    }}
                  />
                ) : <div className="w-full h-full bg-gray-200 flex items-center justify-center">No Video</div>
              ) : (
                item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : <div className="w-full h-full bg-gray-200 flex items-center justify-center">No Image</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-green-400 text-xs font-bold uppercase tracking-widest mb-1">{item.category}</span>
                <h4 className="text-white font-bold text-lg">{item.title}</h4>
                {item.type === 'video' && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615l-4.695 4.502c-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.787-0.335l-4.695-4.502c-0.408-0.418-0.436-1.17 0-1.615z" className="hidden" />
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.841z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {limit && limit < allFilteredMedia.length && (
          <div className="text-center mt-12">
            <Link to="/gallery" className="inline-block bg-white border-2 border-green-700 text-green-700 px-8 py-3 rounded-full font-bold text-lg hover:bg-green-50 transition-all shadow-md">
              View Full Gallery
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox / Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-4xl hover:text-green-400"
            onClick={() => setSelectedMedia(null)}
          >
            &times;
          </button>

          <div
            className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.type === 'image' ? (
              <img
                src={selectedMedia.url}
                alt={selectedMedia.title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              />
            ) : (
              <video
                src={selectedMedia.url}
                controls
                autoPlay
                className="max-w-full max-h-[75vh] rounded-lg shadow-2xl"
              />
            )}
            <div className="text-center">
              <span className="text-green-400 font-bold uppercase tracking-widest text-sm">{selectedMedia.category}</span>
              <h3 className="text-white text-2xl font-bold mt-1">{selectedMedia.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
