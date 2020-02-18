import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { readOrder  } from "../core/apiCore";
import { Link } from "react-router-dom";
import CardCheckout from '../core/CardCheckout';
import {
  Container,
  Page,
  Grid,
  Card,
  Stamp,
  ContactCard,
  Timeline, Button
} from "tabler-react";
import SiteWrapper from '../templates/SiteWrapper'
import "../styles.css";
import { render } from "react-dom";


const Order = props => {
  const [order, setOrder] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleOrder = orderId => {
      readOrder(orderId).then(data => {
          if (data.error) {
              setError(data.error);
          } else {
              setOrder(data);
       
          }
      });
  };

  useEffect(() => {
      const orderId = props.match.params.orderId;
      loadSingleOrder(orderId);
  }, [props]);

  return (
      <SiteWrapper>
        <Container>
          <div>
          <div class="list-list">
          <h3 class="card-title">{order.status}</h3>
            </div>
            
          </div>
       </Container>
      </SiteWrapper>
  );
};

export default Order;
