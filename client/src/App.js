import React from "react";
import { Container, Grid, Header, Icon, Menu, Sidebar, Modal, Button, Checkbox, Form } from "semantic-ui-react";// import the ToDoList component
import ToDoList from "./Components/ToDoList"; import 'semantic-ui-css/semantic.min.css'

const SignUpForm = () => {

  return (
    <Form>
      <Form.Field>
        <label>Email</label>
        <input />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input />
      </Form.Field>
      <Form.Field>
        <label>Re-Type Password</label>
        <input />
      </Form.Field>
      <Form.Field>
        <Checkbox label='I agree to the Terms and Conditions' />
      </Form.Field>
      <Button type='submit'>Create Account</Button>
    </Form>
  );
};

const SignInModal = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Menu.Item as="a">
          <Icon name="sign-in" size="small" />
      Sign In
      </Menu.Item>}
    >
      <Modal.Header>Log in to GoToDo</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Create an Account</Header>
          <SignUpForm />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Go Back
        </Button>
        <Button
          content="Create Account"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
};

const App = () => {
  return (
    <div>
      <Container text textAlign="center">
        <Grid columns={1}>
          <Grid.Column>
            <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              inverted
              vertical
              visible
              width='thin'
            >
              <Menu.Item
                as="a">
                <Header as="h3" inverted>GoToDo</Header>
              </Menu.Item>
              <SignInModal />
            </Sidebar>
          </Grid.Column>
          <Grid.Column>
            <ToDoList />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}
export default App;