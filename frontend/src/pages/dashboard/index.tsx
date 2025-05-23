import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import AdminDashboard from "./adminDashboard";
import UserDashboard from "./userDashboard";
import { checkUserRole } from "../../store/user/authThunk";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserRole());
  }, [dispatch]);

  const isSuperUser = useAppSelector((state) => state.userSlice.isSuperUser);
  return isSuperUser ? <AdminDashboard /> : <UserDashboard />;
};

export default Dashboard;
