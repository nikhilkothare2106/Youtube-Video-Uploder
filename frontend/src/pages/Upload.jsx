import {
  Alert,
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
import React, { useState } from "react";
import { useAuth } from "../helper/AuthContext";
import { toast } from "react-hot-toast";

import axios from "axios";
function Upload() {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [visibility, setVisibility] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function changeValue(event) {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "title") {
      setTitle(value);
    } else if (name === "desc") {
      setDesc(value);
    } else if (name === "visibility") {
      setVisibility(value);
    }
  }

  function fileBoxChanged(event) {
    setVideoFile(event.target.files[0]);
  }

  async function submitForm(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const videoUploadUrl = "http://localhost:8080/api/v1/youtube/upload";

      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("visibility", visibility);
      formData.append("videoFile", videoFile);
      const response = await axios.post(videoUploadUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Video Uploaded Successfully!");
      toast.success("Upload Success");
      console.log(response);
    } catch (error) {
      toast.error("Upload error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <Container maxWidth="md">
        {message && (
          <Alert sx={{ width: "100%", marginTop: 5 }} marg>
            {message}
          </Alert>
        )}
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
              onChange={changeValue}
              name="title"
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
              onChange={changeValue}
              name="desc"
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

            <Box
              display={"flex"}
              flexDirection={"row"}
              alignContent={"center"}
              justifyContent={"space-between"}
            >
              <input
                onChange={fileBoxChanged}
                type="file"
                accept="video/"
                id="video-upload"
                style={{ display: "none" }}
              />

              <label htmlFor="video-upload">
                <Button
                  variant="contained"
                  component="span"
                  color="secondary"
                  startIcon={<CloudUpload />}
                >
                  Select File
                </Button>
              </label>
              <Typography>{videoFile.name}</Typography>
            </Box>

            <FormControl fullWidth>
              <InputLabel>Visibility</InputLabel>
              <Select
                onChange={changeValue}
                name="visibility"
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
              <Button
                loading={loading}
                loadingPosition="start"
                disabled={loading}
                onClick={submitForm}
                variant="contained"
                color="primary"
                startIcon={<Publish />}
              >
                {loading ? "Uploading" : "Publish"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default Upload;
