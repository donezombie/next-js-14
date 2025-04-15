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

interface DialogProps extends DialogI<any> {}

const DialogExample = (props: DialogProps) => {
  const { isOpen, toggle, onSubmit } = props;
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
                  <DialogTitle>Title example</DialogTitle>
                  <DialogDescription>Content example</DialogDescription>

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

export default DialogExample;
