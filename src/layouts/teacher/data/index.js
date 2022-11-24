// React components
import { useEffect, useState } from "react";

import { fetchAllAdminAPI, deleteAdminAPI, fetchAdminByIdAPI } from "services/API";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";

// Images
import team2 from "assets/images/team-2.jpg";
import moment from "moment/moment";

export default function Data() {
  const [adminData, setAdminData] = useState([]);
  const [adminId, setAdminId] = useState("");

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
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  return {
    columns: [
      { Header: "teacher", accessor: "teacher", width: "40%", align: "left" },
      { Header: "mobile no.", accessor: "mobile", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "added on", accessor: "added", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: adminData?.map((data) => {
      return {
        teacher: <Author image={team2} name={data.name} email={data.email} />,
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
              fetchAdminByIdAPIFn(data._id)
            }}
          >
            Delete
          </MDButton>
        ),
      };
    }),
  };
}
