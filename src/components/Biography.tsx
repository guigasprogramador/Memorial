import { motion } from "framer-motion";

const Biography = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative min-h-[80vh] px-6 py-16"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: 'url("https://cdn.pixabay.com/photo/2017/10/10/07/48/hills-2836301_1280.jpg")' }}
      />
      <div className="relative z-10 max-w-5xl mx-auto bg-white/80 backdrop-blur-sm px-8 py-12 rounded-lg shadow-lg text-center">
        {/* Título Principal */}
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-memorial-dark mb-8 tracking-tight">
          Em Memória
        </h2>

        {/* Subtítulo decorativo */}
        <div className="w-24 h-1 bg-memorial-dark/20 mx-auto mb-12"></div>

        {/* Introdução */}
        <p className="text-xl md:text-2xl leading-relaxed text-memorial-dark mb-12 max-w-3xl mx-auto">
          Benedito foi um homem extraordinário, conhecido por sua bondade e dedicação ao trabalho.
          Sua maior alegria estava em sua família, e seu legado de força de vontade e determinação
          continuará inspirando a todos que o conheceram.
        </p>

        {/* Família e Filhos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-3xl mx-auto">
          {/* Seção Família */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-memorial-dark tracking-tight">Família</h3>
            <ul className="space-y-4 text-lg text-gray-700">
              <li><strong>Pais:</strong> Alzira Carneiro e José Rodrigues Neto</li>
              <li><strong>Ex-esposa:</strong> Maria Ivone Saraiva (25 anos de união)</li>
            </ul>
          </div>

          {/* Seção Filhos */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-memorial-dark tracking-tight">Filhos</h3>
            <ul className="space-y-4 text-lg text-gray-700">
              <li>Guilherme Saraiva Rodrigues</li>
              <li>Magno Saraiva Rodrigues</li>
              <li>Michael Saraiva Rodrigues</li>
              <li>Alan Saraiva Rodrigues</li>
              <li>Vitória Saraiva Rodrigues</li>
              <li>João Vitor Saraiva Rodrigues</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Biography;
