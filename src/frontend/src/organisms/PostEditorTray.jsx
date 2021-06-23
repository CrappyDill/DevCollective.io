import { Field, Form, Formik } from "formik";

import Button from "../elements/Button";
import MarkdownEditor from "../molecules/MarkdownEditor";
import styled from "styled-components";


const FormWrapper = styled.div`
  form {
    display: grid;
    background-color: purple;

  }

`;



const PostEditorTray = ({ headerText, onSubmit }) => {
   return (
    <div>
      <FormWrapper>
        <Formik initialValues={{ title: ``, body: `` }} onSubmit={onSubmit}>
          <Form>
            <div>
              {headerText}
              <Button style={{ float: `right` }} type="submit">
                Submit
              </Button>
            </div>
            <div>
              <label htmlFor="title">Title</label>
              <Field id="title" name="title" placeholder="Title" />
              <label htmlFor="body">Body</label>
              <Field name="body" id="body">
                {({ field, form }) => (
                  <div>
                    <MarkdownEditor
                      value={field.value}
                      onBeforeChange={(val) => {
                        form.setFieldValue(`body`, val);
                      }}
                    />
                  </div>
                )}
              </Field>
            </div>
          </Form>
        </Formik>
      </FormWrapper>
    </div>
  );
};

export default PostEditorTray;
