import { render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { toHaveAttribute } from "@testing-library/jest-dom/matchers"; // Import the matcher
import Sidebar from "../components/Sidebar/Sidebar";
import { SetStateAction } from "react";
expect.extend({ toHaveAttribute });
describe("Sidebar component", () => {
      // ... (pruebas unitarias para Sidebar sin depender de la ruta)
  
    test("should render links with correct URLs", () => {
      render(
        <Router>
          <Sidebar setListType={function (value: SetStateAction<string>): void {
            throw new Error("Function not implemented.");
          } } />
        </Router>
      );
  
      // Comprueba los enlaces y sus URLs esperadas
      expect(screen.getByText("Compose Email")).toHaveAttribute("href", "/compose");
      expect(screen.getByText("Inbox")).toHaveAttribute("href", "/inbox");
      expect(screen.getByText("Sent")).toHaveAttribute("href", "/sent");
      expect(screen.getByText("Drafts")).toHaveAttribute("href", "/drafts");
      // ... otras comprobaciones de enlaces y URLs
    });
    
  });