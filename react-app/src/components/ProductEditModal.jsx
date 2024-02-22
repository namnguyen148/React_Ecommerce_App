import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Image from "react-bootstrap/Image";
import * as formik from "formik";
import * as yup from "yup";
import React, { useState, useRef } from "react";
import axios from "../config/axiosCustom";

export default function ProductEditModal({
  dataProduct,
  showEditModal,
  handleCloseEditModal,
  setLoadingScreen,
  image,
  setImage,
}) {
  const { Formik } = formik;
  const ref = useRef();
  const reset = () => {
    ref.current.value = "";
  };

  const schema = yup.object().shape({
    product_name: yup
      .string()
      .test("csrf-safe", "Tên không bao gồm ký tự đặc biệt", (value) => {
        return !/[&<>"=/]/.test(value);
      })
      .test(
        "contains-letter",
        "Tên sản phẩm phải chứa ít nhất một chữ cái",
        (value) => {
          return /[a-zA-Z]/.test(value);
        }
      )
      .required("Vui lòng nhập tên sản phẩm")
      .min(5, "Tên phải lớn hơn 5 ký tự")
      .max(255, "Tên không được quá 255 ký tự"),

    product_price: yup
      .string()
      .test("is-positive", "Giá không được nhỏ hơn 0", (value) => {
        return !/[-]/.test(value);
      })
      .matches(/^\d+$/, { message: "Giá bán chỉ được nhập số" })
      .max(8, "Giá tối đa 8 số")
      .required("Giá bán không được để trống"),   

    description: yup.string(),
    is_sales: yup.string().required("Trạng thái không được để trống"),
  });

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!selectedFile) {
      setIsError(true);
      setErrorMsg("Please select a file.");
    } else if (!allowedTypes.includes(selectedFile.type)) {
      setIsError(true);
      setImage("");
      setErrorMsg("Chỉ được upload các file ảnh JPEG, PNG và JPG");
    } else {
      setIsError(false);
      setErrorMsg("");
    }
  };

  const handleCloseModel = () => {
    handleCloseEditModal();
    setIsError(false);
    setErrorMsg("");
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("product_name", values.product_name);
    formData.append("product_price", values.product_price);
    formData.append("description", values.description);
    formData.append("is_sales", values.is_sales);
    formData.append("product_image", image);

    try {
      const id = dataProduct.product_id;
      if (values.product_image instanceof File) {
        await axios.post(`products/edit/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.put(`products/edit/${id}`, values);
      }

      handleCloseModel();
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.errors.product_image[0]
          .replace("Trường product image", "Hình ảnh")
          .replace("kích thước", "kích thước lớn hơn 1024px ");
        setIsError(true);
        setErrorMsg(errorMessage);
      } else {
        console.error("Lỗi không phải từ server:", error);
      }
    }
  };

  return (
    <Modal show={showEditModal} onHide={handleCloseModel} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa sản phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            setLoadingEdit(true);
            setLoadingScreen(true);
            setTimeout(() => {
              handleSubmit(values);
              setLoadingScreen(false);
              setLoadingEdit(false);
            });
          }}
          initialValues={{
            product_name: dataProduct.product_name,
            product_price: dataProduct.product_price,
            description:
              dataProduct.description === null ? "" : dataProduct.description,
            is_sales: dataProduct.is_sales,
            product_image: dataProduct.product_image,
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
            setFieldValue,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col>
                  <Form.Group className="mb-3" controlId="validationFormik01">
                    <Form.Label>Tên sản phẩm:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên sản phẩm"
                      name="product_name"
                      value={values.product_name}
                      onChange={handleChange}
                      isInvalid={touched.product_name && !!errors.product_name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.product_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="validationFormik02">
                    <Form.Label>Giá:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=".00"
                      name="product_price"
                      value={values.product_price}
                      onChange={handleChange}
                      isInvalid={
                        touched.product_price && !!errors.product_price
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.product_price}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="validationFormik03">
                    <Form.Label>Mô tả:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      placeholder="Mô tả sản phẩm"
                      value={values.description}
                      onChange={handleChange}
                      isInvalid={errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="validationFormik04">
                    <Form.Label>Trạng thái:</Form.Label>
                    <Form.Select
                      name="is_sales"
                      value={values.is_sales}
                      onChange={handleChange}
                      isInvalid={touched.is_sales && !!errors.is_sales}
                    >
                      <option value="">Chọn trạng thái</option>
                      <option value="0">Ngừng bán</option>
                      <option value="1">Đang bán</option>
                      <option value="2">Hết hàng</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.is_sales}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col className="text-center">
                  <Form.Group className="mb-3" controlId="validationFormik05">
                    <br />
                    {image ? (
                      <Image
                        className="figure-img img-fluid img-thumbnail"
                        src={URL.createObjectURL(image)}
                        style={{ height: "290px" }}
                        rounded
                      />
                    ) : (
                      <Image
                        className="figure-img img-fluid img-thumbnail"
                        src={
                          dataProduct.product_image === null ||
                          values.product_image == null
                            ? "https://i.pinimg.com/originals/7c/af/80/7caf801a71759db31babb2a8c2d5f83a.jpg"
                            : `${process.env.REACT_APP_URL}/storage/products/${dataProduct.product_image}`
                        }
                        style={{ height: "290px" }}
                        rounded
                      />
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="validationFormik06">
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="file"
                        name="product_image"
                        ref={ref}
                        onChange={(event) => {
                          setFieldValue(
                            "product_image",
                            event.currentTarget.files[0]
                          );

                          handleFileSelect(event);
                        }}
                      />
                      <Button
                        onClick={(e) => {
                          setLoading(true);
                          setTimeout(() => {
                            setFieldValue("product_image", null);
                            setImage(null);
                            reset();
                            setIsError(false);
                            setErrorMsg("");
                            setLoading(false);
                          }, 500);
                        }}
                        className="btn btn-danger"
                        disabled={loading}
                      >
                        {loading ? "Đang xử lý" : "Xóa"}
                      </Button>
                    </InputGroup>
                    {isError && (
                      <div className="alert alert-danger text-center">
                        {errorMsg}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col className="d-flex justify-content-end grid gap-2">
                  <Button variant="secondary" onClick={handleCloseModel}>
                    Hủy
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loadingEdit}
                  >
                    {loadingEdit ? "Đang xử lý..." : "Lưu"}
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
