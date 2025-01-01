import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface Message {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

const GuestBook = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState({ name: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setIsFetching(true);
      console.log("Fetching messages...");
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching messages:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar as mensagens.",
          variant: "destructive"
        });
        return;
      }
      
      console.log("Messages fetched:", data);
      setMessages(data || []);
    } catch (error) {
      console.error('Error in fetchMessages:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao carregar as mensagens.",
        variant: "destructive"
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.name || !newMessage.message) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log("Inserting new message:", newMessage);
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            name: newMessage.name,
            message: newMessage.message,
          }
        ]);

      if (error) {
        console.error('Error inserting message:', error);
        throw error;
      }

      setNewMessage({ name: "", message: "" });
      toast({
        title: "Mensagem enviada",
        description: "Obrigado por compartilhar suas memórias."
      });
      await fetchMessages();
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar sua mensagem.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16 px-6 relative min-h-screen"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: 'url("https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg")' }}
      />
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-memorial-dark mb-8 tracking-tight text-center">
          Livro de Condolências
        </h2>
        <div className="w-24 h-1 bg-memorial-dark/20 mx-auto mb-12"></div>
        
        <Card className="p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Seu nome"
              value={newMessage.name}
              onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
              className="w-full"
              disabled={isLoading}
              required
            />
            <Textarea
              placeholder="Sua mensagem"
              value={newMessage.message}
              onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
              className="w-full"
              disabled={isLoading}
              required
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </form>
        </Card>
        
        {isFetching ? (
          <div className="text-center py-8">Carregando mensagens...</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8">Nenhuma mensagem ainda. Seja o primeiro a compartilhar suas memórias.</div>
        ) : (
          <div className="space-y-6">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6">
                  <p className="text-memorial-dark mb-4">{msg.message}</p>
                  <div className="flex justify-between text-sm text-memorial-primary">
                    <span>{msg.name}</span>
                    <span>{new Date(msg.created_at).toLocaleDateString()}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default GuestBook;