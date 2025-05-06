"use client";

import {
  Alert,
  Snackbar,
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
  const [previewURL, setPreviewURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "info",
  });

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
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewURL(newPreviewUrl);
      console.log("Preview URL:", previewURL);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      setSnack({
        open: true,
        message: "Please select an image to upload.",
        severity: "warning",
      });
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
      console.log("Response data from GPT:", data);

      const ranking = data.result.players;

      console.log("Ranking data:", ranking);

      if (!ranking || ranking.length === 0) {
        setSnack({
          open: true,
          message: "No ranking data found.",
          severity: "warning",
        });
        return;
      }

      const formDataGame = new FormData();
      formDataGame.append("image", selectedImage);
      formDataGame.append("ranking", JSON.stringify(ranking));
      const responseGame = await fetch("/api/game", {
        method: "POST",
        body: formDataGame,
      });

      if (!responseGame.ok) {
        throw new Error("Network response was not ok");
      }

      const dataGame = await responseGame.json();
      console.log("Response data from game:", dataGame);
      if (dataGame.success) {
        setSnack({
          open: true,
          message: "Image uploaded and game saved successfully!",
          severity: "success",
        });
      }
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
      setPreviewURL(null);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      setSnack({
        open: true,
        message: "Failed to upload image.",
        severity: "error",
      });
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
                src={previewURL}
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
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setSnack({ ...snack, open: false })}
          severity={snack.severity}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
