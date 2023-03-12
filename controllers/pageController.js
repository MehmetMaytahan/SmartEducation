const nodemailer = require("nodemailer");

exports.getHomePage = (req, res) => {
  res.status(200).render("index", {
    page_name: "index"
  });
  console.log(req.session.userID);
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about"
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register"
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login"
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact"
  });
};

exports.sendEMail = async (req, res) => {
  try {
    const htmlTemplate = `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Simple Transactional Email</title>
      <style>
        /* -------------------------------------
            GLOBAL RESETS
        ------------------------------------- */
        
        /*All the styling goes here*/
        
        img {
          border: none;
          -ms-interpolation-mode: bicubic;
          max-width: 100%; 
        }
  
        body {
          background-color: #f6f6f6;
          font-family: sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          line-height: 1.4;
          margin: 0;
          padding: 0;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%; 
        }
  
        table {
          border-collapse: separate;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          width: 100%; }
          table td {
            font-family: sans-serif;
            font-size: 14px;
            vertical-align: top; 
        }
  
        /* -------------------------------------
            BODY & CONTAINER
        ------------------------------------- */
  
        .body {
          background-color: #f6f6f6;
          width: 100%; 
        }
  
        /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
        .container {
          display: block;
          margin: 0 auto !important;
          /* makes it centered */
          max-width: 580px;
          padding: 10px;
          width: 580px; 
        }
  
        /* This should also be a block element, so that it will fill 100% of the .container */
        .content {
          box-sizing: border-box;
          display: block;
          margin: 0 auto;
          max-width: 580px;
          padding: 10px; 
        }
  
        /* -------------------------------------
            HEADER, FOOTER, MAIN
        ------------------------------------- */
        .main {
          background: #ffffff;
          border-radius: 3px;
          width: 100%; 
        }
  
        .wrapper {
          box-sizing: border-box;
          padding: 20px; 
        }
  
        .content-block {
          padding-bottom: 10px;
          padding-top: 10px;
        }
      </style>
    </head>
    <body>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
        <tr>
          <td>&nbsp;</td>
          <td class="container">
            <div class="content">
  
              <!-- START CENTERED WHITE CONTAINER -->
              <table role="presentation" class="main">
  
                <!-- START MAIN CONTENT AREA -->
                <tr>
                  <td class="wrapper">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p>Email: ${req.body.email}</p>
                          <p>Name: ${req.body.name}</p>
                          <p>Message: ${req.body.message}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
  
              <!-- END MAIN CONTENT AREA -->
              </table>
              <!-- END CENTERED WHITE CONTAINER -->
  
  
            </div>
          </td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </body>
  </html>
  `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.NODE_MAIL, //process.env.NODE_MAIL, // generated ethereal user
        pass: process.env.NODE_PASS //process.env.NODE_PASS // generated ethereal password
      }
    });

    // send mail with defined transport object
    await transporter.sendMail({
      to: "try.demo.71@gmail.com", // list of receivers
      subject: `Smart EDU Contact Form New Message`, // Subject line
      html: htmlTemplate // html body
    });

    req.flash("success", "We recevied your message successfully");
    res.status(200).redirect("/contact");
  } catch (error) {
    req.flash("error", "Something happened!");
    res.status(203).redirect("/contact");
  }
};
