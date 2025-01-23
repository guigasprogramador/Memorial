import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

interface Audio {
  id: number;
  title: string;
  description: string;
  url: string;
  created_at: string;
}

const Audios = () => {
  const [audios, setAudios] = useState<Audio[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchAudios();
  }, []);

  const fetchAudios = async () => {
    try {
      const { data, error } = await supabase
        .from('audios')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAudios(data || []);
    } catch (error) {
      console.error('Error fetching audios:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os áudios.",
        variant: "destructive"
      });
    }
  };

  return (
    <section className="py-16 bg-white/50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif text-memorial-dark mb-8 text-center">Áudios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {audios.map((audio) => (
            <div
              key={audio.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-medium text-memorial-dark mb-2">{audio.title}</h3>
              <p className="text-memorial-primary mb-4">{audio.description}</p>
              <audio controls className="w-full">
                <source src={audio.url} type="audio/mpeg" />
                Seu navegador não suporta o elemento de áudio.
              </audio>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Audios;