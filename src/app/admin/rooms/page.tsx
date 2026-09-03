import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";
import type { Metadata } from "next";

import { formatDate, formatLabel } from "@/lib/formatters";
import { getAdminRooms } from "@/services/rooms.service";

export const metadata: Metadata = { title: "Rooms" };
export const dynamic = "force-dynamic";

export default async function AdminRoomsPage() {
  const rooms = await getAdminRooms();
  return (
    <>
      <Typography component="h1" variant="h4">Rooms</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>Read-only showcase and workspace inventory.</Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ boxShadow: "none" }}>
        <Table><TableHead><TableRow><TableCell>Room</TableCell><TableCell>Type</TableCell><TableCell>Status</TableCell><TableCell align="right">Capacity</TableCell><TableCell align="right">Available</TableCell><TableCell>Available from</TableCell></TableRow></TableHead>
          <TableBody>{rooms.map((room) => <TableRow key={room.id} hover><TableCell><Typography sx={{ fontWeight: 680 }}>{room.name}</Typography><Typography variant="caption" color="text.secondary">{room.code}</Typography></TableCell><TableCell>{formatLabel(room.roomType)}</TableCell><TableCell><Chip size="small" label={formatLabel(room.status)} /></TableCell><TableCell align="right">{room.capacity}</TableCell><TableCell align="right">{room.availableSeats}</TableCell><TableCell>{formatDate(room.availableFrom)}</TableCell></TableRow>)}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
