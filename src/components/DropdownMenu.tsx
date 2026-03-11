import * as React from "react";

// Définir explicitement le type des `children`
interface DropdownMenuProps {
  children: React.ReactNode;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  return (
    <div className="dropdown-menu">
      {children}
    </div>
  );
};

interface DropdownMenuContentProps {
  children: React.ReactNode;
}

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ children }) => {
  return <div className="dropdown-content">{children}</div>;
};

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className="dropdown-item">
      {children}
    </div>
  );
};

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
}

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ children }) => {
  return <div className="dropdown-trigger">{children}</div>;
};
