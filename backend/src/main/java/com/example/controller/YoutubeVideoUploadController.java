package com.example.controller;

import com.example.service.YoutubeVideoUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/youtube/upload")
@CrossOrigin(origins = "http://localhost:5173")
public class YoutubeVideoUploadController {

    @Autowired
    private YoutubeVideoUpload videoUpload;

    @PostMapping
    public ResponseEntity<String> uploadVideo(

            @RequestParam("title") String title,
            @RequestParam("desc") String desc,
            @RequestParam("visibility") String visibility,
            @RequestParam("videoFile")
            MultipartFile videoFile,
            @RequestHeader("Authorization") String accessToken

    ) throws IOException {
        String response = videoUpload.uploadVideo(title, desc, visibility, videoFile, accessToken.replace("Bearer ", ""));
        return ResponseEntity.ok(response);

    }
}
