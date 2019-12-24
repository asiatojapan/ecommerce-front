import React, { useState, useEffect } from 'react';
import { getProducts } from './apiCore';

export function useValueRef<T>(val: T) {
  const ref = React.useRef(val);
  React.useEffect(() => {
    ref.current = val;
  }, [val]);
  return ref;
}


const Countdown = () => {
  const [x, setX] = useState(0);
  const f = useValueRef(() => {
    window.location.reload();
    console.log(x);
  });
  useEffect(() => {
    setInterval(() => {
      f.current();
    }, 1000);
  }, []);

  const [productsByEntry, setProductsByEntry] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsByEntry = () => {
      getProducts('createdAt').then(data => {
          if (data.error) {
              setError(data.error);
          } else {
              setProductsByEntry(data);
          }
      });
  };

  useEffect(() => {
      loadProductsByEntry();
  }, []);

  return (
          <div className="row">
              {productsByEntry.map((product, i) => (
                  <div key={i} className="col-4 mb-3">
                      <h2> {product.name} </h2>
                      <div> {product.description} </div>
                      <div> {product.description} </div>
                  </div>
              ))}
          </div>
  );
};

export default Countdown;
