import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className="text-gray-600 body-font bg-white shadow-lg">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center bg-white shadow-lg">
    <p className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      
      <span className="ml-3 text-xl font-bold">Pokemon</span>
    </p>
   
   
  </div>
</header>
  );
};

export default Navbar;