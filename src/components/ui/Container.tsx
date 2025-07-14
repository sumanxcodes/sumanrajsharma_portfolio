import React from 'react';
import { Container as MuiContainer, ContainerProps } from '@mui/material';

interface CustomContainerProps extends ContainerProps {
  children: React.ReactNode;
}

export function Container({ children, ...props }: CustomContainerProps) {
  return (
    <MuiContainer
      maxWidth="lg"
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </MuiContainer>
  );
}