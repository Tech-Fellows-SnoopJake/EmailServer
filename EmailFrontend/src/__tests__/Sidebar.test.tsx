import { render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { toHaveAttribute } from "@testing-library/jest-dom/matchers"; // Import the matcher
import Sidebar from "../components/Sidebar/Sidebar";
expect.extend({ toHaveAttribute });
describe("Sidebar component", () => {
      // ... (pruebas unitarias para Sidebar sin depender de la ruta)
  
    test("should render links with correct URLs", () => {
      render(
        <Router>
          <Sidebar setListType={function (): void {
            throw new Error("Function not implemented.");
          } } />
        </Router>
      );
  
      // Comprueba los enlaces y sus URLs esperadas
      expect(screen.getByText("Compose Email")).toHaveAttribute("href", "/compose");
      // ... otras comprobaciones de enlaces y URLs
    });
    
  });