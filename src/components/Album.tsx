import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { supabase, uploadAlbumImage } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";

interface Photo {
  id: string;
  url: string;
  description: string;
  created_at: string;
}

const Album = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { data: photos = [], refetch } = useQuery<Photo[]>({
    queryKey: ["photos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("album")
        .select("id, url, description, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!file || !description) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Por favor, preencha todos os campos e selecione uma imagem",
      });
      return;
    }

    try {
      setUploading(true);
      
      // Upload da imagem
      const { filePath, publicUrl } = await uploadAlbumImage(file);

      // Criar o registro da foto
      const { error } = await supabase
        .from("album")
        .insert({
          url: publicUrl,
          description,
          created_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Foto adicionada com sucesso!",
      });

      // Limpar o formulário
      setDescription("");
      setFile(null);
      refetch();
    } catch (error) {
      console.error("Erro ao adicionar foto:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao adicionar foto. Tente novamente.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-memorial-light py-16 px-6 relative"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: 'url("https://cdn.pixabay.com/photo/2017/08/02/22/38/photo-2573216_1280.jpg")' }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-memorial-dark mb-8 tracking-tight text-center">
          Álbum de Fotos
        </h2>
        <div className="w-24 h-1 bg-memorial-dark/20 mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Dialog>
            <DialogTrigger asChild>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <AspectRatio ratio={4/3} className="bg-memorial-primary/20 rounded-md overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-memorial-primary">
                    Adicionar foto
                  </div>
                </AspectRatio>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogTitle className="font-serif text-2xl mb-6">Adicionar Nova Foto</DialogTitle>
              <form onSubmit={handleUpload}>
                <div className="space-y-4">
                  <div>
                    <Textarea
                      placeholder="Descrição da foto"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files[0])}
                      disabled={uploading}
                    />
                  </div>
                  <Button type="submit" disabled={uploading}>
                    {uploading ? "Enviando..." : "Adicionar foto"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {photos.map((photo) => (
            <Dialog key={photo.id}>
              <DialogTrigger asChild>
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <AspectRatio ratio={4/3} className="bg-memorial-primary/20 rounded-md overflow-hidden mb-4">
                    <img
                      src={photo.url}
                      alt={photo.description}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                  <h3 className="font-serif text-xl mb-2">{photo.description}</h3>
                  <p className="text-memorial-secondary line-clamp-2">
                    {photo.description}
                  </p>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogTitle className="font-serif text-2xl mb-6">{photo.description}</DialogTitle>
                <ScrollArea className="h-[calc(90vh-8rem)]">
                  <div className="space-y-4">
                    <AspectRatio ratio={16/9} className="bg-memorial-primary/20 rounded-md overflow-hidden">
                      <img
                        src={photo.url}
                        alt={photo.description}
                        className="w-full h-full object-contain"
                      />
                    </AspectRatio>
                    <p className="text-memorial-secondary whitespace-pre-wrap">
                      {photo.description}
                    </p>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Album;