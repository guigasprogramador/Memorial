const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 text-center text-sm">
        <p>© {new Date().getFullYear()} Direitos Reservados a Guigas Developer</p>
      </div>
    </footer>
  );
};

export default Footer;
