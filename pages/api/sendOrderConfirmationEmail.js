import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { customer, cartItems, cost } = req.body;

  // Configure nodemailer transporter using SMTP and environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Helper function to format cart items into a readable string
  function formatCartItems(cartItems, person) {
    if (!Array.isArray(cartItems)) return { text: "", html: "" };

    let text = "";
    let html = "<ul>";

    cartItems.forEach((item) => {
      const name = item.name || "Unnamed product";
      const quantity = item.quantity || 0;
      const price = item.finalPrice !== undefined ? item.finalPrice : "N/A";

      const color = item.selectedColor || "N/A";
      let material = "N/A";
      if (Array.isArray(item.combination)) {
        item.combination.forEach((comb) => {
          if (color === comb.color) {
            material = comb.material || material;
          }
        });
      }

      text += `- ${name} (${color}, ${material}): Quantity ${quantity}, Price ${price}$\n`;
      html += `<li>${name} (${color}, ${material}): Quantity ${quantity}, Price ${price}$</li>`;
    });

    html += "</ul>";

    if (person === "client") {
      text += `
        Total amount without shipping: ${cost[1]}$\n
        Shipping cost: ${cost[0]}$\n
        Total: ${cost[2]}$
        `;
      html += `
        <p>Total amount without shipping: ${cost[1]}$</p>
        <p>Shipping cost: ${cost[0]}$</p>
        <p>Total: ${cost[2]}$</p>
        `;
    }
    console.log(text);

    return { text, html };
  }

  const formattedToClient = formatCartItems(cartItems, "client");
  const formattedToOwner = formatCartItems(cartItems, "owner");

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: customer.email,
    subject: "Order Confirmation",
    text: `Thank you for your order!
            \n\nOrder Details:\n${formattedToClient.text}
            \n\nIf you have any questions, feel free to contact us.
            \n\nBest regards,
            \nYour Company Name`,
    html: `
      <p>Thank you for your order!</p>
      <h3>Order Details:</h3>
      ${formattedToClient.html}
      <p>If you have any questions, feel free to contact us.</p>
      <p>Best regards,<br>Your Company Name</p>
    `,
  };

  const mailToOwner = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: `New Order from ${customer.email}`,
    text: `Order from ${customer.firstName} ${customer.lastName}.
    \n\nOrder Details:\n${formattedToOwner.text}`,
    html: `
      <p>Order from ${customer.firstName} ${customer.lastName}</p>
      <h3>Order Details:</h3>
      ${formattedToOwner.html}
    `,
  };

  try {
    const info_1 = await transporter.sendMail(mailOptions);
    const info_2 = await transporter.sendMail(mailToOwner);
    res.status(200).json({ message: "Email sent: " + info_1.response });
    // res.status(200).json({ message: "Email sent: " + info_2.response });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email: " + error.toString() });
  }
}
