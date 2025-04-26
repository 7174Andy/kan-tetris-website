"use client";

import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handlePasswordChange = (event) => {
    setError("");
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (password === "") {
      setError("Password cannot be empty");
      return;
    }
    try {
      fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Incorrect password");
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            alert("Password is correct!");
            router.push("/admin/dashboard");
          } else {
            setError(data.message || "Incorrect password");
          }
        });
    } catch (error) {
      setError("An error occurred: " + error.message);
      setError("Something went wrong. Please try again.");
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Card sx={{ minWidth: 300, p: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Enter Password
          </Typography>
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            onChange={handlePasswordChange}
            error={!!error}
            helperText={error}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
