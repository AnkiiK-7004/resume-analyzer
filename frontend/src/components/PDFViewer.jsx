import React from 'react';
import { Box, Typography } from '@mui/material';

const PDFViewer = ({ file }) => {
  if (!file) return null;

  return (
    <Box
      sx={{
        border: '2px solid #ccc',
        borderRadius: '12px',
        height: '85vh',
        overflow: 'auto',
        p: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h6" mb={2}>
        Resume Preview
      </Typography>
      <iframe
        src={URL.createObjectURL(file)}
        title="PDF Preview"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      ></iframe>
    </Box>
  );
};

export default PDFViewer;
