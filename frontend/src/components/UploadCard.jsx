import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, CircularProgress, Box } from '@mui/material';

export default function UploadCard({ onUpload }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    setLoading(true);
    setMessage('Scanning your resume, please wait...');

    try {
      await onUpload(e);
      setMessage('Analysis complete.');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upload your resume
        </Typography>

        <input
          accept="application/pdf"
          type="file"
          onChange={handleUpload}
          disabled={loading}
          style={{ marginBottom: 10 }}
        />

        <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={loading}
            sx={{ minWidth: 100 }}
          >
            {loading ? 'Analyzing' : 'Analyze'}
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{ color: 'white', position: 'absolute', right: -40 }}
            />
          )}
        </Box>

        {message && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
