"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email ve şifre gerekli");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      if (result?.error) {
        setError("Giriş başarısız. Email veya şifre hatalı.");
      } else if (result?.ok) {
        router.push("/collections");
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f0f0f0",
        px: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 4,
          borderRadius: 2,
          maxWidth: 400,
          width: "100%",
          boxShadow: 3,
          bgcolor: "#fff",
        }}
      >
        <h1 style={{ marginBottom: 16, textAlign: "center" }}>Giriş Yap</h1>

        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}

        <TextField
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          disabled={loading}
        />

        <TextField
          id="password"
          label="Şifre"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          disabled={loading}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          fullWidth
          sx={{ height: 48 }}
        >
          {loading ? <CircularProgress size={24} /> : "Giriş Yap"}
        </Button>
      </Box>
    </Box>
  );
}
