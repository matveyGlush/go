"use client"

import { ReactNode } from 'react';
import { Container, Box, AppBar, Toolbar, Typography, ThemeProvider, createTheme } from '@mui/material';
import Link from 'next/link';
import HideOnScroll from './HideOnScroll'
import { usePathname } from 'next/navigation';
import CunstomButton from './CustomButton';

const theme = createTheme({
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: { fontSize: '2rem', fontWeight: 700 },
    h2: { fontSize: '1.8rem', fontWeight: 700 },
    h3: { fontSize: '1.6rem', fontWeight: 700 },
    button: { textTransform: 'none' }
  },
  palette: {
    primary: { main: '#000' },
    secondary: { main: '#fff' },
    background: { default: '#dfe4e6' },
  },
});

export default function CustomLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <ThemeProvider theme={theme}>
      <HideOnScroll>
        <AppBar position="fixed">
          <Toolbar sx={{ width: '100%', mx: 'auto', maxWidth: 1200, justifyContent: 'space-between' }}>
            <Link href={"/"}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Some&nbsp;Company
              </Typography>
            </Link>
            {pathname !== '/contact-us' &&
              <Link tabIndex={-1} href={"contact-us"}>
                <CunstomButton variant="contained" color="secondary">Contact&nbsp;us</CunstomButton>
              </Link>
            }
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Container sx={{ maxWidth: 'lg', pt: 9, mb: 4 }}>
        <Box mt={4}>
          {children}
        </Box>
      </Container>
      <footer style={{ textAlign: 'center', padding: '1rem 0' }}>
        <Typography variant="body2">Some&nbsp;Company&nbsp;2024</Typography>
      </footer>
    </ThemeProvider>
  );
};