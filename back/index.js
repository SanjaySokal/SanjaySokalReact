const express = require("express");
const mailer = require("nodemailer");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const uploader = require("express-fileupload");
const fs = require("fs")
const app = express();
const port = 4000;
app.use(bodyParser.json())
app.use(cors())
app.use(uploader())
app.listen(port)

var trans = mailer.createTransport({
    service: "gmail",
    auth: {
        user: "sokalsanjay@gmail.com",
        pass: "hlvhravlmrizfjhe"
    }
})

const connection = mysql.createConnection({ host: "localhost", user: "root", password: "", database: "sokalit1_user" })

connection.connect((err) => {
    if (err) { console.log(err) }
})

app.post("/check-user", (req, resp) => {
    connection.query(`SELECT * FROM user WHERE email = "${req.body.email}" && password = '${req.body.password}' && verify = '1'`, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            if (data.length === 0) { resp.send('0') } else if (data[0].verify === '1') { resp.send(data[0].verify) } else { resp.send('0') }
        }
    })
})

app.post("/forgot", (res, resp) => {
    var rand = Math.floor(Math.random() * 100000);
    connection.query(`SELECT * FROM user WHERE email = '${res.body.email}' && verify = '1'`, (er, dta) => {
        if (!er) {
            connection.query(`UPDATE user SET forgot='${rand}' WHERE email = '${res.body.email}'`, (err, data) => {
                if (!err) {
                    sendmail();
                }
            })
        } else {
            resp.send("0");
        }
    })

    function sendmail() {
        var data = {
            from: "contact@sanjaysokal.com",
            to: res.body.email,
            subject: `Forgot Password For ${res.body.email}`,
            html: `<html>

<head>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        .contain {
            background-color: #f7f7f7;
            padding: 40px 20px;
            text-align: center;
        }
        h1 {
            font-size: 40px;
            margin: 20px 0;
        }
        .btn {
            border-radius: 7px;
            cursor: pointer;
            display: inline-block;
            color: #fff;
            padding: 10px 15px;
            background-color: #062b48;
            font-size: 14px;
            text-decoration: none;
            margin-bottom: 15px;
        }
    </style>
</head><body>
    <div class="contain">
        <p style="font-size:20px">
            Hi, ${res.body.email} Thanks for be a member of sanjaysokal.com. To reset your password click the link given
            below and enter the code given below.
        </p>
        <h1>${rand}</h1>
        <a style="color:#fff;" class="btn" href="https://sanjaysokal.com/change-password/${res.body.email}">Reset Now</a>
        <p>
            Thankyou, Have a great day.
        </p>
    </div></body></html>`
        }
        var transport = trans;

        transport.sendMail(data, err => {
            if (err) {
                console.log(err);
                resp.send("0")
            } else {
                resp.send("1")
            }
        })
    }
})

app.post("/check-otp", (req, resp) => {
    connection.query(`SELECT * FROM user WHERE email = '${req.body.email}' && forgot = '${req.body.otp}'`, (err, data) => {
        if (err) {
            resp.send({ status: false })
        }
        else if (data.length > 0) {
            connection.query(`UPDATE user SET password = '${req.body.pass}' WHERE forgot = '${req.body.otp}' && email = '${req.body.email}'`, (err2, data2) => {
                if (!err2) {
                    resp.send({ status: true })
                } else {
                    resp.send({ status: false })
                }
            })
        } else {
            resp.send({ status: false })
        }
    })
})

app.post("/profile", (req, resp) => {
    connection.query(`SELECT * FROM user WHERE email = '${req.body.email}'`, (err, data) => {
        if (!err) { resp.send(data) } else { console.log(err) }
    })
})

app.post("/add-user", (req, resp) => {
    connection.query(`SELECT * FROM user WHERE email = '${req.body.email}'`, (er, dta) => {
        var rand2 = Math.floor(Math.random() * 100000);
        if (!er) {
            if (dta.length > 0) { resp.send({ status: "false", result: "User Already Registered!" }) } else {
                connection.query(`INSERT INTO user(name, email, phone, password, role, verify, forgot, pic) VALUES ('${req.body.name}','${req.body.email}','${req.body.phone}','${req.body.password}', 'Visitor', '0', ${rand2}, 'https://sanjaysokal.tech/img/favicon.png')`, (err, data) => {
                    if (!err) {
                        // fs.mkdirSync(`image_upload/${req.body.email}`)
                        // fs.mkdirSync(`websites/${req.body.email}`)
                        // fs.mkdirSync(`resume/${req.body.email}`)
                        // fs.mkdirSync(`profile_pic/${req.body.email}`)
                        sendmail2()
                        function sendmail2() {
                            var data = {
                                from: "verify@sanjaysokal.com",
                                to: req.body.email,
                                subject: `Verify Email For ${req.body.email}`,
                                html: `<html>
                    
                                <head>
                                    <style>
                                        * {
                                            margin: 0;
                                            padding: 0;
                                            box-sizing: border-box;
                                        }
                                        .contain {
                                            background-color: #f7f7f7;
                                            padding: 40px 20px;
                                            text-align: center;
                                        }
                                        h1 {
                                            font-size: 40px;
                                            margin: 20px 0;
                                        }
                                        .btn {
                                            border-radius: 7px;
                                            cursor: pointer;
                                            display: inline-block;
                                            color: #fff;
                                            padding: 10px 15px;
                                            background-color: #062b48;
                                            font-size: 14px;
                                            text-decoration: none;
                                            margin-bottom: 15px;
                                        }
                                    </style>
                                </head><body>
                                <div class="contain">
                                    <p style="font-size:20px">
                                        Hi, ${req.body.email} Thanks for be a member of sanjaysokal.com. To verify your email click the link given
                                        below and enter the code given below.
                                    </p>
                                    <h1>${rand2}</h1>
                                    <a style="color:#fff;" class="btn" href="https://sanjaysokal.com/verify/${req.body.email}">Reset Now</a>
                                    <p>
                                        Thankyou, Have a great day.
                                    </p>
                                </div></body></html>`
                            }
                            var transport = trans;

                            transport.sendMail(data, err => {
                                if (err) {
                                    console.log(err);
                                    resp.send({ status: "false", result: "Error from Server!" })
                                } else {
                                    resp.send({ status: "true", result: "Registration Successful. Please verify your email!" });
                                }
                            })
                        }
                    } else { resp.send({ status: "false", result: "Error from Server!" }) }
                })
            }
        } else {
            resp.send({ status: "false", result: "Error from Server!" })
        }
    })
})

app.post("/verify-user", (req, resp) => {
    connection.query(`SELECT * FROM user WHERE email = '${req.body.email}' && forgot = '${req.body.otp}'`, (err, data) => {
        if (!err) {
            if (data.length > 0) {
                connection.query(`UPDATE user SET verify='1' WHERE email = '${req.body.email}'`, (err, data) => {
                    if (!err) { resp.send({ status: true }) } else { resp.send({ status: false }) };
                })
            } else {
                resp.send({ status: false });
            }
        } else {
            console.log(err);
            resp.send({ status: false });
        }
    })
})

app.put("/update-user", (req, resp) => {
    connection.query(`UPDATE user SET name="${req.body.name}", phone="${req.body.phone}", role = "${req.body.role}" WHERE email = "${req.body.email}"`, (err, data) => {
        if (!err) { resp.send("true") } else { resp.send(err) }
    })
})
app.put("/update-pic", (req, resp) => {
    if (req.files === null) {
        resp.send({ status: "failed" })
    } else {
        upload(req.files.file, `profile_pic/${req.body.email}/${req.body.file_name}`)
        connection.query(`UPDATE user SET pic='profile_pic/${req.body.file_name}' WHERE email = '${req.body.email}'`, (err, data) => {
            if (!err) { resp.send({ status: "success" }) } else { resp.send({ status: "failed" }) }
        })
    }
})

app.post("/work", (req, resp) => {
    var file = req.files.resume;
    var url = `resume/${req.body.email}/${req.body.file_name}`;
    upload(file, url)
    connection.query(`INSERT INTO work(name, email, phone, type, resume, description) VALUES ('${req.body.name}','${req.body.email}','${req.body.phone}','${req.body.description}','${url}','${req.body.message}')`, (err, data) => {
        if (!err) { resp.send({ status: "success" }) } else { resp.send({ status: "failed" }) }
    })
})

app.post("/web-view", (req, resq) => {
    connection.query(`SELECT * FROM website WHERE id = ${req.body.id}`, (err, data) => { resq.send(data) })
})

app.post("/upload-image", (req, resp) => {
    var file = req.files.file;
    var url = `image_upload/${req.body.email}/${req.body.file_name}`;
    upload(file, url)
    connection.query(`INSERT INTO images(name, email, file) VALUES ('${req.body.name}','${req.body.email}','${req.body.file_name}')`, (err, data) => {
        if (!err) { resp.send({ status: "success" }) } else { resp.send({ status: "failed" }) }
    })
})

app.post("/upload-website", (req, resp) => {
    var file = req.files.image;
    var url = `websites/${req.body.email}/${req.body.file_name}`;
    upload(file, url)
    var file2 = req.files.zip;
    var url2 = `websites/${req.body.email}/${req.body.zip_name}`;
    upload(file2, url2)
    connection.query(`INSERT INTO website(name, email, image, website) VALUES ('${req.body.name}','${req.body.email}','${req.body.file_name}','${req.body.zip_name}')`, (err, data) => {
        if (!err) { resp.send({ status: "success" }) } else { resp.send({ status: "failed" }) }
    })
})

app.get("/web", (req, resp) => {
    connection.query("SELECT * FROM website ORDER BY id DESC", (err, data) => {
        if (!err) { resp.send(data) } else { resp.send(err); console.log(err) }
    })
})

app.post("/search-web", (req, resp) => {
    connection.query(`SELECT * FROM website WHERE name LIKE '%${req.body.search}%' || website LIKE '%${req.body.search}%' || email LIKE '%${req.body.search}%'`, (err, data) => {
        if (!err) { resp.send(data) } else { resp.send(err); console.log(err) }
    })
})

app.get("/images", (req, resp) => {
    connection.query("SELECT * FROM images ORDER BY id DESC", (err, data) => {
        if (!err) { resp.send(data) } else { resp.send(err) }
    })
})

app.post("/user-images", (req, resp) => {
    connection.query(`SELECT * FROM images WHERE email = '${req.body.email}'  ORDER BY id DESC`, (err, data) => {
        if (!err) { resp.send(data) } else { resp.send(err) }
    })
})

app.post("/user-website", (req, resp) => {
    connection.query(`SELECT * FROM website WHERE email = '${req.body.email}'  ORDER BY id DESC`, (err, data) => {
        if (!err) { resp.send(data) } else { resp.send(err) }
    })
})

app.post("/search-images", (req, resp) => {
    connection.query(`SELECT * FROM images WHERE name LIKE '%${req.body.search}%' || file LIKE '%${req.body.search}%' || email LIKE '%${req.body.search}%'`, (err, data) => {
        if (!err) { resp.send(data) } else { resp.send(err) }
    })
})

app.get("/contact", (req, resp) => {
    connection.query("SELECT * FROM contact", (err, data) => {
        if (!err) { resp.send(data) } else { resp.send(err) }
    })
})

app.post("/contact", (req, resp) => {
    connection.query(`INSERT INTO contact(name, email, phone, subject, message) VALUES ('${req.body.name}','${req.body.email}','${req.body.phone}','${req.body.subject}', '${req.body.message}')`, (err, data) => {
        if (!err) { resp.send(true) } else { resp.send(err) }
    })
})

function upload(file, url) { file.mv(url, (err) => { return true }) }

app.post("/add-course", (req, resp) => {
    var file2 = req.files.file;
    var url2 = `course/${req.body.file_name}`;
    upload(file2, url2)
    connection.query(`INSERT INTO course(name, description, image, link) VALUES ('${req.body.name}','${req.body.desc}', '${req.body.file_name}', '${req.body.link}')`, (err, data) => {
        if (!err) {
            resp.send({ status: true })
        } else {
            resp.send({ status: false })
        }
    })
})


app.get("/courses", (req, resp) => {
    connection.query(`SELECT * FROM course`, (err, data) => {
        if (!err) {
            resp.send(data)
        } else {
            resp.send({ status: false })
        }
    })
})

app.post("/course-main", (req, resp) => {
    connection.query(`SELECT course.name, course.link, course.image, videos.id, videos.video_name, videos.thumbnail, videos.video, videos.description FROM videos INNER JOIN course ON videos.course_id=course.id WHERE course.link='${req.body.link}'`, (err, data) => {
        if (!err) {
            resp.send(data)
        } else {
            resp.send({ status: false })
        }
    })
})

app.post("/course-main-video", (req, resp) => {
    connection.query(`SELECT course.name, course.link, course.image, videos.id, videos.video_name, videos.thumbnail, videos.video, videos.description FROM videos INNER JOIN course ON videos.course_id=course.id WHERE course.link='${req.body.link}' && videos.id='${req.body.id}'`, (err, data) => {
        if (!err) {
            resp.send(data)
        } else {
            resp.send({ status: false })
        }
    })
})

app.post("/add-video", (req, resp) => {
    var file2 = req.files.file;
    var url2 = `course/${req.body.file_name}`;
    upload(file2, url2)
    connection.query(`INSERT INTO videos(video_name, course_id, video, thumbnail, description) VALUES ('${req.body.name}','${req.body.course}','${req.body.link}','${req.body.file_name}','${req.body.desc}')`, (err, data) => {
        if (!err) {
            resp.send({ status: true })
        } else {
            resp.send({ status: false })
        }
    })
})
