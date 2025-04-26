"use client";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin");
    if (!isAdmin) {
      alert("You are not authorized to view this page.");
      router.push("/admin");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    router.push("/admin");
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      console.log("Selected image:", file);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Card sx={{ margin: "auto", width: 600, height: 600, px: 2, py: 1 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Admin Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome to the admin dashboard!
          </Typography>

          <Box
            sx={{
              border: "2px dashed",
              borderColor: "grey.400",
              borderRadius: 2,
              width: "100%",
              height: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 2,
              backgroundColor: "transparent",
              transition: "background-color 0.3s ease",
            }}
          >
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  borderRadius: 8,
                }}
              />
            ) : (
              <Typography color="textSecondary" align="center">
                Upload an image by clicking the button below.
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              component="label"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              Upload Image
            </Button>
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Submit
            </Button>
          </Box>
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
