import React, { useEffect, useState, useMemo, useCallback } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getAllMessages,
  deleteMessageById,
} from "../../store/user/messageThunk";
import SpanLoader from "../../components/SpanLoader";
import SearchBar from "../../components/SearchBar";
import CustomNoRowsOverlay from "../../components/TableNoRowsOverlay";
import DeleteConfirmationDialog from "../../components/DeleteDialogBox";
import toaster from "../../utils/toaster";
import { MessageType } from "../../types/message.types";

interface GridMessage extends MessageType {
  displayId: number;
}

const EmailMessages: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    message: messages,
    isLoading,
    error,
  } = useAppSelector((state) => state.messageSlice);

  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);

  const filteredMessages = useMemo<GridMessage[]>(() => {
    if (!messages || !Array.isArray(messages) || messages.length === 0)
      return [];
    const lowerQuery = searchQuery.toLowerCase();

    return messages
      .map((msg, idx) => {
        if (!msg || !msg.id) return null;

        return {
          id: msg.id,
          fullName: msg.fullName || "",
          email: msg.email || "",
          message: msg.message || "",
          createdAt: msg.createdAt ?? "",
          displayId: idx + 1,
        };
      })
      .filter((msg): msg is GridMessage => msg !== null)
      .filter((msg) =>
        [msg.fullName, msg.email, msg.message].some((field) =>
          field?.toLowerCase().includes(lowerQuery)
        )
      );
  }, [messages, searchQuery]);

  const handleDeleteClick = useCallback((id: string) => {
    setMessageToDelete(id);
    setDeleteDialogOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (!messageToDelete) return;
    dispatch(deleteMessageById(messageToDelete))
      .unwrap()
      .then(() => {
        setDeleteDialogOpen(false);
        setMessageToDelete(null);
        dispatch(getAllMessages());
      })
      .catch(() => {
        toaster.error("Failed to delete message.");
      });
  }, [messageToDelete, dispatch]);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "displayId", headerName: "ID", width: 80 },
      { field: "fullName", headerName: "Full Name", width: 150 },
      { field: "email", headerName: "Email", width: 180 },
      {
        field: "createdAt",
        headerName: "Date & Time",
        width: 220,
      },
      { field: "message", headerName: "Message", flex: 1, minWidth: 300 },

      {
        field: "actions",
        headerName: "Actions",
        width: 100,
        sortable: false,
        filterable: false,
        renderCell: (params: GridRenderCellParams<GridMessage>) => (
          <IconButton onClick={() => handleDeleteClick(params.row.id)}>
            <Delete sx={{ color: "red" }} />
          </IconButton>
        ),
      },
    ],
    [handleDeleteClick]
  );

  if (isLoading) {
    return <SpanLoader />;
  }

  if (error) {
    return (
      <Box
        sx={{
          height: "80vh",
          ml: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "80vh", ml: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 3,
          mt: 10,
          mb: 2,
        }}
      >
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          placeholder="Search Messages..."
          isMobile={isMobile}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "95%",
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 2, mt: 2, color: theme.palette.primary.main, width: "95%" }}
        >
          Inbox Messages
        </Typography>

        <Box sx={{ height: 500, width: "100%", p: 3 }}>
          <DataGrid
            rows={filteredMessages}
            columns={columns}
            getRowId={(row) => row.id || `invalid-${Math.random()}`}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
            pageSizeOptions={[5, 10, 25, 50, 100]}
            slots={{
              noRowsOverlay: () => (
                <CustomNoRowsOverlay message="No messages available" />
              ),
            }}
            sx={{
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: theme.table.backgroundColor,
                color: theme.table.color,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.table.backgroundColor,
                color: theme.table.color,
              },
            }}
          />
        </Box>

        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
        />
      </Box>
    </Box>
  );
};

export default EmailMessages;
