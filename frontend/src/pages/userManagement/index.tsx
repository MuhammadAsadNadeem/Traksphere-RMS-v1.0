import React, { useEffect, useState, useCallback, useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Typography,
  // Paper,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import DeleteConfirmationDialog from "../../components/DeleteDialogBox";
import UserForm from "../../components/forms/UserForm";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getAllUsers,
  deleteUserById,
  editUserById,
} from "../../store/user/adminThunk";
import { UserResponse } from "../../types/admin.types";
import toaster from "../../utils/toaster";
import SearchBar from "../../components/SearchBar";
import SpanLoader from "../../components/SpanLoader";
import CustomNoRowsOverlay from "../../components/TableNoRowsOverlay";

const UserManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.adminSlice.allUsers);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllUsers({})).finally(() => setIsLoading(false));
  }, [dispatch]);

  const handleEditUser = useCallback((user: UserResponse) => {
    setSelectedUser(user);
    setOpenDialog(true);
  }, []);

  const handleDeleteUser = useCallback((userId: string) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (userToDelete) {
      dispatch(deleteUserById(userToDelete))
        .unwrap()
        .then(() => {
          toaster.success("User deleted successfully!");
          setDeleteDialogOpen(false);
          dispatch(getAllUsers({}));
        })
        .catch(() => {
          toaster.error("Failed to delete user.");
        });
    }
  }, [userToDelete, dispatch]);

  const handleUpdateUser = useCallback(() => {
    if (selectedUser) {
      dispatch(editUserById({ userId: selectedUser.id, values: selectedUser }))
        .unwrap()
        .then(() => {
          toaster.success("User updated successfully!");
          setOpenDialog(false);
          dispatch(getAllUsers({}));
        })
        .catch(() => {
          toaster.error("Failed to update user.");
        });
    }
  }, [selectedUser, dispatch]);

  const filteredUsers = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (users || [])
      .map((user, index) => ({
        ...user,
        displayId: index + 1,
      }))
      .filter(
        (user) =>
          (user.fullName?.toLowerCase() || "").includes(lowerCaseQuery) ||
          user.email.toLowerCase().includes(lowerCaseQuery) ||
          (user.phoneNumber?.toLowerCase() || "").includes(lowerCaseQuery) ||
          (user.registrationNumber?.toLowerCase() || "").includes(
            lowerCaseQuery
          )
      );
  }, [users, searchQuery]);
  const columns: GridColDef[] = useMemo(() => {
    const commonColumns: GridColDef[] = [
      { field: "displayId", headerName: "ID", width: 100 },
      { field: "fullName", headerName: "Full Name", width: 150 },
      { field: "email", headerName: "Email", width: 150 },
      { field: "phoneNumber", headerName: "Contact No", width: 130 },
    ];

    if (!isMobile) {
      commonColumns.push(
        {
          field: "registrationNumber",
          headerName: "Registration No",
          width: 130,
        },
        { field: "departmentName", headerName: "Department", width: 150 },
        { field: "routeNumber", headerName: "Route No", width: 120 },
        { field: "stopArea", headerName: "Stop Area", width: 150 }
      );
    }

    commonColumns.push({
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditUser(params.row)}>
            <Edit sx={{ color: theme.palette.primary.main }} />
          </IconButton>
          <IconButton onClick={() => handleDeleteUser(params.row.id)}>
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </>
      ),
    });

    return commonColumns;
  }, [handleEditUser, handleDeleteUser, isMobile, theme.palette.primary.main]);

  return (
    <Box sx={{ height: "80vh", ml: 2 }}>
      {isLoading ? (
        <SpanLoader />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              p: 3,
              mt: 10,
              mb: 2,
            }}
          >
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              placeholder="Search User..."
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
              sx={{
                mb: 2,
                mt: 2,
                color: theme.palette.primary.main,
                width: "95%",
              }}
            >
              Manage Users
            </Typography>
            <Box sx={{ height: 400, mt: 2, width: "100%", p: 3 }}>
              <DataGrid
                rows={filteredUsers}
                columns={columns}
                getRowId={(row) => row.id}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10, page: 0 } },
                }}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                slots={{
                  noRowsOverlay: () => (
                    <CustomNoRowsOverlay message="No User available" />
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
            <Dialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  fontSize: "20px",
                }}
              >
                Update User
              </DialogTitle>
              <UserForm
                selectedUser={selectedUser}
                onFieldChange={(field, value) =>
                  setSelectedUser((prev) =>
                    prev ? { ...prev, [field]: value } : prev
                  )
                }
              />
              <DialogActions
                sx={{ backgroundColor: theme.table.backgroundColor, p: "10px" }}
              >
                <Button
                  onClick={() => setOpenDialog(false)}
                  sx={{ color: theme.button.backgroundColor }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateUser}
                  sx={{
                    backgroundColor: theme.button.backgroundColor,
                    color: theme.button.color,
                    "&:hover": {
                      backgroundColor: theme.button.hoverBackgroundColor,
                    },
                  }}
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
            <DeleteConfirmationDialog
              open={deleteDialogOpen}
              onClose={() => setDeleteDialogOpen(false)}
              onConfirm={confirmDelete}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default UserManagement;
