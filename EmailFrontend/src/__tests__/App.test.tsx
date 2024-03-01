// src/__ tests __/App.test.tsx

import { render } from "@testing-library/react"
import App from "../App"
import '@testing-library/jest-dom'

jest.mock('react-quill/dist/quill.snow.css', () => {
    return {
      __esModule: true,
      default: '',
    };
  });
  
test("Renders the main page", () => {
    render(<App />)
    expect(true).toBeTruthy()
})