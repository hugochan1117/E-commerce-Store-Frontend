import { Box } from "@mui/material";
import type { ProductImageList } from "../../../data/ProductDtoByPid.type.ts";
import { useState } from "react";

interface Props {
  images: ProductImageList[];
}

export default function ProductGallery({ images }: Props) {
  const [selectedPhoto, setSelectedPhoto] = useState<ProductImageList>(images[0]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", pr: 2 }}>


      {/* Gallery layout: thumbnails left, main image right */}
      <Box sx={{ display: "flex", height: 500, alignItems: "flex-start" }}>
        {/* Vertical thumbnails */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            mr: 2,
            overflowY: "auto",
            maxHeight: 500,
          }}
        >
          {images.map((img, idx) => (
            <Box
              key={idx}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                boxShadow: selectedPhoto === img ? 3 : 1, // subtle highlight instead of border
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 4,
                },
              }}
              onClick={() => setSelectedPhoto(img)}
            >
              <img
                src={img.imageUrl}
                alt={`Thumbnail ${idx}`}
                style={{
                  height: 90,
                  width: 90,
                  objectFit: "cover",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Main image box */}
        {/* Main image box */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",   // keep it horizontally centered
            alignItems: "flex-start",   // stick to the top instead of center
            borderRadius: 3,
            overflow: "hidden",
            bgColor: "whitesmoke",
            height: 500,
          }}
        >
          <img
            src={selectedPhoto.imageUrl}
            alt="Selected product"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
              borderRadius: "12px",
              transition: "opacity 0.3s ease",
            }}
          />
        </Box>

      </Box>
    </Box>
  );
}
