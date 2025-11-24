export default function requestLogger(req, res, next) {
  try {
    console.log('=== REQUEST LOGGER START ===');
    console.log('Method:', req.method, 'URL:', req.originalUrl);
    console.log('Body keys:', Object.keys(req.body || {}));

    if (req.body && req.body.resumeData) {
      try {
        const parsed = typeof req.body.resumeData === 'string' ? JSON.parse(req.body.resumeData) : req.body.resumeData;
        console.log('Parsed resumeData keys:', Object.keys(parsed || {}));
        console.log('Includes experience field?:', Object.prototype.hasOwnProperty.call(parsed, 'experience'));
        if (Array.isArray(parsed.experience)) {
          console.log('Experience length:', parsed.experience.length);
        }
      } catch (err) {
        console.log('Failed to parse resumeData:', err.message);
      }
    } else {
      console.log('No resumeData field in body');
    }

    console.log('File attached?:', !!req.file);
    if (req.file) {
      console.log('File info:', { originalname: req.file.originalname, mimetype: req.file.mimetype, path: req.file.path });
    }

    console.log('=== REQUEST LOGGER END ===');
  } catch (err) {
    console.error('Request logger error:', err);
  }
  next();
}
