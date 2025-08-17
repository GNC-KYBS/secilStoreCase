"use client";

import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface Props {
  id: string;
  name: string;
  image: string;
}

export default function ProductCard({ id, name, image }: Props) {
  return (
    <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="subtitle1">{name}</Typography>
        <Typography variant="caption" color="text.secondary">
          ID: {id}
        </Typography>
      </CardContent>
    </Card>
  );
}
