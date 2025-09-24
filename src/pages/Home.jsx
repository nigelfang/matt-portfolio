export default function Home() {
    const images = [
      "https://picsum.photos/id/1015/1600/1200",
      "https://picsum.photos/id/1016/1600/1200",
      "https://picsum.photos/id/1018/1600/1200",
      "https://picsum.photos/id/1025/1600/1200",
      "https://picsum.photos/id/1024/1600/1200",
      "https://picsum.photos/id/1021/1600/1200",
    ];
  
    return (
      <section className="w-full bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 w-full max-w-full">
            {images.map((src, i) => (
              <div
                key={i}
                className="w-full h-[50vh] sm:h-[45vh] md:h-[50vh] lg:h-[60vh] bg-center bg-cover"
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundAttachment: "fixed",
                  backgroundPosition: "center",
                }}
                >
                    {/* overlay text */}
                    <div className="w-full h-full bg-black/25 flex items-end">
                    <div className="p-6 text-white">
                        <h2 className="text-xl font-semibold">Artwork {i+1}</h2>
                    </div>
                    </div>
                </div>
            ))}
        </div>
      </section>
    );
  }
  