import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

export default function UploadCard({ onUpload }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upload your resume
        </Typography>
        <input
          accept="application/pdf"
          type="file"
          onChange={onUpload}
          style={{ marginBottom: 10 }}
        />
        <Button variant="contained" onClick={onUpload}>
          Analyze
        </Button>
      </CardContent>
    </Card>
  );
}
