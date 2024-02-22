import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { createContext, useRef, useState } from "react";
import { useDialog } from "../hook/useDialog";

export const DialogContext = createContext<{
  isOpen: boolean;
  isConfirmOpen: boolean;
  openConfirmDialog: (content: JSX.Element, cb: () => void) => void;
  openDialog: (content: JSX.Element | string) => void;
  closeDialog: () => void;
  closeConfirmDialog: () => void;
  confirmAndClose: () => void;
  dialogContent: JSX.Element | null;
}>(null);

export function DialogProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<JSX.Element | null>(null);

  const confirmCallbackFn = useRef<() => void>(null);

  function openDialog(content: JSX.Element) {
    setDialogContent(content);
    setIsOpen(true);
  }

  function openConfirmDialog(content: JSX.Element, cb: () => void) {
    setDialogContent(content);
    setIsConfirmOpen(true);
    confirmCallbackFn.current = cb;
  }

  function confirmAndClose() {
    setIsConfirmOpen(false);
    confirmCallbackFn.current();
    confirmCallbackFn.current = null;
  }

  function closeDialog() {
    setIsOpen(false);
  }

  function closeConfirmDialog() {
    setIsConfirmOpen(false);
  }

  const values = {
    isOpen,
    isConfirmOpen,
    openDialog,
    closeDialog,
    dialogContent,
    openConfirmDialog,
    closeConfirmDialog,
    confirmAndClose,
  };

  return (
    <DialogContext.Provider value={values}>{children}</DialogContext.Provider>
  );
}
export function CustomDialog() {
  const {
    isOpen,
    isConfirmOpen,
    closeConfirmDialog,
    dialogContent,
    closeDialog,
    confirmAndClose,
  } = useDialog();

  return (
    <>
      {isOpen ? (
        <Dialog
          open={isOpen}
          onClose={closeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            {typeof dialogContent === "string" ? (
              <Typography variant="h5">{dialogContent}</Typography>
            ) : (
              <DialogContent>{dialogContent}</DialogContent>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={closeDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      ) : null}
      {isConfirmOpen ? (
        <Dialog
          open={isConfirmOpen}
          onClose={closeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>{dialogContent}</DialogContent>
          <DialogActions>
            <Button onClick={closeConfirmDialog} variant="outlined">
              Close
            </Button>
            <Button onClick={() => confirmAndClose()} variant="contained">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  );
}
