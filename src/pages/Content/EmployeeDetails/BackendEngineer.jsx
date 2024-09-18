import React, { useState } from "react";
import { Button, Form, Select, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "../../../apis/axiosInstance";

const { Option } = Select;

const BackendEngineer = () => {
  const [loading, setLoading] = useState(false); // Added loading state
  const [form] = Form.useForm(); // Form instance for resetting
  const [selectedDomains, setSelectedDomains] = useState([]);

  const onFinish = async (values) => {
    setLoading(true);
    console.log(values);
    try {
      const res = await axios.post("employee/insert", {
        role: "Backend Engineer",
        insert_json: {
          "Name": values.name,
          "Age": values.age,
          "Home Town": values.home,
          "Phone Number": values.phone,
          "Proficiency in Programming Languages":
            values.Proficiency_in_Programming_Languages,
          "Database Management (SQL, NoSQL)": values.Database_Management,
          "API Development and Integration":
            values.API_Development_and_Integration,
          "Knowledge of Frameworks": values.Knowledge_of_Frameworks,
          "Understanding of Microservices Architecture":
            values.Understanding_of_Microservices_Architecture,
          "Years of experience in Bacend Engineer":
            values.Years_of_experience_in_BackEnd_Engineer,
          "Experience of related Domain": values.experience,
          "Bachelor's Degree": values.Bachelor_Degree,
          "Master's Degree": values.Master_Degree,
        },
      });
      console.log(res);
      Swal.fire(res.data.response, "", "success");
      form.resetFields();
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire("Details Not Saved", "", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDomainChange = (value, index) => {
    const newSelectedDomains = [...selectedDomains];
    newSelectedDomains[index] = value;
    setSelectedDomains(newSelectedDomains);
  };
  return (
    <div>
      <div className="mt-10">
        {/* Bind the form instance to the Form component */}
        <Form form={form} name="common" onFinish={onFinish} autoComplete="off">
          <div className="text-2xl mb-8">Skills</div>
          <Form.Item
            label="Proficiency in Programming Languages"
            name="Proficiency_in_Programming_Languages"
            rules={[
              {
                required: true,
                message: "Please input Proficiency in Programming Languages!",
              },
            ]}
            style={{ width: "48%" }}
          >
            <Select placeholder="--Select a Value--" allowClear>
              <Option value="Novice">Novice</Option>
              <Option value="Intermediate">Intermediate</Option>
              <Option value="Advanced">Advanced</Option>
            </Select>
          </Form.Item>
          <div className="flex flex-row justify-between">
            <Form.Item
              label="Database Management (SQL, NoSQL)"
              name="Database_Management"
              rules={[
                {
                  required: true,
                  message: "Please input Database Management (SQL, NoSQL)",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select a Value--" allowClear>
                <Option value="Novice">Novice</Option>
                <Option value="Intermediate">Intermediate</Option>
                <Option value="Advanced">Advanced</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="API Development and Integration"
              name="API_Development_and_Integration"
              rules={[
                {
                  required: true,
                  message: "API Development and Integration!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select a Value--" allowClear>
                <Option value="Novice">Novice</Option>
                <Option value="Intermediate">Intermediate</Option>
                <Option value="Advanced">Advanced</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="flex flex-row justify-between">
            <Form.Item
              label="Knowledge of Frameworks"
              name="Knowledge_of_Frameworks"
              rules={[
                {
                  required: true,
                  message: "Please input Knowledge of Frameworks!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select a Value--" allowClear>
                <Option value="Novice">Novice</Option>
                <Option value="Intermediate">Intermediate</Option>
                <Option value="Advanced">Advanced</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Understanding of Microservices Architecture"
              name="Understanding_of_Microservices_Architecture"
              rules={[
                {
                  required: true,
                  message:
                    "Please input Understanding of Microservices Architecture",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select a Value--" allowClear>
                <Option value="Novice">Novice</Option>
                <Option value="Intermediate">Intermediate</Option>
                <Option value="Advanced">Advanced</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="text-2xl mb-8">Experiences</div>

          <div className="flex flex-row justify-between">
            <Form.Item
              label="Years of experience in BackEnd Engineer"
              name="Years_of_experience_in_BackEnd_Engineer"
              rules={[
                {
                  required: true,
                  message:
                    "Please input Years of experience in BackEnd Engineer!",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select years--" allowClear>
                <Option value="1-2 years">1 - 2 years</Option>
                <Option value="3-5 years">3-5 years</Option>
                <Option value="5+ years">5+ years</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="pb-3 text-md">
            Experience of Related Domain (Add all 4)
          </div>
          <div>
            <Form.List name="experience">
              {(
                experienceFields,
                { add: addExperience, remove: removeExperience }
              ) => (
                <>
                  {experienceFields.map((experienceField, experienceIndex) => (
                    <div key={experienceField.key}>
                      <div className="flex justify-between items-center pb-3">
                        <h4>Experience {experienceIndex + 1}</h4>
                        {experienceFields.length > 1 && (
                          <MinusCircleOutlined
                            onClick={() => {
                              removeExperience(experienceField.name);
                              const newSelectedDomains = [...selectedDomains];
                              newSelectedDomains.splice(experienceIndex, 1);
                              setSelectedDomains(newSelectedDomains);
                            }}
                          />
                        )}
                      </div>

                      <Form.Item
                        {...experienceField}
                        name={[experienceField.name, "Domain"]}
                        fieldKey={[experienceField.fieldKey, "Domain"]}
                        rules={[
                          {
                            required: true,
                            message: "Please select a domain!",
                          },
                        ]}
                      >
                        <Select
                          placeholder="--Select a Domain--"
                          allowClear
                          onChange={(value) =>
                            handleDomainChange(value, experienceIndex)
                          }
                          value={selectedDomains[experienceIndex]}
                        >
                          {["Health", "Finance", "E-Commerce", "Education"]
                            .filter(
                              (domain) => !selectedDomains.includes(domain)
                            ) // Filter out already selected domains
                            .map((domain) => (
                              <Option key={domain} value={domain}>
                                {domain}
                              </Option>
                            ))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        {...experienceField}
                        name={[experienceField.name, "Years"]}
                        fieldKey={[experienceField.fieldKey, "Years"]}
                        rules={[
                          {
                            required: true,
                            message: "Please input years of experience!",
                          },
                        ]}
                      >
                        <Select placeholder="--Select Years--" allowClear>
                          <Option value="0 - 5">0 - 5 Years</Option>
                          <Option value="6 - 14">6 - 14 years</Option>
                          <Option value="15+">15+ Years</Option>
                        </Select>
                      </Form.Item>
                    </div>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => addExperience()}
                      icon={<PlusOutlined />}
                      disabled={experienceFields.length >= 4} // Disable the button if 4 or more fields are added
                    >
                      Add Experience
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>

          <div className="text-2xl mb-8">Education</div>

          <div className="flex flex-row justify-between">
            <Form.Item
              name="Bachelor_Degree"
              label="Bachelor's Degree"
              rules={[
                {
                  required: true,
                  message: "Please Select a value",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select a Value--" allowClear>
                <Option value="related">Related</Option>
                <Option value="Unrelated">Unrelated</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="Master_Degree"
              label="Master's Degree"
              rules={[
                {
                  required: true,
                  message: "Please Select a value",
                },
              ]}
              style={{ width: "48%" }}
            >
              <Select placeholder="--Select a Value--" allowClear>
                <Option value="related">Related</Option>
                <Option value="Unrelated">Unrelated</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Employee
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default BackendEngineer;
