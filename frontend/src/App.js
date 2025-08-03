import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Container, Grid, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import ThemeToggle from './components/ThemeToggle';
import UploadCard from './components/UploadCard';
import ResultCard from './components/ResultCard';
import PDFViewer from './components/PDFViewer';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async (e) => {
    const uploadedFile = e.target.files?.[0] || file;
    if (!uploadedFile) return;
    setFile(uploadedFile);

    const formData = new FormData();
    formData.append('resume', uploadedFile);

    const res = await fetch('http://localhost:5000/analyze', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Resume Analyzer
          </Typography>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <UploadCard onUpload={handleUpload} />
            <ResultCard result={result} />
          </Grid>

          <Grid item xs={12} md={6}>
            {file && (
              <Box
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  overflow: 'hidden',
                  height: 'calc(100% - 16px)',
                  minHeight: '600px',
                }}
              >
                <PDFViewer file={file} />
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );

}

export default App;
