export default function Sketch() {
    const ids = ["1020","1021","1022","1023","1024","1025"];
  
    return (
      <section className="w-full bg-white">
        <div className="pt-6 px-6 md:px-12 max-w-full">
          <h1 className="text-3xl font-bold text-black text-center mb-6">Sketches</h1>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-full">
            {ids.map((id, i) => (
              <article key={i} className="w-full rounded-lg overflow-hidden shadow-sm border">
                <img
                  src={`https://picsum.photos/id/${id}/1200/1200`}
                  alt={`Project ${i+1}`}
                  className="w-full h-[28vh] sm:h-[34vh] md:h-[36vh] lg:h-[40vh] object-cover block"
                  draggable={false}
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">Project {i+1}</h2>
                  <p className="text-gray-600 mt-2">Short description of project {i+1}.</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  