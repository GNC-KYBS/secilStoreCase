"use client";

import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import useCollectionStore from "@/store/collectionStore";

interface Props {
  collectionId: string;
}

export default function CollectionEdit({ collectionId }: Props) {
  const { collections, selectedCollection, selectCollection } =
    useCollectionStore();

  // Component mount -> store'dan selectedCollection seç
  useEffect(() => {
    if (!selectedCollection) {
      const collection = collections.find(
        (c) => c.id.toString() === collectionId
      );
      if (collection) selectCollection(collection);
    }
  }, [collectionId, collections, selectedCollection]);

  if (!selectedCollection) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
        gap: 2,
        p: 2,
        overflow: "hidden",
      }}
    >
      {/* Sol Panel */}
      <Box
        sx={{
          flex: 1, // Eski: 1, değişmedi
          bgcolor: "#f5f5f5",
          p: 2,
          overflowY: "auto",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">Koleksiyon Ürünleri</Typography>
      </Box>

      {/* Sağ Panel */}
      <Box
        sx={{
          flex: 1,
          bgcolor: "#f5f5f5",
          p: 2,
          overflowY: "auto",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">Filtreler</Typography>

        {selectedCollection.products?.map((product) => (
          <ProductCard
            key={product.productCode}
            id={product.productCode}
            name={product.name}
            image={product.imageUrl}
          />
        ))}
      </Box>
    </Box>
  );
}
