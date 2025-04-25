"use client";

import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useState } from "react";

// import password from .env
const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD;

export default function Home() {
  const [password, setPassword] = useState("");

  // Example leaderboard data
  const leaderboard = [
    { name: "Alice", score: 1500, gameID: "game_01" },
    { name: "Bob", score: 1200, gameID: "game_02" },
    { name: "Charlie", score: 900, gameID: "game_03" },
  ];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      p={2}
    >
      <Card sx={{ width: "100%", maxWidth: 600, p: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Leaderboard
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Game ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map((player, index) => (
                  <TableRow key={index}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.score}</TableCell>
                    <TableCell>{player.gameID}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
