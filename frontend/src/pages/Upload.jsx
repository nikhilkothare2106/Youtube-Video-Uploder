import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { CloudUpload, Description, Publish, Title, Visibility } from "@mui/icons-material";
import React from "react";

function Upload() {
  return (
    <div>
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            marginTop: 5,
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" gutterBottom align="center" fontWeight={"bold"}>
            Upload Here
          </Typography>
          <Typography align="center">
            Please upload your video file in MP4 format with a maximum size of 50MB.
          </Typography>

          <Box display="flex" flexDirection={"column"} marginTop={3} gap={3}>
            <TextField
              label={"Video Title"}
              variant="outlined"
              fullWidth
              slotProps={{
                input: {
                  startadornment: (
                    <InputAdornment position="start">
                      <Title color="primary" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label={"Video Description"}
              variant="outlined"
              fullWidth
              multiline
              slotProps={{
                input: {
                  startadornment: (
                    <InputAdornment position="start">
                      <Description color="primary" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Box display={"flex"} alignContent={"center"} justifyContent={"center"}>
              <input
                type="file"
                accept="video/"
                id="video-upload"
                style={{ display: "none" }}
                onChange={() => {}}
              />

              <label htmlFor="video-upload">
                <Button
                  variant="contained"
                  component="span"
                  color="secondary"
                  startIcon={<CloudUpload />}
                >
                  Upload Video Here
                </Button>
              </label>
            </Box>

            <FormControl fullWidth>
              <InputLabel>Visibility</InputLabel>
              <Select
                label="Visibility"
                slotProps={{
                  input: {
                    startadornment: (
                      <InputAdornment position="start">
                        <Visibility color="primary" />
                      </InputAdornment>
                    ),
                  },
                }}
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="unlisted">Unlisted</MenuItem>
                <MenuItem value="private">Private</MenuItem>
              </Select>
            </FormControl>

            <Box display={"flex"} justifyContent={"center"}>
              <Button variant="contained" color="primary" startIcon={<Publish />}>
                Publish
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default Upload;
