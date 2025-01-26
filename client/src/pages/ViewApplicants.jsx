import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getApplicants } from "../redux/Slices/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "mantine-datatable";
import { Ellipsis } from "lucide-react";
import { Menu } from "@mantine/core";

function ViewApplicants() {
  const dispatch = useDispatch();
  const { applicants } = useSelector((state) => state.job);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getApplicants(id));
  }, [dispatch, id]);

  const handleAcceptClick = (jobId) => {
    const status = "Accepted";
    // dispatch(updateJobStatus({ id: jobId, status }));
  };

  const handleRejectClick = (jobId) => {
    const status = "Rejected";
    // dispatch(updateJobStatus({ id: jobId, status }));
  };

  const renderJobStatus = (job) => {
    if (job.status === "Pending") {
      return (
        <>
          <Menu.Item onClick={() => handleAcceptClick(job._id)} color="green">
            Accept
          </Menu.Item>
          <Menu.Item onClick={() => handleRejectClick(job._id)} color="red">
            Reject
          </Menu.Item>
        </>
      );
    }
    return <Menu.Item disabled>Status already updated</Menu.Item>;
  };

  return (
    <div>
      <DataTable
        withTableBorder
        borderRadius="sm"
        striped
        highlightOnHover
        records={applicants}
        columns={[
          {
            accessor: "name",
            render: (data) => <span>{data.userId.name}</span>,
          },
          {
            accessor: "email",
            render: (data) => <span>{data.userId.email}</span>,
          },
          {
            accessor: "resume",
            render: (data) => (
              <a
                className="hover:underline hover:underline-offset-2"
                href={data.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                View resume
              </a>
            ),
          },
          {
            accessor: "status",
            render: (data) => (
              <div className="flex items-center">
             
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${
                    data.status === "Pending"
                      ? "bg-yellow-500"
                      : data.status === "Accepted"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />
              
                <span>{data.status}</span>
              </div>
            ),
          },
          {
            accessor: "actions",
            title: "Update Status",
            render: (job) => (
              <Menu shadow="md" width={150}>
                <Menu.Target>
                  <Ellipsis />
                </Menu.Target>
                <Menu.Dropdown>{renderJobStatus(job)}</Menu.Dropdown>
              </Menu>
            ),
          },
        ]}
      />
    </div>
  );
}

export default ViewApplicants;
