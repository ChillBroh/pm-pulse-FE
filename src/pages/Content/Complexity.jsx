import React, { useState, useEffect } from "react";
import { Button, Form, Table, Select, Spin, Modal } from "antd";
import axios from "../../apis/axiosInstance";

const { Option } = Select;

const columns = [
  {
    title: "Employee ID",
    dataIndex: "Emp ID",
    key: "empId",
  },
  {
    title: "KPI Value",
    dataIndex: "KPI",
    key: "kpi",
  },
  {
    title: "Role",
    dataIndex: "Role",
    key: "role",
  },
];

const Complexity = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const sendDetails = async () => {
      const payloadLocal = localStorage.getItem("SearchPayload");
      setLoading(true);

      if (payloadLocal) {
        try {
          const payload = JSON.parse(payloadLocal);
          const res = await axios.post("complexity", {
            Domain: payload.Domain,
            "ML Components": payload.ML_Components,
            Backend: payload.Backend,
            Frontend: payload.Frontend,
            "Core Features": payload.Core_Features,
            "Tech Stack": payload.Tech_Stack,
            Mobile: payload.Mobile,
            Desktop: payload.Desktop,
            Web: payload.Web,
            IoT: payload.IoT,
            Date_Difference: payload.Date_Difference,
            "Expected Team Size": payload.Expected_Team_Size,
            "Expected Budget": payload.Expected_Budget,
          });

          setData(res.data);
          setTableData(res.data.selected_employees);
        } catch (error) {
          setError("Error fetching data");
          console.error("Error parsing payload:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    sendDetails();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <div className="text-2xl mb-8">
        Complexity is {loading ? <Spin /> : data?.complexity}{" "}
      </div>
      <div>
        <Button type="primary" onClick={showModal}>
          View Team Summary
        </Button>
      </div>
      <Modal
        title="Team Summary"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        {loading ? (
          <Spin />
        ) : (
          <div>
            {Object.entries(data?.selected_team || {}).map(([role, count]) => (
              <p key={role}>
                {role}: {count}
              </p>
            ))}
          </div>
        )}
      </Modal>
      <div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <Table columns={columns} dataSource={tableData} loading={loading} />
      </div>
    </div>
  );
};

export default Complexity;
