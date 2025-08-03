import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function ResultCard({ result }) {
  if (!result) return null;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Analysis Result
        </Typography>
        <Typography variant="body1">Score: {result.score}/100</Typography>
        <Typography variant="subtitle1" mt={2}>
          Suggestions:
        </Typography>
        <List>
          {result.suggestions.map((s, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={s} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}