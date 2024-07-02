const express = require("express");
const app = express();
const port = 3000;
const {post_to_reddit} = require("./reddit");

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.post("/send", async (req, res) => {
  const {post_link, message, platform} = req.body;
  if (platform == "reddit") {
    var response = await post_to_reddit(post_link, message);
    return response
  } else {
    return res.send({success: false, message: "platform is not available"})
  }

});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
