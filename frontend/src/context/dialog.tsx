import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { createContext, useContext, useState } from "react";

export const DialogContext = createContext(null);

export function DialogProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<JSX.Element | null>(null);

  function openDialog(content: JSX.Element) {
    setDialogContent(content);
    setIsOpen(true);
  }

  function closeDialog() {
    setIsOpen(false);
  }

  const values = {
    isOpen,
    openDialog,
    closeDialog,
    dialogContent,
  };

  return (
    <DialogContext.Provider value={values}>{children}</DialogContext.Provider>
  );
}
export function CustomDialog() {
  const { isOpen, dialogContent, closeDialog } = useContext(DialogContext);

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
