"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async () => {
    if (!selectedImage) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      setLoading(true);
      const response = await fetch("/api/calculate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Response status:", response);
      const data = await response.json();
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
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
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Card
        sx={{
          margin: "auto",
          width: 600,
          height: 600,
          px: 2,
          py: 1,
        }}
      >
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
            {loading && (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <CircularProgress color="primary" />
              </Box>
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
                disabled={loading}
              />
              Upload Image
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={handleSubmit}
              disabled={loading}
            >
              Submit
            </Button>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{ marginTop: 2 }}
            disabled={loading}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
