// Wrapping one or more pages for the layout
// This is root layout. 
// We can set the nested layout files in each page.

import { ReactNode } from 'react';
import './globals.css'

// reserved name for header.
// It uses for <head> and title
export const metadata = {
  title: 'NextJS Course App',
  description: 'Your first NextJS app!',
};

export interface RootLayoutProps {
  children: ReactNode
}

// In root layout file must use html and body tag.
// However, in the nested layout file, it does not need to implement
// html and body.
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
