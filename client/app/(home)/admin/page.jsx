"use client";

import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  InputAdornment,
  TextField,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
    } finally {
      setLoading(false);
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
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                type: showPassword ? "text" : "password",
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
