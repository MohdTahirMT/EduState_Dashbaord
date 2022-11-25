import { useEffect, useState } from "react";
import {
  fetchAllAdminAPI,
  deleteAdminAPI,
  fetchAdminByIdAPI,
} from "services/API";
import moment from "moment/moment";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Images
import team2 from "assets/images/team-2.jpg";

function Admin() {
  const [adminData, setAdminData] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [sbDelete, setSbDelete] = useState(false);
  const [sbDeleteSuccess, setSbDeleteSuccess] = useState(false);

  const sbDeleteFn = () => setSbDelete(!sbDelete);

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {title}
      </MDTypography>
    </MDBox>
  );

  let tableData = {
    columns: [
      { Header: "admin", accessor: "admin", width: "40%", align: "left" },
      { Header: "mobile no.", accessor: "mobile", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "added on", accessor: "added", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: adminData?.map((data) => {
      return {
        admin: <Author image={team2} name={data.name} email={data.email} />,
        mobile: <Job title={data.mobile} />,
        status: (
          <MDBox>
            <MDBadge
              badgeContent={data.status}
              color={data.status === "inactive" ? "error" : "success"}
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        added: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {moment(data.updatedOn).format("DD/MM/YYYY")}
          </MDTypography>
        ),
        action: (
          <MDButton
            variant="gradient"
            color="error"
            size="small"
            onClick={() => {
              fetchAdminByIdAPIFn(data._id);
            }}
          >
            Delete
          </MDButton>
        ),
      };
    }),
  };

  useEffect(() => {
    fetchAllAdminAPIFn();
  }, []);

  const fetchAllAdminAPIFn = () => {
    fetchAllAdminAPI()
      .then((res) => {
        if (res.data.message) {
          setAdminData(res.data.Result);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAdminByIdAPIFn = (id) => {
    fetchAdminByIdAPI(id)
      .then((res) => {
        console.log(res);
        if (res.data.Result) {
          setAdminId(res.data.Result[0]._id);
          setSbDelete(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAdminAPIFn = () => {
    deleteAdminAPI(adminId)
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          setSbDelete(false);
          fetchAllAdminAPIFn();
          setSbDeleteSuccess(true);
          setTimeout(() => {
            setSbDeleteSuccess(false);
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { rows, columns } = tableData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDSnackbar
        color="success"
        icon="check"
        title="Admin Delete"
        content="Admin Deleted Successfully."
        open={sbDeleteSuccess}
        close={() => setSbDeleteSuccess(false)}
      />
      <MDSnackbar
        color="light"
        icon="delete"
        title="Delete Admin"
        content={
          <>
            <MDBox pt={3} pb={3} px={3}>
              <MDTypography display="block" variant="body" color="info" mb={4}>
                Are you sure you want to delete?
              </MDTypography>
              <MDBox mt={6} mb={1}>
                <MDButton
                  variant="gradient"
                  color="error"
                  size="small"
                  onClick={() => {
                    deleteAdminAPIFn();
                    setSbDelete(false);
                  }}
                >
                  Yes
                </MDButton>
                <MDButton
                  variant="gradient"
                  color="info"
                  size="small"
                  style={{ marginLeft: 12 }}
                  onClick={() => {
                    setSbDelete(false);
                  }}
                >
                  No
                </MDButton>
              </MDBox>
            </MDBox>
          </>
        }
        open={sbDelete}
        close={sbDeleteFn}
      />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Admins Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Admin;
