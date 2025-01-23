import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-[100vh] w-full overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("/img/herosection.jpg")',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4 sm:px-6 md:px-8 pt-20">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-white/80 overflow-hidden mb-8 shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
            alt="Benedito Antônio Carneiro Rodrigues"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            Benedito Antônio Carneiro Rodrigues
          </h1>
          <p className="text-xl sm:text-2xl opacity-90 font-light">
            04 de julho de 1966 - 12 de agosto de 2024
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;