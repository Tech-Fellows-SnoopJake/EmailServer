import { render, fireEvent, waitFor } from "@testing-library/react";
import Register from "../components/Register/Register";
import fetchMock from "jest-fetch-mock";

beforeAll(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

describe("Register component", () => {
  test("allows user to input username, email, and password", () => {
    const { getByLabelText } = render(<Register />);
    const usernameInput = getByLabelText("Username") as HTMLInputElement;
    const emailInput = getByLabelText("Email") as HTMLInputElement;
    const passwordInput = getByLabelText("Password") as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(usernameInput.value).toBe("testuser");
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });
  test("submits registration form correctly", async () => {
    const mockResponse = { token: "mockToken" };
    const response = {
      ok: true,
      json: async () => mockResponse,
    } as Response;

    fetchMock.mockResolvedValueOnce(response);

    const { getByLabelText, getByText } = render(<Register />);
    const usernameInput = getByLabelText("Username");
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const registerButton = getByText("Create account");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith("/api/login", {
        // Ajusta la URL esperada aquí
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "testuser",
          email: "test@example.com",
          password: "password123",
        }),
      });
    });
  });
  test("handles registration errors correctly", async () => {
    // Simular una respuesta de error de la API
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 401 });
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    const { getByLabelText, getByText } = render(<Register />);
    const usernameInput = getByLabelText("Username");
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const registerButton = getByText("Create account");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "testuser",
          email: "test@example.com",
          password: "password123",
        }),
      });
    });

    // Verificar si se mostró correctamente el mensaje de error
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error de registro:",
        "Unauthorized"
      );
    });
    consoleErrorSpy.mockRestore();
  });
  ///sql inyeccion
});
