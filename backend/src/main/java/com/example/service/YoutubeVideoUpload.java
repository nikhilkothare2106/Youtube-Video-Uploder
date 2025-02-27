package com.example.service;

import com.google.api.client.http.*;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class YoutubeVideoUpload {
    private static final String UPLOAD_URL =
            "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status";

    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    private static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();

    public String uploadVideo(String title, String desc, String visibility, MultipartFile videoFile, String accessToken) throws IOException {
        HttpRequestFactory requestFactory = HTTP_TRANSPORT.createRequestFactory();

        // Metadata JSON
        String metaData = "{\n" +
                "  \"snippet\": {\n" +
                "    \"title\": \"" + title + "\",\n" +
                "    \"description\": \"" + desc + "\",\n" +
                "    \"tags\": [\"nikhil\", \"video\", \"upload video\"],\n" +
                "    \"categoryId\": \"22\"\n" +  // FIXED: Category ID should be a string
                "  },\n" +
                "  \"status\": {\n" +
                "    \"privacyStatus\": \"" + visibility + "\",\n" +
                "    \"embeddable\": true,\n" +
                "    \"license\": \"youtube\"\n" +
                "  }\n" +
                "}";

        // Step 1: Create metadata request
        HttpRequest request = requestFactory.buildPostRequest(
                new GenericUrl(UPLOAD_URL),
                ByteArrayContent.fromString("application/json", metaData)
        );

        request.getHeaders().setAuthorization("Bearer " + accessToken);
        request.getHeaders().setContentType("application/json");

        HttpResponse response = request.execute();

        // Step 2: Get upload URL from response
        String videoUploadUrl = response.getHeaders().getLocation();

        // Step 3: Upload video file
        HttpRequest uploadRequest = requestFactory.buildPutRequest(
                new GenericUrl(videoUploadUrl),
                new InputStreamContent("video/mp4", videoFile.getInputStream())
        );

        uploadRequest.getHeaders().setAuthorization("Bearer " + accessToken);
        uploadRequest.getHeaders().setContentType("video/mp4");
        uploadRequest.getHeaders().setContentLength(videoFile.getSize()); // FIXED: Add Content-Length

        HttpResponse uploadResponse = uploadRequest.execute();

        return "Upload Successfully!";
    }
}
