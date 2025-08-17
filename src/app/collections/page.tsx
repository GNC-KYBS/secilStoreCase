"use client";
import React, { useEffect } from "react";
import BasicTable from "@/components/Table";
import useCollectionStore from "@/store/collectionStore";

export default function CollectionsPage() {
  const { fetchCollections } = useCollectionStore();

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);
  return (
    <div>
      <h1>Collections</h1>
      <BasicTable />
    </div>
  );
}
