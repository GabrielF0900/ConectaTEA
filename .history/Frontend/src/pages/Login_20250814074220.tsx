import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Senha:", password);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
            style={{
              display: "block",
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.5rem"
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password">Senha:</label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
              style={{
                flex: 1,
                padding: "0.5rem",
                marginTop: "0.5rem"
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                padding: "0.5rem 1rem",
                marginTop: "0.5rem",
                cursor: "pointer"
              }}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.7rem",
            cursor: "pointer",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px"
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
