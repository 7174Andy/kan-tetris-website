"use client";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin");
    if (!isAdmin) {
      alert("You are not authorized to view this page.");
      router.push("/admin");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    router.push("/admin");
  };

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card sx={{ maxWidth: 400, margin: "auto" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Admin Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome to the admin dashboard!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{ marginTop: 2 }}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
