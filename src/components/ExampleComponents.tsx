import { Form, Formik } from "formik";
import { Button } from "./ui/button";
import SelectField from "./CustomFieldsFormik/SelectField";
import FormikField from "./CustomFieldsFormik/FormikField";
import InputField from "./CustomFieldsFormik/InputField";
import RadioField from "./CustomFieldsFormik/RadioField";
import DateTimePickerField from "./CustomFieldsFormik/DateTimePickerField";
import SwitchBoxField from "./CustomFieldsFormik/SwitchBoxField";
import CheckBoxField from "./CustomFieldsFormik/CheckBoxField";
import DialogConfirm from "./Dialogs/DialogConfirm";
import DialogExample from "./Dialogs/DialogExample";
import useToggleDialog from "@/hooks/useToggleDialog";
import { useGetTodos } from "@/modules/todos";
import useFiltersHandler from "@/hooks/useFiltersHandler";
import { cloneDeep } from "lodash";
import Loading from "./ui/loading";
import Link from "next/link";

const ExampleComponents = () => {
  const [openConfirm, toggleConfirm, shouldRenderConfirm] = useToggleDialog();
  const [openExample, toggleExample, shouldRenderExample] = useToggleDialog();

  const { filters, setFilters } = useFiltersHandler({
    page: 1,
    rowsPerPage: 15,
  });
  const { data, isPending } = useGetTodos({ filters });

  const renderExampleTodos = () => {
    if (isPending) {
      return (
        <div>
          <Loading />
        </div>
      );
    }

    return (
      <div>
        {(data || []).map((el) => {
          return (
            <div key={el.id}>
              {el.id} - {el.title}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Formik
      initialValues={{
        gender: "m",
      }}
      onSubmit={() => {}}
    >
      {() => {
        return (
          <Form className="flex flex-col gap-8 rounded-md border p-3">
            <div className="button-example ">
              <p className="mb-2 text-2xl font-semibold">Buttons</p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg">Button Size lg</Button>
                <Button size="sm">Button Size sm</Button>

                <Button>Button Primary</Button>
                <Button variant={"secondary"}>Button Secondary</Button>
                <Button variant={"destructive"}>Button Destructive</Button>
                <Button variant={"outline"}>Button Outline</Button>
                <Button isLoading={true}>Button Loading</Button>
                <Button variant={"ghost"}>Button Ghost</Button>
              </div>
            </div>

            <div className="typography-example">
              <p className="mb-2 text-2xl font-semibold">Typography</p>
              <div className="flex flex-col gap-3 pl-10">
                <p className="text-5xl">Typography 5xl</p>
                <p className="text-4xl">Typography 4xl</p>
                <p className="text-3xl">Typography 3xl</p>
                <p className="text-2xl">Typography 2xl</p>
                <p className="text-xl">Typography xl</p>
                <p className="text-lg">Typography lg</p>
                <p className="text-md">Typography md</p>
                <p className="text-sm">Typography sm</p>

                <Link href="/" className="is-link">
                  Link
                </Link>
              </div>
            </div>

            <div className="form-example">
              <p className="mb-2 text-2xl font-semibold">Form</p>
              <div className="flex max-w-md flex-col gap-4">
                <FormikField
                  component={SelectField}
                  name="gender"
                  options={[
                    {
                      label: "Male",
                      value: "m",
                    },
                    {
                      label: "Female",
                      value: "female",
                    },
                  ]}
                  label="Gender"
                />

                <FormikField
                  component={InputField}
                  name="username"
                  label="Username"
                  placeholder="Enter your email"
                  required
                />

                <FormikField
                  component={InputField}
                  name="Password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />

                <FormikField
                  component={RadioField}
                  name="radioInput"
                  label="Radio Input"
                  options={[
                    { label: "Radio 1", value: "1" },
                    { label: "Radio 2", value: "2" },
                    { label: "Radio 3", value: "3" },
                  ]}
                  required
                />

                <FormikField
                  component={DateTimePickerField}
                  name="date"
                  label="Date time picker"
                  required
                />

                <FormikField component={SwitchBoxField} name="toggle" label="Toggler" />

                <FormikField component={CheckBoxField} name="agree" label="Checkbox field" />
              </div>
            </div>

            <div className="dialogs-example flex flex-col gap-2">
              <p className="mb-2 text-2xl font-semibold">Dialogs</p>
              {shouldRenderConfirm && (
                <DialogConfirm
                  isOpen={openConfirm}
                  toggle={toggleConfirm}
                  title="Confirmation"
                  content="Are you sure you want do something?"
                  onSubmit={(_, { setSubmitting }) => {
                    setSubmitting(true);
                    setTimeout(() => {
                      toggleConfirm();
                    }, 2000);
                  }}
                />
              )}

              {shouldRenderExample && <DialogExample isOpen={openExample} toggle={toggleExample} />}

              <div>
                <Button onClick={toggleConfirm}>Open confirm dialog</Button>
              </div>
              <div>
                <Button onClick={toggleExample}>Open example dialog</Button>
              </div>
            </div>

            <div>
              {renderExampleTodos()}

              <div className="mt-2 flex gap-3">
                <Button
                  variant="secondary"
                  disabled={filters.page <= 1}
                  onClick={() => {
                    setFilters((prev) => {
                      const next = cloneDeep(prev);
                      next.page = next.page - 1;
                      return next;
                    });
                  }}
                >
                  Back
                </Button>
                <Button
                  onClick={() => {
                    setFilters((prev) => {
                      const next = cloneDeep(prev);
                      next.page = next.page + 1;
                      return next;
                    });
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ExampleComponents;
