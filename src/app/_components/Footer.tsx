import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto flex flex-col items-center justify-center text-center py-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Lumos - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
