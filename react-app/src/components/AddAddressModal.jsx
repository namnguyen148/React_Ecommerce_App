import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as formik from "formik";
import * as yup from "yup";
import "../assets/css/AddressModal.css";
import Select from 'react-select';
import React, { useState, useEffect } from "react";
import axios from "../config/axiosCustom";
import queryString from "query-string";
import AuthUser from "../components/AuthUser";
import "../assets/css/RegisterFormCustomer.css";

function AddressModal({ showAddModal, handleCloseAddModal}) {
  const { Formik } = formik;
  const { customer } = AuthUser();
  const [dataProvince, setDataProvince] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);
  const [selectedProvinceOption, setSelectedProvinceOption] = useState(null);
  const [selectedDistrictOption, setSelectedDistrictOption] = useState(null);
  const [selectedWardOption, setSelectedWardOption] = useState(null);
  const [provinceId, setProvinceId] = useState(null);
  const [districtId, setDistrictId] = useState(null);

  const schema = yup.object().shape({
    name: yup
    .string()
    .required("Họ và tên không được trống")
    .min(5, "Họ và tên tối thiểu 5 ký tự")
    .max(255, "Họ và tên không được quá 255 ký tự")
    .matches(/^[^\d]+$/, "Họ và tên không được chứa số"),

    tel_num: yup
      .string()
      .required("Số điện thoại không được trống")
      .min(10, "Số điện thoại tối thiểu 10 ký tự")
      .max(20, "Số điện thoại không được quá 20 ký tự")
      .matches(/^\d+$/, "Số điện thoại không được chứa chữ"),

    province: yup.string().required("Tỉnh / Thành phố không được trống"),
    district: yup.string().required("Quận / Huyện không được trống"),
    ward: yup.string().required("Phường / Xã không được trống"),
    
    addr_det: yup
    .string()
    .required("Địa chỉ không được trống")
    .min(5, "Địa chỉ phải có 5 ký tự trở lên")
    .max(255, "Địa chỉ không được quá 255 ký tự")
    .test("csrf-safe", "Địa chi không đúng định dạng", (value) => {
      return !/[&<>"'=@!*]/.test(value);
    })
  });

  const [addrOpt, setAddrOpt] = useState(null);
  const [defAddr, setDefAddr] = useState(false);

  const handleOptionClick = (option) => {
    setAddrOpt(option);
  };

  const fetchProvinces = async (values) => {
    try {
      const response = await axios.get(
        queryString.stringifyUrl({
          url: "/address/provinces",
          query: values,
        })
      );
      setDataProvince(response.data.data);
    } catch (error) {
      console.error("get list provinces error:", error);
    }
  };

  const fetchDistricts = async (values) => {
    try {
      const response = await axios.get(
        queryString.stringifyUrl({
          url: "/address/districts",
          query: { province_id: values },
        })
      );
      setDataDistrict(response.data.data);
    } catch (error) {
      console.error("get list districts error:", error);
    }
  };

  const fetchWards = async (values) => {
    try {
      const response = await axios.get(
        queryString.stringifyUrl({
          url: "/address/wards",
          query: { district_id: values },
        })
      );
      setDataWard(response.data.data);
    } catch (error) {
      console.error("get list wards error:", error);
    }
  };

  const handleAddress = async (values) => {
    try {
      await axios.post(
        queryString.stringifyUrl({
          url: "/address/add",
          query: values,
        })
      );
    } catch (error) {
      console.error("create address error:", error);
    }
  };

  const closeModal = () => {
    handleCloseAddModal();
    setSelectedProvinceOption(null);
    setSelectedDistrictOption(null);
    setSelectedWardOption(null);
    setAddrOpt(null);
    setDefAddr(false);
  }

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    fetchDistricts(provinceId);
  }, [provinceId]);

  useEffect(() => {
    fetchWards(districtId);
  }, [districtId]);

  return (
    <>
      <Modal show={showAddModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Địa chỉ mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              values.addr_opt = addrOpt;
              values.def_addr = defAddr ? 1 : 0;
              handleAddress(values);
              // console.log(values);
              closeModal();
            }}
            initialValues={{
              name: "",
              tel_num: "",
              province: "",
              district: "",
              ward: "",
              addr_det: "",
              addr_opt: "",
              def_addr: "",
              customer_id: customer.customer_id,
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors, resetForm }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationFormik01">
                    <Form.Label>Họ và tên:</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Nhập tên người dùng"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" className="telNum" controlId="validationFormik02">
                    <Form.Label>Số điện thoại:</Form.Label>
                    <Form.Control
                      type="text"
                      name="tel_num"
                      placeholder="Nhập số điện thoại"
                      value={values.tel_num}
                      onChange={handleChange}
                      isInvalid={touched.tel_num && !!errors.tel_num}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.tel_num}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-4">
                  <Form.Group as={Col} md="4" controlId="validationFormik03">
                    <Form.Label>Địa chỉ:</Form.Label>
                    <Select
                      name="province"
                      value={selectedProvinceOption}
                      placeholder="Tỉnh / Thành Phố"
                      isClearable={true}
                      onChange={(selectedOption) => {
                        // Lấy province_id từ selectedOption
                        const provinceId = selectedOption ? selectedOption.province_id : "";
                        setSelectedProvinceOption(selectedOption);
                        setSelectedDistrictOption(null);
                        setSelectedWardOption(null);
                        setProvinceId(provinceId);
                        handleChange({
                          target: {
                            name: "province",
                            value: selectedOption ? selectedOption.value : "",
                          },
                        });
                      }}
                      options={dataProvince.map((data, index) => ({
                        label: data.name,
                        value: data.name,
                        province_id: data.id
                      }))}
                      isInvalid={touched.province && !!errors.province}
                    />
                    {touched.province && errors.province && (
                      <p className="errorValidate">{errors.province}</p>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} md="4" className="addressInput" controlId="validationFormik04">
                    <Select
                      isDisabled={selectedProvinceOption === null}
                      name="district"
                      value={selectedDistrictOption}
                      placeholder="Quận / Huyện"
                      isClearable={true}
                      onChange={(selectedOption) => {
                        const districtId = selectedOption ? selectedOption.district_id : "";
                        setSelectedDistrictOption(selectedOption);
                        setSelectedWardOption(null);
                        setDistrictId(districtId);
                        handleChange({
                          target: {
                            name: "district",
                            value: selectedOption ? selectedOption.value : "",
                          },
                        });
                      }}
                      options={dataDistrict.map((data, index) => ({
                        label: data.name,
                        value: data.name,
                        district_id: data.id
                      }))}
                      isInvalid={touched.district && !!errors.district}
                    />
                    {touched.district && errors.district && (
                      <p className="errorValidate">{errors.district}</p>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} md="4" className="addressInput"  controlId="validationFormik05">
                    <Select
                      isDisabled={selectedDistrictOption === null}
                      name="ward"
                      value={selectedWardOption}
                      placeholder="Phường / Xã"
                      isClearable={true}
                      onChange={(selectedOption) => {
                        setSelectedWardOption(selectedOption);
                        handleChange({
                          target: {
                            name: "ward",
                            value: selectedOption ? selectedOption.value : "",
                          },
                        });
                      }}
                      options={dataWard.map((data, index) => ({
                        label: data.name,
                        value: data.name,
                      }))}
                      isInvalid={touched.ward && !!errors.ward}
                    />
                    {touched.ward && errors.ward && (
                      <p className="errorValidate">{errors.ward}</p>
                    )}
                  </Form.Group>
                </Row>
                <Row className="mb-3 addrDet">
                  <Form.Group controlId="validationFormik06">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="addr_det"
                      placeholder="Địa chỉ cụ thể"
                      value={values.addr_det}
                      onChange={handleChange}
                      isInvalid={touched.addr_det && !!errors.addr_det}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.addr_det}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="9" controlId="validationFormik01">
                    <Form.Label>Loại địa chỉ:</Form.Label>
                    <Col className="d-flex justify-content-start grid gap-2">
                      <div 
                        className={`addressOption ${addrOpt === 1 ? 'selected' : ''}`}
                        onClick={() => handleOptionClick(1)}
                      >
                        <span>Nhà riêng</span>
                      </div>
                      <div 
                        className={`addressOption ${addrOpt === 2 ? 'selected' : ''}`}
                        onClick={() => handleOptionClick(2)}
                      >
                        <span>Văn phòng</span>
                      </div>
                    </Col>
                  </Form.Group>
                </Row>
                <div className="mb-3 form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    onChange={() => setDefAddr(!defAddr)}
                  />
                  <label className="form-check-label">
                    Đặt làm địa chỉ mặc định
                  </label>
                </div>
                <Row className="mb-3">
                  <Col className="d-flex justify-content-end grid gap-2">
                    <Button variant="secondary" onClick={closeModal}>
                      Hủy
                    </Button>
                    <Button type="submit" variant="primary">
                      Lưu
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddressModal;
