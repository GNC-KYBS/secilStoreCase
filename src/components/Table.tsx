"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useCollectionStore from "@/store/collectionStore";
import { mapCollectionsToTable } from "@/utils/collectionMappers";
import { TableRowTypes } from "@/types/table";
import EditIcon from "@mui/icons-material/Edit";
import { CustomIconButton } from "./CustomIconButton";
import { useRouter } from "next/navigation";

export default function BasicTable() {
  const router = useRouter();
  const collections = useCollectionStore((state) => state.collections);

  const rows: TableRowTypes[] = mapCollectionsToTable(collections);

  const handleEdit = (row: TableRowTypes) => {
    // id ile doğrudan bul
    const collection = collections.find((c) => c.id === row.id);
    if (!collection) return;

    router.push(`/collections/edit/${collection.id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Başlık</TableCell>
            <TableCell align="center">Ürün Koşulları</TableCell>
            <TableCell align="center">Satış Kanalı</TableCell>
            <TableCell align="center">İşlemler</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.title}
              </TableCell>
              <TableCell align="center">
                {row.conditions.map((cond, i) => (
                  <div key={i}>{cond}</div>
                ))}
              </TableCell>
              <TableCell align="center">{row.salesChannel}</TableCell>
              <TableCell align="center">
                <CustomIconButton
                  onClick={() => handleEdit(row)}
                  icon={<EditIcon />}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
