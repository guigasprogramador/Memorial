import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  url: string;
  created_at: string;
}

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const { toast } = useToast();
  const [newVideo, setNewVideo] = useState({
    title: "",
    url: "",
    thumbnail: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os vídeos.",
        variant: "destructive"
      });
    }
  };

  const addVideo = async () => {
    if (newVideo.title && newVideo.url) {
      setIsLoading(true);
      try {
        const { error } = await supabase
          .from('videos')
          .insert([
            {
              title: newVideo.title,
              url: newVideo.url,
              thumbnail: newVideo.thumbnail || "https://via.placeholder.com/400"
            }
          ]);

        if (error) throw error;

        setNewVideo({
          title: "",
          url: "",
          thumbnail: ""
        });
        
        toast({
          title: "Sucesso",
          description: "Vídeo adicionado com sucesso!"
        });
        
        fetchVideos();
      } catch (error) {
        console.error('Error adding video:', error);
        toast({
          title: "Erro",
          description: "Não foi possível adicionar o vídeo.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast({
        title: "Atenção",
        description: "Por favor, preencha o título e a URL do vídeo.",
        variant: "destructive"
      });
    }
  };

  const removeVideo = async (id: number) => {
    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Vídeo removido com sucesso!"
      });
      
      fetchVideos();
    } catch (error) {
      console.error('Error removing video:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o vídeo.",
        variant: "destructive"
      });
    }
  };

  return (
    <section className="py-16 bg-white/50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif text-memorial-dark mb-8 text-center">Vídeos</h2>
        
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold mb-4">Adicionar Novo Vídeo</h3>
          <div className="mb-4">
            <input
              type="text"
              value={newVideo.title}
              onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
              placeholder="Título do Vídeo"
              className="p-2 border border-gray-300 rounded w-full md:w-1/2 mb-4"
              disabled={isLoading}
            />
            <input
              type="text"
              value={newVideo.url}
              onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
              placeholder="URL do Vídeo (YouTube)"
              className="p-2 border border-gray-300 rounded w-full md:w-1/2 mb-4"
              disabled={isLoading}
            />
            <input
              type="text"
              value={newVideo.thumbnail}
              onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.value })}
              placeholder="URL da Miniatura (Opcional)"
              className="p-2 border border-gray-300 rounded w-full md:w-1/2 mb-4"
              disabled={isLoading}
            />
            <button
              onClick={addVideo}
              className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Adicionando..." : "Adicionar Vídeo"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="relative">
              <Dialog>
                <DialogTrigger>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="aspect-video relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-memorial-dark">{video.title}</h3>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <ScrollArea className="h-[60vh]">
                    <div className="aspect-video">
                      <iframe
                        src={video.url}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
              <button
                onClick={() => removeVideo(video.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;