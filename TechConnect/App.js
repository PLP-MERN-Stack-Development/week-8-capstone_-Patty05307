const express = require('express');
const app = express();
const mainRoutes = require('./routes/main'); // ✅ This should now work

app.use('/', mainRoutes);

const PORT = process.
env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
