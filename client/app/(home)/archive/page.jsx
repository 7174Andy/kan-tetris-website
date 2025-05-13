"use client";

import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import { useEffect, useState } from "react";

export default function ArchivePage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch("/api/game", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        const data = await response.json();
        setGames(data || []);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  return (
    <>
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      )}
      {!loading && games.length === 0 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Typography variant="h6">No games found</Typography>
        </Box>
      )}
      {!loading && games.length > 0 && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={4}
          sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Game Archive
          </Typography>

          {games.map((game, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                padding: 3,
                margin: 2,
                width: "100%",
                maxWidth: 500,
                borderRadius: 3,
                backgroundColor: "#fff",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Date: {new Date(game.createdAt).toLocaleDateString()}
              </Typography>
              <Box
                component="img"
                src={`data:image/png;base64,${game.image}`}
                alt={`Game ${index + 1}`}
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 2,
                  mb: 2,
                }}
              />
              <Typography variant="h6" gutterBottom>
                Ranking:
              </Typography>
              {game.ranking.map((rank, rankIndex) => (
                <Typography key={rankIndex} variant="body1">
                  {rankIndex + 1}. {rank.playerID}
                </Typography>
              ))}
            </Paper>
          ))}
        </Box>
      )}
    </>
  );
}
