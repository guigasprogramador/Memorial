import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const Memories = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-memorial-light py-16 px-6 relative"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: 'url("https://cdn.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567_1280.jpg")' }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-memorial-dark mb-8 tracking-tight text-center">
          Memórias & Momentos
        </h2>
        <div className="w-24 h-1 bg-memorial-dark/20 mx-auto mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Dialog>
            <DialogTrigger asChild>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="mb-4">
                  <AspectRatio ratio={16 / 9} className="bg-memorial-primary/20 rounded-md overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-memorial-primary">
                      Adicionar foto
                    </div>
                  </AspectRatio>
                </div>
                <h3 className="font-serif text-xl mb-4">Trabalho & Dedicação</h3>
                <p className="text-memorial-secondary">
                  Dedicou sua vida ao transporte de cargas, sempre com responsabilidade e comprometimento.
                </p>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh]">
              <DialogTitle className="font-serif text-2xl mb-6">Trabalho & Dedicação</DialogTitle>
              <ScrollArea className="h-[calc(90vh-8rem)] pr-4">
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <AspectRatio key={i} ratio={4 / 3} className="bg-memorial-primary/20 rounded-md overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-memorial-primary">
                          Adicionar foto {i}
                        </div>
                      </AspectRatio>
                    ))}
                  </div>
                  <p className="text-memorial-secondary text-lg leading-relaxed">
                    Benedito dedicou mais de três décadas ao transporte de cargas, construindo uma reputação sólida
                    baseada em sua responsabilidade e comprometimento. Começou sua jornada ainda jovem e, com muito
                    esforço, conseguiu conquistar seu próprio caminhão. Sua dedicação ao trabalho era admirável,
                    sempre cumprindo prazos e garantindo a segurança das cargas transportadas. Era conhecido por
                    sua pontualidade e profissionalismo, valores que transmitiu aos seus filhos.
                  </p>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="mb-4">
                  <AspectRatio ratio={16 / 9} className="bg-memorial-primary/20 rounded-md overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-memorial-primary">
                      Adicionar foto
                    </div>
                  </AspectRatio>
                </div>
                <h3 className="font-serif text-xl mb-4">Momentos de Lazer</h3>
                <p className="text-memorial-secondary">
                  Seu passatempo favorito era jogar baralho com os amigos, momentos de alegria e descontração.
                </p>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh]">
              <DialogTitle className="font-serif text-2xl mb-6">Momentos de Lazer</DialogTitle>
              <ScrollArea className="h-[calc(90vh-8rem)] pr-4">
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <AspectRatio key={i} ratio={4 / 3} className="bg-memorial-primary/20 rounded-md overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-memorial-primary">
                          Adicionar foto {i}
                        </div>
                      </AspectRatio>
                    ))}
                  </div>
                  <p className="text-memorial-secondary text-lg leading-relaxed">
                    Nos momentos de descanso, Benedito encontrava grande prazer em reunir os amigos para
                    jogar baralho. Essas reuniões eram mais do que simples jogos - eram momentos de
                    verdadeira amizade, risadas e histórias compartilhadas. Sua casa frequentemente se
                    tornava ponto de encontro, onde a alegria e a descontração reinavam. Esses momentos
                    especiais criaram memórias preciosas que seus amigos guardarão para sempre.
                  </p>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="mb-4">
                  <AspectRatio ratio={16 / 9} className="bg-memorial-primary/20 rounded-md overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-memorial-primary">
                      Adicionar foto
                    </div>
                  </AspectRatio>
                </div>
                <h3 className="font-serif text-xl mb-4">Amor pelo lazer</h3>
                <p className="text-memorial-secondary">
                  Sua família sempre foi sua maior prioridade, deixando um legado de amor e união.
                </p>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh]">
              <DialogTitle className="font-serif text-2xl mb-6">Amor pela Família</DialogTitle>
              <ScrollArea className="h-[calc(90vh-8rem)] pr-4">
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <AspectRatio key={i} ratio={4 / 3} className="bg-memorial-primary/20 rounded-md overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-memorial-primary">
                          Adicionar foto {i}
                        </div>
                      </AspectRatio>
                    ))}
                  </div>
                  <p className="text-memorial-secondary text-lg leading-relaxed">
                    A família era o verdadeiro tesouro de Benedito. Pai dedicado de seis filhos - Guilherme,
                    os gêmeos Magno e Michael, Alan, Vitória e João Vitor - ele sempre se esforçou para
                    proporcionar o melhor para cada um deles. Sua união de 25 anos com Maria Ivone Saraiva
                    foi marcada por muito amor e companheirismo. Mesmo após a separação, manteve o carinho
                    e o respeito. Seu maior legado foi ensinar aos filhos a importância do trabalho honesto,
                    da união familiar e do amor incondicional.
                  </p>
                </div>
              </ScrollArea>
            </DialogContent><Dialog>
            <DialogTrigger asChild>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="mb-4">
                  <AspectRatio ratio={16 / 9} className="bg-memorial-primary/20 rounded-md overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-memorial-primary">
                      Adicionar foto
                    </div>
                  </AspectRatio>
                </div>
                <h3 className="font-serif text-xl mb-4">Amor pela Família</h3>
                <p className="text-memorial-secondary">
                  Sua família sempre foi sua maior prioridade, deixando um legado de amor e união.
                </p>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh]">
              <DialogTitle className="font-serif text-2xl mb-6">Amor pela Família</DialogTitle>
              <ScrollArea className="h-[calc(90vh-8rem)] pr-4">
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <AspectRatio key={i} ratio={4 / 3} className="bg-memorial-primary/20 rounded-md overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-memorial-primary">
                          Adicionar foto {i}
                        </div>
                      </AspectRatio>
                    ))}
                  </div>
                  <p className="text-memorial-secondary text-lg leading-relaxed">
                    A família era o verdadeiro tesouro de Benedito. Pai dedicado de seis filhos - Guilherme,
                    os gêmeos Magno e Michael, Alan, Vitória e João Vitor - ele sempre se esforçou para
                    proporcionar o melhor para cada um deles. Sua união de 25 anos com Maria Ivone Saraiva
                    foi marcada por muito amor e companheirismo. Mesmo após a separação, manteve o carinho
                    e o respeito. Seu maior legado foi ensinar aos filhos a importância do trabalho honesto,
                    da união familiar e do amor incondicional.
                  </p>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
          </Dialog>
          
        </div>
      </div>
    </motion.section>
  );
};

export default Memories;
