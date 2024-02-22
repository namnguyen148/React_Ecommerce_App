import React from "react";
import "../assets/css/LoadingScreen.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
    </div>
  );
};

const Loading = () => {
  return (
    <>
      <div className="col-md-4 col-xs-8 col-12 mb-4 mt-2 container-product-skeleton">
        <div className="skeleton-container">
          <Skeleton height={300} />
        </div>
      </div>
      <div className="col-md-4 col-xs-8 col-12 mb-4 mt-2 container-product-skeleton">
        <div className="skeleton-container">
          <Skeleton height={300} />
        </div>
      </div>
      <div className="col-md-4 col-xs-8 col-12 mb-4 mt-2 container-product-skeleton">
        <div className="skeleton-container">
          <Skeleton height={300} />
        </div>
      </div>
      <div className="col-md-4 col-xs-8 col-12 mb-4 mt-2 container-product-skeleton">
        <div className="skeleton-container">
          <Skeleton height={300} />
        </div>
      </div>
      <div className="col-md-4 col-xs-8 col-12 mb-4 mt-2 container-product-skeleton">
        <div className="skeleton-container">
          <Skeleton height={300} />
        </div>
      </div>
      <div className="col-md-4 col-xs-8 col-12 mb-4 mt-2 container-product-skeleton">
        <div className="skeleton-container">
          <Skeleton height={300} />
        </div>
      </div>
      <div className="col-md-4 col-xs-8 col-12 mb-4 mt-2 container-product-skeleton">
        <div className="skeleton-container">
          <Skeleton height={300} />
        </div>
      </div>
      <div className="col-md-4 col-xs-8 col-12 mb-4 mt-2 container-product-skeleton">
        <div className="skeleton-container">
          <Skeleton height={300} />
        </div>
      </div>
      <div className="col-md-4 col-xs-8 col-12 mb-4 mt-2 container-product-skeleton">
        <div className="skeleton-container">
          <Skeleton height={300} />
        </div>
      </div>
      <div className="col-md-4 col-xs-8 col-12 mb-4 mt-2 container-product-skeleton">
        <div className="skeleton-container">
          <Skeleton height={300} />
        </div>
      </div>
      <div className="col-md-4 col-xs-8 col-12 mb-4 mt-2 container-product-skeleton">
        <div className="skeleton-container">
          <Skeleton height={300} />
        </div>
      </div>
      <div className="col-md-4 col-xs-8 col-12 mb-4 mt-2 container-product-skeleton">
        <div className="skeleton-container">
          <Skeleton height={300} />
        </div>
      </div>
      <div className="col-12 py-5 text-center">
        <div className="skeleton-container">
          <Skeleton height={40} width={600} />
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
export { Loading };
