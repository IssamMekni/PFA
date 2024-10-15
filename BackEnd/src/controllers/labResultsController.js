const path = require('path');
const LabResult = require('../models/labResult');

// جلب تحاليل المستخدم
exports.getUserLabResults = async (req, res) => {
  try {
    const userId = req.user.userId; // Adjust according to how the userId is stored in JWT
    const labResults = await LabResult.findAll({ where: { userId } });

    if (!labResults || labResults.length === 0) {
      return res.json({ message: 'No lab results found' });
    }

    res.json(labResults);
  } catch (error) {
    console.error('Error fetching lab results:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching lab results', error: error.message });
  }
};

// عرض ملف PDF باستخدام الـ id
exports.viewLabResult = async (req, res) => {
  try {
    const id = req.params.id;
    const labResult = await LabResult.findOne({ where: { id } });

    if (!labResult) {
      return res.status(404).json({ message: 'File not found' });
    }

    const filePath = path.join(__dirname, '../..', labResult.filepath); // The filepath is /storage/filename in the database
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending lab result file:', err);
        res.status(500).json({ message: 'Error sending lab result file' });
      }
    });
  } catch (error) {
    console.error('Error viewing lab result:', error);
    res.status(500).json({ message: 'Error viewing lab result' });
  }
};

// تنزيل ملف PDF باستخدام الـ id
exports.downloadLabResult = async (req, res) => {
  try {
    const id = req.params.id;
    const labResult = await LabResult.findOne({ where: { id } });

    if (!labResult) {
      return res.status(404).json({ message: 'File not found' });
    }

    const filePath = path.join(__dirname, '../..', labResult.filepath); // The filepath is /storage/filename in the database
    res.download(filePath, (err) => {
      if (err) {
        console.error('Error downloading lab result file:', err);
        res.status(500).json({ message: 'Error downloading lab result file' });
      }
    });
  } catch (error) {
    console.error('Error downloading lab result:', error);
    res.status(500).json({ message: 'Error downloading lab result' });
  }
};
