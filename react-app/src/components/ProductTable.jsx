import React from 'react';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BiPencil, BiTrash } from "react-icons/bi";
import "../assets/css/IconTable.css";
import { useEffect, useState } from 'react';

export default function ProductTable({
  user_detail,
  products,
  handelEditModal,
  handelDeleteModal,
  currentPage,
  perPage,
}) {
  const [formattedPrices, setFormattedPrices] = useState([]);

  useEffect(() => {
    // Format prices when the component mounts or when products change
    const formattedPricesArray = products.map(product => (
      new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.product_price)
    ));
    setFormattedPrices(formattedPricesArray);
  }, [products]);
  return (
    <div>
      <Table responsive="md">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên sản phẩm</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Tình trạng</th>
            {user_detail !== "reviewer" && (
              <th></th>
            )}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            const productCount = (currentPage - 1) * perPage + index + 1;
            return (
              <tr key={productCount}>
                <td>{productCount}</td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 50, hide: 40 }}
                    overlay={
                      <Tooltip id={`tooltip-${product.product_id}`}>
                        {product.product_image ? (
                          <img src= {`${process.env.REACT_APP_URL}/storage/products/${product.product_image}`} 
                          alt={product.product_name} 
                          style={{ width: '100%', height: '5rem' }}/>) : ("No Image")}
                      </Tooltip>
                    }
                  >
                    <span>{product.product_name}</span>
                  </OverlayTrigger>
                </td>
                <td>{product.description}</td>
                <td>{formattedPrices[index]}</td>
                <td style={{ color: product.is_sales === 0 ? 'red' : 'green' }}>
                {product.is_sales === 0 ? 'Ngừng bán' : (product.is_sales === 1 ? 'Đang bán' : 'Hết hàng')}
                </td>
                {user_detail !== "reviewer" && (
                  <td>
                    <BiPencil
                      className="iconEdit"
                      style={{ fontSize: '24px' }}
                      onClick={() => handelEditModal(product)}
                    />
                    <BiTrash
                      className="iconDelete"
                      style={{ fontSize: '24px' }}
                      onClick={() => handelDeleteModal(product)}
                    />
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  );
}
