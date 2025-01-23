import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { supabase, uploadMemoryImage } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";

export type Memory = {
  id: string;
  title: string;
  content: string;
  description: string;
  date_of_memory: string;
  location: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  url: string;
}

const Memories = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [dateOfMemory, setDateOfMemory] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { data: memories = [], refetch } = useQuery<Memory[]>({
    queryKey: ["memories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("memories")
        .select("id, title, content, description, date_of_memory, location, is_public, created_at, updated_at, url")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!file || !title || !content || !dateOfMemory) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios e selecione uma imagem",
      });
      return;
    }

    try {
      setUploading(true);
      
      console.log('Iniciando upload da imagem...');
      
      // Upload da imagem
      const { filePath, publicUrl } = await uploadMemoryImage(file);
      
      console.log('Imagem enviada com sucesso:', { filePath, publicUrl });
      console.log('Salvando dados na tabela memories...');

      // Criar o registro da memória
      const { error: dbError } = await supabase
        .from("memories")
        .insert({
          title,
          content,
          description: content, // Usando o mesmo conteúdo para description
          date_of_memory: dateOfMemory,
          location,
          is_public: true,
          url: publicUrl,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (dbError) {
        console.error('Erro ao salvar na tabela:', dbError);
        throw dbError;
      }

      console.log('Memória salva com sucesso!');

      toast({
        title: "Sucesso",
        description: "Memória criada com sucesso!",
      });

      // Limpar o formulário
      setTitle("");
      setContent("");
      setLocation("");
      setDateOfMemory("");
      setFile(null);
      refetch();
    } catch (error: any) {
      console.error("Erro detalhado ao criar memória:", {
        error,
        message: error.message,
        code: error.code,
        details: error.details
      });
      
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || "Erro ao criar memória. Tente novamente.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif">Minhas Memórias</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Adicionar Memória</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogTitle className="font-serif text-2xl mb-6">Adicionar Nova Memória</DialogTitle>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Digite o título da memória"
                />
              </div>
              <div>
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Conte sua história..."
                  className="h-32"
                />
              </div>
              <div>
                <Label htmlFor="date">Data da Memória</Label>
                <Input
                  id="date"
                  type="date"
                  value={dateOfMemory}
                  onChange={(e) => setDateOfMemory(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="location">Localização</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Onde aconteceu?"
                />
              </div>
              <div>
                <Label htmlFor="image">Imagem</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  disabled={uploading}
                />
              </div>
              <Button type="submit" disabled={uploading} className="w-full">
                {uploading ? "Enviando..." : "Salvar Memória"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {memories.map((memory) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Dialog>
              <DialogTrigger asChild>
                <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                  {memory.url && (
                    <AspectRatio ratio={4/3}>
                      <img
                        src={memory.url}
                        alt={memory.title}
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                  )}
                  <div className="p-4">
                    <h3 className="font-serif text-xl mb-2">{memory.title}</h3>
                    <p className="text-gray-600 line-clamp-2">{memory.content}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>{new Date(memory.date_of_memory).toLocaleDateString()}</p>
                      {memory.location && <p>{memory.location}</p>}
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogTitle className="font-serif text-2xl mb-6">{memory.title}</DialogTitle>
                <div className="space-y-4">
                  {memory.url && (
                    <AspectRatio ratio={16/9}>
                      <img
                        src={memory.url}
                        alt={memory.title}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </AspectRatio>
                  )}
                  <ScrollArea className="h-[200px]">
                    <p className="text-gray-600 whitespace-pre-wrap">{memory.content}</p>
                    <div className="mt-4 text-sm text-gray-500">
                      <p>Data: {new Date(memory.date_of_memory).toLocaleDateString()}</p>
                      {memory.location && <p>Local: {memory.location}</p>}
                    </div>
                  </ScrollArea>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Memories;
