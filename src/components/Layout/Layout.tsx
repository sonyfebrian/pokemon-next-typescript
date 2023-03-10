import { FC } from "react";

import Navbar from "../Navbar";


interface LayoutProps {
  children: React.ReactNode;
  pokeView?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, pokeView }) => {
  return (
    <div >
      <header>
        <Navbar />
      </header>

      <main
        
      >
        {children}
      </main>

      
    </div>
  );
};

export default Layout;
