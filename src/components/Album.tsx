import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";

const Album = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { data: photos, refetch } = useQuery({
    queryKey: ["photos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      setUploading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("photos")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("photos")
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase
        .from("photos")
        .insert({
          url: publicUrl,
          description,
          author_name: name,
        });

      if (insertError) throw insertError;

      toast({
        title: "Foto adicionada com sucesso!",
        description: "Obrigado por compartilhar essa memória.",
      });

      setName("");
      setDescription("");
      refetch();
    } catch (error) {
      toast({
        title: "Erro ao adicionar foto",
        description: "Por favor, tente novamente.",
        variant: "destructive",
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
      className="bg-[#F5DEB3] py-16 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-memorial-dark mb-8 tracking-tight text-center">
          Álbum de Memórias
        </h2>
        <div className="w-24 h-1 bg-memorial-dark/20 mx-auto mb-12"></div>

        <div className="mb-12 max-w-xl mx-auto">
          <Card className="p-6">
            <h3 className="font-serif text-xl mb-4">Adicionar Foto</h3>
            <div className="space-y-4">
              <Input
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Textarea
                placeholder="Descrição da foto ou memória"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
                {uploading && <span>Enviando...</span>}
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos?.map((photo) => (
            <Dialog key={photo.id}>
              <DialogTrigger asChild>
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="mb-4">
                    <AspectRatio ratio={4/3} className="bg-memorial-primary/20 rounded-md overflow-hidden">
                      <img
                        src={photo.url}
                        alt={photo.description}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                  <p className="font-serif text-lg mb-2">Por: {photo.author_name}</p>
                  <p className="text-memorial-secondary line-clamp-2">{photo.description}</p>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogTitle className="font-serif text-2xl mb-6">Memória Compartilhada</DialogTitle>
                <ScrollArea className="h-[calc(90vh-8rem)]">
                  <div className="space-y-6">
                    <AspectRatio ratio={16/9} className="bg-memorial-primary/20 rounded-md overflow-hidden">
                      <img
                        src={photo.url}
                        alt={photo.description}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    <div>
                      <p className="font-serif text-xl mb-2">Por: {photo.author_name}</p>
                      <p className="text-memorial-secondary text-lg">{photo.description}</p>
                    </div>
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