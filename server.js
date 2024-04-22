const express = require("express");
const AWS = require("aws-sdk");

const app = express();
const port = 3000;

// 配置 AWS 凭证
AWS.config.update({
  accessKeyId: "YOUR_ACCESS_KEY_ID",
  secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
  region: "us-west-2", // 替换为你的 S3 区域
});

const s3 = new AWS.S3();

// 提供静态 HTML 页面
app.use(express.static("public"));

// 生成预签名 URL 的端点
app.get("/presigned-url", (req, res) => {
  const params = {
    Bucket: "YOUR_BUCKET_NAME", // 替换为你的 S3 存储桶名称
    Key: "uploaded-file.txt", // S3 中的对象键
    Expires: 60, // 预签名 URL 的过期时间
  };

  s3.getSignedUrl("putObject", params, (err, url) => {
    if (err) {
      res.status(500).send("Error generating presigned URL");
    } else {
      res.json({ presignedUrl: url });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
