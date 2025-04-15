import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogI } from "@/interfaces/common.interface";
import { Button } from "../ui/button";
import { Form, Formik } from "formik";
import { Fragment } from "react";
import { useTranslations } from "next-intl";

interface DialogConfirmProps extends DialogI<any> {
  title: React.ReactNode;
  content: React.ReactNode;
}

const DialogConfirm = (props: DialogConfirmProps) => {
  const { isOpen, toggle, onSubmit, title, content } = props;
  const t = useTranslations();

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <Formik initialValues={{}} onSubmit={onSubmit || (() => {})}>
            {({ isSubmitting }) => {
              return (
                <Fragment>
                  {title && <DialogTitle>{title}</DialogTitle>}
                  {content && <DialogDescription>{content}</DialogDescription>}

                  <Form className="mt-[25px] flex justify-end gap-2">
                    <Button type="submit" isLoading={isSubmitting}>
                      {t("Shared.yes")}
                    </Button>
                    <Button variant="ghost" type="button" onClick={toggle}>
                      {t("Shared.close")}
                    </Button>
                  </Form>
                </Fragment>
              );
            }}
          </Formik>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default DialogConfirm;
