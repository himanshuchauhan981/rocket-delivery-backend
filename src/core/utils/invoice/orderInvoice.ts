import * as moment from 'moment';

import { Order } from 'src/modules/order/order.entity';

const orderInvoice = (order: Order) => {
  let orderProductHtml = '';
  let subTotal = 0;

  for (const product of order.order_products) {
    subTotal = subTotal + product.price * product.quantity;
    orderProductHtml =
      orderProductHtml +
      `
        <tr>
          <td style="font-size: 10px;" align="center">1</td>
          <td style="font-family: 'Raleway'; font-size: 10px; padding: 10px 0px;" align="left">
            ${product.product_name}
          </td>
          <td style="font-family: 'Raleway'; font-size: 10px;" align="center">
            &#8377; ${product.price.toFixed(2)}
          </td>
          <td style="font-family: 'Raleway'; font-size: 10px;" align="center">
            ${product.quantity}
          </td>
          <td style="font-family: 'Raleway'; font-size: 10px; padding-right: 10px;" align="right">
            &#8377; ${(product.price * product.quantity).toFixed(2)}
          </td>
        </tr>
      `;
  }
  const html = `
  <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 10px 20px;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="width: 50%; font-family:'Raleway'; font-size: 28px;">INVOICE</td>
        <td style="width: 50%; text-align: right;">
          <img style="width: 100px; height: 70px;" src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80"/>
        </td>
      </tr>
    </table>

    <table style=" border-bottom: 1px solid #DED5D5; width: 100%;">
      <tr>
        <td style="font-size: 16px; font-weight: 700; font-family: 'Raleway'; letter-spacing: 0.8px; margin-top: 5px;">FROM</td>
      </tr>
      <tr>
        <td style="font-size: 10px; width: 60%;">Rocket Delivery</td>
        <td style="font-family: 'Raleway'; font-size: 12px; width: 20%; text-align: right; font-weight: 800;">INVOICE #</td>
        <td style="font-size: 10px; width: 20%; text-align: right;">INV-001</td>
      </tr>
      <tr>
        <td style="font-size: 10px; width: 60%;">B-2070, Oberoi Garden Est</td>
        <td style="font-family: 'Raleway'; font-size: 12px; width: 20%; text-align: right; font-weight: 800;">INVOICE DATE</td>
        <td style="font-size: 10px; width: 20%; text-align: right;">
          ${moment(order.created_at).format('YYYY-MM-DD')}
        </td>
      </tr>
      <tr>
        <td style="font-size: 10px;">Saki Vihar Road, Chandivali Andheri</td>
      </tr>
      <tr>
        <td style="font-size: 10px; padding-bottom: 15px;">Mumbai</td>
      </tf>
    </table>
    <table style="width: 100%; margin-top: 9px;">
      <tr>
        <td style="font-size: 16px; font-weight: 700; font-family: 'Raleway'; letter-spacing: 0.8px;">To</td>
      </tr>
      <tr>
        <td style="font-size: 10px; width: 60%;">${order.address.full_name}</td>
      </tr>
      <tr>
        <td style="font-size: 10px; width: 60%;">
          ${order.address.mobile_number}
        </td>
      </tr>
      <tr>
        <td style="font-size: 10px; width: 60%;">
          ${order.address.house_no} ${order.address.area}
        </td>
      </tr>
      <tr>
        <td style="font-size: 10px;">
          ${order.address.city.name} ${order.address.state.name} ${
    order.address.country.name
  }
        </td>
      </tr>
      <tr>
        <td style="font-size: 10px; padding-bottom: 15px;">
        </td>
      </tf>
    </table>
    <table style="width: 100%;" cellspacing="0">
      <thead style="background-color: #ff9231;">
        <th style="font-family: 'Raleway'; font-size: 12px; padding: 8px 0px; color: white; width: 8%;">S.No</th>
        <th style="font-family: 'Raleway'; font-size: 12px; color: white; width: 54%;">Product</th>
        <th style="font-family: 'Raleway'; font-size: 12px; color: white; width: 16%;">Price</th>
        <th style="font-family: 'Raleway'; font-size: 12px; color: white; width: 8%;">Quantity</th>
        <th style="font-family: 'Raleway'; font-size: 12px; color: white; width: 16%;">Total</th>
      </thead>
      <tbody>
        ${orderProductHtml}
      </tbody>
    </table>
    <table style="width: 100%; margin-top: 4px;" cellspacing='0'>
      <tbody>
        <tr>
          <td style="width: 60%;"></td>
          <td style="font-family: 'Raleway'; font-size: 11px; width: 20%; letter-spacing: 0.7px;" align="left">Subtotal</td>
          <td style="font-family: 'Raleway'; font-size: 10px; width: 20%; padding-right: 10px;" align="right">
            &#8377; ${subTotal.toFixed(2)}
          </td>
        </tr>
        <tr>
          <td style="width: 60%;"></td>
          <td style="font-family: 'Raleway'; font-size: 11px; width: 20%; letter-spacing: 0.7px;" align="left">Delivery Charges</td>
          <td style="font-family: 'Raleway'; font-size: 10px; width: 20%; padding-right: 10px;" align="right">
            &#8377; ${order.delivery_charges.toFixed(2)}
          </td>
        </tr>
        <tr>
          <td style="width: 60%;"></td>
          <td style="font-family: 'Raleway'; font-size: 11px; width: 20%; letter-spacing: 0.7px;" align="left">Total</td>
          <td style="font-family: 'Raleway'; font-size: 10px; width: 20%; padding-right: 10px;" align="right">
            &#8377; ${order.net_amount.toFixed(2)}
          </td>
        </tr>
      </tbody>
    </table>
    <p style="text-align: center; font-family: 'Raleway'; font-size: 10px;">If you have any questions about this invoice, please write a email at</p>
    <p style="margin-bottom: 0px; text-align: center; font-family: 'Raleway'; font-size: 10px; font-weight: 800;">rocket-mail@yopmail.com</p>
    <p style="margin-bottom: 0px; text-align: center; font-family: 'Raleway'; font-size: 14px;">THANKS FOR THE BUSINESS</p>
  </html>
  `;

  return html;
};

export default orderInvoice;
