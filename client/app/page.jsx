import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
} from "@mui/material";

export default function Home() {
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
          />
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
